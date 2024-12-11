import useTargetModeratorState, {
  ModeratorModalOperations,
} from '@/hooks/states/useTargetModeratorState';

import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
  Image,
  Switch,
  useDisclosure,
  Checkbox,
} from '@nextui-org/react';
import { ModeratorModel, ModeratorStatus } from '@/types/models/ModeratorModel';
import MutationResponse from '@/types/responses/MutationReponse';
import Swal from 'sweetalert2';
import apiClient from '@/services/api-services/api-client';
import ImageUploader from '../common/ImageUploader';
import { endpoints } from '@/services/api-services/api-service-instances';
import { FaHistory } from 'react-icons/fa';

const ModeratorModal = () => {
  const isAnyRequestSubmit = useRef(false);
  const modal = useTargetModeratorState();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [moderator, setModerator] = useState<ModeratorModel>(modal.moderator);
  const [dormIds, setDormIds] = useState<number[]>(modal.moderator.dormitories.map((d) => d.id));
  useEffect(() => {
    console.log('modal.isModalShow: ', modal.isModalShow);
    if (modal.isModalShow) {
      isAnyRequestSubmit.current = false;
      onOpen();
    }
  }, [modal.isModalShow]);
  useEffect(() => {
    console.log('isOpen: ', isOpen);
    if (!isOpen) modal.setIsModalShow(false);
  }, [isOpen]);
  useEffect(() => {
    setModerator(modal.moderator);
    setDormIds(modal.moderator.dormitories.map((d) => d.id));
  }, [modal.moderator]);

  const numericFields = [''];

  const [errors, setErrors] = useState<any>({});
  const validate = (moderator: ModeratorModel) => {
    console.log('Validating moderator: ', moderator);
    const tempErrors: any = {};
    if (moderator.fullName.trim().length < 6) tempErrors.title = 'Họ và tên ít nhất 6 kí tự.';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const newValue = numericFields.includes(name) ? Number(value) : value;

    if (isAnyRequestSubmit.current) {
      validate({
        ...moderator,
        [name]: newValue,
      });
    }

    setModerator((prevModerator) => ({
      ...prevModerator,
      [name]: newValue,
    }));
  };

  const handleSubmit = () => {
    isAnyRequestSubmit.current = true;
    if (validate(moderator)) {
      apiClient
        .post('admin/moderator/account', moderator)
        .then((res) => {
          const result = res.data as MutationResponse<ModeratorModel>;
          if (result.isSuccess) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Tạo mới thành công',
              showConfirmButton: false,
              timer: 1500,
            });
            isAnyRequestSubmit.current = false;
            // onHandleSubmitSuccess({ ...moderator, ...result.value });

            // // set to init
            // setModerator({ ...initModeratorSampleObject, bannerUrl: '' });
            onClose();
          } else {
          }
        })
        .catch((error: any) => {
          if (Number(error?.response?.status || 0) > 500) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Oh no, lỗi máy chủ!',
              text: 'Xử lí bị gián đoạn, vui lòng thử lại!',
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Oh no!',
              text:
                error?.response?.data?.error?.message || 'Yêu cầu bị từ chối, vui lòng thử lại!',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    }
  };

  const dormitoryList = [
    { id: 1, name: 'Ký túc xá khu A' },
    { id: 2, name: 'Ký túc xá khu B' },
  ];

  const getTitle = () => {
    if (modal.modalMode == ModeratorModalOperations.Details) return 'Chi tiết hồ sơ';
    if (modal.modalMode == ModeratorModalOperations.Create) return 'Thêm điều phối viên mới';
    if (modal.modalMode == ModeratorModalOperations.Update) return 'Cập nhật thông tin';
    return '';
  };
  const getActions = () => {
    if (modal.modalMode == ModeratorModalOperations.Details)
      return (
        <div className="flex justify-center gap-x-2">
          <Button
            color="default"
            variant="flat"
            onPress={() => {}}
            startContent={<FaHistory color="#7dd3fc" />}
          >
            Lịch sử hoạt động
          </Button>
          <Button
            color="primary"
            onPress={() => modal.setModalMode(ModeratorModalOperations.Update)}
          >
            Chỉnh sửa
          </Button>
        </div>
      );
    if (modal.modalMode == ModeratorModalOperations.Create)
      return (
        <div className="flex justify-center gap-x-2">
          <Button color="primary" onPress={handleSubmit}>
            Lưu
          </Button>
          <Button color="danger" variant="flat" onPress={onClose}>
            Đóng
          </Button>
        </div>
      );
    if (modal.modalMode == ModeratorModalOperations.Update)
      return (
        <div className="flex justify-center gap-x-2">
          <Button color="primary" onPress={handleSubmit}>
            Cập nhật
          </Button>
          <Button
            color="danger"
            variant="flat"
            onPress={() => {
              setModerator(modal.moderator);
              modal.setModalMode(ModeratorModalOperations.Details);
            }}
          >
            Hủy
          </Button>
        </div>
      );
    return <div></div>;
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" size="sm">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-center">{getTitle()}</ModalHeader>
            <ModalBody>
              <div className="flex gap-3">
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex items-center justify-center w-full">
                    <div className="relative">
                      <div className="h-[80px] w-[80px] rounded-full overflow-hidden">
                        <ImageUploader
                          uploadServiceEndpoint={endpoints.STORAGE_FILE_UPLOAD}
                          imageURL={moderator.avatarUrl}
                          setImageURL={(url) => {
                            setModerator({ ...moderator, avatarUrl: url });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="input-container">
                    <Input
                      size="lg"
                      name="fullName"
                      label="Họ và tên"
                      placeholder="Nhập tên điều phối viên..."
                      value={moderator.fullName}
                      onChange={handleChange}
                      isInvalid={errors.fullName ? true : false}
                      errorMessage={errors.fullName}
                      required
                      isReadOnly={modal.modalMode == ModeratorModalOperations.Details}
                      fullWidth
                    />
                  </div>
                  <div className="input-container ">
                    <Input
                      size="lg"
                      name="email"
                      label="Email"
                      type="email"
                      //   className="text-2xl"
                      placeholder="Nhập mô tả chương trình khuyến mãi"
                      value={moderator.email}
                      onChange={handleChange}
                      isReadOnly={modal.modalMode == ModeratorModalOperations.Details}
                      fullWidth
                    />
                  </div>
                  <div className="input-container">
                    <Input
                      size="lg"
                      name="phoneNumber"
                      label="Số điện thoại"
                      type="numeric"
                      placeholder="Nhập số điện thoại...."
                      value={moderator.phoneNumber}
                      onChange={handleChange}
                      isReadOnly={modal.modalMode == ModeratorModalOperations.Details}
                      fullWidth
                    />
                  </div>
                  <div className="input-container">
                    <p className="text-sm ml-2">Khu quản lí</p>
                    <div className="mt-1 flex flex-row justify-start items-center gap-x-4  p-[7px] px-4 border-[1px] rounded-lg border-gray-100 bg-gray-100">
                      {dormitoryList.map((item) => (
                        <Checkbox
                          className="text-sm"
                          key={item.id}
                          isSelected={dormIds.includes(item.id)}
                          color={'default'}
                          //   isDisabled={modal.modalMode == ModeratorModalOperations.Details}
                          isReadOnly={modal.modalMode == ModeratorModalOperations.Details}
                          onClick={() => {
                            if (modal.modalMode == ModeratorModalOperations.Details) return;
                            if (dormIds.includes(item.id))
                              setDormIds(dormIds.filter((id) => id != item.id));
                            else setDormIds(dormIds.concat(item.id));
                          }}
                        >
                          {item.id == 1 ? 'Khu A' : 'Khu B'}
                        </Checkbox>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-start ml-1 p-2 mt-1">
                    <Switch
                      name="status"
                      isSelected={moderator.status == ModeratorStatus.Active}
                      onValueChange={(checked) => {
                        setModerator((prevModerator) => ({
                          ...prevModerator,
                          status: checked ? ModeratorStatus.Active : ModeratorStatus.Locked,
                        }));
                      }}
                      isReadOnly={modal.modalMode == ModeratorModalOperations.Details}
                      color="success"
                    >
                      <p className="italic">Cho phép hoạt động</p>
                    </Switch>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>{getActions()}</ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModeratorModal;

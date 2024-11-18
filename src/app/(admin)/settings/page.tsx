'use client';
import apiClient from '@/services/api-services/api-client';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';

import MainLayout from '@/components/layout/MainLayout';
import useFetchWithRQWithFetchFunc from '@/hooks/fetching/useFetchWithRQWithFetchFunc';
import { endpoints } from '@/services/api-services/api-service-instances';
import APICommonResponse from '@/types/responses/APICommonResponse';
import { CommissionGetReponse } from '@/types/responses/CommissionGetResponse';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Swal from 'sweetalert2';
dayjs.extend(utc);
const Settings = () => {
  const {
    isOpen: isSettingOpen,
    onOpen: onSettingOpen,
    onOpenChange: onSettingOpenChange,
    onClose: onSettingClose,
  } = useDisclosure();

  const {
    data: commissionGetReponse,
    // isLoading,
    // error,
    refetch,
  } = useFetchWithRQWithFetchFunc(
    [endpoints.COMMISSION_GET],
    (): Promise<CommissionGetReponse> =>
      apiClient
        .get<CommissionGetReponse>(endpoints.COMMISSION_GET)
        .then((response) => response.data),
  );

  const [commissionRate, setCommissionRate] = useState(0);

  const [isHovered, setIsHovered] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 0);
    setCommissionRate(value);
  };

  const handleCommissionSubmit = () => {
    if (commissionRate < 0 || commissionRate > 100) {
      onSettingOpen();
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Giá trị không hợp lệ',
        text: 'Chiết khấu phải là số nguyên từ 0 đến 100.',
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    apiClient
      .put(endpoints.COMMISSION_UPDATE, { commissionRate })
      .then((res) => {
        const result = res.data as APICommonResponse;
        if (result.isSuccess) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cập nhật thành công',
            showConfirmButton: false,
            timer: 1500,
          });

          refetch();
          onSettingClose();
        } else {
          if (result.error.code === '500') {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Oh no, lỗi máy chủ!',
              text: 'Máy chủ gặp sự cố trong quá trình cập nhật, vui lòng thử lại!',
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Oh no!',
              text: `Gặp lỗi trong quá trình cập nhật, vui lòng thử lại: ${result.error.message}`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      })
      .catch(() => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Oh no, lỗi máy chủ!',
          text: 'Máy chủ gặp sự cố trong quá trình cập nhật, vui lòng thử lại!',
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <MainLayout activeContentIndex={3}>
      <div className="px-8 py-4">
        <h1 className="text-3xl font-bold text-primary">Cài đặt thông tin nền tảng</h1>
        <span className="text-default-400 text-small mt-2">
          Thiết lập những thông tin liên quan đến nền tảng.
        </span>

        <div className="mt-4">
          <h3 className="text-lg font-medium">Chiết khấu giao dịch</h3>

          <div>
            <Input
              type="number"
              color="primary"
              size={'lg'}
              label=""
              readOnly
              value={(commissionGetReponse?.value.commissionRate || 0).toString()}
              placeholder="0"
              className="text-center max-w-[170px] font-bold mt-2 justify-center"
              startContent={
                <div
                  className="relative cursor-pointer flex justify-center items-center w-[150px] hover:scale-110 hover:text-blue-500 transition-transform duration-200"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={() => {
                    setCommissionRate(commissionGetReponse?.value.commissionRate || 0);
                    onSettingOpen();
                  }}
                >
                  <FaEdit color="#fb7185" />
                  {isHovered && (
                    <span className="absolute top-full mt-2 text-xs bg-gray-200 text-black p-1 rounded shadow-lg">
                      Sửa
                    </span>
                  )}
                </div>
              }
              endContent={
                <div className="pointer-events-none flex justify-center font-normal items-center w-[250px]">
                  <span className="text-default-400 text-small">(% / đơn)</span>
                </div>
              }
            />
          </div>
          {commissionGetReponse?.value.updatedDate && (
            <p className="text-default-400 text-small mt-2">
              Cập nhật lần cuối{' '}
              {dayjs(commissionGetReponse.value.updatedDate).local().format('HH:mm DD/MM/YYYY')}
            </p>
          )}

          <Modal
            isOpen={isSettingOpen}
            onOpenChange={onSettingOpenChange}
            onClose={onSettingClose}
            hideCloseButton
            placement="top-center"
            size="sm"
          >
            <ModalContent className="scale-110">
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Cập nhật chiết khấu</ModalHeader>
                  <ModalBody>
                    <div className="h-full w-full flex justify-center items-center ">
                      <Input
                        type="number"
                        color="primary"
                        size="lg"
                        label=""
                        value={commissionRate.toString()}
                        onChange={handleInputChange}
                        placeholder="0"
                        className="text-center w-[164px]  font-bold mt-2 text-lg justify-center font-bold"
                        startContent={
                          <div className="cursor-pointer flex justify-center items-center w-[80px] hover:scale-110 hover:text-blue-500 transition-transform duration-200"></div>
                        }
                        endContent={
                          <div className="pointer-events-none flex justify-center font-normal items-center w-[200px]">
                            <span className="text-default-400 text-small">(% / đơn)</span>
                          </div>
                        }
                      />
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onPress={handleCommissionSubmit}>
                      Lưu
                    </Button>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Hủy
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;

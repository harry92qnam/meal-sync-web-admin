import { WITHDRAWAL_STATUS } from '@/data/constants/constants';
import useRefetch from '@/hooks/states/useRefetch';
import apiClient from '@/services/api-services/api-client';
import WithdrawalModel from '@/types/models/WithdrawalModel';
import { formatCurrency, formatTimeToSeconds, toast } from '@/utils/MyUtils';
import {
  Button,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

interface WithdrawDetailModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
  id: number;
}

export default function WithdrawDetailModal({
  isOpen,
  onOpenChange,
  onClose,
  id,
}: WithdrawDetailModalProps) {
  const [detail, setDetail] = useState<WithdrawalModel>();
  const { isRefetch, setIsRefetch } = useRefetch();

  const handleReject = async (withdraw: WithdrawalModel) => {
    await Swal.fire({
      title: `Từ chối yêu cầu MS-${withdraw.id}`,
      input: 'textarea',
      inputPlaceholder: 'Nhập lý do từ chối',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      confirmButtonColor: 'rgb(23, 201, 100)',
      cancelButtonText: 'Hủy',
      cancelButtonColor: 'rgba(243, 18, 96)',
      inputValidator: (value: any) => {
        if (!value) {
          return 'Vui lòng cung cấp lý do từ chối!';
        }
      },
    }).then(async (result) => {
      console.log(result, 'result');

      if (result.isConfirmed) {
        try {
          const payload = {
            id: withdraw.id,
            status: 5,
            reason: result.value,
            isConfirm: true,
          };
          const responseData = await apiClient.put('moderator/withdrawal-request/status', payload);
          if (responseData.data.isSuccess) {
            onClose();
            setIsRefetch();
            toast('success', responseData.data.value.message);
          } else {
            console.log(responseData);
          }
        } catch (error) {
          console.log(error, '>>> error');
        }
      } else {
        return;
      }
    });
  };

  const handleApprove = async (withdraw: WithdrawalModel) => {
    try {
      const payload = {
        id: withdraw.id,
        status: 4,
        isConfirm: false,
      };
      const responseData = await apiClient.put('moderator/withdrawal-request/status', payload);
      if (responseData.data.isWarning) {
        await Swal.fire({
          text: responseData.data.value.message,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#ef4444',
          cancelButtonColor: '#94a3b8',
          confirmButtonText: 'Xác nhận',
          cancelButtonText: 'Hủy',
        }).then(async (result) => {
          if (result.isConfirmed) {
            const responseData = await apiClient.put('moderator/withdrawal-request/status', {
              ...payload,
              isConfirm: true,
            });
            if (responseData.data.isSuccess) {
              toast('success', responseData.data.value.message);
              setIsRefetch();
            } else {
              console.log(responseData);
            }
          } else {
            return;
          }
        });
      } else if (responseData.data.isSuccess) {
        toast('success', responseData.data.value.message);
        setIsRefetch();
      } else {
        console.log(responseData);
      }
    } catch (error) {
      console.log(error, '>>> error');
    } finally {
      onClose();
    }
  };

  const handleProgress = async (withdraw: WithdrawalModel) => {
    try {
      const payload = {
        id: withdraw.id,
        status: 3,
        isConfirm: true,
      };
      const responseData = await apiClient.put('moderator/withdrawal-request/status', payload);
      if (responseData.data.isSuccess) {
        onClose();
        setIsRefetch();
        toast('success', responseData.data.value.message);
      } else {
        console.log(responseData);
      }
    } catch (error) {
      console.log(error, '>>> error');
    }
  };

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const responseData = await apiClient.get(`moderator/withdrawal-request/${id}`);
        if (responseData.data.isSuccess) {
          setDetail(responseData.data?.value);
        } else {
          console.log(responseData.data.error.message);
        }
      } catch (error: any) {
        console.log('>>> error', error);
      }
    };
    fetchDetail();
  }, [id, isRefetch, isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
      isDismissable={false}
      hideCloseButton
      size="4xl"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col my-2">
          <div className="flex justify-between items-center">
            <div className="flex gap-4 justify-start items-center">
              <p>{`MS-${detail?.id} | ${detail?.shopName}`}</p>
              <Chip
                className={`capitalize ${
                  detail?.status === 1
                    ? 'bg-gray-200 text-gray-600'
                    : detail?.status === 3
                      ? 'bg-yellow-200 text-yellow-600'
                      : detail?.status === 4
                        ? 'bg-green-200 text-green-600'
                        : 'bg-red-200 text-rose-600'
                }`}
                size="md"
                variant="flat"
              >
                {WITHDRAWAL_STATUS.find((item) => item.key == detail?.status)?.desc}
              </Chip>
            </div>
            <div className="flex gap-2 items-center mr-4">
              {detail?.status === WITHDRAWAL_STATUS[0].key && (
                <React.Fragment>
                  <Button
                    variant="flat"
                    className="capitalize text-yellow-600 bg-yellow-200"
                    onClick={() => {
                      handleProgress(detail);
                      onClose();
                    }}
                  >
                    Tiến hành xử lý
                  </Button>
                </React.Fragment>
              )}
              {detail?.status === WITHDRAWAL_STATUS[1].key && (
                <React.Fragment>
                  <Button
                    color="danger"
                    variant="flat"
                    className="capitalize text-danger-500"
                    onClick={() => {
                      handleReject(detail);
                      onClose();
                    }}
                  >
                    Từ chối
                  </Button>
                  <Button
                    color="success"
                    variant="shadow"
                    className="capitalize text-white"
                    onClick={() => {
                      handleApprove(detail);
                      onClose();
                    }}
                  >
                    Phê duyệt
                  </Button>
                </React.Fragment>
              )}
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="flex gap-3">
            <div className="flex-1 flex flex-col gap-2">
              <div className="input-container">
                <Input
                  name="shopName"
                  label="Tên cửa hàng"
                  value={detail?.shopName}
                  readOnly
                  fullWidth
                />
              </div>
              <div className="input-container">
                <Input
                  name="shopOwnerName"
                  label="Tên chủ cửa hàng"
                  value={detail?.shopOwnerName}
                  readOnly
                  fullWidth
                />
              </div>
              <div className="input-container">
                <Input name="email" label="Email" value={detail?.email} readOnly fullWidth />
              </div>
              <div className="input-container">
                <Input
                  name="availableAmount"
                  label="Số dư hiện tại"
                  value={formatCurrency(detail?.availableAmount ?? 0)}
                  readOnly
                  fullWidth
                />
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-2 justify-between">
              <div className="input-container">
                <Input
                  name="bankShortName"
                  label="Ngân hàng thụ hưởng"
                  value={`${detail?.bankShortName} (${detail?.bankCode})`}
                  readOnly
                  fullWidth
                />
              </div>
              <div className="input-container">
                <Input
                  name="bankAccountName"
                  label="Tên tài khoản thụ hưởng"
                  value={detail?.bankAccountName}
                  readOnly
                  fullWidth
                />
              </div>
              <div className="input-container">
                <Input
                  name="bankAccountNumber"
                  label="Số tài khoản"
                  value={detail?.bankAccountNumber}
                  readOnly
                  fullWidth
                />
              </div>
              <div className="input-container">
                <Input
                  name="amount"
                  label="Số tiền yêu cầu"
                  value={formatCurrency(detail?.requestAmount ?? 0)}
                  readOnly
                  fullWidth
                />
              </div>
              <div className="input-container">
                <Input
                  name="createdDate"
                  label="Thời gian yêu cầu"
                  value={formatTimeToSeconds(detail?.createdDate ?? '')}
                  readOnly
                  fullWidth
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="flat" className="text-danger-500" onPress={onClose}>
            Đóng
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

import { WITHDRAWAL_STATUS } from '@/data/constants/constants';
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
  const handleReject = async (withdraw: WithdrawalModel) => {
    const { value: reason } = await Swal.fire({
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
    });

    // if (reason) {
    //   await apiClient
    //     .put<APICommonResponse>(`admin/shop/${withdraw.shopId}/withdrawal/reject`, {
    //       shopId: withdraw.shopId,
    //       requestId: withdraw.requestId,
    //       reason,
    //     })
    //     .then(async (response) => {
    //       if (response.data.isSuccess) {
    //         await Swal.fire('Thành công!', 'Yêu cầu rút tiền đã được từ chối.', 'success');
    //         setSelectedWithdraw({
    //           ...selectedWithdraw,
    //           status: WITHDRAWAL_STATUS[2].key,
    //           note: reason || '',
    //         });
    //         onDetailOpen();
    //         // refetch();
    //       } else {
    //         await Swal.fire('Thất bại!', 'Đã xảy ra lỗi khi từ chối yêu cầu.', 'error');
    //         onDetailOpen();
    //       }
    //     })
    //     .catch(async (error) => {
    //       await Swal.fire('Thất bại!', 'Đã xảy ra lỗi khi từ chối yêu cầu.', 'error');
    //       onDetailOpen();
    //     });
    // }
    // onDetailOpen();
  };

  const handleApprove = async (withdraw: WithdrawalModel) => {
    //   await apiClient
    //     .put<APICommonResponse>(`admin/shop/${withdraw.shopId}/withdrawal/approve`, {
    //       shopId: withdraw.shopId,
    //       requestId: withdraw.requestId,
    //     })
    //     .then(async (response) => {
    //       if (response.data.isSuccess) {
    //         await Swal.fire('Thành công!', 'Yêu cầu đã được phê duyệt.', 'success');
    //         // refetch();
    //       } else {
    //         await Swal.fire('Thất bại!', 'Đã xảy ra lỗi khi phê duyệt yêu cầu.', 'error');
    //         onDetailOpen();
    //       }
    //     })
    //     .catch(async (error) => {
    //       await Swal.fire('Thất bại!', 'Đã xảy ra lỗi khi phê duyệt yêu cầu.', error);
    //       onDetailOpen();
    //     });
  };

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const responseData = await apiClient.get(`moderator/withdrawal-request/${id}`);
        if (responseData.data.isSuccess) {
          setDetail(responseData.data?.value);
        } else {
          toast('error', responseData.data.error.message);
        }
      } catch (error: any) {
        console.log('>>> error', error);
      }
    };
    fetchDetail();
  }, [id]);

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
                    : detail?.status === 2
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
                  name="createdDate"
                  label="Thời gian yêu cầu"
                  value={formatTimeToSeconds(detail?.createdDate ?? '')}
                  readOnly
                  fullWidth
                />
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-2 justify-between">
              <div className="input-container">
                <Input
                  name="bankShortName"
                  label="Tên ngân hàng"
                  value={`${detail?.bankShortName} (${detail?.bankCode})`}
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
                  name="availableAmount"
                  label="Số dư hiện tại"
                  value={formatCurrency(detail?.availableAmount ?? 0)}
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

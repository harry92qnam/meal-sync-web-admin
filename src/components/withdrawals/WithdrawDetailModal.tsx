import { WITHDRAWAL_STATUS } from '@/data/constants/constants';
import useWithdrawTargetState from '@/hooks/states/useWithdrawTargetState';
import WithdrawalModel from '@/types/models/WithdrawalModel';
import { formatCurrency, formatTimeToSeconds } from '@/utils/MyUtils';
import {
  Button,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from '@nextui-org/react';
import React from 'react';

interface WithdrawDetailModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
  onApprove: (withdraw: WithdrawalModel) => void;
  onReject: (withdraw: WithdrawalModel) => void;
}

export default function WithdrawDetailModal({
  isOpen,
  onOpenChange,
  onClose,
  onApprove,
  onReject,
}: WithdrawDetailModalProps) {
  const { model: withdraw } = useWithdrawTargetState();

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
      isDismissable={false}
      hideCloseButton
      size="4xl"
      style={{ zIndex: 100 }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col mt-6">
          <div className="flex justify-between items-center">
            <div className="flex gap-4 justify-start items-center">
              <p>{'#' + withdraw.id + ' | ' + withdraw.shopName}</p>
              <Chip
                className={`capitalize ${
                  withdraw.status === 1
                    ? 'bg-gray-200 text-gray-600'
                    : withdraw.status === 2
                      ? 'bg-green-200 text-green-600'
                      : 'bg-red-200 text-rose-600'
                }`}
                size="md"
                variant="flat"
              >
                {WITHDRAWAL_STATUS.find((item) => item.key == withdraw.status)?.desc}
              </Chip>
            </div>
            <div className="flex gap-2 items-center mr-4">
              {withdraw.status === WITHDRAWAL_STATUS[0].key && (
                <React.Fragment>
                  <Button
                    color="danger"
                    variant="flat"
                    className="capitalize text-danger-500"
                    onClick={() => onReject(withdraw)}
                  >
                    Từ chối
                  </Button>
                  <Button
                    color="success"
                    variant="shadow"
                    className="capitalize text-white"
                    onClick={() => onApprove(withdraw)}
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
                  value={withdraw.shopName}
                  readOnly
                  fullWidth
                />
              </div>
              <div className="input-container">
                <Input name="email" label="Email" value={withdraw.email} readOnly fullWidth />
              </div>
              <div className="input-container">
                <Input
                  name="balance"
                  label="Số dư hiện tại"
                  value={formatCurrency(withdraw.balance)}
                  readOnly
                  fullWidth
                />
              </div>
              <div className="input-container">
                <Input
                  name="createdDate"
                  label="Ngày yêu cầu"
                  value={formatTimeToSeconds(withdraw.createdDate)}
                  readOnly
                  fullWidth
                />
              </div>
              {withdraw.status !== WITHDRAWAL_STATUS[0].key && (
                <div className="input-container">
                  <Input
                    name="processedDate"
                    label="Ngày xử lý"
                    value={formatTimeToSeconds(withdraw.processedDate)}
                    readOnly
                    fullWidth
                  />
                </div>
              )}
            </div>
            <div className="flex-1 flex flex-col gap-2 justify-between">
              <div className="input-container">
                <Input
                  name="bankShortName"
                  label="Tên ngân hàng"
                  value={withdraw.bankShortName}
                  readOnly
                  fullWidth
                />
              </div>
              <div className="input-container">
                <Input
                  name="bankAccountNumber"
                  label="Số tài khoản"
                  value={withdraw.bankAccountNumber}
                  readOnly
                  fullWidth
                />
              </div>
              <div className="input-container">
                <Input
                  name="amount"
                  label="Số tiền yêu cầu"
                  value={formatCurrency(withdraw.requestedAmount)}
                  readOnly
                  fullWidth
                />
              </div>
              <div className="input-container">
                <Textarea
                  name="note"
                  label="Ghi chú"
                  placeholder={withdraw.note ? '' : 'Không có ghi chú'}
                  value={withdraw.note ?? ''}
                  readOnly
                  fullWidth
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            className="text-danger-500 hover:bg-danger-500 hover:text-white"
            onPress={onClose}
          >
            Đóng
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

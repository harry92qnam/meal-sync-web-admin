'use client';
import TableCustom, { TableCustomFilter } from '@/components/common/TableCustom';
import { ACCOUNT_COLUMNS, ACCOUNT_STATUS } from '@/data/constants/constants';
import REACT_QUERY_CACHE_KEYS from '@/data/constants/react-query-cache-keys';
import useFetchWithRQ from '@/hooks/fetching/useFetchWithRQ';
import usePeriodTimeFilterState from '@/hooks/states/usePeriodTimeFilterQuery';
import useRefetch from '@/hooks/states/useRefetch';
import apiClient from '@/services/api-services/api-client';
import { accountApiService } from '@/services/api-services/api-service-instances';
import AccountModel from '@/types/models/AccountModel';
import { DormitoryModel } from '@/types/models/DormitoryModel';
import PageableModel from '@/types/models/PageableModel';
import AccountQuery from '@/types/queries/AccountQuery';
import { formatDate, formatNumber, formatPhoneNumber, toast } from '@/utils/MyUtils';
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Selection,
  Textarea,
  useDisclosure,
  User,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Swal from 'sweetalert2';

export default function Accounts() {
  const router = useRouter();
  const { range } = usePeriodTimeFilterState();
  const { isRefetch, setIsRefetch } = useRefetch();

  const [statuses, setStatuses] = useState<Selection>(new Set(['0']));
  const [dormitories, setDormitories] = useState<Selection>(new Set(['0']));
  const [accountIdSelected, setAccountIdSelected] = useState<number>(0);
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [dormitoryList, setDormitoryList] = useState<DormitoryModel[]>([]);

  const { isOpen: isBanOpen, onOpen: onBanOpen, onOpenChange: onBanOpenChange } = useDisclosure();

  const {
    isOpen: isUnBanOpen,
    onOpen: onUnBanOpen,
    onOpenChange: onUnBanOpenChange,
  } = useDisclosure();

  const [query, setQuery] = useState<AccountQuery>({
    searchValue: '',
    status: 0,
    dormitoryId: 0,
    dateFrom: range.dateFrom,
    dateTo: range.dateTo,
    pageIndex: 1,
    pageSize: 10,
  } as AccountQuery);

  const { data: accounts, refetch } = useFetchWithRQ<AccountModel, AccountQuery>(
    REACT_QUERY_CACHE_KEYS.ACCOUNTS,
    accountApiService,
    query,
  );

  useEffect(() => {
    const fetchDormitories = async () => {
      try {
        const responseData = await apiClient.get('moderator/dormitory');
        if (responseData.data.isSuccess) {
          setDormitoryList(responseData.data?.value);
        } else {
          console.log(responseData.data.error.message);
        }
      } catch (error: any) {
        console.log('>>> error', error);
      }
    };
    fetchDormitories();
  }, []);

  useEffect(() => {
    refetch();
  }, [isRefetch]);

  const statusFilterOptions = [{ key: 0, desc: 'Tất cả' }].concat(
    ACCOUNT_STATUS.map((item) => ({ key: item.key, desc: item.desc })),
  );

  const dormitoryFilterOptions = [{ key: 0, desc: 'Tất cả' }].concat(
    dormitoryList.map((item) => ({ key: item.id, desc: item.name })),
  );

  const statusFilter = {
    label: 'Trạng thái',
    mappingField: 'status',
    selectionMode: 1,
    options: statusFilterOptions,
    selectedValues: statuses,
    handleFunc: (values: Selection) => {
      const value = Array.from(values).map((val) => parseInt(val.toString()))[0];
      setStatuses(values);
      setQuery((prevQuery) => ({ ...prevQuery, status: value, ...range }));
    },
  } as TableCustomFilter;

  const dormitoryFilter = {
    label: 'Tòa ký túc xá',
    mappingField: 'status',
    selectionMode: 1,
    options: dormitoryFilterOptions,
    selectedValues: dormitories,
    handleFunc: (values: Selection) => {
      const value = Array.from(values).map((val) => parseInt(val.toString()))[0];
      setDormitories(values);
      setQuery({ ...query, dormitoryId: value, ...range });
    },
  } as TableCustomFilter;

  useEffect(() => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      pageIndex: 1,
      ...range,
    }));
  }, [statuses, range]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setReason(event.target.value);
  };

  const handleBan = async (id: number, onClose: () => void) => {
    if (!reason) {
      setError('Vui lòng nhập lý do');
      return;
    }
    try {
      const payload = {
        id,
        status: 3,
        isConfirm: false,
        reason,
      };
      const responseData = await apiClient.put('moderator/customer/status', payload);
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
            const responseData = await apiClient.put('moderator/customer/status', {
              ...payload,
              isConfirm: true,
            });
            if (responseData.data.isSuccess) {
              toast('success', 'Cấm tài khoản thành công');
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
        console.log(responseData.data);
      }
    } catch (error: any) {
      toast('error', error.response.data.error.message);
    } finally {
      onClose();
    }
  };

  const handleUnBan = async (id: number, onClose: () => void) => {
    if (!reason) {
      setError('Vui lòng nhập lý do');
      return;
    }
    try {
      const payload = {
        id,
        status: 2,
        isConfirm: true,
        reason,
      };
      onClose();
      const responseData = await apiClient.put('moderator/customer/status', payload);
      if (responseData.data.isSuccess) {
        toast('success', 'Bỏ cấm tài khoản thành công');
        setIsRefetch();
      } else {
        console.log(responseData.data);
      }
    } catch (error: any) {
      console.log(error.response.data.error?.message);
    }
  };

  const openAccountDetail = (accountId: number) => {
    router.push(`/accounts/${accountId}`);
  };

  const renderCell = useCallback((account: AccountModel, columnKey: React.Key): ReactNode => {
    switch (columnKey) {
      case 'id':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">MS-{account.id}</p>
          </div>
        );
      case 'fullName':
        return (
          <User
            avatarProps={{ radius: 'full', src: account.avatarUrl }}
            name={account.fullName || 'Chưa cung cấp'}
            className="flex justify-start font-semibold"
          />
        );
      case 'email':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{account.email}</p>
          </div>
        );
      case 'phoneNumber':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{formatPhoneNumber(account.phoneNumber)}</p>
          </div>
        );
      case 'totalOrderInProcess':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{formatNumber(account.totalOrderInProcess)}</p>
          </div>
        );
      case 'status':
        return (
          <Chip
            className={`capitalize ${
              account.status === 1
                ? 'bg-green-200 text-green-600'
                : account.status === 2
                  ? 'bg-purple-200 text-purple-600'
                  : 'bg-red-200 text-rose-600'
            }`}
            size="sm"
            variant="flat"
          >
            {ACCOUNT_STATUS.find((item) => item.key === account.status)?.desc}
          </Chip>
        );
      case 'createdDate':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{formatDate(account.createdDate)}</p>
          </div>
        );
      case 'actions':
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="md" variant="light">
                  <BsThreeDotsVertical className="text-black" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem onClick={() => openAccountDetail(account.id)}>
                  Xem chi tiết
                </DropdownItem>

                {account.status === 1 ? (
                  <DropdownItem
                    onClick={() => {
                      setAccountIdSelected(account.id);
                      onBanOpen();
                    }}
                  >
                    Cấm
                  </DropdownItem>
                ) : account.status === 2 ? (
                  <DropdownItem
                    onClick={() => {
                      setAccountIdSelected(account.id);
                      onBanOpen();
                    }}
                  >
                    Cấm
                  </DropdownItem>
                ) : (
                  <DropdownItem
                    onClick={() => {
                      setAccountIdSelected(account.id);
                      onUnBanOpen();
                    }}
                  >
                    Bỏ cấm
                  </DropdownItem>
                )}
                {account.status === 2 ? (
                  <DropdownItem
                    onClick={() => {
                      setAccountIdSelected(account.id);
                      onUnBanOpen();
                    }}
                  >
                    Bỏ cấm
                  </DropdownItem>
                ) : (
                  <DropdownItem className="hidden" />
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        break;
    }
  }, []);

  return (
    <div>
      <TableCustom
        indexPage={3}
        title="Quản lý người dùng"
        placeHolderSearch="Tìm kiếm người dùng..."
        description="người dùng"
        columns={ACCOUNT_COLUMNS}
        total={accounts?.value.totalCount ?? 0}
        arrayData={accounts?.value?.items ?? []}
        searchHandler={(value: string) => {
          const updatedValue = value.toLocaleLowerCase().startsWith('ms-') ? value.slice(3) : value;
          setQuery({ ...query, searchValue: updatedValue });
        }}
        pagination={accounts?.value as PageableModel}
        goToPage={(index: number) => setQuery({ ...query, pageIndex: index })}
        setPageSize={(size: number) => setQuery({ ...query, pageSize: size })}
        selectionMode="single"
        filters={[statusFilter, dormitoryFilter]}
        renderCell={renderCell}
        handleRowClick={openAccountDetail}
      />

      {/* ban */}
      <Modal
        isOpen={isBanOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setReason('');
          }
          onBanOpenChange();
        }}
        placement="top-center"
        isDismissable={false}
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <React.Fragment>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Lý do cấm tài khoản
              </ModalHeader>
              <ModalBody>
                <Textarea
                  size="lg"
                  placeholder="Nhập lý do cấm tài khoản này"
                  variant="faded"
                  value={reason}
                  onChange={handleInputChange}
                />
                {error && <p className="text-sm text-danger-500">{error}</p>}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onClick={() => {
                    onClose();
                    setError('');
                  }}
                >
                  Đóng
                </Button>
                <Button color="primary" onClick={() => handleBan(accountIdSelected, onClose)}>
                  Xác nhận
                </Button>
              </ModalFooter>
            </React.Fragment>
          )}
        </ModalContent>
      </Modal>

      {/* unban */}
      <Modal
        isOpen={isUnBanOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setReason('');
          }
          onUnBanOpenChange();
        }}
        placement="top-center"
        isDismissable={false}
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <React.Fragment>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Lý do bỏ cấm tài khoản
              </ModalHeader>
              <ModalBody>
                <Textarea
                  size="lg"
                  placeholder="Nhập lý do bỏ cấm tài khoản này"
                  variant="faded"
                  value={reason}
                  onChange={handleInputChange}
                />
                {error && <p className="text-sm text-danger-500">{error}</p>}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onClick={() => {
                    onClose();
                    setError('');
                  }}
                >
                  Đóng
                </Button>
                <Button color="primary" onClick={() => handleUnBan(accountIdSelected, onClose)}>
                  Xác nhận
                </Button>
              </ModalFooter>
            </React.Fragment>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

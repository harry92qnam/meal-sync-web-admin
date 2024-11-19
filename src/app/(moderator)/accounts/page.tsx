'use client';
import TableCustom, { TableCustomFilter } from '@/components/common/TableCustom';
import { ACCOUNT_COLUMNS, ACCOUNT_STATUS, ORDER_STATUS } from '@/data/constants/constants';
import { sampleAccounts } from '@/data/TestData';
import usePeriodTimeFilterState from '@/hooks/states/usePeriodTimeFilterQuery';
import apiClient from '@/services/api-services/api-client';
import AccountModel from '@/types/models/AccountModel';
import PageableModel from '@/types/models/PageableModel';
import AccountQuery from '@/types/queries/AccountQuery';
import { formatDate, formatPhoneNumber, toast } from '@/utils/MyUtils';
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Selection,
  useDisclosure,
  User,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useCallback, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

export default function Orders() {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { range } = usePeriodTimeFilterState();

  const [statuses, setStatuses] = useState<Selection>(new Set(['0']));
  const [accountIdSelected, setAccountIdSelected] = useState<number>(0);
  const [reason, setReason] = useState('');
  const [isBanned, setIsBanned] = useState(false);
  const [error, setError] = useState('');

  const [query, setQuery] = useState<AccountQuery>({
    title: '',
    description: '',
    status: 0,
    dateFrom: range.dateFrom,
    dateTo: range.dateTo,
    pageIndex: 1,
    pageSize: 10,
  } as AccountQuery);

  const accounts = sampleAccounts.value.items;
  // const { data: accounts } = useFetchWithRQ<AccountModel, AccountQuery>(
  //   REACT_QUERY_CACHE_KEYS.ACCOUNTS,
  //   accountApiService,
  //   query,
  // );

  const statusFilterOptions = [{ key: 0, desc: 'Tất cả' }].concat(
    ORDER_STATUS.map((item) => ({ key: item.key, desc: item.desc })),
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
      setQuery({ ...query, status: value, ...range });
    },
  } as TableCustomFilter;

  const handleClick = (accountId: number) => {
    router.push(`/accounts/account-details?accountId=${accountId}`);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setReason(event.target.value);
  };

  const handleBan = async (accountId: number, onClose: () => void) => {
    if (!reason) {
      setError('Vui lòng nhập lý do');
      return;
    }
    try {
      const payload = {
        accountId,
        reason,
      };
      const responseData = await apiClient.put('admin/account/ban', payload);
      if (responseData.data.isSuccess) {
        toast('success', responseData.data.value);
        onClose();
      } else {
        throw new Error(responseData.data.error.message);
      }
    } catch (error) {
      toast('error', (error as any).response.data.error?.message);
    }
  };

  const handleUnban = async (accountId: number, onClose: () => void) => {
    if (!reason) {
      setError('Vui lòng nhập lý do');
      return;
    }
    try {
      const payload = {
        accountId,
        reason,
      };
      const responseData = await apiClient.put('admin/account/unban', payload);
      if (responseData.data.isSuccess) {
        toast('success', responseData.data.value);
        onClose();
      } else {
        throw new Error(responseData.data.error.message);
      }
    } catch (error) {
      toast('error', (error as any).response.data.error?.message);
    }
  };

  const openAccountDetail = (id: number) => {
    const account = accounts.find((item) => item.id === id);
    if (!account) {
      router.push('/');
    }
    router.push('accounts/account-detail');
  };

  const renderCell = useCallback((account: AccountModel, columnKey: React.Key): ReactNode => {
    switch (columnKey) {
      case 'id':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{account.id}</p>
          </div>
        );
      case 'fullName':
        return (
          <User
            avatarProps={{ radius: 'full', src: account.avatarUrl }}
            name={account.fullName}
            className="flex justify-start font-semibold"
          >
            {account.fullName}
          </User>
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
      case 'roleName':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{account.roleName}</p>
          </div>
        );
      case 'status':
        return (
          <Chip
            className={`capitalize ${
              account.status === 1
                ? 'bg-gray-200 text-gray-600'
                : account.status === 2
                  ? 'bg-green-200 text-green-600'
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
              {account.status === 1 ? (
                <DropdownMenu>
                  <DropdownItem onClick={() => handleClick(account.id)}>Xem chi tiết</DropdownItem>
                </DropdownMenu>
              ) : (
                <DropdownMenu>
                  <DropdownItem onClick={() => handleClick(account.id)}>Xem chi tiết</DropdownItem>
                  {account.status === 3 ? (
                    <DropdownItem
                      onClick={() => {
                        setAccountIdSelected(account.id);
                        setIsBanned(true);
                        onOpen();
                      }}
                    >
                      Bỏ cấm
                    </DropdownItem>
                  ) : (
                    <DropdownItem
                      onClick={() => {
                        setAccountIdSelected(account.id);
                        setIsBanned(false);
                        onOpen();
                      }}
                    >
                      Cấm
                    </DropdownItem>
                  )}
                </DropdownMenu>
              )}
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
        title="Quản lý tài khoản"
        placeHolderSearch="Tìm kiếm tài khoản..."
        description="tài khoản"
        columns={ACCOUNT_COLUMNS}
        total={20}
        // arrayData={accounts?.value?.items ?? []}
        arrayData={accounts}
        searchHandler={(value: string) => {
          setQuery({ ...query, title: value });
        }}
        pagination={sampleAccounts.value as PageableModel}
        goToPage={(index: number) => setQuery({ ...query, pageIndex: index })}
        setPageSize={(size: number) => setQuery({ ...query, pageSize: size })}
        selectionMode="single"
        filters={[statusFilter]}
        renderCell={renderCell}
        handleRowClick={openAccountDetail}
      />

      <Modal
        isOpen={isOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setReason('');
          }
          onOpenChange();
        }}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <React.Fragment>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Vui lòng nhập lý do
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  placeholder="Nhập lý do"
                  variant="bordered"
                  value={reason}
                  onChange={handleInputChange}
                />
                {error && <p className="text-sm text-danger-500">{error}</p>}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={onClose}>
                  Đóng
                </Button>
                <Button
                  color="primary"
                  onClick={() =>
                    isBanned === true
                      ? handleBan(accountIdSelected, onClose)
                      : handleUnban(accountIdSelected, onClose)
                  }
                >
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

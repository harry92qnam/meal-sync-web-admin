'use client';
import TableCustom, { TableCustomFilter } from '@/components/common/TableCustom';
import WithdrawDetailModal from '@/components/withdrawals/WithdrawDetailModal';
import { DORMITORY, WITHDRAWAL_COLUMNS, WITHDRAWAL_STATUS } from '@/data/constants/constants';
import REACT_QUERY_CACHE_KEYS from '@/data/constants/react-query-cache-keys';
import useFetchWithRQWithFetchFunc from '@/hooks/fetching/useFetchWithRQWithFetchFunc';
import usePeriodTimeFilterState from '@/hooks/states/usePeriodTimeFilterQuery';
import useRefetch from '@/hooks/states/useRefetch';
import apiClient from '@/services/api-services/api-client';
import { endpoints } from '@/services/api-services/api-service-instances';
import sessionService from '@/services/session-service';
import { DormitoryModel } from '@/types/models/DormitoryModel';
import PageableModel from '@/types/models/PageableModel';
import WithdrawalModel from '@/types/models/WithdrawalModel';
import WithdrawalQuery from '@/types/queries/WithdrawalQuery';
import FetchResponse from '@/types/responses/FetchResponse';
import {
  formatCurrency,
  formatTimeToSeconds,
  numberFormatUtilService,
  toast,
} from '@/utils/MyUtils';
import { Chip, Selection, useDisclosure } from '@nextui-org/react';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function Withdrawals() {
  const { range } = usePeriodTimeFilterState();
  const [statuses, setStatuses] = useState<Selection>(new Set(['0']));
  const [dormitories, setDormitories] = useState<Selection>(new Set(['0']));
  const [selectedId, setSelectedId] = useState<number>(0);
  const { isRefetch } = useRefetch();
  const [dormitoryList, setDormitoryList] = useState<DormitoryModel[]>([]);

  const [query, setQuery] = useState<WithdrawalQuery>({
    searchValue: '',
    // dormitoryId: 0,
    status: 0,
    pageIndex: 1,
    pageSize: 10,
    dateFrom: range.dateFrom,
    dateTo: range.dateTo,
  } as WithdrawalQuery);

  const {
    isOpen: isDetailOpen,
    onOpen: onDetailOpen,
    onOpenChange: onDetailOpenChange,
    onClose: onDetailClose,
  } = useDisclosure();

  const { data: withdrawalRequests, refetch } = useFetchWithRQWithFetchFunc(
    REACT_QUERY_CACHE_KEYS.WITHDRAWALS,
    (): Promise<FetchResponse<WithdrawalModel>> =>
      apiClient
        .get<FetchResponse<WithdrawalModel>>(endpoints.WITHDRAWALS, {
          headers: {
            Authorization: `Bearer ${sessionService.getAuthToken()}`,
          },
          params: { ...query },
        })
        .then((response) => response.data),
    [query],
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
    setQuery((prevQuery) => ({
      ...prevQuery,
      dateFrom: range.dateFrom,
      dateTo: range.dateTo,
    }));
  }, [range, statuses]);

  useEffect(() => {
    refetch();
  }, [isRefetch]);

  const statusFilterOptions = [{ key: 0, desc: 'Tất cả' }].concat(
    WITHDRAWAL_STATUS.map((item) => ({ key: item.key, desc: item.desc })),
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
      setQuery({ ...query, status: value, ...range });
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

  const openWithdrawalDetail = (id: number) => {
    const rq = withdrawalRequests?.value?.items?.find((item) => item.id === id);
    if (rq) {
      onDetailOpen();
      setSelectedId(id);
    } else {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Không tìm thấy yêu cầu #' + numberFormatUtilService.hashId(id),
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const renderCell = useCallback((withdrawal: WithdrawalModel, columnKey: React.Key): ReactNode => {
    switch (columnKey) {
      case 'id':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">MS-{withdrawal.id}</p>
          </div>
        );
      case 'shopName':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{withdrawal.shopName}</p>
          </div>
        );
      case 'requestAmount':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {formatCurrency(withdrawal.requestAmount)}
            </p>
          </div>
        );
      case 'availableAmount':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {formatCurrency(withdrawal.availableAmount)}
            </p>
          </div>
        );
      case 'bankShortName':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{withdrawal.bankShortName}</p>
          </div>
        );
      case 'bankAccountNumber':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{withdrawal.bankAccountNumber}</p>
          </div>
        );
      case 'status':
        return (
          <Chip
            className={`capitalize ${
              withdrawal.status === 1
                ? 'bg-gray-200 text-gray-600'
                : withdrawal.status === 3
                  ? 'bg-yellow-200 text-yellow-600'
                  : withdrawal.status === 4
                    ? 'bg-green-200 text-green-600'
                    : 'bg-red-200 text-rose-600'
            }`}
            size="sm"
            variant="flat"
          >
            {WITHDRAWAL_STATUS.find((item) => item.key == withdrawal.status)?.desc}
          </Chip>
        );
      case 'createdDate':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{formatTimeToSeconds(withdrawal.createdDate)}</p>
          </div>
        );
      default:
        break;
    }
  }, []);

  return (
    <div>
      <TableCustom
        indexPage={1}
        title="Yêu cầu rút tiền"
        placeHolderSearch="Tìm kiếm yêu cầu..."
        description="yêu cầu"
        columns={WITHDRAWAL_COLUMNS}
        total={withdrawalRequests?.value.totalCount ?? 0}
        arrayData={withdrawalRequests?.value?.items ?? []}
        searchHandler={(value: string) => {
          const updatedValue = value.toLocaleLowerCase().startsWith('ms-') ? value.slice(3) : value;
          setQuery({ ...query, searchValue: updatedValue });
        }}
        pagination={withdrawalRequests?.value as PageableModel}
        goToPage={(index: number) => setQuery({ ...query, pageIndex: index })}
        setPageSize={(size: number) => setQuery({ ...query, pageSize: size })}
        selectionMode="single"
        filters={[statusFilter, dormitoryFilter]}
        renderCell={renderCell}
        handleRowClick={openWithdrawalDetail}
      />

      <WithdrawDetailModal
        isOpen={isDetailOpen}
        onOpen={onDetailOpen}
        onOpenChange={onDetailOpenChange}
        onClose={onDetailClose}
        id={selectedId}
      />
    </div>
  );
}

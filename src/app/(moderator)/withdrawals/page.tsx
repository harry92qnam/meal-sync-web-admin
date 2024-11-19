'use client';
import TableCustom, { TableCustomFilter } from '@/components/common/TableCustom';
import WithdrawDetailModal from '@/components/withdrawals/WithdrawDetailModal';
import { WITHDRAWAL_COLUMNS, WITHDRAWAL_STATUS } from '@/data/constants/constants';
import REACT_QUERY_CACHE_KEYS from '@/data/constants/react-query-cache-keys';
import { sampleWithdrawalRequests } from '@/data/TestData';
import useFetchWithRQWithFetchFunc from '@/hooks/fetching/useFetchWithRQWithFetchFunc';
import usePeriodTimeFilterState from '@/hooks/states/usePeriodTimeFilterQuery';
import useWithdrawTargetState from '@/hooks/states/useWithdrawTargetState';
import apiClient from '@/services/api-services/api-client';
import { endpoints } from '@/services/api-services/api-service-instances';
import sessionService from '@/services/session-service';
import PageableModel from '@/types/models/PageableModel';
import WithdrawalModel from '@/types/models/WithdrawalModel';
import WithdrawalQuery from '@/types/queries/WithdrawalQuery';
import APICommonResponse from '@/types/responses/APICommonResponse';
import FetchResponse from '@/types/responses/FetchResponse';
import { formatCurrency, formatTimeToSeconds, numberFormatUtilService } from '@/utils/MyUtils';
import { Chip, Selection, useDisclosure } from '@nextui-org/react';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function Withdrawals() {
  const { range } = usePeriodTimeFilterState();
  const [statuses, setStatuses] = useState<Selection>(new Set(['0']));
  const [withdrawList, setWithdrawList] = useState<WithdrawalModel[]>([]);
  const { model: selectedWithdraw, setModel: setSelectedWithdraw } = useWithdrawTargetState();

  const [query, setQuery] = useState<WithdrawalQuery>({
    pageIndex: 1,
    pageSize: 10,
    status: 0,
    dateFrom: range.dateFrom,
    dateTo: range.dateTo,
    shopId: 0,
    shopName: '',
    orderBy: 0,
    orderMode: 0,
  } as WithdrawalQuery);

  const {
    isOpen: isDetailOpen,
    onOpen: onDetailOpen,
    onOpenChange: onDetailOpenChange,
    onClose: onDetailClose,
  } = useDisclosure();

  const withdrawalRequests = sampleWithdrawalRequests.value.items;
  // const {
  //   data: withdrawalRequests,
  //   refetch,
  // } = useFetchWithRQWithFetchFunc(
  //   REACT_QUERY_CACHE_KEYS.WITHDRAWALS,
  //   (): Promise<FetchResponse<WithdrawalModel>> =>
  //     apiClient
  //       .get<FetchResponse<WithdrawalModel>>(endpoints.WITHDRAWALS, {
  //         headers: {
  //           Authorization: `Bearer ${sessionService.getAuthToken()}`,
  //         },
  //         params: { ...query },
  //       })
  //       .then((response) => response.data),
  //   [query],
  // );

  useEffect(() => {
    if (withdrawalRequests)
      setWithdrawList(
        withdrawalRequests.map((item) => ({ ...item, id: item.requestId }) as WithdrawalModel),
      );
  }, [withdrawalRequests]);

  useEffect(() => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      dateFrom: range.dateFrom,
      dateTo: range.dateTo,
    }));
  }, [range]);

  const statusFilterOptions = [{ key: 0, desc: 'Tất cả' }].concat(
    WITHDRAWAL_STATUS.map((item) => ({ key: item.key, desc: item.desc })),
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

  const openWithdrawalDetail = (id: number) => {
    const rq = withdrawalRequests.find((item) => item.id === id);
    if (rq) {
      setSelectedWithdraw(rq);
      onDetailOpen();
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

  const handleApprove = async (withdraw: WithdrawalModel) => {
    await apiClient
      .put<APICommonResponse>(`admin/shop/${withdraw.shopId}/withdrawal/approve`, {
        shopId: withdraw.shopId,
        requestId: withdraw.requestId,
      })
      .then(async (response) => {
        if (response.data.isSuccess) {
          await Swal.fire('Thành công!', 'Yêu cầu đã được phê duyệt.', 'success');
          // refetch();
        } else {
          await Swal.fire('Thất bại!', 'Đã xảy ra lỗi khi phê duyệt yêu cầu.', 'error');
          onDetailOpen();
        }
      })
      .catch(async (error) => {
        await Swal.fire('Thất bại!', 'Đã xảy ra lỗi khi phê duyệt yêu cầu.', error);
        onDetailOpen();
      });
  };

  const handleReject = async (withdraw: WithdrawalModel) => {
    onDetailOpen();
    const { value: reason } = await Swal.fire({
      title: 'Từ chối yêu cầu #' + withdraw.id,
      input: 'textarea',
      inputPlaceholder: 'Nhập lý do từ chối tại đây...',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      confirmButtonColor: 'rgb(23, 201, 100)',
      cancelButtonText: 'Hủy',
      cancelButtonColor: 'rgba(243, 18, 96)',
      inputValidator: (value) => {
        if (!value) {
          return 'Bạn cần nhập lý do!';
        }
      },
    });

    if (reason) {
      await apiClient
        .put<APICommonResponse>(`admin/shop/${withdraw.shopId}/withdrawal/reject`, {
          shopId: withdraw.shopId,
          requestId: withdraw.requestId,
          reason,
        })
        .then(async (response) => {
          if (response.data.isSuccess) {
            await Swal.fire('Thành công!', 'Yêu cầu rút tiền đã được từ chối.', 'success');
            setSelectedWithdraw({
              ...selectedWithdraw,
              status: WITHDRAWAL_STATUS[2].key,
              note: reason || '',
            });
            onDetailOpen();
            // refetch();
          } else {
            await Swal.fire('Thất bại!', 'Đã xảy ra lỗi khi từ chối yêu cầu.', 'error');
            onDetailOpen();
          }
        })
        .catch(async (error) => {
          await Swal.fire('Thất bại!', 'Đã xảy ra lỗi khi từ chối yêu cầu.', 'error');
          onDetailOpen();
        });
    }
    onDetailOpen();
  };

  const renderCell = useCallback((withdrawal: WithdrawalModel, columnKey: React.Key): ReactNode => {
    switch (columnKey) {
      case 'id':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{withdrawal.id}</p>
          </div>
        );
      case 'shopName':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{withdrawal.shopName}</p>
          </div>
        );
      case 'requestedAmount':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {formatCurrency(withdrawal.requestedAmount)}
            </p>
          </div>
        );
      case 'balance':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{formatCurrency(withdrawal.balance)}</p>
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
                : withdrawal.status === 2
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
        total={20}
        // arrayData={withdrawalRequests?.value?.items ?? []}
        arrayData={withdrawalRequests}
        searchHandler={(value: string) => {
          setQuery({ ...query, shopName: value });
        }}
        pagination={sampleWithdrawalRequests.value as PageableModel}
        goToPage={(index: number) => setQuery({ ...query, pageIndex: index })}
        setPageSize={(size: number) => setQuery({ ...query, pageSize: size })}
        selectionMode="single"
        filters={[statusFilter]}
        renderCell={renderCell}
        handleRowClick={openWithdrawalDetail}
      />

      <WithdrawDetailModal
        isOpen={isDetailOpen}
        onOpen={onDetailOpen}
        onOpenChange={onDetailOpenChange}
        onClose={onDetailClose}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}

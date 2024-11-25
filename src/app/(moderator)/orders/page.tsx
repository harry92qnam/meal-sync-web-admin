'use client';
import TableCustom, { TableCustomFilter } from '@/components/common/TableCustom';
import { ORDER_COLUMNS, ORDER_STATUS } from '@/data/constants/constants';
import REACT_QUERY_CACHE_KEYS from '@/data/constants/react-query-cache-keys';
import useFetchWithRQ from '@/hooks/fetching/useFetchWithRQ';
import usePeriodTimeFilterState from '@/hooks/states/usePeriodTimeFilterQuery';
import useRefetch from '@/hooks/states/useRefetch';
import apiClient from '@/services/api-services/api-client';
import { orderApiService } from '@/services/api-services/api-service-instances';
import { DormitoryModel } from '@/types/models/DormitoryModel';
import OrderModel from '@/types/models/OrderModel';
import PageableModel from '@/types/models/PageableModel';
import OrderQuery from '@/types/queries/OrderQuery';
import { formatCurrency, formatDate, formatPhoneNumber } from '@/utils/MyUtils';
import { Chip, Selection } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { ReactNode, useCallback, useEffect, useState } from 'react';

export default function Orders() {
  const router = useRouter();
  const { isRefetch, setIsRefetch } = useRefetch();
  const { range } = usePeriodTimeFilterState();
  const [statuses, setStatuses] = useState<Selection>(new Set(['0']));
  const [dormitories, setDormitories] = useState<Selection>(new Set(['0']));
  const [dormitoryList, setDormitoryList] = useState<DormitoryModel[]>([]);

  const [query, setQuery] = useState<OrderQuery>({
    searchValue: '',
    statusMode: 0,
    dormitoryMode: 0,
    dateFrom: range.dateFrom,
    dateTo: range.dateTo,
    pageIndex: 1,
    pageSize: 10,
  } as OrderQuery);

  const [customQuery, setCustomQuery] = useState<any>({});

  useEffect(() => {
    const { dateFrom, dateTo, ...rest } = query;
    setCustomQuery({
      ...rest,
      dateFrom: dateFrom.toISOString().split('T')[0],
      dateTo: dateTo.toISOString().split('T')[0],
    });
  }, [query]);

  const { data: orders, refetch } = useFetchWithRQ<OrderModel, OrderQuery>(
    REACT_QUERY_CACHE_KEYS.ORDERS,
    orderApiService,
    customQuery,
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
    setQuery(
      (prevQuery) =>
        ({
          ...prevQuery,
          ...range,
        }) as OrderQuery,
    );
  }, [range]);

  useEffect(() => {
    refetch();
  }, [isRefetch]);

  const statusFilterOptions = [{ key: 0, desc: 'Tất cả' }].concat(
    ORDER_STATUS.map((item) => ({ key: item.key, desc: item.desc })),
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
      setQuery({ ...query, statusMode: value, ...range });
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
      setQuery({ ...query, dormitoryMode: value, ...range });
    },
  } as TableCustomFilter;

  const openOrderDetail = (id: number) => {
    router.push(`orders/${id}`);
  };

  const renderCell = useCallback((order: OrderModel, columnKey: React.Key): ReactNode => {
    switch (columnKey) {
      case 'id':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">MS-{order.id}</p>
          </div>
        );
      case 'shopName':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{order.shop.shopName}</p>
          </div>
        );
      case 'customerName':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{order?.fullName}</p>
          </div>
        );
      case 'phoneNumber':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {formatPhoneNumber(order?.phoneNumber)}
            </p>
          </div>
        );
      case 'status':
        return (
          <Chip
            className={`capitalize ${
              order.status === 7 || order.status === 8 || order.status === 9 || order.status === 12
                ? 'bg-green-200 text-green-600'
                : order.status === 1 ||
                    order.status === 3 ||
                    order.status === 5 ||
                    order.status === 6
                  ? 'bg-yellow-200 text-yellow-600'
                  : order.status === 10 || order.status === 11
                    ? 'bg-purple-200 text-purple-600'
                    : 'bg-red-200 text-rose-600'
            }`}
            size="sm"
            variant="flat"
          >
            {order.status === 7 || order.status === 8 || order.status === 9 || order.status === 12
              ? 'Đã hoàn thành'
              : order.status === 1 || order.status === 3 || order.status === 5 || order.status === 6
                ? 'Đang thực hiện'
                : order.status === 10 || order.status === 11
                  ? 'Đang có báo cáo'
                  : 'Đã hủy'}
          </Chip>
        );
      case 'totalPrice':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{formatCurrency(order.totalPrice)}</p>
          </div>
        );
      case 'intendedReceiveDate':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{formatDate(order.intendedReceiveDate)}</p>
          </div>
        );
      default:
        break;
    }
  }, []);

  return (
    <div>
      <TableCustom
        indexPage={4}
        title="Quản lý đơn hàng"
        placeHolderSearch="Tìm kiếm đơn hàng..."
        description="đơn hàng"
        columns={ORDER_COLUMNS}
        total={orders?.value.totalCount ?? 0}
        arrayData={orders?.value?.items ?? []}
        searchHandler={(value: string) => {
          const updatedValue = value.toLocaleLowerCase().startsWith('ms-') ? value.slice(3) : value;
          setQuery({ ...query, searchValue: updatedValue });
        }}
        pagination={orders?.value as PageableModel}
        isHaveDateFilter={false}
        goToPage={(index: number) => setQuery({ ...query, pageIndex: index })}
        setPageSize={(size: number) => setQuery({ ...query, pageSize: size })}
        selectionMode="single"
        filters={[statusFilter, dormitoryFilter]}
        renderCell={renderCell}
        handleRowClick={openOrderDetail}
      />
    </div>
  );
}

'use client';
import TableCustom, { TableCustomFilter } from '@/components/common/TableCustom';
import { REPORT_COLUMNS, REPORT_STATUS } from '@/data/constants/constants';
import REACT_QUERY_CACHE_KEYS from '@/data/constants/react-query-cache-keys';
import useFetchWithRQ from '@/hooks/fetching/useFetchWithRQ';
import usePeriodTimeFilterState from '@/hooks/states/usePeriodTimeFilterQuery';
import useRefetch from '@/hooks/states/useRefetch';
import apiClient from '@/services/api-services/api-client';
import { reportApiService } from '@/services/api-services/api-service-instances';
import { DormitoryModel } from '@/types/models/DormitoryModel';
import PageableModel from '@/types/models/PageableModel';
import ReportModel from '@/types/models/ReportModel';
import ReportQuery from '@/types/queries/ReportQuery';
import { formatTimeToSeconds } from '@/utils/MyUtils';
import { Chip, Selection } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { ReactNode, useCallback, useEffect, useState } from 'react';

export default function Orders() {
  const router = useRouter();
  const { range } = usePeriodTimeFilterState();
  const { isRefetch } = useRefetch();

  const [statuses, setStatuses] = useState<Selection>(new Set(['0']));
  const [dormitories, setDormitories] = useState<Selection>(new Set(['0']));
  const [dormitoryList, setDormitoryList] = useState<DormitoryModel[]>([]);

  const [query, setQuery] = useState<ReportQuery>({
    searchValue: '',
    status: 0,
    dormitoryId: 0,
    dateFrom: range.dateFrom,
    dateTo: range.dateTo,
    pageIndex: 1,
    pageSize: 10,
  } as ReportQuery);

  const { data: reports, refetch } = useFetchWithRQ<ReportModel, ReportQuery>(
    REACT_QUERY_CACHE_KEYS.REPORTS,
    reportApiService,
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

  const statusFilterOptions = [{ key: 0, desc: 'Khả dụng' }].concat(
    REPORT_STATUS.map((item) => ({ key: item.key, desc: item.desc })),
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

  useEffect(() => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      pageIndex: 1,
      ...range,
    }));
  }, [statuses, range]);

  const openReportDetail = (id: number) => {
    router.push(`reports/${id}`);
  };

  const renderCell = useCallback((report: ReportModel, columnKey: React.Key): ReactNode => {
    switch (columnKey) {
      case 'id':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">RP-{report.id}</p>
          </div>
        );
      case 'orderId':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">MS-{report.orderId}</p>
          </div>
        );
      case 'shopName':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">MS-{report.shopName}</p>
          </div>
        );
      case 'customerName':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{report.customerName}</p>
          </div>
        );
      case 'title':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{report.title}</p>
          </div>
        );
      case 'content':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{report.content}</p>
          </div>
        );
      case 'status':
        return (
          <Chip
            className={`capitalize ${
              report.status === 1 && !report.isAllowAction
                ? 'bg-gray-200 text-gray-600'
                : report.status === 1 && report.isAllowAction && !report.isUnderReview
                  ? 'bg-cyan-200 text-cyan-600'
                  : report.status === 1 && report.isAllowAction && report.isUnderReview
                    ? 'bg-yellow-200 text-yellow-600'
                    : report.status === 2
                      ? 'bg-green-200 text-green-600'
                      : 'bg-red-200 text-rose-600'
            }`}
            size="sm"
            variant="flat"
          >
            {report.status === 1 && report.isAllowAction && !report.isUnderReview
              ? 'Chờ xử lý'
              : report.status === 1 && !report.isAllowAction
                ? 'Chưa thể xử lý'
                : report.status === 1 && report.isAllowAction && report.isUnderReview
                  ? 'Đang xử lý'
                  : report.status === 2
                    ? 'Đã phê duyệt'
                    : 'Đã từ chối'}
          </Chip>
        );
      case 'createdDate':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{formatTimeToSeconds(report.createdDate)}</p>
          </div>
        );
      default:
        break;
    }
  }, []);

  return (
    <div>
      <TableCustom
        indexPage={0}
        title="Quản lý báo cáo"
        placeHolderSearch="Tìm kiếm báo cáo..."
        description="báo cáo"
        columns={REPORT_COLUMNS}
        total={reports?.value?.totalCount ?? 0}
        arrayData={reports?.value?.items ?? []}
        searchHandler={(value: string) => {
          const updatedValue =
            value.toLocaleLowerCase().startsWith('ms-') ||
            value.toLocaleLowerCase().startsWith('rp-')
              ? value.slice(3)
              : value;
          setQuery({ ...query, searchValue: updatedValue });
        }}
        pagination={reports?.value as PageableModel}
        goToPage={(index: number) => setQuery({ ...query, pageIndex: index })}
        setPageSize={(size: number) => setQuery({ ...query, pageSize: size })}
        selectionMode="single"
        filters={[statusFilter, dormitoryFilter]}
        renderCell={renderCell}
        handleRowClick={openReportDetail}
      />
    </div>
  );
}

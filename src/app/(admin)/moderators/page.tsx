'use client';
import usePeriodTimeFilterState from '@/hooks/states/usePeriodTimeFilterQuery';
import PageableModel from '@/types/models/PageableModel';
import { Avatar, Selection } from '@nextui-org/react';
import { NextPage } from 'next';
import { ReactNode, useCallback, useEffect, useState } from 'react';

import TableCustom, { TableCustomFilter } from '@/components/common/TableCustom';
import useFetchWithRQWithFetchFunc from '@/hooks/fetching/useFetchWithRQWithFetchFunc';
import apiClient from '@/services/api-services/api-client';
import {
  ModeratorModel,
  ModeratorQuery,
  moderatorQueryEmpty as emptyModeratorQuery,
} from '@/types/models/ModeratorModel';
import FetchResponse from '@/types/responses/FetchResponse';
import ModTableCustom from '@/components/common/ModTableCustom';
const columns = [
  { key: 'id', name: '#' },
  { key: 'avatarUrl', name: '' }, // Assuming you want to keep this column, you can add a custom name if needed
  { key: 'fullName', name: 'Họ và tên' },
  { key: 'email', name: 'Email' },
  { key: 'phoneNumber', name: 'Số điện thoại' },
  { key: 'status', name: 'Trạng thái' },
  { key: 'dormitories', name: 'Khu quản lí' }, // You can modify this depending on how you want to display dormitories
];
const PromotionPage: NextPage = () => {
  const { range, selected, setSelected, isSpecificTimeFilter } = usePeriodTimeFilterState();
  const [statuses, setStatuses] = useState<Selection>(new Set(['0']));

  const [query, setQuery] = useState<ModeratorQuery>({
    ...emptyModeratorQuery,
    dormitoryId: [1, 2],
    pageIndex: 1,
    pageSize: 10,
  });
  const fetcher = useFetchWithRQWithFetchFunc(
    ['admin/moderator'],
    async (): Promise<FetchResponse<ModeratorModel>> =>
      apiClient
        .get('admin/moderator', {
          params: {
            ...query,
          },
        })
        .then((response) => response.data),
    [query],
  );

  useEffect(() => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      dateFrom: range.dateFrom,
      dateTo: range.dateTo,
    }));
  }, [range]);

  const statusFilterOptions = [{ key: 0, desc: 'Tất cả' }]
    .concat
    // moderatorStatuses.map((item) => ({ key: item.key, desc: item.label })),
    ();

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
      console.log('Filter selected status: ', value);
    },
  } as TableCustomFilter;

  const dormitoryList = [
    { id: 1, name: 'Ký túc xá khu A' },
    { id: 2, name: 'Ký túc xá khu B' },
  ];
  const dormitoryFilterOptions = [{ key: 0, desc: 'Tất cả' }].concat(
    dormitoryList.map((item) => ({ key: item.id, desc: item.name })),
  );

  const renderCell = useCallback((moderator: ModeratorModel, columnKey: React.Key): ReactNode => {
    const cellValue = moderator[columnKey as keyof ModeratorModel];

    switch (columnKey) {
      case 'id':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">MOD-{moderator.id}</p>
          </div>
        );
      case 'avatarUrl':
        return (
          <div className="flex flex-col">
            <Avatar src={moderator.avatarUrl} />
          </div>
        );
      case 'dormitories':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">
              {moderator.dormitories.map((item) => (item.id == 1 ? 'Khu A' : 'Khu B')).join(', ')}
            </p>
          </div>
        );
      default:
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{cellValue && cellValue.toString()}</p>
          </div>
        );
    }
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <ModTableCustom
        indexPage={1}
        title="Quản lý điều phối viên"
        isHaveDateFilter={false}
        placeHolderSearch="Tìm kiếm..."
        description="điều phối viên"
        selectedDormIds={query.dormitoryId}
        setSelectedDormIds={(ids) => setQuery({ ...query, dormitoryId: ids })}
        columns={columns}
        total={fetcher.data?.value.totalCount ?? 0}
        arrayData={fetcher.data?.value?.items ?? []}
        searchHandler={(value: string) => {
          setQuery({ ...query, searchValue: value.trim().toLowerCase() });
        }}
        pagination={fetcher.data?.value as PageableModel}
        goToPage={(index: number) => setQuery({ ...query, pageIndex: index })}
        setPageSize={(size: number) => setQuery({ ...query, pageSize: size })}
        selectionMode="single"
        filters={[statusFilter]}
        renderCell={renderCell}
        handleRowClick={() => {}}
      />
    </div>
  );
};

export default PromotionPage;

'use client';
import TableCustom from '@/components/common/TableCustom';
import ContainerCreateModal from '@/components/container/ContainerCreateModal';
import ContainerUpdateModal from '@/components/container/ContainerUpdateModal';
import { CONTAINER_COLUMNS } from '@/data/constants/constants';
import REACT_QUERY_CACHE_KEYS from '@/data/constants/react-query-cache-keys';
import useFetchWithRQ from '@/hooks/fetching/useFetchWithRQ';
import useRefetch from '@/hooks/states/useRefetch';
import apiClient from '@/services/api-services/api-client';
import { containerApiService } from '@/services/api-services/api-service-instances';
import ContainerModel from '@/types/models/ContainerModel';
import PageableModel from '@/types/models/PageableModel';
import ContainerQuery from '@/types/queries/ContainerQuery';
import { formatDate, formatNumber, toast } from '@/utils/MyUtils';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from '@nextui-org/react';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

export default function Containers() {
  const { isRefetch } = useRefetch();
  const [containerDetail, setContainerDetail] = useState<ContainerModel | null>(null);
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onOpenChange: onCreateOpenChange,
  } = useDisclosure();

  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onOpenChange: onUpdateOpenChange,
  } = useDisclosure();

  const [query, setQuery] = useState<ContainerQuery>({
    searchText: '',
    pageIndex: 1,
    pageSize: 10,
  } as ContainerQuery);

  const { data: containers, refetch } = useFetchWithRQ<ContainerModel, ContainerQuery>(
    REACT_QUERY_CACHE_KEYS.CONTAINERS,
    containerApiService,
    query,
  );

  useEffect(() => {
    refetch();
  }, [isRefetch]);

  const handleAddNewContainer = () => {
    onCreateOpen();
  };

  const handleUpdate = async (id: number) => {
    try {
      const responseData = await apiClient.get(`admin/food-packing-unit/${id}`);

      if (responseData.data.isSuccess) {
        setContainerDetail(responseData.data.value);
        onUpdateOpen();
      } else {
        toast('error', responseData.data.error.message);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const renderCell = useCallback((container: ContainerModel, columnKey: React.Key): ReactNode => {
    switch (columnKey) {
      case 'id':
        return (
          <div className="flex flex-col">
            <p className="text-small">MS-{container.id}</p>
          </div>
        );
      case 'name':
        return (
          <div className="flex flex-col">
            <p className="text-small">{container.name}</p>
          </div>
        );
      case 'createdDate':
        return (
          <div className="flex flex-col">
            <p className="text-small">{formatDate(container.createdDate)}</p>
          </div>
        );
      case 'weight':
        return (
          <div className="flex flex-col">
            <p className="text-small">{formatNumber(container.weight)}</p>
          </div>
        );
      case 'numFoodLinked':
        return (
          <div className="flex flex-col">
            <p className="text-small">{formatNumber(container.numFoodLinked)}</p>
          </div>
        );
      case 'actions':
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown className="bg-background border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <BsThreeDotsVertical className="text-default-400" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem onClick={() => handleUpdate(container.id)}>Sửa vật đựng</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        break;
    }
  }, []);

  return (
    <>
      <TableCustom
        title="Quản lý vật đựng"
        indexPage={3}
        placeHolderSearch="Tìm kiếm vật đựng..."
        description="vật đựng"
        columns={CONTAINER_COLUMNS}
        arrayData={containers?.value.items ?? []}
        total={containers?.value?.totalCount ?? 0}
        searchHandler={(value: string) => {
          const updatedValue = value.toLocaleLowerCase().startsWith('ms-') ? value.slice(3) : value;
          setQuery({ ...query, searchText: updatedValue });
        }}
        pagination={containers?.value as PageableModel}
        goToPage={(index: number) => setQuery({ ...query, pageIndex: index })}
        setPageSize={(size: number) => setQuery({ ...query, pageSize: size })}
        selectionMode="single"
        isHaveDateFilter={false}
        renderCell={renderCell}
        handleAddNew={handleAddNewContainer}
      />

      <ContainerCreateModal
        isOpen={isCreateOpen}
        onOpen={onCreateOpen}
        onOpenChange={onCreateOpenChange}
      />

      <ContainerUpdateModal
        container={containerDetail}
        isOpen={isUpdateOpen}
        onOpen={onUpdateOpen}
        onOpenChange={onUpdateOpenChange}
      />
    </>
  );
}

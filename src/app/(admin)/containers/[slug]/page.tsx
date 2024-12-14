'use client';
import Header from '@/components/common/Header';
import TableCustom from '@/components/common/TableCustom';
import ContainerCreateModal from '@/components/container/ContainerCreateModal';
import MainLayout from '@/components/layout/MainLayout';
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
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

export default function ContainerDetail() {
  const { isRefetch } = useRefetch();
  const router = useRouter();
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

  const openContainerDetail = (id: number) => {
    router.push(`containers/${id}`);
  };

  useEffect(() => {
    refetch();
  }, [isRefetch]);

  const handleAddNewContainer = () => {
    onCreateOpen();
  };

  const handleUpdate = async (id: number) => {
    try {
      const responseData = await apiClient.get(`shop-owner/container/${id}`);

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
                <DropdownItem onClick={() => handleUpdate(container.id)}>Sửa danh mục</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        break;
    }
  }, []);

  return (
    <MainLayout activeContentIndex={3}>
      <div className="md:col-span-1 pb-16">
        <Header title="Chi tiết danh mục" />
      </div>
      <Breadcrumbs size="lg" className="pl-4 py-2">
        <BreadcrumbItem onClick={() => router.back()}>Quản lý danh mục</BreadcrumbItem>
        <BreadcrumbItem>Chi tiết danh mục</BreadcrumbItem>
      </Breadcrumbs>
      <div className="px-4 py-2">
        <div className="px-8 py-4 shadow-md border-small rounded-lg">
          <div className="flex flex-col mr-auto text-lg gap-2">
            {/* <div className="flex gap-2">
              <p>Tên danh mục:</p>
              <p className="font-semibold">{data?.name}</p>
            </div>
            <div className="flex gap-2">
              <p>Mô tả:</p>
              <p className="font-semibold">{data?.description}</p>
            </div>

            <Divider className="my-3" />
            <p className="text-xl font-bold">Danh sách sản phẩm liên kết:</p> */}
            {/* {!data?.foods.length ? (
              <p className="text-senary text-center">Không có sản phẩm nào đang được liên kết</p>
            ) : (
              <>
                <div className="flex font-bold">
                  <p className="w-[600px]">Tên sản phẩm</p>
                  <p className="w-[400px]">Giá bán</p>
                  <p>Hành động</p>
                </div>
                <Divider className="my-2" />
                {data?.foods.map((food) => (
                  <div key={food.id} className="flex">
                    <p className="w-[600px]">{food.name}</p>
                    <p className="w-[380px]">{formatCurrency(food.price)}</p>
                    <Button
                      className="text-white"
                      color="warning"
                      onClick={() => {
                        handleAssign(food.id);
                      }}
                    >
                      Đổi danh mục
                    </Button>
                  </div>
                ))}
              </>
            )} */}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

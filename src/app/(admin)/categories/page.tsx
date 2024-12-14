'use client';
import CategoryCreateModal from '@/components/category/CategoryCreateModal';
import CategoryUpdateModal from '@/components/category/CategoryUpdateModal';
import TableCustom from '@/components/common/TableCustom';
import { CATEGORY_COLUMNS } from '@/data/constants/constants';
import REACT_QUERY_CACHE_KEYS from '@/data/constants/react-query-cache-keys';
import useFetchWithRQ from '@/hooks/fetching/useFetchWithRQ';
import useRefetch from '@/hooks/states/useRefetch';
import apiClient from '@/services/api-services/api-client';
import { categoryApiService } from '@/services/api-services/api-service-instances';
import CategoryModel from '@/types/models/CategoryModel';
import PageableModel from '@/types/models/PageableModel';
import CategoryQuery from '@/types/queries/CategoryQuery';
import { formatDate, formatNumber, toast } from '@/utils/MyUtils';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
  User,
} from '@nextui-org/react';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

export default function Categories() {
  const { isRefetch } = useRefetch();
  const [categoryDetail, setCategoryDetail] = useState<CategoryModel | null>(null);
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

  const [query, setQuery] = useState<CategoryQuery>({
    searchValue: '',
    pageIndex: 1,
    pageSize: 10,
  } as CategoryQuery);

  const { data: categories, refetch } = useFetchWithRQ<CategoryModel, CategoryQuery>(
    REACT_QUERY_CACHE_KEYS.CATEGORIES,
    categoryApiService,
    query,
  );

  useEffect(() => {
    refetch();
  }, [isRefetch]);

  const handleAddNewCategory = () => {
    onCreateOpen();
  };

  const handleUpdate = async (id: number) => {
    try {
      const responseData = await apiClient.get(`admin/platform-category/${id}`);

      if (responseData.data.isSuccess) {
        setCategoryDetail(responseData.data.value);
        onUpdateOpen();
      } else {
        toast('error', responseData.data.error.message);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const renderCell = useCallback((category: CategoryModel, columnKey: React.Key): ReactNode => {
    switch (columnKey) {
      case 'id':
        return (
          <div className="flex flex-col">
            <p className="text-small">MS-{category.id}</p>
          </div>
        );
      case 'name':
        return (
          <User
            avatarProps={{ radius: 'full', src: category.imageUrl }}
            name={category.name}
            className="flex justify-start ml-12 gap-4"
          />
        );
      case 'createdDate':
        return (
          <div className="flex flex-col">
            <p className="text-small">{formatDate(category.createdDate)}</p>
          </div>
        );
      case 'numberFoodLinked':
        return (
          <div className="flex flex-col">
            <p className="text-small">{formatNumber(category.numberFoodLinked)}</p>
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
                <DropdownItem onClick={() => handleUpdate(category.id)}>Sửa danh mục</DropdownItem>
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
        title="Quản lý danh mục"
        indexPage={2}
        placeHolderSearch="Tìm kiếm danh mục..."
        description="danh mục"
        columns={CATEGORY_COLUMNS}
        arrayData={categories?.value.items ?? []}
        total={categories?.value?.totalCount ?? 0}
        searchHandler={(value: string) => {
          const updatedValue = value.toLocaleLowerCase().startsWith('ms-') ? value.slice(3) : value;
          setQuery({ ...query, searchValue: updatedValue });
        }}
        pagination={categories?.value as PageableModel}
        goToPage={(index: number) => setQuery({ ...query, pageIndex: index })}
        setPageSize={(size: number) => setQuery({ ...query, pageSize: size })}
        selectionMode="single"
        isHaveDateFilter={false}
        renderCell={renderCell}
        handleAddNew={handleAddNewCategory}
      />

      <CategoryCreateModal
        isOpen={isCreateOpen}
        onOpen={onCreateOpen}
        onOpenChange={onCreateOpenChange}
      />

      <CategoryUpdateModal
        category={categoryDetail}
        isOpen={isUpdateOpen}
        onOpen={onUpdateOpen}
        onOpenChange={onUpdateOpenChange}
      />
    </>
  );
}

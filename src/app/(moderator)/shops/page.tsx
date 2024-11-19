'use client';
import TableCustom, { TableCustomFilter } from '@/components/common/TableCustom';
import { SHOP_COLUMNS, SHOP_STATUS } from '@/data/constants/constants';
import { sampleShops } from '@/data/TestData';
import useIdListState from '@/hooks/states/useIdListState';
import usePeriodTimeFilterState from '@/hooks/states/usePeriodTimeFilterQuery';
import apiClient from '@/services/api-services/api-client';
import PageableModel from '@/types/models/PageableModel';
import ShopModel from '@/types/models/ShopModel';
import ShopQuery from '@/types/queries/ShopQuery';
import { formatCurrency, formatDate, formatNumber, toast } from '@/utils/MyUtils';
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

export default function Shops() {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { setShopId } = useIdListState();
  const { range } = usePeriodTimeFilterState();

  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [isReload, setIsReload] = useState(false);
  const [shopIdSelected, setShopIdSelected] = useState<number>(0);
  const [isBanned, setIsBanned] = useState(false);
  const [statuses, setStatuses] = useState<Selection>(new Set(['0']));

  const [query, setQuery] = useState<ShopQuery>({
    title: '',
    description: '',
    status: 0,
    dateFrom: range.dateFrom,
    dateTo: range.dateTo,
    pageIndex: 1,
    pageSize: 10,
  } as ShopQuery);

  const shops = sampleShops.value.items;
  // const { data: shops } = useFetchWithRQ<ShopModel,ShopQuery>(
  //   REACT_QUERY_CACHE_KEYS.SHOPS,
  //   shopApiService,
  //   query,
  // );

  const statusFilterOptions = [{ key: 0, desc: 'Tất cả' }].concat(
    SHOP_STATUS.map((item) => ({ key: item.key, desc: item.desc })),
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

  const handleClick = (shopId: number) => {
    setShopId(shopId);
    router.push(`/shops/shop-details?shopId=${shopId}`);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setReason(event.target.value);
  };

  const handleBan = async (shopId: number, onClose: () => void) => {
    if (!reason) {
      setError('Vui lòng nhập lý do');
      return;
    }
    try {
      const payload = {
        shopId,
        reason,
      };
      const responseData = await apiClient.put('admin/shop/ban', payload);
      if (responseData.data.isSuccess) {
        toast('success', responseData.data.value);
        setIsReload(!isReload);
        onClose();
      } else {
        throw new Error(responseData.data.error.message);
      }
    } catch (error) {
      toast('error', (error as any).response.data.error?.message);
    }
  };

  const handleUnban = async (shopId: number, onClose: () => void) => {
    if (!reason) {
      setError('Vui lòng nhập lý do');
      return;
    }
    try {
      const payload = {
        shopId,
        reason,
      };
      const responseData = await apiClient.put('admin/shop/unban', payload);
      if (responseData.data.isSuccess) {
        toast('success', responseData.data.value);
        setIsReload(!isReload);
        onClose();
      } else {
        throw new Error(responseData.data.error.message);
      }
    } catch (error) {
      toast('error', (error as any).response.data.error?.message);
    }
  };

  const handleApprove = async (shopId: number) => {
    try {
      const payload = {
        shopId,
      };
      const responseData = await apiClient.put('admin/shop/approve', payload);
      console.log(responseData, responseData.data?.error?.message);
      if (responseData.data.isSuccess) {
        toast('success', responseData.data.value);
        setIsReload(!isReload);
      } else {
        throw new Error(responseData.data.error.message);
      }
    } catch (error) {
      toast('error', (error as any).response.data.error?.message);
    }
  };

  const openShopDetail = (id: number) => {
    const shop = shops.find((item) => item.id === id);
    if (!shop) {
      router.push('/');
    }
    router.push('shops/shop-detail');
  };

  const renderCell = useCallback((shop: ShopModel, columnKey: React.Key): ReactNode => {
    const cellValue = shop[columnKey as keyof ShopModel];

    switch (columnKey) {
      case 'id':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{shop.id}</p>
          </div>
        );
      case 'shopName':
        return (
          <User
            avatarProps={{ radius: 'full', src: shop.logoUrl }}
            name={shop.shopName}
            className="flex justify-start font-semibold"
          >
            {shop.shopName}
          </User>
        );
      case 'shopOwnerName':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{shop.shopOwnerName}</p>
          </div>
        );
      case 'totalOrder':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small ">{formatNumber(shop.totalOrder)}</p>
          </div>
        );
      case 'totalProduct':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small ">{formatNumber(shop.totalProduct)}</p>
          </div>
        );
      case 'createdDate':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small ">{formatDate(shop.createdDate)}</p>
          </div>
        );
      case 'balance':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{formatCurrency(shop.shopRevenue)}</p>
          </div>
        );
      case 'status':
        return (
          <Chip
            className={`capitalize ${
              shop.status === 1
                ? 'bg-gray-200 text-gray-600'
                : shop.status === 2
                  ? 'bg-green-200 text-green-600'
                  : shop.status === 3
                    ? 'bg-yellow-200 text-yellow-600'
                    : 'bg-red-200 text-rose-600'
            }`}
            size="sm"
            variant="flat"
          >
            {SHOP_STATUS.find((item) => item.key === shop.status)?.desc}
          </Chip>
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
                <DropdownItem onClick={() => handleClick(shop.id)}>Xem chi tiết</DropdownItem>
                {shop.status === 1 ? (
                  <DropdownItem onClick={() => handleApprove(shop.id)}>Duyệt</DropdownItem>
                ) : shop.status === 4 ? (
                  <DropdownItem
                    onClick={() => {
                      setShopIdSelected(shop.id);
                      setIsBanned(true);
                      onOpen();
                    }}
                  >
                    Bỏ cấm
                  </DropdownItem>
                ) : (
                  <DropdownItem
                    onClick={() => {
                      setShopIdSelected(shop.id);
                      setIsBanned(true);
                      onOpen();
                    }}
                  >
                    Cấm
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue.toString();
    }
  }, []);

  return (
    <div>
      <TableCustom
        indexPage={2}
        title="Quản lý cửa hàng"
        placeHolderSearch="Tìm kiếm cửa hàng..."
        description="cửa hàng"
        columns={SHOP_COLUMNS}
        // arrayData={shops?.value?.items ?? []}
        arrayData={shops}
        searchHandler={(value: string) => {
          setQuery({ ...query, title: value });
        }}
        pagination={sampleShops.value as PageableModel}
        goToPage={(index: number) => setQuery({ ...query, pageIndex: index })}
        setPageSize={(size: number) => setQuery({ ...query, pageSize: size })}
        filters={[statusFilter]}
        renderCell={renderCell}
        handleRowClick={openShopDetail}
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
                    isBanned === false
                      ? handleBan(shopIdSelected, onClose)
                      : handleUnban(shopIdSelected, onClose)
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

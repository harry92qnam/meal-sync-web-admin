'use client';
import TableCustom, { TableCustomFilter } from '@/components/common/TableCustom';
import { SHOP_COLUMNS, SHOP_STATUS } from '@/data/constants/constants';
import REACT_QUERY_CACHE_KEYS from '@/data/constants/react-query-cache-keys';
import useFetchWithRQ from '@/hooks/fetching/useFetchWithRQ';
import usePeriodTimeFilterState from '@/hooks/states/usePeriodTimeFilterQuery';
import useRefetch from '@/hooks/states/useRefetch';
import apiClient from '@/services/api-services/api-client';
import { shopApiService } from '@/services/api-services/api-service-instances';
import { DormitoryModel } from '@/types/models/DormitoryModel';
import PageableModel from '@/types/models/PageableModel';
import ShopModel from '@/types/models/ShopModel';
import ShopQuery from '@/types/queries/ShopQuery';
import { calculateNumberOfDays, formatCurrency, formatNumber, toast } from '@/utils/MyUtils';
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Selection,
  Textarea,
  useDisclosure,
  User,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Swal from 'sweetalert2';

export default function Shops() {
  const router = useRouter();
  const { range } = usePeriodTimeFilterState();
  const { isRefetch, setIsRefetch } = useRefetch();

  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [shopIdSelected, setShopIdSelected] = useState<number>(0);
  const [statuses, setStatuses] = useState<Selection>(new Set(['0']));
  const [dormitories, setDormitories] = useState<Selection>(new Set(['0']));
  const [dormitoryList, setDormitoryList] = useState<DormitoryModel[]>([]);

  const { isOpen: isBanOpen, onOpen: onBanOpen, onOpenChange: onBanOpenChange } = useDisclosure();

  const {
    isOpen: isUnBanOpen,
    onOpen: onUnBanOpen,
    onOpenChange: onUnBanOpenChange,
  } = useDisclosure();

  const [query, setQuery] = useState<ShopQuery>({
    searchValue: '',
    status: 0,
    dormitoryId: 0,
    dateFrom: range.dateFrom,
    dateTo: range.dateTo,
    pageIndex: 1,
    pageSize: 10,
  } as ShopQuery);

  const { data: shops, refetch } = useFetchWithRQ<ShopModel, ShopQuery>(
    REACT_QUERY_CACHE_KEYS.SHOPS,
    shopApiService,
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

  const statusFilterOptions = [{ key: 0, desc: 'Tất cả' }].concat(
    SHOP_STATUS.map((item) => ({ key: item.key, desc: item.desc })),
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
      setQuery((prevQuery) => ({ ...prevQuery, status: value, ...range }));
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setReason(event.target.value);
  };

  const handleBan = async (id: number, onClose: () => void) => {
    if (!reason) {
      setError('Vui lòng cung cấp lý do');
      return;
    }
    try {
      const payload = {
        id,
        status: 5,
        isConfirm: false,
        reason,
      };
      const responseData = await apiClient.put('moderator/shop/status', payload);
      if (responseData.data.isWarning) {
        await Swal.fire({
          text: responseData.data.value.message,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#ef4444',
          cancelButtonColor: '#94a3b8',
          confirmButtonText: 'Xác nhận',
          cancelButtonText: 'Hủy',
        }).then(async (result) => {
          if (result.isConfirmed) {
            const responseData = await apiClient.put('moderator/shop/status', {
              ...payload,
              isConfirm: true,
            });
            if (responseData.data.isSuccess) {
              toast('success', responseData.data.value.message);
              setIsRefetch();
            } else {
              console.log(responseData.data);
            }
          } else {
            return;
          }
        });
      } else if (responseData.data.isSuccess) {
        toast('success', responseData.data.value.message);
        setIsRefetch();
      } else {
        toast('error', responseData.data.value.message);
      }
    } catch (error: any) {
      toast('error', error.response.data.error.message);
    } finally {
      onClose();
    }
  };

  const handleUnBan = async (id: number, onClose: () => void) => {
    if (!reason) {
      setError('Vui lòng cung cấp lý do');
      return;
    }
    try {
      const payload = {
        id,
        status: 3,
        isConfirm: true,
        reason,
      };
      onClose();
      const responseData = await apiClient.put('moderator/shop/status', payload);
      if (responseData.data.isSuccess) {
        toast('success', responseData.data.value.message);
        setIsRefetch();
      } else {
        console.log(error);
      }
    } catch (error: any) {
      onClose();
      toast('error', error.response.data.error.message);
    }
  };

  const handleApprove = async (id: number) => {
    try {
      const payload = {
        id,
        status: 3,
        isConfirm: true,
      };
      const responseData = await apiClient.put('moderator/shop/status', payload);
      if (responseData.data.isSuccess) {
        toast('success', 'Phê duyệt cửa hàng thành công');
        setIsRefetch();
      } else {
        throw new Error(responseData.data.error.message);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const openShopDetail = (id: number) => {
    router.push(`/shops/${id}`);
  };

  const renderCell = useCallback((shop: ShopModel, columnKey: React.Key): ReactNode => {
    switch (columnKey) {
      case 'id':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">MS-{shop.id}</p>
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
      case 'totalOrderInProcess':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small ">{formatNumber(shop.totalOrderInProcess)}</p>
          </div>
        );
      case 'totalFood':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small ">{formatNumber(shop.totalFood)}</p>
          </div>
        );
      case 'totalRevenue':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small ">{formatCurrency(shop.totalRevenue)}</p>
          </div>
        );
      case 'createdDate':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small ">{calculateNumberOfDays(shop.createdDate)} ngày</p>
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
                    : shop.status === 4
                      ? 'bg-purple-200 text-purple-600'
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
                <DropdownItem onClick={() => openShopDetail(shop.id)}>Xem chi tiết</DropdownItem>
                {shop.status === 1 ? (
                  <DropdownItem onClick={() => handleApprove(shop.id)}>Phê duyệt</DropdownItem>
                ) : shop.status === 2 ? (
                  <DropdownItem
                    onClick={() => {
                      setShopIdSelected(shop.id);
                      onBanOpen();
                    }}
                  >
                    Cấm
                  </DropdownItem>
                ) : shop.status === 3 ? (
                  <DropdownItem
                    onClick={() => {
                      setShopIdSelected(shop.id);
                      onBanOpen();
                    }}
                  >
                    Cấm
                  </DropdownItem>
                ) : shop.status === 4 ? (
                  <DropdownItem
                    onClick={() => {
                      setShopIdSelected(shop.id);
                      onUnBanOpen();
                    }}
                  >
                    Bỏ cấm
                  </DropdownItem>
                ) : (
                  <DropdownItem
                    onClick={() => {
                      setShopIdSelected(shop.id);
                      onUnBanOpen();
                    }}
                  >
                    Bỏ cấm
                  </DropdownItem>
                )}
                {shop.status === 4 ? (
                  <DropdownItem
                    onClick={() => {
                      setShopIdSelected(shop.id);
                      onBanOpen();
                    }}
                  >
                    Cấm
                  </DropdownItem>
                ) : (
                  <DropdownItem className="hidden" />
                )}
              </DropdownMenu>
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
        indexPage={2}
        title="Quản lý cửa hàng"
        placeHolderSearch="Tìm kiếm cửa hàng..."
        description="cửa hàng"
        columns={SHOP_COLUMNS}
        total={shops?.value?.totalCount ?? 0}
        arrayData={shops?.value?.items ?? []}
        searchHandler={(value: string) => {
          const updatedValue = value.toLocaleLowerCase().startsWith('ms-') ? value.slice(3) : value;
          setQuery({ ...query, searchValue: updatedValue });
        }}
        pagination={shops?.value as PageableModel}
        isHaveDateFilter={false}
        goToPage={(index: number) => setQuery({ ...query, pageIndex: index })}
        setPageSize={(size: number) => setQuery({ ...query, pageSize: size })}
        selectionMode="single"
        filters={[statusFilter, dormitoryFilter]}
        renderCell={renderCell}
        handleRowClick={openShopDetail}
      />

      {/* ban */}
      <Modal
        isOpen={isBanOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setReason('');
          }
          onBanOpenChange();
        }}
        placement="top-center"
        isDismissable={false}
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <React.Fragment>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Lý do cấm cửa hàng
              </ModalHeader>
              <ModalBody>
                <Textarea
                  size="lg"
                  placeholder="Nhập lý do cấm cửa hàng này"
                  variant="faded"
                  value={reason}
                  onChange={handleInputChange}
                />
                {error && <p className="text-sm text-danger-500">{error}</p>}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onClick={() => {
                    onClose();
                    setError('');
                  }}
                >
                  Đóng
                </Button>
                <Button color="primary" onClick={() => handleBan(shopIdSelected, onClose)}>
                  Xác nhận
                </Button>
              </ModalFooter>
            </React.Fragment>
          )}
        </ModalContent>
      </Modal>

      {/* unban */}
      <Modal
        isOpen={isUnBanOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setReason('');
          }
          onUnBanOpenChange();
        }}
        placement="top-center"
        isDismissable={false}
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <React.Fragment>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Lý do bỏ cấm cửa hàng
              </ModalHeader>
              <ModalBody>
                <Textarea
                  size="lg"
                  placeholder="Nhập lý do bỏ cấm cửa hàng này"
                  variant="faded"
                  value={reason}
                  onChange={handleInputChange}
                />
                {error && <p className="text-sm text-danger-500">{error}</p>}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onClick={() => {
                    onClose();
                    setError('');
                  }}
                >
                  Đóng
                </Button>
                <Button color="primary" onClick={() => handleUnBan(shopIdSelected, onClose)}>
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

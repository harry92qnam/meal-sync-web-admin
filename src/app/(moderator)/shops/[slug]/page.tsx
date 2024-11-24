'use client';
import Header from '@/components/common/Header';
import Food from '@/components/foods/Food';
import MainLayout from '@/components/layout/MainLayout';
import { SHOP_STATUS } from '@/data/constants/constants';
import apiClient from '@/services/api-services/api-client';
import FoodModel from '@/types/models/FoodModel';
import PageableModel from '@/types/models/PageableModel';
import ShopDetailModel from '@/types/models/ShopDetailModel';
import {
  formatCurrency,
  formatDate,
  formatNumber,
  formatPhoneNumber,
  formatTimeFrame,
  isLocalImage,
  toast,
} from '@/utils/MyUtils';
import { Avatar, BreadcrumbItem, Breadcrumbs, Button, Chip, Divider } from '@nextui-org/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';

export default function ShopDetail({ params }: { params: { slug: number } }) {
  const [shopDetail, setShopDetail] = useState<ShopDetailModel>();
  const [foods, setFoods] = useState<FoodModel[]>([]);
  const router = useRouter();
  const [pageSize, setPageSize] = useState(10);
  const [items, setItems] = useState<PageableModel>();

  useEffect(() => {
    const fetchShopInfor = async () => {
      try {
        const responseData = await apiClient.get(`moderator/shop/${params.slug}`);
        if (responseData.data.isSuccess) {
          setShopDetail(responseData.data?.value);
        } else {
          console.log(responseData.data.error.message);
        }
      } catch (error: any) {
        console.log('>>> error', error);
      }
    };

    const fetchShopFoods = async () => {
      try {
        const responseData = await apiClient.get(
          `moderator/shop/${params.slug}/food?pageSize=${pageSize}`,
        );
        if (responseData.data.isSuccess) {
          setFoods(responseData.data?.value.items);
          setItems(responseData.data.value);
        } else {
          console.log(responseData.data.error.message);
        }
      } catch (error: any) {
        console.log('>>> error', error);
      }
    };

    fetchShopInfor();
    fetchShopFoods();
  }, [pageSize]);

  const handleLoadMore = () => {
    if (items!.totalCount > pageSize) {
      setPageSize(pageSize + 10);
    }
  };

  return (
    <MainLayout activeContentIndex={2}>
      <div className="md:col-span-1 pb-24">
        <Header title="Chi tiết cửa hàng" />
      </div>
      <Breadcrumbs size="lg" className="pl-4 py-2">
        <BreadcrumbItem onClick={() => router.back()}>Quản lý cửa hàng</BreadcrumbItem>
        <BreadcrumbItem>Chi tiết cửa hàng</BreadcrumbItem>
      </Breadcrumbs>
      <div className="flex flex-row justify-between mt-2">
        <div className="relative">
          {!isLocalImage(shopDetail?.bannerUrl || '') && (
            <Image
              src={shopDetail?.bannerUrl ?? ''}
              width={0}
              height={0}
              sizes="100vw"
              className="opacity-50 w-[380px] h-[240px] rounded-md"
              alt="banner shop"
              loading="lazy"
            />
          )}
          <Avatar
            src={shopDetail?.logoUrl ?? ''}
            className="absolute -translate-y-24 translate-x-52 w-36 h-36"
          />
        </div>
        <div className="w-2/3 flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h2 className="text-3xl font-bold text-primary">{shopDetail?.name}</h2>
              <p className="text-base text-gray-600">{shopDetail?.description}</p>
            </div>
            <Chip
              className={`capitalize ${
                shopDetail?.status === 1
                  ? 'bg-gray-200 text-gray-600'
                  : shopDetail?.status === 2
                    ? 'bg-green-200 text-green-600'
                    : shopDetail?.status === 3
                      ? 'bg-yellow-200 text-yellow-600'
                      : shopDetail?.status === 4
                        ? 'bg-purple-200 text-purple-600'
                        : 'bg-red-200 text-rose-600'
              }`}
              size="md"
              variant="flat"
            >
              {SHOP_STATUS.find((item) => item.key === shopDetail?.status)?.desc}
            </Chip>
          </div>

          <Divider className="my-2" />
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-lg text-gray-600">
                Chủ cửa hàng: <strong>{shopDetail?.accountShop?.fullName}</strong>
              </p>
              <p className="text-lg text-gray-600">
                Số điện thoại:{' '}
                <strong>{formatPhoneNumber(shopDetail?.accountShop?.phoneNumber ?? '')}</strong>
              </p>
              <p className="text-lg text-gray-600">
                Email: <strong>{shopDetail?.accountShop?.email}</strong>
              </p>
              <p className="text-lg text-gray-600">
                Khu vực:
                <ul className="list-disc pl-5">
                  {shopDetail?.shopDormitories.map((dor) => (
                    <li key={dor.id} className="text-gray-800">
                      {dor.name}
                    </li>
                  ))}
                </ul>
              </p>
              <p className="text-lg text-gray-600">
                Địa chỉ: <strong>{shopDetail?.locationShop.address}</strong>
              </p>
              <p className="text-lg text-gray-600">
                Ngày tạo cửa hàng: <strong>{formatDate(shopDetail?.createdDate ?? '')}</strong>
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-lg text-gray-600">
                Khung giờ mở bán:{' '}
                {shopDetail?.shopOperatingSlots.length ? (
                  <p className="flex gap-2">
                    {shopDetail?.shopOperatingSlots.map((slot) => (
                      <Chip
                        key={slot.id}
                        className={'bg-green-200 text-green-600'}
                        size="md"
                        variant="flat"
                      >
                        {formatTimeFrame(slot.startTime, slot.endTime)}
                      </Chip>
                    ))}
                  </p>
                ) : (
                  <span className="text-senary text-sm">Chưa chọn khung giờ mở bán</span>
                )}
              </p>
              <p className="text-lg text-gray-600">
                Tổng doanh thu: <strong>{formatCurrency(shopDetail?.totalRevenue ?? 0)}</strong>
              </p>
              <p className="text-lg text-gray-600">
                Tổng đơn hàng: <strong>{formatNumber(shopDetail?.totalOrder ?? 0)}</strong>
              </p>
              <p className="text-lg text-gray-600">
                Tổng sản phẩm: <strong>{formatNumber(shopDetail?.totalFood ?? 0)}</strong>
              </p>
              <p className="text-lg text-gray-600 flex gap-1">
                Đánh giá từ khách hàng: <strong>{shopDetail?.averageRating}</strong>
                <FaStar className="my-auto" color="#facc15" /> (
                {formatNumber(shopDetail?.totalReview ?? 0)} đánh giá)
              </p>
              <p className="text-lg text-gray-600">
                Số lần bị cảnh cáo:{' '}
                <strong>
                  {formatNumber(shopDetail?.accountShop?.numOfFlag ?? 0)}{' '}
                  <span className="text-senary">(3 lần sẽ cấm vĩnh viễn)</span>
                </strong>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Divider className="mt-8 mb-4" />
      <h2 className="text-2xl font-bold mb-6">Sản phẩm đang bán:</h2>
      <div className={`grid gap-5 ${foods.length ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {foods.length ? (
          <>
            {foods.map((food) => (
              <Food
                key={food.id}
                name={food.name}
                description={food.description}
                price={food.price}
                imageUrl={food.imageUrl ?? ''}
                totalOrder={food.totalOrder}
                status={food.status}
              />
            ))}
          </>
        ) : (
          <p className="text-center text-red-500 text-xl font-bold">
            Hiện tại chưa có sản phẩm nào
          </p>
        )}
      </div>
      {items && items.totalCount > pageSize && (
        <div className="flex justify-center mt-4">
          <Button onClick={() => handleLoadMore()}>Xem thêm</Button>
        </div>
      )}
    </MainLayout>
  );
}

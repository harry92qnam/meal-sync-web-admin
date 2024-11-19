'use client';
import Header from '@/components/common/Header';
import MainLayout from '@/components/layout/MainLayout';
import { SHOP_STATUS } from '@/data/constants/constants';
import useRefetch from '@/hooks/states/useRefetch';
import apiClient from '@/services/api-services/api-client';
import ShopDetailModel from '@/types/models/ShopDetailModel';
import {
  formatCurrency,
  formatDate,
  formatNumber,
  formatPhoneNumber,
  formatTimeFrame,
  toast,
} from '@/utils/MyUtils';
import { Avatar, BreadcrumbItem, Breadcrumbs, Chip, Divider } from '@nextui-org/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';

export default function ShopDetail({ params }: { params: { slug: number } }) {
  const { isRefetch } = useRefetch();
  const [shopDetail, setShopDetail] = useState<ShopDetailModel>();
  // const [products, setProducts] = useState<Products[]>([]);
  const router = useRouter();
  // const [selectedProductId, setSelectedProductId] = useState(0);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const responseData = await apiClient.get(`moderator/shop/${params.slug}`);
        if (responseData.data.isSuccess) {
          setShopDetail(responseData.data?.value);
        } else {
          toast('error', responseData.data.error.message);
        }
      } catch (error: any) {
        console.log('>>> error', error);
      }
    })();
  }, [isRefetch]);

  return (
    <MainLayout activeContentIndex={2}>
      <div className="md:col-span-1 pb-24">
        <Header title="Chi tiết cửa hàng" />
      </div>
      <Breadcrumbs size="lg" className="pl-4 py-2">
        <BreadcrumbItem onClick={() => router.back()}>Quản lý cửa hàng</BreadcrumbItem>
        <BreadcrumbItem>Chi tiết cửa hàng</BreadcrumbItem>
      </Breadcrumbs>
      <div className="px-8 py-4 shadow-md rounded-lg">
        <div className="flex flex-row justify-between">
          <div className="relative">
            <Image
              src={shopDetail?.bannerUrl ?? ''}
              width={0}
              height={0}
              sizes="100vw"
              className="opacity-50 w-80 h-56 rounded-md"
              alt="banner shop"
              loading="lazy"
            />
            <Avatar
              src={shopDetail?.logoUrl ?? ''}
              className="absolute -translate-y-16 translate-x-40 w-32 h-32"
            />
          </div>
          <div className="w-2/3 flex flex-col">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-primary">{shopDetail?.name}</h2>
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
            <p className="text-base text-gray-600 mb-4">{shopDetail?.description}</p>
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
                  Đánh giá từ khách hàng:{' '}
                  <strong>
                    {parseFloat((shopDetail!.totalRating / shopDetail!.totalReview).toFixed(2))}
                  </strong>
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
        {/* <div>
          {currentProducts.length ? (
            <>
              <h2 className="text-2xl font-bold mb-4">Sản phẩm đang bán:</h2>
              <div className="flex flex-row justify-start flex-wrap">
                {currentProducts.map((product) => (
                  <Product
                    key={product.id}
                    productId={product.id}
                    shopId={shopDetail?.id ?? 0}
                    image={product.imageUrl}
                    name={product.name}
                    price={product.price}
                    des={product.description}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center text-red-500 text-xl font-bold">
              Không có sản phẩm nào đang được bán
            </div>
          )}
        </div> */}
      </div>
    </MainLayout>
  );
}

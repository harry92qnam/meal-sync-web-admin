'use client';
import Header from '@/components/common/Header';
import MainLayout from '@/components/layout/MainLayout';
import apiClient from '@/services/api-services/api-client';
import OrderDetailModel from '@/types/models/OrderDetailModel';
import {
  formatCurrency,
  formatDate,
  formatNumber,
  formatPhoneNumber,
  formatTimeFrame,
  formatTimeToSeconds,
  isLocalImage,
  toast,
} from '@/utils/MyUtils';
import { BreadcrumbItem, Breadcrumbs, Chip, Divider } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function OrderDetail({ params }: { params: { slug: number } }) {
  const [orderDetail, setOrderDetail] = useState<OrderDetailModel>();
  const router = useRouter();

  useEffect(() => {
    const fetchOrdersDetail = async () => {
      try {
        const responseData = await apiClient.get(`moderator/order/${params.slug}`);
        if (responseData.data.isSuccess) {
          setOrderDetail(responseData.data?.value);
        } else {
          console.log(responseData.data.error.message);
        }
      } catch (error: any) {
        console.log('>>> error', error);
      }
    };
    fetchOrdersDetail();
  }, []);

  return (
    <MainLayout activeContentIndex={4}>
      <div className="md:col-span-1 pb-24">
        <Header title="Chi tiết đơn hàng" />
      </div>
      <Breadcrumbs size="lg" className="pl-4 py-2">
        <BreadcrumbItem onClick={() => router.back()}>Quản lý giao dịch</BreadcrumbItem>
        <BreadcrumbItem>Chi tiết đơn hàng</BreadcrumbItem>
      </Breadcrumbs>
      <h1 className="text-2xl font-bold pl-4 py-2">Thông tin đơn hàng</h1>
      <div className="px-4 py-2">
        <div className="px-8 py-4 shadow-md border-small rounded-lg">
          <div className="flex flex-col mr-auto text-lg gap-2">
            <div className="flex justify-between">
              <div className="flex gap-2 text-primary text-xl">
                <p>Mã đơn hàng:</p>
                <p className="font-semibold">MS-{orderDetail?.id}</p>
              </div>
              <div className="flex items-center gap-2">
                {orderDetail?.status === 10 && (
                  <p
                    className="underline text-primary text-sm cursor-pointer"
                    onClick={() => router.push(`/reports/${orderDetail.reportId}`)}
                  >
                    Chi tiết báo cáo
                  </p>
                )}
                <Chip
                  className={`capitalize ${
                    orderDetail?.status === 7 ||
                    orderDetail?.status === 8 ||
                    orderDetail?.status === 9 ||
                    orderDetail?.status === 12
                      ? 'bg-green-200 text-green-600'
                      : orderDetail?.status === 1 ||
                          orderDetail?.status === 3 ||
                          orderDetail?.status === 5 ||
                          orderDetail?.status === 6
                        ? 'bg-yellow-200 text-yellow-600'
                        : orderDetail?.status === 10 || orderDetail?.status === 11
                          ? 'bg-purple-200 text-purple-600'
                          : 'bg-red-200 text-rose-600'
                  }`}
                >
                  {orderDetail?.status === 7 ||
                  orderDetail?.status === 8 ||
                  orderDetail?.status === 9 ||
                  orderDetail?.status === 12
                    ? 'Đã hoàn thành'
                    : orderDetail?.status === 1 ||
                        orderDetail?.status === 3 ||
                        orderDetail?.status === 5 ||
                        orderDetail?.status === 6
                      ? 'Đang thực hiện'
                      : orderDetail?.status === 10 || orderDetail?.status === 11
                        ? 'Đang có báo cáo'
                        : 'Đã hủy'}
                </Chip>
              </div>
            </div>

            <div className="flex justify-between">
              <div>
                <strong className="text-xl text-cyan-500">Thông tin khách hàng:</strong>
                <div className="flex gap-2 items-center">
                  <p>Tên người nhận hàng:</p>
                  <p className="font-semibold">{orderDetail?.customer.fullName}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <p>Địa chỉ nhận hàng:</p>
                  <p className="font-semibold">{orderDetail?.customer?.address}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <p>Số điện thoại người nhận:</p>
                  <p className="font-semibold">
                    {formatPhoneNumber(orderDetail?.customer?.phoneNumber ?? '')}
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <p>Khung giờ nhận hàng: </p>
                  <p className="font-semibold">
                    {formatTimeFrame(orderDetail?.startTime, orderDetail?.endTime)} (
                    {formatDate(orderDetail?.intendedReceiveDate || '')})
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <p>Thời gian đặt đơn:</p>
                  <p className="font-semibold">
                    {formatTimeToSeconds(orderDetail?.orderDate ?? '')}
                  </p>
                </div>
              </div>
              <div>
                {orderDetail?.shop && (
                  <div className="mt-3 text-lg">
                    <strong className="text-xl text-cyan-500">Thông tin cửa hàng:</strong>
                    <p>
                      Tên cửa hàng: <strong>{orderDetail.shop.shopName}</strong>
                    </p>
                    <p>
                      Tên chủ cửa hàng: <strong>{orderDetail.shop.fullName}</strong>
                    </p>
                    <p>
                      Số điện thoại:{' '}
                      <strong>{formatPhoneNumber(orderDetail.shop.phoneNumber)}</strong>
                    </p>
                    <p>
                      Email: <strong>{orderDetail.shop.email}</strong>
                    </p>
                    <p>
                      Địa chỉ cửa hàng: <strong>{orderDetail.shop.address}</strong>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          {orderDetail?.promotion && (
            <div className="mt-3 text-lg">
              <strong className="text-xl text-cyan-500">Thông tin khuyến mãi:</strong>
              <p>
                Tên khuyến mãi: <strong>{orderDetail.promotion.title}</strong>
              </p>
              <p>
                Số tiền khuyến mãi: <strong>{formatCurrency(orderDetail.totalPromotion)}</strong>
              </p>
            </div>
          )}

          {orderDetail?.status === 2 ||
            orderDetail?.status === 4 ||
            (orderDetail?.status === 8 && (
              <div className="mt-3 text-lg">
                <strong className="text-xl text-red-500">Lý do đơn thất bại:</strong>
                {orderDetail.reasonIdentity === 'ShopCancel' ? (
                  <div>
                    Người hủy: <span className="font-bold">Chủ cửa hàng</span>{' '}
                    <p>
                      Lý do: <span className="font-bold">{orderDetail.reason}</span>
                    </p>
                  </div>
                ) : orderDetail.reasonIdentity === 'CustomerCancel' ? (
                  <div>
                    Người hủy: <span className="font-bold">Khách hàng</span>{' '}
                    <p>
                      Lý do: <span className="font-bold">{orderDetail.reason}</span>
                    </p>
                  </div>
                ) : orderDetail.reasonIdentity === 'DeliveryFailByShop' ? (
                  <div>
                    Nguyên nhân giao thất bại: <span className="font-bold">Chủ cửa hàng</span>{' '}
                    <p>
                      Lý do: <span className="font-bold">{orderDetail.reason}</span>
                    </p>
                  </div>
                ) : orderDetail.reasonIdentity === 'DeliveryFailByCustomer' ? (
                  <div>
                    Nguyên nhân giao thất bại: <span className="font-bold">Khách hàng</span>{' '}
                    <p>
                      Lý do: <span className="font-bold">{orderDetail.reason}</span>
                    </p>
                  </div>
                ) : (
                  <div>
                    <p>
                      Lý do: <span className="font-bold">{orderDetail.reason}</span>
                    </p>
                  </div>
                )}
              </div>
            ))}

          {orderDetail?.evidences && orderDetail.evidences.length > 0 && (
            <div className="flex flex-col gap-2 mt-3">
              <p className="text-xl text-cyan-500 font-bold">Hình ảnh chứng minh:</p>
              <div className="flex flex-wrap gap-2">
                {orderDetail.evidences.map((evidence, index) => (
                  <div key={index} className="flex flex-col gap-2 items-center">
                    {!isLocalImage(evidence.imageUrl || '') && (
                      <Image
                        src={evidence.imageUrl || ''}
                        alt={`Image ${index + 1}`}
                        width={100}
                        height={100}
                        quality={100}
                        className="rounded-lg w-full object-cover"
                      />
                    )}
                    {/* <p className='text-sm'>{formatTimeToSeconds(evidence?.takePictureDateTime ?? '')}</p> */}
                  </div>
                ))}
              </div>
            </div>
          )}

          {orderDetail?.orderDetails.map((food) => (
            <div className="mt-3">
              <strong className="text-xl text-cyan-500">Thông tin sản phẩm:</strong>
              <div key={food.id} className="flex justify-between items-center py-4">
                <div>
                  <div className="flex gap-4">
                    {!isLocalImage(food.imageUrl || '') && (
                      <Image
                        src={food.imageUrl ?? ''}
                        alt="Food image"
                        width={120}
                        height={120}
                        className="border-small"
                      />
                    )}
                    <div className="flex flex-col justify-center">
                      <div className="text-xl">
                        {food.name} ({formatCurrency(food.basicPrice)})
                        <p>
                          <strong>x{food.quantity}</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                  {food.optionGroups &&
                    food.optionGroups.map(
                      (q) =>
                        q.options &&
                        q.options?.length > 0 && (
                          <>
                            <p className="font-bold text-slate-500 mt-4">{q.optionGroupTitle}:</p>
                            {q.options.map((option) =>
                              option.price && option.price > 0 ? (
                                <p className="text-slate-500" key={option.optionTitle}>
                                  - {option.optionTitle} (+
                                  {formatCurrency(option.price)}) x {formatNumber(food.quantity)}
                                </p>
                              ) : (
                                <p className="text-slate-500" key={option.optionTitle}>
                                  - {option.optionTitle}
                                </p>
                              ),
                            )}
                          </>
                        ),
                    )}
                </div>
                <strong className="text-xl">{formatCurrency(food.totalPrice)}</strong>
              </div>
              {food.note && (
                <>
                  <strong>Ghi chú món ăn: </strong> <span>{food.note}</span>
                  <Divider />
                </>
              )}
            </div>
          ))}
          {orderDetail?.note && (
            <p className="py-4">
              <strong>Ghi chú đơn hàng: </strong>
              {orderDetail?.note.split('\n').map((item, index) => <span key={index}>{item}</span>)}
            </p>
          )}
          <Divider />
          <div className="flex flex-col ml-auto w-1/3 pt-4 text-lg">
            <div className="flex justify-between">
              <p>Tổng hoá đơn:</p>
              <p className="">{formatCurrency(orderDetail?.totalPrice ?? 0)}</p>
            </div>
            <div className="flex justify-between">
              <p>Giảm giá:</p>
              <p className="">{formatCurrency(orderDetail?.totalPromotion ?? 0)}</p>
            </div>
            <div className="flex justify-between text-primary font-bold text-2xl">
              <p>Thành tiền:</p>
              <p>
                {formatCurrency(
                  (orderDetail?.totalPrice ?? 0) - (orderDetail?.totalPromotion ?? 0),
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

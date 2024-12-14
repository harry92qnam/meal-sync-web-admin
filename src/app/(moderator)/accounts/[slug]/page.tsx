'use client';
import Header from '@/components/common/Header';
import MainLayout from '@/components/layout/MainLayout';
import { ACCOUNT_STATUS, GENDER } from '@/data/constants/constants';
import apiClient from '@/services/api-services/api-client';
import AccountDetailModel from '@/types/models/AccountDetaillModel';
import {
  formatDate,
  formatNumber,
  formatPhoneNumber,
  formatTimeToSeconds,
  isLocalImage,
  toast,
} from '@/utils/MyUtils';
import { BreadcrumbItem, Breadcrumbs, Chip } from '@nextui-org/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AccountDetail({ params }: { params: { slug: number } }) {
  const [accountDetail, setAccountDetail] = useState<AccountDetailModel>();
  const router = useRouter();

  useEffect(() => {
    const fetchAccountDetail = async () => {
      try {
        const responseData = await apiClient.get(`moderator/customer/${params.slug}`);
        if (responseData.data.isSuccess) {
          setAccountDetail(responseData.data?.value);
        } else {
          console.log(responseData.data.error.message);
        }
      } catch (error: any) {
        console.log('>>> error', error);
      }
    };
    fetchAccountDetail();
  }, []);

  return (
    <MainLayout activeContentIndex={3}>
      <div className="md:col-span-1 pb-24">
        <Header title="Chi tiết người dùng" />
      </div>
      <Breadcrumbs size="lg" className="pl-4 py-2">
        <BreadcrumbItem onClick={() => router.back()}>Quản lý người dùng</BreadcrumbItem>
        <BreadcrumbItem>Chi tiết người dùng</BreadcrumbItem>
      </Breadcrumbs>
      <div className="p-4 shadow-md rounded-lg border-small flex gap-4 mx-3">
        {!isLocalImage(accountDetail?.avatarUrl || '') && (
          <Image
            src={accountDetail?.avatarUrl || ''}
            width={200}
            height={200}
            alt="image account"
            loading="lazy"
            quality={100}
            className="rounded-full w-44 h-44 object-contain border-small"
          />
        )}
        <div className="flex flex-col text-lg justify-center">
          <p>
            Tên tài khoản: <strong>{accountDetail?.fullName || 'Chưa cung cấp'}</strong>
          </p>
          <p>
            Email: <strong>{accountDetail?.email}</strong>
          </p>
          <p>
            Số điện thoại: <strong>{formatPhoneNumber(accountDetail?.phoneNumber || '')}</strong>
          </p>
          <p>
            Giới tính:{' '}
            <strong>
              {GENDER.find((item) => item.key === accountDetail?.genders)?.desc ?? 'Chưa cung cấp'}
            </strong>
          </p>
          <div>
            Các đơn hàng liên quan:
            <ul className="flex flex-col gap-2 mx-4 list-disc">
              <li className="ml-4 text-medium text-quaternary">
                Đơn đang thực hiện: {accountDetail?.orderSummary.totalOrderInProcess}
              </li>
              <li className="ml-4 text-medium text-senary">
                Đơn khách đã tự hủy: {accountDetail?.orderSummary.totalCancelByCustomer}
              </li>
              <li className="ml-4 text-medium text-senary">
                Đơn đã hủy bởi shop: {accountDetail?.orderSummary.totalCancelOrRejectByShop}
              </li>
              <li className="ml-4 text-medium text-senary">
                Đơn giao thất bại do khách hàng:{' '}
                {accountDetail?.orderSummary.totalFailDeliveredByCustomer}
              </li>
              <li className="ml-4 text-medium text-senary">
                Đơn giao thất bại do cửa hàng:{' '}
                {accountDetail?.orderSummary.totalFailDeliveredByShop}
              </li>
              <li className="ml-4 text-medium text-quinary">
                Đơn giao thành công: {accountDetail?.orderSummary.totalDelivered}
              </li>
              <li className="ml-4 text-medium text-purple-600">
                Báo cáo đã xử lý: {accountDetail?.orderSummary.totalReportResolved}
              </li>
            </ul>
          </div>
          <p>
            Số lần bị cảnh cáo: <strong>{formatNumber(accountDetail?.numOfFlag)}</strong>
          </p>
          {/* && accountDetail?.accountFlags.length > 0 */}
          {accountDetail?.accountFlags && accountDetail?.accountFlags.length > 0 && (
            <div>
              Chi tiết các lần cảnh cáo:
              {accountDetail.accountFlags.map((item) => (
                <ul key={item.id} className="flex flex-col mx-4 list-disc">
                  <li className="ml-4 text-medium">
                    <span className="font-bold text-red-500">Lý do:</span> {item.description}
                    <span className="text-gray-400 ml-1">
                      ({formatTimeToSeconds(item.createdDate)})
                    </span>
                  </li>
                </ul>
              ))}
            </div>
          )}
          <p>
            Ngày đăng ký tài khoản: <strong>{formatDate(accountDetail?.createdDate || '')}</strong>
          </p>
          <p className="flex items-center gap-2">
            Trạng thái:
            <Chip
              className={`capitalize ${
                accountDetail?.status === 1
                  ? 'bg-green-200 text-green-600'
                  : accountDetail?.status === 2
                    ? 'bg-purple-200 text-purple-600'
                    : 'bg-red-200 text-rose-600'
              }`}
              size="sm"
              variant="flat"
            >
              {ACCOUNT_STATUS.find((item) => item.key === accountDetail?.status)?.desc}
            </Chip>
          </p>
        </div>
      </div>
    </MainLayout>
  );
}

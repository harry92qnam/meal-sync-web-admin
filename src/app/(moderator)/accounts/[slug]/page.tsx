'use client';
import Header from '@/components/common/Header';
import MainLayout from '@/components/layout/MainLayout';
import { ACCOUNT_STATUS } from '@/data/constants/constants';
import apiClient from '@/services/api-services/api-client';
import AccountModel from '@/types/models/AccountModel';
import { formatDate, formatPhoneNumber, toast } from '@/utils/MyUtils';
import { BreadcrumbItem, Breadcrumbs, Chip } from '@nextui-org/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AccountDetail({ params }: { params: { slug: number } }) {
  const [accountDetail, setAccountDetail] = useState<AccountModel>();
  const router = useRouter();

  useEffect(() => {
    const fetchAccountDetail = async () => {
      try {
        const responseData = await apiClient.get(`moderator/customer/${params.slug}`);
        if (responseData.data.isSuccess) {
          setAccountDetail(responseData.data?.value);
        } else {
          toast('error', responseData.data.error.message);
        }
      } catch (error: any) {
        console.log('>>> error', error);
      }
    };
    fetchAccountDetail();
  }, []);

  return (
    <MainLayout activeContentIndex={2}>
      <div className="md:col-span-1 pb-24">
        <Header title="Chi tiết người dùng" />
      </div>
      <Breadcrumbs size="lg" className="pl-4 py-2">
        <BreadcrumbItem onClick={() => router.back()}>Quản lý người dùng</BreadcrumbItem>
        <BreadcrumbItem>Chi tiết người dùng</BreadcrumbItem>
      </Breadcrumbs>
      <div className="p-4 shadow-md rounded-lg flex gap-4">
        <Image
          src={accountDetail?.avatarUrl || ''}
          width={200}
          height={200}
          alt="image account"
          loading="lazy"
          quality={100}
          className="rounded-lg w-44 h-44 object-cover"
        />
        <div className="flex flex-col text-lg justify-center">
          <p>
            Tên tài khoản: <strong>{accountDetail?.fullName || ''}</strong>
          </p>
          <p>
            Email: <strong>{accountDetail?.email}</strong>
          </p>
          <p>
            Số điện thoại: <strong>{formatPhoneNumber(accountDetail?.phoneNumber || '')}</strong>
          </p>
          <p>
            Ngày đăng ký tài khoản: <strong>{formatDate(accountDetail?.createdDate || '')}</strong>
          </p>
          <p>
            Trạng thái:{' '}
            <Chip
              className={`capitalize ${
                accountDetail?.status === 1
                  ? 'bg-gray-200 text-gray-600'
                  : accountDetail?.status === 2
                    ? 'bg-green-200 text-green-600'
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

'use client';
import Header from '@/components/common/Header';
import MainLayout from '@/components/layout/MainLayout';
import useRefetch from '@/hooks/states/useRefetch';
import apiClient from '@/services/api-services/api-client';
import ReportDetailModel from '@/types/models/ReportDetailModel';
import { formatTimeToSeconds, isLocalImage, toast } from '@/utils/MyUtils';
import { BreadcrumbItem, Breadcrumbs, Button, Chip, Divider, Tooltip } from '@nextui-org/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

interface ReportDetailData {
  id: number;
  orderId: number;
  title: string;
  content: string;
  imageUrls: string[];
  status: number;
  reason?: string;
  isReportedByCustomer: boolean;
  createdDate: string;
}

export default function ReportDetail({ params }: { params: { slug: number } }) {
  const [reportDetail, setReportDetail] = useState<ReportDetailModel>();
  const [customerData, setCustomerData] = useState<ReportDetailData>();
  const [shopData, setShopData] = useState<ReportDetailData>();
  const { isRefetch, setIsRefetch } = useRefetch();
  const router = useRouter();

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const responseData = await apiClient.get(`moderator/report/${params.slug}`);
        if (responseData.data.isSuccess) {
          setReportDetail(responseData.data?.value);
          responseData.data.value?.reports.forEach((element: any) => {
            if (element.isReportedByCustomer) {
              setCustomerData(element);
            } else {
              setShopData(element);
            }
          });
        } else {
          console.log(responseData.data.error.message);
        }
      } catch (error: any) {
        console.log('>>> error', error);
      }
    };
    fetchReportData();
  }, [params.slug, isRefetch]);

  const handleProgress = async (id: number) => {
    try {
      const payload = {
        id,
        status: 1,
      };
      const responseData = await apiClient.put('moderator/report/status', payload);

      if (responseData.data.isSuccess) {
        toast('success', responseData.data.value.message);
        setIsRefetch();
      } else {
        console.log(responseData);
      }
    } catch (error) {
      console.log(error, '>>> error');
    }
  };

  const handleReject = async (id: number) => {
    await Swal.fire({
      title: `Từ chối báo cáo RP-${id}`,
      input: 'textarea',
      inputPlaceholder: 'Nhập lý do từ chối',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      confirmButtonColor: 'rgb(23, 201, 100)',
      cancelButtonText: 'Hủy',
      cancelButtonColor: 'rgba(243, 18, 96)',
      inputValidator: (value: any) => {
        if (!value) {
          return 'Vui lòng cung cấp lý do từ chối!';
        }
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `Xác nhận từ chối báo cáo`,
          text:
            reportDetail?.orderInfo.reasonIdentity == 'DeliveredReportedByCustomer'
              ? 'BR-Reject-Success'
              : 'BR-Reject-Failed',
          showCancelButton: true,
          confirmButtonText: 'Xác nhận',
          confirmButtonColor: 'rgb(23, 201, 100)',
          cancelButtonText: 'Hủy',
          cancelButtonColor: 'rgba(243, 18, 96)',
        }).then(async (res) => {
          if (res.isConfirmed) {
            try {
              const payload = {
                id,
                status: 3,
                reason: result.value,
              };
              const responseData = await apiClient.put('moderator/report/status', payload);

              if (responseData.data.isSuccess) {
                toast('success', responseData.data.value.message);
                setIsRefetch();
              } else {
                console.log(responseData);
              }
            } catch (error) {
              console.log(error, '>>> error');
            }
          }
        });
      } else {
        return;
      }
    });
  };

  const handleApprove = async (id: number) => {
    await Swal.fire({
      title: `Phê duyệt báo cáo RP-${id}`,
      input: 'textarea',
      inputPlaceholder: 'Nhập lý do phê duyệt',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      confirmButtonColor: 'rgb(23, 201, 100)',
      cancelButtonText: 'Hủy',
      cancelButtonColor: 'rgba(243, 18, 96)',
      inputValidator: (value: any) => {
        if (!value) {
          return 'Vui lòng cung cấp lý do phê duyệt!';
        }
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `Xác nhận phê duyệt báo cáo`,
          text:
            reportDetail?.orderInfo.reasonIdentity == 'DeliveredReportedByCustomer'
              ? 'BR-Apporve-Success'
              : 'BR-Approve-Failed',
          showCancelButton: true,
          confirmButtonText: 'Xác nhận',
          confirmButtonColor: 'rgb(23, 201, 100)',
          cancelButtonText: 'Hủy',
          cancelButtonColor: 'rgba(243, 18, 96)',
        }).then(async (res) => {
          if (res.isConfirmed) {
            try {
              const payload = {
                id,
                status: 2,
                reason: result.value,
              };
              const responseData = await apiClient.put('moderator/report/status', payload);

              if (responseData.data.isSuccess) {
                toast('success', responseData.data.value.message);
                setIsRefetch();
              } else {
                console.log(responseData);
              }
            } catch (error) {
              console.log(error, '>>> error');
            }
          }
        });
      } else {
        return;
      }
    });
  };

  return (
    <MainLayout activeContentIndex={0}>
      <div className="md:col-span-1 pb-24">
        <Header title="Chi tiết báo cáo" />
      </div>
      <Breadcrumbs size="lg" className="pl-4 py-2">
        <BreadcrumbItem onClick={() => router.push('/reports')}>Quản lý báo cáo</BreadcrumbItem>
        <BreadcrumbItem>Chi tiết báo cáo</BreadcrumbItem>
      </Breadcrumbs>
      {reportDetail?.reports && reportDetail?.reports?.length && (
        <div className="px-8 py-4 border-small shadow-md rounded-lg">
          <div className="flex justify-between mb-2">
            <Chip
              className={`capitalize ${
                customerData?.status === 1 && !reportDetail.isAllowAction
                  ? 'bg-gray-200 text-gray-600'
                  : customerData?.status === 1 &&
                      reportDetail.isAllowAction &&
                      !reportDetail.isUnderReview
                    ? 'bg-cyan-200 text-cyan-600'
                    : customerData?.status === 1 &&
                        reportDetail.isAllowAction &&
                        reportDetail.isUnderReview
                      ? 'bg-yellow-200 text-yellow-600'
                      : customerData?.status === 2
                        ? 'bg-green-200 text-green-600'
                        : 'bg-red-200 text-rose-600'
              }`}
              size="md"
              variant="flat"
            >
              {customerData?.status === 1 &&
              reportDetail.isAllowAction &&
              !reportDetail.isUnderReview
                ? 'Chờ xử lý'
                : customerData?.status === 1 && !reportDetail.isAllowAction
                  ? 'Chưa thể xử lý'
                  : customerData?.status === 1 &&
                      reportDetail.isAllowAction &&
                      reportDetail.isUnderReview
                    ? 'Đang xử lý'
                    : customerData?.status === 2
                      ? 'Đã phê duyệt'
                      : 'Đã từ chối'}
            </Chip>
            {reportDetail.isAllowAction && !reportDetail.isUnderReview && (
              <div className="flex gap-2">
                <Button
                  variant="flat"
                  className="capitalize bg-yellow-200 text-yellow-600"
                  onClick={() => {
                    handleProgress(reportDetail.reports[0].id);
                  }}
                >
                  Tiến hành xử lý
                </Button>
              </div>
            )}
            {reportDetail.isAllowAction && reportDetail.isUnderReview && (
              <div className="flex gap-2">
                <Tooltip
                  color="warning"
                  content="Từ chối báo cáo khi khách hàng báo cáo không chính xác"
                  className="text-white p-4 text-medium"
                >
                  <Button
                    color="danger"
                    variant="flat"
                    className={`capitalize text-danger-500 ${reportDetail.isNotAllowReject && 'opacity-50 cursor-not-allowed'}`}
                    disabled={reportDetail?.isNotAllowReject}
                    onClick={() => {
                      handleReject(reportDetail.reports[0].id);
                    }}
                  >
                    Từ chối
                  </Button>
                </Tooltip>
                <Tooltip
                  content="Phê duyệt báo cáo sau khi kiểm tra và cho rằng khách hàng báo cáo đúng"
                  color="success"
                  className="text-white p-4 text-medium"
                >
                  <Button
                    color="success"
                    variant="shadow"
                    className="capitalize text-white"
                    onClick={() => {
                      handleApprove(reportDetail.reports[0].id);
                    }}
                  >
                    Phê duyệt
                  </Button>
                </Tooltip>
              </div>
            )}
          </div>
          <div className="flex flex-col mr-auto text-lg gap-2">
            <p className="font-bold text-cyan-500 text-xl">Nội dung báo cáo:</p>
            <div className="flex gap-2 items-center">
              <p>Mã báo cáo:</p>
              <p className="font-semibold">RP-{customerData?.id}</p>
            </div>
            <div className="flex gap-2 items-center">
              <p>Mã đơn hàng:</p>
              <p className="font-semibold">MS-{customerData?.orderId}</p>
              <p
                className="underline text-primary text-medium cursor-pointer"
                onClick={() => router.push(`/orders/${customerData?.orderId}`)}
              >
                Chi tiết đơn hàng
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <p>Trạng thái giao hàng:</p>
              <p
                className={`font-semibold ${reportDetail.orderInfo.reasonIdentity === 'DeliveryFailByShopReportedByCustomer' && 'text-red-500'}`}
              >
                {reportDetail?.orderInfo.reasonIdentity === 'DeliveredReportedByCustomer'
                  ? 'Giao hàng thành công'
                  : reportDetail?.orderInfo.reasonIdentity ===
                      'DeliveryFailByCustomerReportedByCustomer'
                    ? 'Giao thất bại bởi khách hàng'
                    : 'Giao thất bại bởi cửa hàng'}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <p>Tên người báo cáo:</p>
              <p className="font-semibold">{reportDetail?.customerInfo.fullName}</p>
            </div>
            <div className="flex gap-2 items-center">
              <p>Loại báo cáo:</p>
              <p className="font-semibold">{customerData?.title}</p>
            </div>
            <div className="flex gap-2 items-center">
              <p>Lý do cụ thể:</p>
              <p className="font-semibold">{customerData?.content}</p>
            </div>
            {customerData?.imageUrls && customerData?.imageUrls.length > 0 && (
              <div className="flex gap-2 items-center">
                <p>Hình ảnh chứng minh: </p>
                <div className="flex flex-wrap gap-2">
                  {customerData?.imageUrls?.map(
                    (url, index) =>
                      !isLocalImage(url) && (
                        <Image
                          key={index}
                          src={url}
                          alt={`Image ${index + 1}`}
                          width={100}
                          height={100}
                          className="rounded-lg w-44 h-44 object-cover border-small"
                        />
                      ),
                  )}
                </div>
              </div>
            )}

            <div className="flex gap-2 items-center">
              <p>Thời gian báo cáo:</p>
              <p className="font-bold">{formatTimeToSeconds(customerData?.createdDate ?? '')}</p>
            </div>
          </div>
          <Divider className="my-4" />
          <div className="flex flex-col text-lg">
            <p>
              <span className="text-cyan-500 text-xl font-bold">Phản hồi từ cửa hàng:</span>{' '}
              {!shopData && <span className="text-medium">(Chưa phản hồi lý do)</span>}
            </p>
            <div className="flex flex-col">
              <p>
                Tên cửa hàng: <span className="font-bold">{reportDetail?.shopInfo.name}</span>
              </p>
            </div>
            {shopData && (
              <div className="flex flex-col mr-auto gap-2">
                <div className="flex gap-2 items-center">
                  <p>Nội dung phản hồi:</p>
                  <p className="font-semibold">{shopData?.content}</p>
                </div>
                {shopData?.imageUrls.length > 0 && (
                  <div className="flex gap-2 items-center">
                    <p>Hình ảnh chứng minh:</p>
                    <div className="flex flex-wrap gap-2">
                      {shopData?.imageUrls?.map(
                        (url, index) =>
                          !isLocalImage(url) && (
                            <Image
                              key={index}
                              src={url}
                              alt={`Image ${index + 1}`}
                              width={100}
                              height={100}
                              className="rounded-lg w-44 h-44 object-cover border-small"
                            />
                          ),
                      )}
                    </div>
                  </div>
                )}
                <div className="flex gap-2 items-center">
                  <p>Thời gian phản hồi:</p>
                  <p className="font-bold">{formatTimeToSeconds(shopData?.createdDate ?? '')}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </MainLayout>
  );
}

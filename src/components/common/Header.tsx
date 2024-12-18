import apiClient from '@/services/api-services/api-client';
import sessionService from '@/services/session-service';
import { formatTimeToSeconds } from '@/services/util-services/TimeFormatService';
import PageableModel from '@/types/models/PageableModel';
import { Avatar, Badge, Button, Divider, Listbox, ListboxItem } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { IoMdNotifications } from 'react-icons/io';
import { MdLogout } from 'react-icons/md';
import { ListboxWrapper } from './ListboxWrapper';
import useRefetch from '@/hooks/states/useRefetch';

interface NotificationModel {
  id: number;
  accountId: number;
  referenceId: number;
  imageUrl: string;
  title: string;
  content: string;
  entityType: number;
  isRead: boolean;
  createdDate: string;
}

const Header: React.FC<{ title: string | ReactNode; showAccountName?: boolean }> = ({
  title,
  showAccountName = false,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [notiVisible, setNotiVisible] = useState(false);
  const authDTO = sessionService.getAuthDTO();
  const [pageSize, setPageSize] = useState(5);
  const [notifications, setNotifications] = useState<NotificationModel[]>();
  const [tmp, setTmp] = useState<PageableModel>();
  const [numberOfUnread, setNumberOfUnread] = useState(0);
  const { isRefetch } = useRefetch();

  const router = useRouter();

  const handleAvatarClick = () => {
    setDropdownVisible((prev) => !prev);
    setNotiVisible(false);
  };

  const handleNotiClick = () => {
    setNotiVisible((prev) => !prev);
    setDropdownVisible(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('authDTO');

    router.push('/login');
  };

  const handleLoadMore = () => {
    if (tmp!.totalCount > pageSize) {
      setPageSize(pageSize + 5);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await apiClient.get(`moderator/notification?pageSize=${pageSize}`);
      setNotifications([]);
      if (responseData.data.isSuccess) {
        setNotifications((prevNotifications) => {
          const newItems = responseData.data.value.items;
          if (!newItems) return;
          const existingIds = prevNotifications
            ? new Set(prevNotifications.map((item: NotificationModel) => item.id))
            : new Set();
          const uniqueNewItems = newItems.filter(
            (item: NotificationModel) => !existingIds.has(item.id),
          );
          return prevNotifications ? [...prevNotifications, ...uniqueNewItems] : uniqueNewItems;
        });
        setTmp(responseData.data.value);
      }
    };
    fetchData();
  }, [pageSize, notiVisible, isRefetch]);

  useEffect(() => {
    const fetchUnread = async () => {
      const responseData = await apiClient.get('moderator/notification/total-unread');
      if (responseData.data.isSuccess) {
        setNumberOfUnread(responseData.data.value.totalUnerad);
      }
    };
    fetchUnread();
  }, [notiVisible, isRefetch]);

  return (
    <div
      className={`fixed top-0 ${authDTO?.roleName === 'Moderator' ? 'left-[262px]' : 'left-[272px]'} right-4 z-50 bg-white shadow-md py-7 rounded-md pl-8`}
    >
      <div className="flex justify-between items-center pr-4">
        {typeof title == 'string' ? (
          <p className="text-3xl text-primary font-medium">{title}</p>
        ) : (
          <div>{title}</div>
        )}

        <div className="flex gap-4 justify-between items-center">
          {authDTO?.roleName === 'Moderator' && (
            <div
              className="flex justify-center items-center h-[36px] w-[36px] bg-blue-100 rounded-lg cursor-pointer hover:opacity-70"
              onClick={handleNotiClick}
            >
              {numberOfUnread ? (
                <Badge content={numberOfUnread} color="primary">
                  <IoMdNotifications size={28} className="text-orange-500" />
                </Badge>
              ) : (
                <IoMdNotifications size={28} className="text-orange-500" />
              )}
            </div>
          )}
          {notiVisible && (
            <div className="absolute max-w-[360px] max-h-[520px] overflow-y-scroll top-[80px] right-[0.5px] border-1 px-2 py-2 rounded-lg bg-white shadow-2xl">
              <p className="text-2xl font-bold mt-2 text-center">Thông báo</p>
              <Divider className="my-2" />
              {notifications?.map((noti) => (
                <div
                  className="flex gap-2 pb-2 items-center hover:opacity-70 cursor-pointer"
                  key={noti.id}
                  onClick={() => {
                    if (noti.title == 'Đơn hàng') {
                      router.push(`/orders/${noti.referenceId}`);
                    } else if (noti.title === 'Báo cáo đơn hàng') {
                      router.push(`/reports/${noti.referenceId}`);
                    } else if (noti.title === 'Nhận xét đơn hàng') {
                      router.push(`/review/${noti.referenceId}`);
                    } else if (noti.title === 'Quản lí số dư') {
                      router.push(`/account-balance/${noti.referenceId}`);
                    }
                  }}
                >
                  <Avatar
                    src={noti.imageUrl}
                    size="md"
                    className="w-12 h-12 min-w-12 border-small"
                  />
                  <div key={noti.id} className="flex-col items-center">
                    <p className="text-sm">{noti.content}</p>
                    <p className="text-xs text-gray-400">{formatTimeToSeconds(noti.createdDate)}</p>
                  </div>
                  {!noti.isRead && (
                    <span className="w-3 h-3 bg-blue-500 rounded-full absolute right-4" />
                  )}
                </div>
              ))}
              <div>
                {tmp && tmp.totalCount > pageSize && (
                  <div className="flex justify-center">
                    <Button
                      onClick={() => handleLoadMore()}
                      size="sm"
                      className="w-full text-medium mb-2 mt-4"
                    >
                      Xem thêm
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
          <div
            onClick={handleAvatarClick}
            className="flex gap-x-2 flex-row items-center hover:bg-[#f0fdfa] rounded-lg  p-1 px-2 cursor-pointer"
          >
            <Avatar
              src={authDTO?.avatarUrl || ''}
              size="md"
              className="cursor-pointer hover:opacity-70 border-small"
            />

            {showAccountName && (
              <p className="text-base">{authDTO ? authDTO.fullName : '-----------'}</p>
            )}
          </div>

          {dropdownVisible && (
            <div className="absolute top-20 right-4 rounded-lg bg-white shadow-2xl">
              <ListboxWrapper>
                <Listbox aria-label="actions">
                  <ListboxItem key="profile" href="/profile">
                    <div className="flex items-center gap-2">
                      <Avatar
                        src={authDTO?.avatarUrl || ''}
                        size="sm"
                        onClick={handleAvatarClick}
                        className="cursor-pointer hover:opacity-70 border-small"
                      />
                      <p className="text-base">{authDTO ? authDTO.fullName : '-----------'}</p>
                    </div>
                  </ListboxItem>
                  <ListboxItem key="divider" isDisabled>
                    <Divider />
                  </ListboxItem>
                  <ListboxItem
                    key="logout"
                    className="text-red-500"
                    color="primary"
                    onClick={handleLogout}
                  >
                    <div className="flex items-center gap-2">
                      <MdLogout size={20} /> <p className="text-base">Đăng xuất</p>
                    </div>
                  </ListboxItem>
                </Listbox>
              </ListboxWrapper>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

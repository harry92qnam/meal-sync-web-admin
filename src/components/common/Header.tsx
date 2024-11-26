import { Avatar, Badge, Divider, Listbox, ListboxItem } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { IoMdNotifications } from 'react-icons/io';
import { MdLogout } from 'react-icons/md';
import { sampleNotifications } from '../../data/TestData';
import { formatDate } from '../../utils/MyUtils';
import { ListboxWrapper } from './ListboxWrapper';
import sessionService from '@/services/session-service';

const Header: React.FC<{ title: string | ReactNode; showAccountName?: boolean }> = ({
  title,
  showAccountName = false,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [notiVisible, setNotiVisible] = useState(false);
  const authDTO = sessionService.getAuthDTO();

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

  return (
    <div className="fixed top-0 left-[262px] right-4 z-50 bg-white shadow-md py-7 rounded-md pl-8">
      <div className="flex justify-between items-center pr-4">
        {typeof title == 'string' ? (
          <p className="text-3xl text-primary font-medium">{title}</p>
        ) : (
          <div>{title}</div>
        )}

        <div className="flex gap-4 justify-between items-center">
          <div
            className="flex justify-center items-center h-[36px] w-[36px] bg-blue-100 rounded-lg cursor-pointer hover:opacity-70"
            onClick={handleNotiClick}
          >
            <Badge content="5" color="primary">
              <IoMdNotifications size={24} className="text-orange-500" />
            </Badge>
          </div>
          {notiVisible && (
            <div className="absolute max-w-[360px] top-20 right-8 border-1 px-4 py-2 rounded-lg bg-white shadow-2xl">
              <p className="text-2xl font-bold mt-2">Thông báo</p>
              <Divider className="my-2" />
              {sampleNotifications.map((noti) => (
                <div
                  className="flex gap-2 pb-2 items-center hover:opacity-70 cursor-pointer"
                  key={noti.id}
                >
                  <Avatar src={noti.avatar} size="md" className="w-12 h-12 min-w-12" />
                  <div key={noti.id} className="flex-col items-center">
                    <p className="text-sm">{noti.content}</p>
                    <p className="text-xs text-gray-400">{formatDate(noti.createdDate)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div
            onClick={handleAvatarClick}
            className="flex gap-x-2 flex-row items-center hover:bg-[#f0fdfa] rounded-lg  p-1 px-2 cursor-pointer"
          >
            <Avatar
              src={authDTO?.avatarUrl || ''}
              size="md"
              className="cursor-pointer hover:opacity-70"
            />

            {showAccountName && (
              <p className="text-base">{authDTO ? authDTO.fullName : '-----------'}</p>
            )}
          </div>

          {dropdownVisible && (
            <div className="absolute top-20 right-8 rounded-lg bg-white shadow-2xl">
              <ListboxWrapper>
                <Listbox aria-label="actions">
                  <ListboxItem key="profile" href="/profile">
                    <div className="flex items-center gap-2">
                      <Avatar
                        src={authDTO?.avatarUrl || ''}
                        size="sm"
                        onClick={handleAvatarClick}
                        className="cursor-pointer hover:opacity-70"
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

import { Button, Divider, Image } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { BsShop } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { GrTransaction } from 'react-icons/gr';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdLogout, MdOutlineCategory, MdOutlineDashboard, MdOutlineReport } from 'react-icons/md';
import { RiExchangeDollarFill } from 'react-icons/ri';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import sessionService from '@/services/session-service';

interface SidebarItemProps {
  title: string;
  icon: IconType;
  iconSize: number;
  path: string;
}

const SidebarListModerator: Array<SidebarItemProps> = [
  { title: 'Quản lý giao dịch', icon: GrTransaction, iconSize: 18, path: '/orders' },
  { title: 'Quản lý cửa hàng', icon: BsShop, iconSize: 19, path: '/shops' },
  { title: 'Quản lý tài khoản', icon: CgProfile, iconSize: 19, path: '/accounts' },
  { title: 'Yêu cầu rút tiền', icon: RiExchangeDollarFill, iconSize: 19, path: '/withdrawals' },
  { title: 'Quản lý báo cáo', icon: MdOutlineReport, iconSize: 19, path: '/reports' },
];

const SidebarListAdmin: Array<SidebarItemProps> = [
  { title: 'Thống kê tổng quan', icon: MdOutlineDashboard, iconSize: 19, path: '/dashboard' },
  { title: 'Quản lý điều phối viên', icon: CgProfile, iconSize: 19, path: '/moderators' },
  { title: 'Quản lý danh mục', icon: MdOutlineCategory, iconSize: 17, path: '/categories' },
  { title: 'Cài đặt hệ thống', icon: IoSettingsOutline, iconSize: 17, path: '/setting' },
];

const SideBar = ({ activeContentIndex }: { activeContentIndex: number }) => {
  const router = useRouter();
  // const [role, setRole] = useState('moderator');
  const [sidebarList, setSidebarList] = useState(SidebarListModerator);
  useEffect(() => {
    if (sessionService.getRole() === 'moderator') {
      setSidebarList(SidebarListModerator);
    } else {
      setSidebarList(SidebarListAdmin);
    }
  }, [sessionService.getRole()]);
  // };

  // useEffect(() => {
  //   if (!isAuthenticated()) {
  //     navigate('/login');
  //   }
  // }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <aside className="bg-white py-5 px-[12px] h-screen flex-col items-center min-w-[260px]">
      <div className="flex items-center gap-2 justify-center cursor-pointer hover:opacity-80 max-w-[240px]">
        <Image
          alt="MealSync Logo"
          radius="full"
          src="/images/logo.png"
          className="w-16 h-16 min-w-16"
        />
        <p className="text-xl font-bold text-primary">MealSync</p>
      </div>
      <Divider className="my-5" />
      <nav>
        <ul className="space-y-5">
          {sidebarList.map((item, index) => (
            <li key={index}>
              <Link
                href={item.path}
                className={`flex pl-3 py-2 pr-8 rounded-xl items-center w-full ${
                  activeContentIndex === index
                    ? 'text-white bg-bgPrimary font-medium hover:text-white hover:bg-opacity-100'
                    : 'text-gray-600 hover:bg-orange-100 hover:text-black'
                }`}
              >
                <item.icon size={item.iconSize} />
                <span className="text-lg ml-2">{item.title}</span>
              </Link>
            </li>
          ))}

          <Button
            className="w-full font-medium gap-2 text-gray-600 hover:text-white hover:bg-primary"
            onClick={handleLogout}
          >
            <MdLogout size={20} />
            <p className="text-base">Đăng xuất</p>
          </Button>
        </ul>
      </nav>
    </aside>
  );
};

export default React.memo(SideBar);

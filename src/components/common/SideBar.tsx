import { Button, Divider, Image } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { BsShop } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { GrTransaction } from 'react-icons/gr';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdLogout, MdOutlineCategory, MdOutlineDashboard, MdOutlineReport } from 'react-icons/md';
import { RiExchangeDollarFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '/images/logo.png';

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
  { title: 'Quản lý thể loại', icon: MdOutlineCategory, iconSize: 17, path: '/categories' },
];

const SidebarListAdmin: Array<SidebarItemProps> = [
  { title: 'Thống kê tổng quan', icon: MdOutlineDashboard, iconSize: 19, path: '/dashboard' },
  { title: 'Quản lý moderator', icon: CgProfile, iconSize: 19, path: '/moderators' },
  { title: 'Cài đặt hệ thống', icon: IoSettingsOutline, iconSize: 17, path: '/setting' },
];

const SideBar = ({ activeContentIndex }: { activeContentIndex: number }) => {
  const navigate = useNavigate();
  // const [role, setRole] = useState('moderator');
  const role = 'moderator';
  const [sidebarList, setSidebarList] = useState(SidebarListModerator);
  useEffect(() => {
    if (role === 'moderator') {
      setSidebarList(SidebarListModerator);
    } else {
      setSidebarList(SidebarListAdmin);
    }
  }, [role]);
  // };

  // useEffect(() => {
  //   if (!isAuthenticated()) {
  //     navigate('/login');
  //   }
  // }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <aside className="bg-white p-6 pt-5 h-screen flex-col items-center min-w-[240px]">
      <div className="flex items-center gap-2 justify-center cursor-pointer hover:opacity-80 max-w-[240px]">
        <Image alt="MealSync Logo" radius="full" src={Logo} className="w-16 h-16 min-w-16" />
        <p className="text-xl font-bold text-primary">MealSync</p>
      </div>
      <Divider className="my-4" />
      <nav>
        <ul className="space-y-5">
          {sidebarList.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex pl-3 py-2 pr-8 rounded-xl items-center w-full ${
                  activeContentIndex === index
                    ? 'text-white bg-bgPrimary bg-opacity-80 font-medium hover:text-white hover:bg-opacity-100'
                    : 'text-gray-600 hover:bg-cyan-200'
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

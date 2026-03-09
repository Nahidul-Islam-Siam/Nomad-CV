'use client';

import React, { ReactNode, useState } from 'react';
import logo from '@/assets/logo/logo.png';
import { MenuOutlined, CloseOutlined, DownOutlined } from '@ant-design/icons';
import { Layout, Menu, Dropdown, Avatar, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/features/auth';
import { useRouter } from 'next/navigation';
import { RootState } from '@/redux/store';
import { useGetUserQuery } from '@/redux/service/profileData';

interface MenuItem {
  key: React.Key;
  label: ReactNode;
  href?: string;
  icon?: ReactNode;
  children?: MenuItem[];
}

const { Header, Content, Sider } = Layout;
const { Text } = Typography;

const AdminLayout: React.FC<{ children: ReactNode; menu: MenuItem[] }> = ({
  children,
  menu,
}) => {
  const router = useRouter();
  const { data } = useGetUserQuery();
  const imageUrl = data?.data?.profile?.Image?.[0]?.url;
  const sign = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedKey, setSelectedKey] = useState('/dashboard');

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  const handleClick = ({ key }: { key: string }) => {
    setSelectedKey(key);
    // Optional: Close sidebar after clicking a menu item on mobile
    if (window.innerWidth < 1024) {
      setOpen(false);
    }
  };

  const avatarMenuItems = [
    {
      key: 'logout',
      label: (
        <Text onClick={handleLogout} strong style={{ color: '#ff4d4f' }}>
          Log Out
        </Text>
      ),
    },
  ];

  return (
    <Layout style={{ height: '100vh' }}>
      {/* Sidebar */}
      <Sider
        width={220}
        className={`!bg-white !overflow-y-auto !fixed lg:!static h-full z-50 transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
        theme="light"
        collapsed={false}
      >
        {/* Sidebar Header with Logo & Close Button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <Link href="/" className="flex items-center">
            <Image
              className="w-[180px]"
              width={130}
              height={40}
              src={logo}
              alt="logo"
            />
          </Link>

          {/* Close Button (Visible only on mobile) */}
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden p-2 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Close sidebar"
          >
            <CloseOutlined className="text-lg text-gray-700" />
          </button>
        </div>

        {/* Menu */}
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={handleClick}
          items={menu}
          style={{
            backgroundColor: '#ffffff',
            fontWeight: 500,
          }}
          inlineIndent={16}
          rootClassName="custom-sidebar"
          className="border-none space-y-1 px-2 py-4"
        />
      </Sider>

      {/* Main Layout */}
      <Layout>
        {/* Top Header */}
        <Header
          style={{
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            rowGap: '12px',
            marginBottom: '24px',
          }}
          className="bg-white shadow-sm px-4 sm:px-6"
        >

              {/* Mobile Menu Toggle */}
          <MenuOutlined
            onClick={() => setOpen(true)}
            className="block lg:hidden text-xl text-gray-700 "
          />
          {/* Welcome Title */}
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold hidden sm:block">
            Welcome back!
          </h2>

      

          {/* Avatar & Dropdown */}
          <div className="flex items-center gap-3">
            <Dropdown menu={{ items: avatarMenuItems }} trigger={['click']} placement="bottomRight">
              <div className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors min-w-[160px]">
                <Avatar
                  src={
                    imageUrl ||
                    'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=400&h=400&q=80'
                  }
                  size={40}
                  className="border-2 border-gray-200"
                />
                <div className="flex flex-col leading-tight">
                  <Text strong className="text-gray-800 text-xs md:text-sm">
                    {sign?.name}
                  </Text>
                  <Text type="secondary" className="text-xs text-gray-600">
                    {sign?.role}
                  </Text>
                </div>
                <DownOutlined className="text-gray-500 text-[10px]" />
              </div>
            </Dropdown>
          </div>
        </Header>

        {/* Page Content */}
        <Content
          className="!overflow-y-auto !overflow-x-hidden"
          onClick={() => setOpen(false)} // Close sidebar when clicking content (mobile)
          style={{ padding: '24px', height: '100%' }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
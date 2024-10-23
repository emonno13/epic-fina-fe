'use client';

import ProfileDropdown from '@components/molecules/ProfileDropdown';
import useScreen from '@hooks/useScreen';
import { useLogout } from '@refinedev/core';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { appActions, selectSiderCollapsed } from '@store/slices/app.slice';
import { selectUser } from '@store/slices/user.slice';
import { Avatar, Layout } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const { Header } = Layout;

interface IAppHeader {
  onClickNew?: () => void;
  fixedHeader?: boolean;
  isShowBuggerButon?: boolean;
  isShowAddButton?: boolean;
}

export const ProfileAvatar = styled(Avatar)`
  &.ant-avatar {
    background-color: #efcd55;
    border: 1px solid #f0f5f7;
  }
`;

export const AppHeader: React.FC<IAppHeader> = ({ isShowBuggerButon = true, fixedHeader = false }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { mutate: logout } = useLogout();
  const { isMobile, isTablet } = useScreen();

  const siderCollapsed = useAppSelector(selectSiderCollapsed);

  const toggleSider = () => dispatch(appActions.toggleCollapse(!siderCollapsed));

  return (
    <>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          height: isMobile || isTablet ? '64px' : '72px',
          alignItems: 'center',
          padding: '0px',
        }}
        className='!bg-[#F9F9F9] flex'
      >
        {/* MOBILE */}
        <div className='mx-auto flex lg:hidden w-full h-full items-center justify-between py-[12px] px-[16px] bg-white [border-bottom:1px_solid_#E2E8F0]'>
          <Image
            alt='burger-icon'
            height={32}
            width={32}
            className='flex hover:cursor-pointer'
            src='/icon/burger.svg'
            onClick={toggleSider}
          />
          <Image
            className='object-contain hover:cursor-pointer'
            width={24}
            height={24}
            src='/icon/edit 1.png'
            alt='new-conversation'
            onClick={() => router.push('/')}
          />
        </div>
        {/* DESKTOP */}
        <div className='lg:flex items-center justify-end p-[16px] hidden bg-white w-full h-full [border-bottom:1px_solid_#E2E8F0]'>
          <ProfileDropdown />
        </div>
      </Header>
    </>
  );
};

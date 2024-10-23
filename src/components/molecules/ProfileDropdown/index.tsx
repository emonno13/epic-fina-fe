import { LogoutSvgIcon02 } from '@components/app-icon/svgIcon/logoutSvgIcon';
import { useLogout } from '@refinedev/core';
import { useAppSelector } from '@store/hook';
import { selectUser } from '@store/slices/user.slice';
import cn, { getInitials } from '@utils';
import { Avatar, Dropdown } from 'antd';
import Image from 'next/image';
import styled from 'styled-components';

const ProfileDropdown = () => {
  const user = useAppSelector(selectUser);
  const { mutate: logout } = useLogout();

  const items = [
    {
      label: (
        <div className='flex flex-col '>
          {/* <div
            className='flex flex-row gap-x-2 items-center p-4 hover:bg-[rgba(0,0,0,0.06)] rounded-t-[10px]'
            onClick={() => {
              navigate('/profile');
            }}
          >
            {user?.avatar ? (
              <Image
                src={user?.avatar}
                className='!w-[48px] !h-[48px] rounded-full object-cover'
                alt='avatar'
                fallback={DefaultAvatar}
                preview={false}
              />
            ) : null}
            {!user?.avatar ? (
              <div className='w-[48px] h-[48px] rounded-full bg-[#EFCD55] text-[white] font-bold leading-[24px] text-[20px] grid place-items-center'>
                {getInitials(user?.full_name || 'A')}
              </div>
            ) : null}
            <div className='flex flex-col gap-x-[8px]'>
              <p className='text-[#2D3C58] font-bold leading-[24px] text-[16px] truncate max-w-[200px] m-0'>
                {user?.full_name}
              </p>
              <p className='text-[#00000099] text-[13px] leading-[15px] truncate max-w-[200px] m-0'>
                {user?.company?.name || 'Tài khoản cá nhân'}
              </p>
            </div>
          </div> */}
          {/* <div className='w-full bg-[#D4D7E4] h-[1px]' /> */}
          <div
            className='flex flex-row gap-x-5 items-center p-4 hover:bg-[rgba(0,0,0,0.06)] rounded-b-[10px]'
            onClick={() => {
              logout();
            }}
          >
            <div className='flex h-fit w-fit hover:cursor-pointer'>
              <LogoutSvgIcon02 />
            </div>
            <p className='text-[16px] font-medium leading-[19px] m-0'>Đăng xuất</p>
          </div>
        </div>
      ),
      key: '0',
      onClick: () => {},
    },
  ];
  return (
    <HeaderProfile className={cn('h-fit', {})}>
      <Dropdown menu={{ items }} trigger={['click']} overlayClassName='account-dropdown' placement='bottomRight'>
        <a className='h-full' onClick={(e) => e.preventDefault()}>
          <div className='flex flex-row items-center gap-x-[12px]'>
            {user?.avatar ? (
              <Image src={user?.avatar} className='w-[40px] h-[40px] rounded-[8px] object-cover' alt='avatar' />
            ) : null}
            {!user?.avatar ? (
              <div className='w-[40px] h-[40px] rounded-[8px] bg-[#EFCD55] text-[white] font-bold leading-[24px] text-[20px] grid place-items-center'>
                {getInitials(user?.full_name || 'A')}
              </div>
            ) : null}
            <Image src='/icon/arrow-down.svg' width={24} height={24} alt='arrow-down' />
          </div>
        </a>
      </Dropdown>
    </HeaderProfile>
  );
};

export const HeaderProfile = styled.div``;

export const ProfileAvatar = styled(Avatar)`
  &.ant-avatar {
    background-color: #efcd55;
    border: 1px solid #f0f5f7;
  }
`;

export default ProfileDropdown;

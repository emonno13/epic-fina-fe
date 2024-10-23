'use client';
import usePathname from '@hooks/usePathname';
import recoilStore from '@recoil-store';
import cn from '@utils';
import { Dropdown } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

export default function Header() {
  const router = useRouter();
  const pathName = usePathname();
  const [isShrunk, setIsShrunk] = useState(true);
  const [openCompanySignUpModal, setOpenCompanySignUpModal] = useRecoilState(
    recoilStore.openCompanySignUpModal,
  );
  const [openPartnerSignUpModal, setOpenPartnerSignUpModal] = useRecoilState(
    recoilStore.openPartnerSignUpModal,
  );

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 50) {
  //       setIsShrunk(true);
  //     } else {
  //       setIsShrunk(false);
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  return (
    <>
      {/* desktop */}
      <header
        className={cn(
          `fixed left-0 right-0 top-0 z-[99] mx-auto hidden w-full flex-row justify-between bg-[#FFFFFF] px-[24px] py-[18px] transition-all duration-700 xl:flex`,
          {
            'top-[20px] w-[70vw] min-w-[1042px] rounded-[50px] bg-[#FFFFFFB0] transition-all duration-700 [backdrop-filter:blur(8.899999618530273px)] [border:1px_solid_#20202012]':
              isShrunk,
          },
        )}
      >
        <div
          className="flex flex-row items-center gap-x-[10px]"
          onClick={() => {
            router?.push('/');
          }}
        >
          <Image
            className="hover:cursor-pointer"
            width={48}
            height={48}
            alt=""
            src="/logo/ivita-logo.png"
          />
          <Image
            className="hover:cursor-pointer"
            width={72}
            height={37}
            alt=""
            src="/logo/ivita-text-by-logo.png"
          />
        </div>
        <div className="flex flex-row items-center">
          {[
            {
              title: 'Về chúng tôi',
              href: '/',
              isActive: pathName === '/',
            },
            {
              title: 'Dành cho Doanh nghiệp',
              href: '/enterprise',
              isActive: pathName === '/enterprise',
            },
            { title: 'Trợ lý AI', href: 'https://ivita.vn/' },
            {
              title: 'Đối tác',
              href: '/partner',
              isActive: pathName === '/partner',
            },
          ].map((item: any, index: number) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                'px-[24px] py-[15px] text-[15px] font-medium leading-[18px] text-[#999999] no-underline hover:rounded-[62px] hover:bg-[#F4F4F4] hover:text-black',
                { 'rounded-[62px] bg-[#F4F4F4] text-black': item?.isActive },
              )}
            >
              {item.title}
            </Link>
          ))}
        </div>
        <AuthToggleButton />
      </header>
      {/* <div
        id="fake-desktop-header-id"
        className="hidden h-[84px] w-full xl:flex"
      /> */}
      {/* mobile - */}
      <header
        className={cn(
          `fixed left-0 right-0 top-0 z-[99] mx-auto flex w-full justify-between bg-[#FFFFFF] px-[20px] py-[15px] [box-shadow:0px_7px_10.5px_0px_#1E1E1E0A] xl:hidden`,
        )}
      >
        <div
          className="flex flex-row items-center gap-x-[10px]"
          onClick={() => {
            router?.push('/');
          }}
        >
          <Image
            className="hover:cursor-pointer"
            width={48}
            height={48}
            alt=""
            src="/logo/ivita-logo.png"
          />
          <Image
            className="hover:cursor-pointer"
            width={72}
            height={37}
            alt=""
            src="/logo/ivita-text-by-logo.png"
          />
        </div>
        <div className="flex flex-row gap-x-[12px]">
          <button
            className="text-medium h-[48px] w-[180px] rounded-[63px] border-none bg-[#1FB46E] text-center text-[17px] leading-[20px] text-white outline-none  [border:2px_solid_#FFFFFF26]"
            onClick={() => {
              window?.open('https://partner.ivita.vn', '_blank');
            }}
          >
            <p className="m-0">Cho doanh nghiệp</p>
          </button>
          <Dropdown
            dropdownRender={(menu) => (
              <>
                {openCompanySignUpModal || openPartnerSignUpModal ? (
                  <></>
                ) : (
                  <div className="flex flex-col gap-y-[22px] rounded-[11px] bg-white p-[16px] [border:1px_solid_#0000001A]">
                    {/*  */}
                    <AuthToggleButton />
                    {/*  */}
                    <div className="flex flex-col ">
                      {[
                        {
                          title: 'Về chúng tôi',
                          href: '/',
                          isActive: pathName === '/',
                        },
                        {
                          title: 'Doanh nghiệp',
                          href: '/enterprise',
                          isActive: pathName === '/enterprise',
                        },
                        {
                          title: 'Đối tác',
                          href: '/partner',
                          isActive: pathName === '/partner',
                        },
                      ].map((item: any, index: number) => (
                        <Link
                          key={index}
                          href={item.href}
                          className={cn(
                            'w-fit rounded-[10px] px-[24px] py-[16px] text-[18px] font-medium leading-[22px] text-[#000000] no-underline',
                            { 'w-full bg-[#27B6731C]': item?.isActive },
                          )}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                    {/*  */}
                    {/* <div className="flex flex-col gap-y-[7px]">
                      <p className="m-0 text-[12px] font-normal leading-[16px] text-[#00000094]">
                        Thiết lập ngôn ngữ{' '}
                      </p>
                      <LanguageSwitchButton />
                    </div> */}
                  </div>
                )}
              </>
            )}
          >
            <Image
              className="hover:cursor-pointer"
              width={48}
              height={48}
              alt=""
              src="/image/menu-button.png"
            />
          </Dropdown>
        </div>
      </header>
      <div
        id="fake-mobile-header-id"
        className="flex h-[78px] w-full xl:hidden"
      />
    </>
  );
}

const AuthToggleButton: React.FC = () => {
  const pathName = usePathname();
  const [isLogin, setIsLogin] = useState(false);

  const [openCompanySignUpModal, setOpenCompanySignUpModal] = useRecoilState(
    recoilStore.openCompanySignUpModal,
  );
  const [openPartnerSignUpModal, setOpenPartnerSignUpModal] = useRecoilState(
    recoilStore.openPartnerSignUpModal,
  );

  return (
    <div className="relative flex w-fit cursor-pointer flex-row items-center rounded-[63px] bg-[#1FB46E] p-[2px] text-[15px] font-medium leading-[18px]">
      {/* Animated sliding background */}
      <div
        className={`absolute left-0 top-0 h-full w-[50%] rounded-[63px] p-[4px] transition-transform duration-300 ease-in-out ${
          isLogin ? 'translate-x-full transform' : 'translate-x-0 transform'
        }`}
      >
        <div className="h-full w-full rounded-[35px] bg-white"></div>
      </div>

      <span
        onClick={() => {
          setIsLogin(false);
          setOpenCompanySignUpModal(true);
        }}
        className={`z-10 px-[27.5px] py-[13px] ${
          isLogin ? 'text-white' : 'text-black'
        }`}
      >
        Đăng ký
      </span>
      <span
        onClick={() => {
          setIsLogin(true);
          window?.open('https://partner.ivita.vn', '_blank');
        }}
        className={`z-10 flex h-fit w-fit rounded-[63px] px-[18px] py-[13px] ${
          isLogin ? 'text-black' : 'text-white'
        }`}
      >
        Đăng nhập
      </span>
    </div>
  );
};

const LanguageSwitchButton: React.FC = () => {
  const [isVietnamese, setIsVietnamese] = useState(true);

  const toggleLanguage = () => {
    setIsVietnamese(!isVietnamese);
  };

  return (
    <div
      className="relative flex w-fit cursor-pointer flex-row items-center gap-x-[4px] rounded-[63px] bg-[#EBEBEB] p-[4px] text-[12px] font-normal leading-[15.6px]"
      onClick={toggleLanguage}
    >
      {/* Animated sliding background */}
      <div
        className={`absolute left-0 top-0 h-full w-[50%] rounded-[63px] p-[4px] transition-transform duration-300 ease-in-out ${
          isVietnamese
            ? 'translate-x-0 transform'
            : 'translate-x-full transform'
        }`}
      >
        <div className="h-full w-full rounded-[35px] bg-black"></div>
      </div>

      <span
        className={`z-10 flex h-fit w-fit rounded-[63px] px-[13.5px] py-[4px] ${
          isVietnamese ? 'text-white' : 'text-black'
        }`}
      >
        VN
      </span>
      <span
        className={`z-10 px-[13.5px] py-[4px] ${
          !isVietnamese ? 'text-white' : 'text-black'
        }`}
      >
        EN
      </span>
    </div>
  );
};

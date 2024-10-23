import Image from 'next/image';
import Link from 'next/link';
import SubscribeNewsInput from '../molecules/subscribe-news-input';

export default function Footer() {
  return (
    <footer className="text-white">
      {/* info */}
      <div className="bg-[#171717] px-[24px] pb-[24px] pt-[40px] xl:px-0 xl:pb-[27px] xl:pt-[72px]">
        <div className="mx-auto flex max-w-[1312px] flex-col justify-between gap-y-[43px] xl:flex-row">
          {/* contact */}
          <div className="flex flex-col gap-y-[19px] xl:max-w-[310px] xl:gap-y-[26px]">
            <div className="flex flex-row items-center gap-x-[14px]">
              <Image
                className="hover:cursor-pointer"
                width={54}
                height={54}
                alt=""
                src="/logo/ivita-logo.png"
              />
              <Image
                className="hover:cursor-pointer"
                width={95.3}
                height={48.7}
                alt=""
                src="/logo/ivita-text-by-logo.png"
              />
            </div>
            <div className="flex flex-col gap-y-[12px] xl:gap-y-[16px]">
              <p className="text-normal m-0 text-[14px] leading-[24px] text-[#CCCCCC]">
                Địa chỉ: 1-1A-2 Tôn Đức Thắng, Phường Bến Nghé, Quận 1, Hồ Chí
                Minh
              </p>
              <p className="text-normal m-0 text-[14px] leading-[24px] text-[#CCCCCC]">
                Liên hệ: 0707 670 594
              </p>
              <p className="text-normal m-0 text-[14px] leading-[24px] text-[#CCCCCC]">
                Email: contact@ivita.vn
              </p>
            </div>
            <div className="flex flex-row gap-x-[16px]">
              {[
                {
                  link: 'https://www.facebook.com/ivitalivewellwithai',
                  icon: '/icon/facebook.svg',
                },
                {
                  link: 'https://www.tiktok.com/@vita.livewell',
                  icon: '/icon/tiktok.svg',
                },
              ].map((item: any, index: number) => (
                <Link key={index} href={item.link} target="_blank">
                  <Image
                    className="hover:cursor-pointer"
                    width={32}
                    height={32}
                    alt={item.icon}
                    src={item.icon}
                  />
                </Link>
              ))}
            </div>
          </div>
          {/* menu */}
          <div className="grid grid-cols-[180px_180px] gap-y-[14px] xl:flex xl:flex-col">
            <p className="col-span-2 m-0 text-[24px] font-semibold leading-[18px]">
              Sơ đồ
            </p>
            {[
              {
                title: 'Về chúng tôi',
                href: '/',
              },
              {
                title: 'Trợ lý iVita',
                href: 'https://ivita.vn/',
              },
              {
                title: 'Dành cho Doanh nghiệp',
                href: '/enterprise',
              },
              {
                title: 'Gói sức khoẻ iVita',
                href: '/enterprise',
              },
              {
                title: 'Đối tác',
                href: '/partner',
              },
            ].map((item: any, index: number) => (
              <Link
                key={index}
                href={item.href}
                className="text-normal m-0 text-[14px] leading-[35px] text-[#CCCCCC]"
              >
                {item.title}
              </Link>
            ))}
          </div>
          {/* register news */}
          <div className="flex max-w-[492px] flex-col gap-y-[16px] xl:gap-y-[23px] ">
            {/*  */}
            <div className="flex flex-col gap-y-[14px] text-white">
              <p className="m-0 text-[17px] font-bold leading-[20px]">
                Đăng Ký Nhận Tin
              </p>
              <p className="m-0 text-[15px] font-normal leading-[22px]">
                Sức khoẻ hôm nay - Tương lai phía trước <br /> Hãy để iVita sát
                cánh cùng bạn trong mọi vấn đề xoay quanh sức khoẻ
              </p>
            </div>
            {/*  */}
            <SubscribeNewsInput />
            {/* <div className="flex h-[68px] w-full flex-row items-center justify-between rounded-[16px] bg-[#FFFFFF1A] p-[16px] [backdrop-filter:blur(24px)] xl:w-[492px]">
              <input
                type="text"
                id="input"
                className="text-normal h-full w-full border-none bg-transparent text-[16px] leading-[30px] text-white outline-none placeholder:text-[#AFAEAD]"
                required
                placeholder="Email nhận thông tin từ iVita"
              />
              <Image
                className="hover:cursor-pointer"
                width={48}
                height={48}
                alt="blur-send-icon"
                src="/icon/blur-send-icon.svg"
              />
            </div> */}
          </div>
        </div>
      </div>
      {/* copy right  */}
      <div className="grid place-items-center bg-[#1D1D1D] py-[12px]">
        <p className="m-0 text-[14px] font-normal leading-[24px]">
          © Copyright <span className="font-bold">iVita</span>. All Rights
          Reserved{' '}
        </p>
      </div>
    </footer>
  );
}

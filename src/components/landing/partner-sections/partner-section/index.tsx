import { ENTERPRISE_LOGO } from '@constants';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';

export default function PartnerSection() {
  return (
    <>
      <div className="w-full rounded-[10px] bg-[#FFFFFF]">
        <div className="mx-auto flex flex-col items-center justify-center gap-y-[24px] px-[20px] py-[28px] xl:py-[58px]">
          <p className="m-0 text-center text-[28px] font-bold leading-[32px] xl:max-w-[938px] xl:text-[40px] xl:font-semibold xl:leading-[54px]">
            Đối tác của iVita
          </p>

          <Marquee speed={100} direction="left">
            <div className="flex flex-row flex-wrap items-center justify-between gap-x-[20px]">
              {ENTERPRISE_LOGO.map((item: any, index) => (
                <Image
                  key={index}
                  className="mx-auto hover:cursor-pointer"
                  width={item.styles.width}
                  height={item.styles.height}
                  alt={item.link}
                  src={item.link}
                />
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </>
  );
}

import { ENTERPRISE_LOGO } from '@constants';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';

export default function PartnerSection() {
  return (
    <>
      <div className="rounded-[10px] bg-[#FFFFFF] [border:1px_solid_#0000000F] xl:mx-[10px]">
        <div className="mx-auto flex flex-col items-center justify-center gap-y-[24px] px-[20px] pb-[83px] pt-[52px]">
          <p className="m-0 text-[40px] font-semibold leading-[54px] text-black">
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

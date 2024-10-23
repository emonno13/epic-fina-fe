import Image from 'next/image';

export default function SubscribingSection() {
  return (
    <>
      <div className="bg-family bg-cover bg-center">
        <div className="h-full w-full bg-[#000000BD]">
          <div className="mx-auto flex max-w-[1083px] flex-col items-center justify-between gap-y-[61px] px-[20px] py-[50px] lg:py-[148px] xl:flex-row">
            {/*  */}
            <div className="flex flex-col gap-y-[12px] text-white">
              <p className="m-0 text-[28px] font-bold leading-[33px] xl:text-[40px] xl:leading-[47px]">
                Đăng Ký Nhận Tin
              </p>
              <p className="m-0 text-[16px] font-normal leading-[24px]">
                Sức khoẻ hôm nay - Tương lai phía trước <br /> Hãy để iVita sát
                cánh cùng bạn trong mọi vấn đề xoay quanh sức khoẻ
              </p>
            </div>
            {/*  */}
            <div className="flex h-[68px] w-full flex-row items-center justify-between rounded-[16px] bg-[#FFFFFF1A] p-[16px] [backdrop-filter:blur(24px)] xl:w-[490px]">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

'use client';
import recoilStore from '@recoil-store';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import { useRecoilState } from 'recoil';

export default function IntroductionSection() {
  const [openCompanySignUpModal, setOpenCompanySignUpModal] = useRecoilState(
    recoilStore.openCompanySignUpModal,
  );

  return (
    <>
      <div className="rounded-[10px] bg-[#F3FAFF] px-[23px] py-[33px] [border:1px_solid_#0000000F] xl:mx-[10px] xl:px-0 xl:pt-[150px]">
        {/* ------------------------------- CONTENT */}
        <div className="mx-auto mb-[29px] flex max-w-[1300px] flex-col items-center justify-around gap-y-[24px] xl:mb-[83px] xl:flex-row">
          {/*  */}
          <div className="flex flex-col gap-y-[18px]">
            <p className="m-0 text-[28px] font-bold leading-[32px] text-black xl:text-[56px] xl:leading-[76px]">
              Bạn đang lo lắng về <br /> sức khoẻ doanh nghiệp?{' '}
            </p>
            <p className="m-0 max-w-[542px] text-[15px] font-medium leading-[18px] text-black">
              Hãy để iVita đồng hành cùng doanh nghiệp của bạn trong việc chăm
              sóc và sẻ chia mọi vấn đề liên quan đến sức khoẻ một các ưu việt.
            </p>
            <button
              className="text-medium mt-[18px] h-fit w-fit rounded-[63px] border-none bg-[#1FB46E] px-[49px] py-[15px] text-[17px] leading-[18px] text-white outline-none hover:cursor-pointer"
              onClick={() => {
                setOpenCompanySignUpModal(true);
              }}
            >
              Đăng ký
            </button>
          </div>
          {/*  */}
          <Image
            alt="doctor-by-chat"
            width={542}
            height={542}
            className="h-[390px] w-[390px] rounded-[30px] object-contain xl:h-[542px] xl:w-[542px]"
            priority
            src="/image/doctor-by-chat.webp"
          />
        </div>

        {/* ------------------------------- MARQUEES */}
        <Marquee speed={100} direction="left">
          <div className="mr-[8px] flex flex-row gap-x-[8px]">
            {questions.map((item: any, index) => (
              <div
                key={index}
                className="flex h-fit w-fit flex-row items-center justify-between gap-x-[10px] rounded-[9px] bg-[#1FB46E] px-[28px] py-[24px]"
              >
                <p className="m-0 text-[16px] font-semibold leading-[22px] text-[#FFFFFF]">
                  {item}
                </p>
                <Image
                  alt="go"
                  width={14}
                  height={14}
                  src="/icon/go.svg"
                  className=""
                />
              </div>
            ))}
          </div>
        </Marquee>
        <Marquee speed={100} direction="right" className="mb-[19px] mt-[8px]">
          <div className="mr-[8px] flex flex-row gap-x-[8px]">
            {questions.map((item: any, index) => (
              <div
                key={index}
                className="flex h-fit w-fit flex-row items-center justify-between gap-x-[10px] rounded-[9px] bg-[#1FB46E] px-[28px] py-[24px]"
              >
                <p className="m-0 text-[16px] font-semibold leading-[22px] text-[#FFFFFF]">
                  {item}
                </p>
                <Image
                  alt="go"
                  width={14}
                  height={14}
                  src="/icon/go.svg"
                  className=""
                />
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </>
  );
}

const questions: string[] = [
  'Làm thế nào hạn chế tình trạng nghỉ bệnh trong doanh nghiệp?',
  'Những căn bệnh hay gặp phải tại môi trường văn phòng?',
  'Cách khắc phục trạng thái tuột mood của nhân viên?',
  'Khám sức khoẻ định kỳ có ý nghĩa gì?',
  'Trợ lý sức khoẻ iVita làm được gì cho doanh nghiệp của tôi?',
  'Một năm cần khám sức khoẻ định kỳ bao nhiêu lần?',
  'Những biện pháp thúc đẩy tinh thần của nhân viên?',
  'Những hoạt động nào thúc đẩy tinh thần cả doanh nghiệp?',
  'Nhân viên nên được đăng ký những loại bảo hiểm nào?',
  'Như thế nào được gọi là nhân viên có sức khoẻ tốt?',
  'Những trạng thái cho biết nhân viên đang không ổn định về tinh thần',
  'Trà sữa có giúp tăng trạng thái tinh thần của nhân viên?',
  'Gợi ý các hoạt động/sự kiện thúc đẩy tinh thần',
  'Sức khoẻ doanh nghiệp như thế nào là ổn định?',
  'Những điều lưu ý về sức khoẻ doanh nghiệp',
  'Liệt kê danh sách những workshop/webinar/event về sức khoẻ doanh nghiệp',
  'Những chỉ số quan trọng trong sức khoẻ cá nhân',
  'Lý do vì sao uống sữa buổi sáng lại đau bụng?',
];

'use client';
import recoilStore from '@recoil-store';
import { useRecoilState } from 'recoil';

export default function IntroductionSection() {
  const [openCompanySignUpModal, setOpenCompanySignUpModal] = useRecoilState(
    recoilStore.openCompanySignUpModal,
  );

  return (
    <>
      <div className="rounded-[10px] bg-workspace  bg-cover bg-center xl:mx-[10px] xl:h-[calc(100vh_-_20px)] xl:px-0">
        <div className="flex h-full w-full bg-[#00000059] [backdrop-filter:blur(4px)] [border:1px_solid_#0000000F] xl:rounded-[10px] ">
          {/* ------------------------------- CONTENT */}
          <div className="mx-auto mb-[62px] mt-[62px] flex max-w-[1206px] flex-col items-center gap-y-[18px] text-white xl:mb-auto xl:mt-auto xl:gap-y-[26px]">
            <p className="m-0 text-center text-[28px] font-bold leading-[32px] xl:text-[56px] xl:font-semibold xl:leading-[66px]">
              Sức khoẻ nhân viên <br />
              Sự phát triển vững bền cho Doanh Nghiệp
            </p>
            <p className="m-0 max-w-[398px] text-center text-[16px] font-normal leading-[19px] xl:max-w-[922px]">
              Sự quan tâm đến sức khoẻ nhân viên sẽ góp phần tạo nên một môi
              trường làm việc khoẻ, trẻ hơn từng ngày. Từ đó thúc đẩy tiến độ
              công việc, đáp ứng đúng định hướng và mục tiêu của doanh nghiệp.
            </p>
            <button
              className="text-medium mx-auto h-fit w-fit rounded-[63px] border-none bg-[#1FB46E] px-[86px] py-[15px] text-[15px] leading-[18px] text-white outline-none"
              onClick={() => {
                setOpenCompanySignUpModal(true);
              }}
            >
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

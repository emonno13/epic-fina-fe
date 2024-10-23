'use client';
import recoilStore from '@recoil-store';
import { useRecoilState } from 'recoil';

export default function IntroductionSection() {
  const [openPartnerSignUpModal, setOpenPartnerSignUpModal] = useRecoilState(
    recoilStore.openPartnerSignUpModal,
  );

  return (
    <>
      <div className="bg-greentea bg-cover bg-center xl:mx-[10px] xl:h-[calc(100vh_-_20px)] xl:rounded-[10px] xl:px-0">
        <div className="flex h-full w-full rounded-[10px] [border:1px_solid_#0000000F] ">
          {/* ------------------------------- CONTENT */}
          <div className="mx-auto mb-[62px] mt-[62px] flex max-w-[1206px] flex-col items-start gap-y-[26px] text-black xl:mx-[158px] xl:mb-auto xl:mt-auto xl:gap-y-[26px]">
            <p className="m-0 text-start text-[28px] font-bold leading-[32px] xl:text-[56px] xl:font-semibold xl:leading-[66px]">
              Đối tác tin cậy <br />
              lan toả cuộc sống khoẻ
            </p>
            <p className="m-0 max-w-[398px] text-start text-[16px] font-normal leading-[19px] xl:max-w-[922px]">
              Chúng tôi luôn khao khát được kết nối với những đối tác chung mục
              tiêu, lan tỏa giá trị sống khoẻ, sống trẻ cho cộng đồng. Hãy cùng
              ivita tạo ra những bước đột phá, biến việc chăm sóc sức khỏe thành
              hiện thực thiết yếu cho xã hội.
            </p>
            <button
              className="text-medium h-fit w-fit rounded-[63px] border-none bg-[#1FB46E] px-[28px] py-[15px] text-[15px] leading-[18px] text-white outline-none hover:cursor-pointer"
              onClick={() => {
                setOpenPartnerSignUpModal(true);
              }}
            >
              Đăng ký trở thành đối tác
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

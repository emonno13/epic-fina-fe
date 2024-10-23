'use client';
import recoilStore from '@recoil-store';
import Image from 'next/image';
import { useRecoilState } from 'recoil';

export default function PartnerTypeSection() {
  const [openPartnerSignUpModal, setOpenPartnerSignUpModal] = useRecoilState(
    recoilStore.openPartnerSignUpModal,
  );

  return (
    <>
      <div className="mx-[10px] flex flex-col items-center gap-y-[24px] py-[48px] xl:py-[52px]">
        <p className="m-0 text-center text-[28px] font-bold leading-[32px] xl:max-w-[938px] xl:text-[40px] xl:font-semibold xl:leading-[54px]">
          Đối tác đồng hành
        </p>
        <div className="grid grid-cols-1 gap-x-[24px] gap-y-[42px] xl:grid-cols-2">
          {PARTNER_TYPE.map((item: any, index: number) => (
            <div
              key={index}
              className={`flex h-[332px] w-full flex-col items-center justify-between rounded-[30px] px-[20px] py-[32px] text-center ${item.styles.containerBg} [box-shadow:0px_0px_6px_0px_#00000026] xl:w-[556px] `}
            >
              <div>
                <Image
                  alt={item.icon}
                  src={item.icon}
                  className=""
                  width={68}
                  height={72}
                />
                <p className="m-0 mt-[11px] text-[20px] font-medium leading-[19px]">
                  {item.title}
                </p>
                <p className="m-0 mt-[16px] text-[16px] font-normal leading-[19px] text-[#404040]">
                  {item.content}
                </p>
              </div>
              <button
                className={`text-medium mx-auto h-fit w-fit rounded-[63px] border-none ${item.styles.btnBg} px-[51px] py-[15px] text-[15px] leading-[18px] text-white outline-none hover:cursor-pointer`}
                onClick={() => {
                  setOpenPartnerSignUpModal(true);
                }}
              >
                Đăng ký
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const PARTNER_TYPE = [
  {
    title: 'Nhà cung cấp thực phẩm bổ sung',
    content:
      'Với mục tiêu cùng nhau mang đến sự hỗ trợ sức khỏe toàn diện và tối ưu nhất cho khách hàng và doanh nghiệp. iVita đang tìm kiếm các nhà cung cấp thực phẩm bổ sung đồng hành và cùng nhau xây dựng hệ sinh thái bền vững.',
    icon: '/logo/nha-cung-cap-thuc-pham-bo-sung.png',
    styles: {
      btnBg: 'bg-[#1FB46E]',
      containerBg: 'bg-gradient-green',
    },
  },
  {
    title: 'Chuyên gia sức khoẻ',
    content:
      'iVita mong muốn hợp tác cùng các chuyên gia và huấn luyện viên sức khỏe, cùng nhau tạo ra cộng đồng sống khoẻ, sống trẻ cho khách hàng và doanh nghiệp.',
    icon: '/logo/chuyen-gia-suc-khoe.png',
    styles: {
      btnBg: 'bg-[#1F35B4]',
      containerBg: 'bg-gradient-purple',
    },
  },
  {
    title: 'Dịch vụ thăm khám tại nhà',
    content:
      'iVita đang tìm kiếm cái bắt tay hợp tác với các đơn vị cung cấp dịch vụ thăm khám tại nhà, cùng nhau mang đến sự linh hoạt tối đa trong chăm sóc sức khỏe, giúp khách hàng an tâm với chất lượng dịch vụ ngay tại chính ngôi nhà của mình.',
    icon: '/logo/dich-vu-kham-tai-nha.png',
    styles: {
      btnBg: 'bg-[#388EFF]',
      containerBg: 'bg-gradient-blue',
    },
  },
  {
    title: 'Dịch vụ tư vấn tâm lý',
    content:
      '"Cùng nhau mang đến sự tư vấn tận tâm, giúp khách hàng giải tỏa những mớ rối trong tâm trí và tìm lại sự bình yên trong cuộc sống" chính là tiêu chí hợp tác mà iVita muốn hướng đến khi tìm kiếm các đơn vị tư vấn tâm lý.',
    icon: '/logo/dich-vu-tu-van-tam-ly.png',
    styles: {
      btnBg: 'bg-[#CE3D6B]',
      containerBg: 'bg-gradient-red',
    },
  },
];

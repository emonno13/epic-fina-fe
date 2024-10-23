import Image from 'next/image';

export default function BenefitSection() {
  return (
    <>
      <div className="rounded-[10px] px-[16px] py-[48px] pt-[48px] xl:mx-[10px] xl:px-[24px] xl:py-[86px] xl:[border:1px_solid_#0000000F]">
        {/* ------------------------------- CONTENT */}
        <div className="mx-auto flex flex-col items-center gap-y-[42px]">
          <p className="m-0 text-center text-[28px] font-bold leading-[32px] xl:max-w-[938px] xl:text-[40px] xl:font-semibold xl:leading-[54px]">
            Cùng iVita quan tâm sức khoẻ với những phúc lợi dành cho nhân viên
            của bạn
          </p>
          <div className="inVisible-scroll flex max-w-full flex-row gap-x-[24px] overflow-auto p-[4px]">
            {BENEFITS.map((item: any, index: number) => (
              <div
                key={index}
                className="flex h-[271px] min-h-[271px] w-[313px] min-w-[313px] flex-col items-center rounded-[30px] px-[20px] py-[28px] text-center [background:linear-gradient(180deg,#FFFFFF29_16%,#1FB46E01_48%)]  [box-shadow:0px_0px_6px_0px_#00000026]"
              >
                <Image
                  alt={item.icon}
                  src={item.icon}
                  className=""
                  width={68}
                  height={72}
                />
                <p className="m-0 mt-[11px] text-[17px] font-medium leading-[19px]">
                  {item.title}
                </p>
                <p className="m-0 mt-[16px] text-[16px] font-normal leading-[19px]">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const BENEFITS = [
  {
    title: 'Tham Gia Bảo Hiểm',
    content:
      'Chúng tôi bảo vệ cuộc sống vẹn toàn cho nhân viên của bạn thông qua những quyền lợi bảo hiểm.',
    icon: '/logo/benefit-1.png',
  },
  {
    title: 'Khám - Xét Nghiệm - Tư Vấn',
    content:
      'iVita chăm sóc tận tình từ thể chất đến tinh thần cho doanh nghiệp thông qua việc khám, xét nghiệm tân dịch, tư vấn với các chuyên gia.',
    icon: '/logo/benefit-2.png',
  },
  {
    title: ' Tham gia các sự kiện \n workshop/webinar',
    content:
      'Chúng tôi liên kết với các đối tác tổ chức những buổi event/workshop/webinar về sức khoẻ tâm lý và thể chất dành cho phía doanh nghiệp.',
    icon: '/logo/benefit-3.png',
  },
  {
    title: (
      <>
        Chương trình hậu mãi <br /> cho doanh nghiệp
      </>
    ),
    content:
      'Mang đến những quyền lợi hậu mãi cho toàn thể nhân viên của doanh nghiệp để mang lại nhiều niềm vui trong cuộc sống.',
    icon: '/logo/benefit-4.png',
  },
];

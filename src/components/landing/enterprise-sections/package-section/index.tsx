import Image from 'next/image';

export default function PackageSection() {
  return (
    <>
      <div className="flex flex-col items-center gap-y-[24px] xl:mx-[10px] xl:py-[86px]">
        {/* ------------------------------- CONTENT */}
        <p className="m-0 text-[40px] font-semibold leading-[54px]">
          Các gói sức khoẻ iVita
        </p>
        <div className="flex flex-col gap-[24px] xl:flex-row">
          {PACKAGES.map((item: any, index: number) => (
            <div
              key={index}
              className={`flex h-[548px] flex-col justify-between rounded-[22px] px-[26px] py-[18px] ${item.styles.border} ${item.styles.shadow} ${item.styles.bg}`}
            >
              <div className="flex flex-col gap-y-[24px]">
                <div className="flex flex-row justify-between">
                  <div
                    className={`h-fit w-fit rounded-[16px] px-[20px] py-[10px] text-[20px] font-medium leading-[20px] text-white ${item.styles.bgType}`}
                  >
                    {item.type}
                  </div>
                  {item.icon ? (
                    <Image
                      src={item.icon}
                      alt={item.icon}
                      width={28}
                      height={28}
                      className=""
                    />
                  ) : (
                    <div />
                  )}
                </div>
                <div>
                  <p
                    className={`m-0 text-[32px] font-semibold leading-[35px] text-black`}
                  >
                    {item.title}
                  </p>
                  <p className="m-0 mt-[11px] text-[20px] font-semibold leading-[22px] text-[#00000082]">
                    Liên hệ để biết thêm chi tiết
                  </p>
                </div>
                <div className="h-[1px] w-full bg-[#EEEEEE]" />
                <div className="flex flex-col gap-y-[24px]">
                  <div className="flex flex-col gap-y-[12px]">
                    {item.feature.map((feature: any, index: number) => (
                      <div key={index} className="flex flex-row gap-x-[12px]">
                        <Image
                          src={item.doneIcon}
                          alt={item.doneIcon}
                          width={28}
                          height={28}
                          className=""
                        />
                        <p className="text-[16px] font-normal leading-[22px]">
                          {feature}
                        </p>
                      </div>
                    ))}
                    <p className="m-0 text-[16px] leading-[24px] text-[#565656]">
                      (Bao gồm: tham gia bảo hiểm nhân thọ )
                    </p>
                  </div>
                </div>
              </div>
              <a href="tel:+0707670594">
                <button
                  className={`rounded-[62px] border-none px-[111px] py-[18px] outline-none ${item.styles.textBtnColor} ${item.styles.borderBtn} ${item.styles.bgBtn}`}
                >
                  Liên hệ ngay
                </button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const PACKAGES = [
  {
    type: 'Cơ bản',
    title: 'Sẻ Chia',
    feature: [
      'Khám định kỳ cho toàn thể nhân viên',
      'Tặng gói bảo hiểm sức khoẻ (12 tháng)',
    ],
    styles: {
      bg: 'bg-[#FFFFFF]',
      bgType: 'bg-[#1FB46E]',
      textBtnColor: 'text-[#1FB46E]',
      borderBtn: '[border:1px_solid_#0000001A]',
      bgBtn: 'bg-white',
      shadow: '[box-shadow:0px_0px_15.1px_0px_#0000000F]',
      border: '[border:1px_solid_#0000001F]',
    },
    doneIcon: '/icon/green-lime-done-icon.svg',
    icon: null,
  },
  {
    type: 'Tiêu chuẩn',
    title: 'Đồng Hành',
    feature: [
      'Khám định kỳ cho toàn thể nhân viên',
      'Bộ voucher sống khoẻ',
      'Tặng gói dịch vụ chăm sóc người thân',
      'Tặng gói bảo hiểm sức khoẻ (12 tháng)',
    ],
    styles: {
      bg: 'bg-[#FFFFFF]',
      bgType: 'bg-[#1FB46E]',
      textBtnColor: 'text-[#1FB46E]',
      borderBtn: '[border:1px_solid_#0000001A]',
      bgBtn: 'bg-white',
      shadow: '[box-shadow:0px_0px_15.1px_0px_#0000000F]',
      border: '[border:1px_solid_#0000001F]',
    },
    doneIcon: '/icon/green-lime-done-icon.svg',
    icon: null,
  },
  {
    type: 'Nâng cao',
    title: 'Toàn Diện',
    feature: [
      'Khám định kỳ cho toàn thể nhân viên',
      'Bộ voucher sống khoẻ',
      'Tặng gói dịch vụ chăm sóc người thân',
      'Tặng gói bảo hiểm sức khoẻ (12 tháng)',
    ],
    styles: {
      bg: 'bg-[#FFFDF7]',
      bgType: 'bg-[#f5af00]',
      textBtnColor: 'text-white',
      borderBtn: '',
      bgBtn: '[background:linear-gradient(90deg,#FF9B3D_0%,#FFCD04_100%)]',
      shadow: '',
      border: 'gradient-border-yellow-1',
    },
    doneIcon: '/icon/yellow-done-icon.svg',
    icon: '/icon/bling-bling-icon.svg',
  },
];

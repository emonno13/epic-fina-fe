'use client';

import cn from '@utils';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useState } from 'react';
const AutoplayVideo = dynamic(
  () => import('@components/molecules/autoplay-video'),
  { ssr: false },
);

export default function FeatureSection() {
  const [feature, setFeature] = useState<any>(FEATURES.ASSISTANT);

  return (
    <>
      <div className="rounded-[10px] bg-[#FFFFFF] xl:mx-[10px]">
        <div className="mx-auto max-w-[1300px] px-[20px] py-[60px] xl:py-[148px]">
          {/* DESKTOP */}
          <div className="hidden flex-row items-center justify-between xl:flex">
            {/*  */}
            <div className="flex flex-col gap-y-[16px]">
              {Object.keys(features).map((key: any, index: number) => (
                <p
                  key={index}
                  className={cn(
                    'prevent-select m-0 text-[16px] font-semibold leading-[24px] text-black hover:cursor-pointer',
                    { 'text-[#1FB46E]': feature === key },
                  )}
                  onClick={() => setFeature(key)}
                >
                  {features[key].title}
                </p>
              ))}
            </div>
            {/*  */}
            <div className="flex flex-col gap-y-[26px]">
              <Image
                className="hover:cursor-pointer"
                width={features[feature].iconStyles.width}
                height={features[feature].iconStyles.height}
                alt={features[feature].title}
                src={features[feature].iconUrl}
              />
              <div className="flex flex-col gap-y-[4px]">
                <p className="text-semibold m-0 max-w-[398px] text-[40px] leading-[54px]">
                  {features[feature].mainTitle}
                </p>
                <div className="text-normal m-0 max-w-[418px] text-[16px] leading-[25px]">
                  {features[feature].content}
                </div>
              </div>
            </div>
            {/*  */}
            {features[feature]?.componentReplaceVideoPosition ? (
              <>{features[feature]?.componentReplaceVideoPosition}</>
            ) : (
              <AutoplayVideo
                id={features[feature].title}
                src={features[feature].videoUrl}
                className="h-full max-h-[356px] w-full max-w-[610px] rounded-[12px] object-cover"
              />
            )}
          </div>
          {/* MOBILE */}
          <div className="flex flex-col gap-y-[54px] xl:hidden">
            {Object.keys(features).map((key: any, index: number) => (
              <div key={index} className="flex flex-col gap-y-[26px]">
                <Image
                  className="hover:cursor-pointer"
                  width={features[key].iconStyles.width}
                  height={features[key].iconStyles.height}
                  alt={features[key].title}
                  src={features[key].iconUrl}
                />
                <div className="flex flex-col gap-y-[4px]">
                  <p className="text-semibold m-0 text-[40px] leading-[54px]">
                    {features[key].mainTitle}
                  </p>
                  <div className="text-normal m-0 text-[16px] leading-[25px]">
                    {features[key].content}
                  </div>
                </div>
                {features[key]?.componentReplaceVideoPosition ? (
                  <>{features[key]?.componentReplaceVideoPosition}</>
                ) : (
                  <AutoplayVideo
                    id={features[key].title}
                    src={features[key].videoUrl}
                    className="h-full w-full rounded-[12px] object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const PROCESS_TYPES = [
  {
    title: 'Khám sức khoẻ định kỳ',
    content:
      'Chúng tôi khuyến khích sự quan tâm đến sức khoẻ từ các nhân viên trong doanh nghiệp. Mang đến chất lượng cuộc sống tốt hơn, cải thiện tinh thần làm việc và mang lại nhiều thành tựu vượt trội cho doanh nghiệp.',
    icon: '/logo/kham-dinh-ky.png',
    bg: 'bg-[#388EFF]',
  },
  {
    title: 'Xét nghiệm tổng quát',
    content:
      'Dựa vào xét nghiệm tân dịch, chúng tôi có thể đưa ra 12 chỉ số quan trọng mà nhân viên của doanh nghiệp cần biết để nắm tình hình bản thân. Hạn chế được nhiều vấn đề phát sinh không mong muốn.',
    icon: '/logo/xet-nghiem-tong-quat.png',
    bg: 'bg-[#1F35B4]',
  },
  {
    title: 'Tư vấn với chuyên gia',
    content:
      'Chúng tôi có một đội ngũ chuyên gia sức khoẻ luôn hỗ trợ trong quá trình hợp tác. Không chỉ tư vấn về thể trạng, thể chất mà đội ngũ chuyên gia còn có thể hỗ trợ tâm sự, chia sẻ và lắng nghe về mặt tinh thần, tâm lý cho nhân viên doanh nghiệp.',
    icon: '/logo/tu-van-voi-chuyen-gia.png',
    bg: 'bg-[#CE3D6B]',
  },
  {
    title: 'Triển khai kế hoạch sức khoẻ',
    content:
      'Hỗ trợ việc triển khai những định hướng, kế hoạch về sức khoẻ cho nhân viên doanh nghiệp nhằm mục đích mang lại cuộc sống vui, trẻ hơn mỗi ngày.',
    icon: '/logo/trien-khai-ke-hoach-suc-khoe.png',
    bg: 'bg-[#1FB46E]',
  },
];

enum FEATURES {
  ASSISTANT = 'ASSISTANT',
  PROCESS = 'PROCESS',
  AFTERMARKET = 'AFTERMARKET',
}

type TFeature = {
  title: string;
  mainTitle: string;
  iconUrl: string;
  content: string | React.ReactNode;
  videoUrl: string;
  iconStyles: {
    width: number;
    height: number;
  };
  componentReplaceVideoPosition?: React.ReactNode;
};

type TFeatures = {
  [key: string]: TFeature;
};

const features: TFeatures = {
  ASSISTANT: {
    title: 'iVita sát cánh 24/7',
    mainTitle: 'iVita sát cánh 24/7',
    iconUrl: '/icon/bling-bling-icon.svg',
    iconStyles: {
      width: 27.1,
      height: 33.41,
    },
    content: (
      <ul className="list-disc">
        <li>
          Chúng tôi xây dựng và phát triển tối ưu hệ thống toàn diện hỗ trợ
          doanh nghiệp xuyên suốt về sức khoẻ cho nhân viên.
        </li>
        <li>
          Hệ thống iVita còn kết nối với các thiết bị thông minh trong việc nhắc
          nhở và đề xuất cho nhân viên về tình hình sức khoẻ.
        </li>
      </ul>
    ),
    videoUrl: '/video/ivita-sat-canh-video.mp4',
  },
  PROCESS: {
    title: 'Quy trình khám',
    mainTitle: 'Khám - Xét Nghiệm - Tư vấn - Triển khai',
    iconUrl: '/icon/survey-icon.svg',
    iconStyles: {
      width: 29.12,
      height: 35.49,
    },
    content: (
      <ul className="m-0 list-disc text-[16px] leading-[25px]">
        <li>
          Chúng tôi xây dựng và phát triển tối ưu hệ thống toàn diện hỗ trợ
          doanh nghiệp xuyên suốt về sức khoẻ cho nhân viên.
        </li>
        <li>
          Hệ thống iVita còn kết nối với các thiết bị thông minh trong việc nhắc
          nhở và đề xuất cho nhân viên về tình hình sức khoẻ.
        </li>
      </ul>
    ),
    videoUrl: '',
    componentReplaceVideoPosition: (
      <div className="grid h-full w-full grid-cols-1 gap-x-[30px] gap-y-[21px] xl:max-w-[610px] xl:grid-cols-2">
        {PROCESS_TYPES.map((item: any, index: number) => (
          <div
            key={index}
            className={`flex h-[218px] w-full flex-col items-center rounded-[26px] px-[16px] py-[24px] xl:h-[259px] xl:w-[286px] ${item.bg} text-center text-white [box-shadow:0px_0px_5.22px_0px_#00000026]`}
          >
            <Image
              className="hover:cursor-pointer"
              width={59}
              height={59}
              alt={item.icon}
              src={item.icon}
            />
            <p className="m-0 text-[16px] font-black leading-[19px]">
              {item.title}
            </p>
            <p className="m-0 mt-[14px] text-[14px] font-normal leading-[17px]">
              {item.content}
            </p>
          </div>
        ))}
      </div>
    ),
  },
  AFTERMARKET: {
    title: 'Hậu mãi',
    mainTitle: 'Chương trình hậu mãi ',
    iconUrl: '/icon/heart-icon.svg',
    iconStyles: {
      width: 30,
      height: 35.8,
    },
    content: (
      <div className="flex flex-col text-[16px]">
        <p className="m-0 font-bold leading-[25px]">Bộ voucher sống khoẻ</p>
        <ul className="m-0 list-disc">
          <li>Vé xem phim</li>
          <li>Voucher siêu thị</li>
          <li>Dịch vụ thư giãn (spa, gội đầu dưỡng sinh, massage)</li>
        </ul>
        <p className="m-0 font-bold leading-[25px]">
          Dịch vụ chăm sóc người thân
        </p>
      </div>
    ),
    videoUrl: '/video/chuong-trinh-khuyen-mai-video.mp4',
  },
};

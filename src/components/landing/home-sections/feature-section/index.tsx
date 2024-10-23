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
      <div className="rounded-[10px] bg-[#FFFFFF] xl:mx-[10px] xl:[border:1px_solid_#0000000F]">
        <div className="mx-auto max-w-[1300px] px-[20px] py-[0px] xl:py-[148px]">
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
                <p className="text-semibold m-0 text-[40px] leading-[54px]">
                  {features[feature].title}
                </p>
                <p className="text-normal m-0 max-w-[418px] text-[16px] leading-[25px]">
                  {features[feature].content}
                </p>
              </div>
            </div>
            {/*  */}
            {features[feature].videoUrl ? (
              <AutoplayVideo
                id={features[feature].title}
                src={features[feature].videoUrl}
                className="h-full max-h-[356px] w-full max-w-[610px] rounded-[12px] object-cover"
              />
            ) : null}
            {features[feature].imageUrl ? (
              <Image
                alt={features[feature].title}
                height={356}
                width={356}
                src={features[feature].imageUrl}
                className="h-full max-h-[450px] w-full max-w-[610px] rounded-[12px] object-cover"
              />
            ) : null}
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
                    {features[key].title}
                  </p>
                  <p className="text-normal m-0 text-[16px] leading-[25px]">
                    {features[key].content}
                  </p>
                </div>
                {features[key].videoUrl ? (
                  <AutoplayVideo
                    id={features[key].title}
                    src={features[key].videoUrl}
                    className="h-full w-full rounded-[12px] object-cover"
                  />
                ) : null}
                {features[key].imageUrl ? (
                  <Image
                    alt={features[feature].title}
                    height={356}
                    width={356}
                    src={features[key].imageUrl}
                    className="h-full w-full rounded-[12px] object-cover"
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

enum FEATURES {
  ASSISTANT = 'ASSISTANT',
  HEALTH = 'HEALTH',
  ENTERPRISE = 'ENTERPRISE',
  CONSULTANT = 'CONSULTANT',
}

type TFeature = {
  title: string;
  iconUrl: string;
  content: string;
  videoUrl?: string;
  iconStyles: {
    width: number;
    height: number;
  };
  imageUrl?: string;
};

type TFeatures = {
  [key: string]: TFeature;
};

const features: TFeatures = {
  ASSISTANT: {
    title: 'Trợ lý AI 24/7',
    iconUrl: '/icon/bling-bling-icon.svg',
    iconStyles: {
      width: 27.1,
      height: 33.41,
    },
    content:
      'Sự kết hợp hoàn hảo giữa công nghệ AI và các chuyên gia về sức khoẻ. Mang đến một trợ lý AI toàn diện với những tính năng như: cung cấp thông tin với độ chính xác cao; tư vấn tâm lý và lời khuyên cho từng tình trạng sức khoẻ; liên kết trực tiếp với các thiết bị thông minh quanh bạn; thông báo và nhắc nhở theo thời gian thực.',
    videoUrl: '/video/tro-ly-ai-24-7-video.mp4',
  },
  HEALTH: {
    title: 'Chỉ số sức khoẻ',
    iconUrl: '/icon/heart-icon.svg',
    iconStyles: {
      width: 29.09,
      height: 26.89,
    },
    content:
      'iVita đã liên kết với đội ngũ chuyên gia sức khoẻ MyOptimalHealth phía Mỹ nhằm đưa ra 12 chỉ số quan trọng mà khách hàng cần biết và tư vấn lối sống lành mạnh cho từng tường hợp.',
    videoUrl: '/video/chi-so-suc-khoe-video.mp4',
  },
  ENTERPRISE: {
    title: 'Doanh nghiệp',
    iconUrl: '/icon/building-icon.svg',
    iconStyles: {
      width: 34.45,
      height: 31.23,
    },
    content:
      'Với mục tiêu hướng đến sức khoẻ bền vững cho phía các doanh nghiệp trong nước và thúc đẩy phát triển kinh tế. iVita đang mang đến nhiều quyền lợi hơn bất kỳ dịch vụ nào trên thị trường như: đăng ký các loại bảo hiểm, tổ chức các buổi workshop/webinar/event, xây dựng hệ thống ưu việt nhằm quản lý sức khoẻ và các chương trình hậu mãi hấp dẫn khác.',
    videoUrl: '/video/doanh-nghiep-video.mp4',
  },
  CONSULTANT: {
    title: 'Tư vấn xét nghiệm',
    iconUrl: '/icon/survey-icon.svg',
    iconStyles: {
      width: 29.12,
      height: 35.49,
    },
    content:
      'iVita đơn giản hoá quá trình xét nghiệm chỉ với 1 lần duy nhất bằng tân dịch. Hỗ trợ khách hàng từ khâu book lịch xét nghiệm cho đến khi nhận được phản hồi và tư vấn từ các chuyên gia trực thuộc iVita.',
    imageUrl: '/gif/ivita-process.gif',
  },
};

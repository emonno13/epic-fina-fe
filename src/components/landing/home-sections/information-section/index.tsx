import dynamic from 'next/dynamic';
const AutoplayVideo = dynamic(
  () => import('@components/molecules/autoplay-video'),
  { ssr: false },
);

export default function InformationSection() {
  return (
    <>
      <div className="rounded-[10px] bg-[#FFFFFF] xl:mx-[10px] xl:[border:1px_solid_#0000000F]">
        <div className="mx-auto flex max-w-[1300px] flex-col gap-y-[42px] px-[20px] py-[52px] xl:py-[90px]">
          <div className="flex flex-col gap-y-[4px]">
            <p className="m-0 text-[28px] font-semibold leading-[54px] text-black xl:text-[40px]">
              iVita là gì?
            </p>
            <p className="m-0 text-[16px] font-medium leading-[22px]">
              iVita - Trợ lý thông minh song hàng cùng người dùng trong việc cải
              thiện sức khoẻ và nâng cao chất lượng cuộc sống.
            </p>
          </div>

          <AutoplayVideo
            id="information-video-id"
            src="./video/introduction-video.mp4"
            className="h-full w-full rounded-[12px] object-cover"
          />
        </div>
      </div>
    </>
  );
}

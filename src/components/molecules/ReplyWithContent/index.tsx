import { CopySvgIcon } from '@components/app-icon/svgIcon/copySvgIcon';
import { DislikeActiveSvgIcon } from '@components/app-icon/svgIcon/dislikeActiveSvgIcon';
import { DislikeSvgIcon } from '@components/app-icon/svgIcon/dislikeSvgIcon';
import { LikeActiveSvgIcon } from '@components/app-icon/svgIcon/likeActiveSvgIcon';
import { LikeSvgIcon } from '@components/app-icon/svgIcon/likeSvgIcon';
import { RefreshSvgIcon } from '@components/app-icon/svgIcon/refreshSvgIcon';
import { IconButton } from '@components/atoms/iconButton';
import { LoadingText } from '@components/atoms/LoadingText';
import { Tooltip } from 'antd';
import Image from 'next/image';
import { PropsWithChildren, ReactNode, useState } from 'react';
import { DislikeMessageModal } from '../DislikeMessageModal';

interface Props {
  fromHuman: boolean;
  replying?: boolean;
  isSubmitting?: boolean;
  showContinue?: boolean;
  showRegenerate?: boolean;
  like?: boolean;
  dislike?: boolean;
  onLike?: () => void;
  onDislike?: (reason: string) => void;
  showReaction?: boolean;
  showActionButton?: boolean;
  siblingSwitch?: ReactNode;
  onRegenerate?: () => void;
  onContinue?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onCopy?: () => void;
  onShare?: () => void;
  onClearReaction?: () => void;
}

export const ReplyWithContent: React.FC<Props & PropsWithChildren> = ({
  fromHuman,
  replying,
  isSubmitting,
  showContinue,
  showRegenerate,
  siblingSwitch,
  onRegenerate,
  onContinue,
  onCopy,
  like: likeProps,
  dislike: dislikeProps,
  onLike,
  onDislike,
  onShare,
  showReaction = true,
  showActionButton,
  children,
  onClearReaction,
}) => {
  const [open, setOpen] = useState(false);
  const [like, setLike] = useState(Boolean(likeProps));
  const [dislike, setDislike] = useState(Boolean(dislikeProps));

  return (
    <>
      <div className='flex my-5 gap-2'>
        <div className='conversation-header flex-start'>
          <div className='w-[40px] h-[40px] rounded-[8px]'>
            <Image
              className='w-full h-full object-contain'
              width={40}
              height={40}
              src='/logo/rectangle-ivita-chat-logo.png'
              alt='rectangle-ivita-chat-logo'
            />
          </div>
        </div>
        <div className='abaii-reply base-shadow rounded-[14px] bg-[#ffffff] w-full'>
          {replying && (
            <div className='flex'>
              <LoadingText />
            </div>
          )}
          <div className='text-[#2D3C58] text-[17px] font-normal leading-[22px]'>
            <div className='lg:pr-[32px] text-[16px]'>{children}</div>
          </div>
          {/* ------------------------------- DIVIDER ------------------------------- */}
          {showActionButton ? <div className='mt-[20px] mb-[18px] h-[1px] w-full bg-[#00000012]' /> : null}
          {/* ------------------------------- GROUP BUTTON ------------------------------- */}
          <div className='action-block flex lg:flex-row gap-x-5'>
            {!showActionButton ? null : (
              <>
                {/* MOBILE */}
                <div className='flex lg:hidden flex-row rounded-[22px] px-[4px] [box-shadow:0px_0px_4px_0px_#0000001C] gap-x-[10px]'>
                  <IconButton
                    icon={like ? <LikeActiveSvgIcon /> : <LikeSvgIcon />}
                    onClick={() => {
                      if (like) {
                        onClearReaction?.();
                        setLike(false);
                        return;
                      }
                      setLike(true);
                      setDislike(false);
                      onLike?.();
                    }}
                  />
                  <div className='h-[20px] my-auto w-[1px] bg-[#7C7C7C40]' />
                  <IconButton
                    icon={dislike ? <DislikeActiveSvgIcon /> : <DislikeSvgIcon />}
                    onClick={() => {
                      if (dislike) {
                        onClearReaction?.();
                        setDislike(false);
                        return;
                      }
                      setOpen(true);
                    }}
                  />
                  <div className='h-[20px] my-auto w-[1px] bg-[#7C7C7C40]' />
                  <IconButton icon={<CopySvgIcon />} onClick={onCopy} />
                  {/* <div className='h-[20px] my-auto w-[1px] bg-[#7C7C7C40]' /> */}
                  {/* <IconButton icon={<ShareSvgIcon />} onClick={onShare} /> */}
                  <div className='h-[20px] my-auto w-[1px] bg-[#7C7C7C40]' />
                  <IconButton icon={<RefreshSvgIcon />} onClick={onRegenerate} />
                </div>
                {/* DESKTOP */}
                <div className='w-full hidden lg:flex justify-between'>
                  {/* reaction */}
                  <div className='flex items-center gap-x-2 '>
                    <div className='rounded-[22px] px-[4px] [box-shadow:0px_0px_4px_0px_#0000001C]'>
                      <Tooltip title={<div>Đồng ý</div>} overlayInnerStyle={{ width: '76px' }} color='#586379'>
                        <IconButton
                          icon={like ? <LikeActiveSvgIcon /> : <LikeSvgIcon />}
                          onClick={() => {
                            if (like) {
                              onClearReaction?.();
                              setLike(false);
                              return;
                            }
                            setLike(true);
                            setDislike(false);
                            onLike?.();
                          }}
                        />
                      </Tooltip>
                      <Tooltip title={<div>Không đồng ý</div>} overlayInnerStyle={{ width: '122px' }} color='#586379'>
                        <IconButton
                          icon={dislike ? <DislikeActiveSvgIcon /> : <DislikeSvgIcon />}
                          onClick={() => {
                            if (dislike) {
                              onClearReaction?.();
                              setDislike(false);
                              return;
                            }
                            setOpen(true);
                          }}
                        />
                      </Tooltip>
                      <Tooltip title={<div>Sao chép</div>} overlayInnerStyle={{ width: '89px' }} color='#586379'>
                        <IconButton icon={<CopySvgIcon />} onClick={onCopy} />
                      </Tooltip>
                    </div>
                    {/* share */}
                    {/* <div className='px-2 rounded-[22px] [box-shadow:0px_0px_4px_0px_#0000001C]'>
                      <Tooltip title={<div>Chia sẻ câu trả lời</div>} color='#586379'>
                        <div className='flex items-center'>
                          <span>Chia sẻ câu trả lời</span>
                          <IconButton icon={<ShareSvgIcon />} onClick={onShare} style={{}} />
                        </div>
                      </Tooltip>
                    </div> */}
                  </div>
                  {/* regenerate */}
                  <div className='flex px-3 rounded-[22px] text-[#586379] [box-shadow:0px_0px_4px_0px_#0000001C] cursor-pointer'>
                    <Tooltip title={<div>Trả lời lại</div>} color='#586379'>
                      <div className='flex items-center gap-x-[10px] flex-row my-auto' onClick={onRegenerate}>
                        <span>Trả lời lại</span>
                        <Image className='' width={20} height={20} src='/icon/refresh.png' alt='refresh' />
                      </div>
                    </Tooltip>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <DislikeMessageModal
        open={open}
        onCancel={() => setOpen(false)}
        onSuccess={(reason) => {
          setOpen(false);
          setLike(false);
          setDislike(true);
          onDislike?.(reason);
        }}
      />
    </>
  );
};

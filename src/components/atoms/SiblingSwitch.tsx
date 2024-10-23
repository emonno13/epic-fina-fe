import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { IconButton } from './iconButton';

export const SiblingSwitch = ({ siblingIdx, siblingCount, setSiblingIdx }: any) => {
  if (siblingIdx === undefined) {
    return null;
  } else if (siblingCount === undefined) {
    return null;
  }

  const previous = () => {
    setSiblingIdx && setSiblingIdx(siblingIdx - 1);
  };

  const next = () => {
    setSiblingIdx && setSiblingIdx(siblingIdx + 1);
  };

  return siblingCount > 1 ? (
    <div className='visible flex items-center justify-center gap-1 self-center pt-0 text-xs w-max'>
      <IconButton
        className='disabled:text-[#A2ACC0] dark:text-[#2D3C58] dark:disabled:text-[#A2ACC0]'
        onClick={previous}
        disabled={siblingIdx == 0}
        icon={<ChevronLeftIcon className='w-5 h-5' />}
      />
      <span className='flex-shrink-0 flex-grow tabular-nums text-[15px]'>
        {siblingIdx + 1} / {siblingCount}
      </span>
      <IconButton
        className='disabled:text-[#A2ACC0] dark:text-[#2D3C58] dark:disabled:text-[#A2ACC0]'
        onClick={next}
        disabled={siblingIdx == siblingCount - 1}
        icon={<ChevronRightIcon className='w-5 h-5' />}
      />
    </div>
  ) : null;
};

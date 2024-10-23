import { useAppSelector } from '@store/hook';
import { selectUser } from '@store/slices/user.slice';
import Image from 'next/image';
import { EditMessage } from '../EditMessage';

interface Props {
  avatar?: string;
  edit?: boolean;
  from?: string;
  question?: string;
  siblingSwitch?: React.ReactNode;
  onEdit?: () => void;
  isSubmitting?: boolean;
  ask: TAskFunction;
  message: TMessage;
  siblingIdx: number;
  enterEdit: (cancel: boolean) => void;
  setSiblingIdx: (value: number) => void;
  error?: boolean;
  unfinished?: boolean;
  isCreatedByUser?: boolean;
}

export const QuestionBlock: React.FC<Props> = ({
  from,
  question,
  siblingSwitch,
  edit: editing,
  isSubmitting,
  onEdit,
  ...props
}) => {
  const user = useAppSelector(selectUser);

  return (
    <div className='mb-4 text-left'>
      <div className='flex items-start justify-between'>
        {/* <UserOutlined style={{ fontSize: '40px', color: '#000000' }} /> */}
        {/* <div className='w-[40px] h-[40px] rounded-[25px] bg-white  flex items-center justify-center border border-[#E2E8F0]'>
          <img src='/user_avatar.png' style={{ width: '25px', height: '25px' }} />
        </div> */}
        {/* <div
          id='name-user-avatar'
          className='w-[40px] h-[40px] min-w-[40px] min-h-[40px] rounded-[8px] bg-[#EFCD55] text-[white] font-bold leading-[20px] text-[17px] grid place-items-center'
        >
          {getInitials(user?.full_name || 'U')}
        </div> */}
        <div className='w-[40px] h-[40px]' />
        <div
          className={`relative ml-2 p-5 rounded-[14px] max-w-[529px] ${
            editing ? 'bg-[#EAEAEA] ' : 'bg-[#ffffff]'
          } justify-center items-center ${editing ? 'w-full' : 'w-fit'} gap-x-[20px] flex flex-row`}
        >
          <div className='cursor-pointer' onClick={onEdit}>
            {editing ? null : <Image src='/icon/edit-2-1.svg' width={24} height={24} alt='edit-icon' />}
          </div>
          {/* {editing ? '' : <h3 className='font-medium'>{from}</h3>} */}
          {editing ? (
            <EditMessage text={question || ''} isSubmitting={Boolean(isSubmitting)} {...props} />
          ) : (
            <div className='text-black-1 text-[17px] markdown prose w-full break-words whitespace-pre-wrap pr-[26px]'>
              {question}
            </div>
          )}
        </div>
      </div>

      {/* <div className='bg-white base-shadow rounded-[20px] p-[12px] mt-[30px]'>
        <div className='flex'>
          {user?.full_name ? (
            <Avatar size='small' className='!w-[32px] !h-[32px] rounded-full bg-[#EFCD55]'>
              <span className='uppercase'>{getInitials(user?.full_name || '')}</span>
            </Avatar>
          ) : (
            <Avatar size='small' className='!w-[32px] !h-[32px] rounded-full bg-[#EFCD55]'>
              A
            </Avatar>
          )}
          <div className='flex flex-1 justify-between pl-[14px] pt-[6px] text-black text-[16px]'>
            <h3 className='font-medium'>{from}</h3>
            {!editing && !isSubmitting && (
              <IconButton
                className='!bg-[#F0F5F7] rounded-full !w-[28px] min-w-[28px] !h-[28px] !p-0'
                icon={<CustomIcon iconName='edit' size={16} />}
                onClick={onEdit}
              />
            )}
          </div>
        </div>
        {!editing && siblingSwitch && <div className='pl-[30px]'>{siblingSwitch}</div>}
      </div> */}
    </div>
  );
};

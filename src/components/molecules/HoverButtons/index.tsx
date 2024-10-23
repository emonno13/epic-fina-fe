import useGenerationsByLatest from '@hooks/useGenerationsByLatest';
import cn from '@utils';
import React, { useState } from 'react';

type THoverButtons = {
  isEditing: boolean;
  enterEdit: (cancel?: boolean) => void;
  copyToClipboard: (setIsCopied: React.Dispatch<React.SetStateAction<boolean>>) => void;
  isSubmitting: boolean;
  message: any;
  regenerate: () => void;
  handleContinue: (e: React.MouseEvent<HTMLButtonElement>) => void;
  latestMessage: any | null;
  isLast: boolean;
  index: number;
};

export default function HoverButtons({
  index,
  isEditing,
  enterEdit,
  copyToClipboard,
  isSubmitting,
  message,
  regenerate,
  handleContinue,
  latestMessage,
  isLast,
}: THoverButtons) {
  const [isCopied, setIsCopied] = useState(false);

  const { hideEditButton, regenerateEnabled, continueSupported } = useGenerationsByLatest({
    isEditing,
    isSubmitting,
    message,
    latestMessage,
  });

  const { role } = message;
  const isCreatedByUser = role === 'human';

  const onEdit = () => {
    if (isEditing) {
      return enterEdit(true);
    }
    enterEdit();
  };

  return (
    <div className=''>
      <button
        className={cn(
          'hover-button rounded-md p-1 text-gray-400 hover:text-gray-900 dark:text-gray-400/70 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400 md:group-hover:visible md:group-[.final-completion]:visible',
          isCreatedByUser ? '' : 'active',
          hideEditButton ? 'opacity-0' : '',
          isEditing ? 'active text-gray-700 dark:text-gray-200' : '',
          !isLast ? 'md:opacity-0 md:group-hover:opacity-100' : '',
        )}
        onClick={onEdit}
        type='button'
        title={'com_ui_edit'}
        disabled={hideEditButton}
      >
        EditIcon
      </button>
      <button
        className={cn(
          'ml-0 flex items-center gap-1.5 rounded-md p-1 text-xs hover:text-gray-900 dark:text-gray-400/70 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400 md:group-hover:visible md:group-[.final-completion]:visible',
          isSubmitting && isCreatedByUser ? 'md:opacity-0 md:group-hover:opacity-100' : '',
          !isLast ? 'md:opacity-0 md:group-hover:opacity-100' : '',
        )}
        onClick={() => copyToClipboard(setIsCopied)}
        type='button'
        title={isCopied ? 'com_ui_copied_to_clipboard' : 'com_ui_copy_to_clipboard'}
      >
        {isCopied ? 'CheckMark' : 'Clipboard'}
      </button>
      {regenerateEnabled ? (
        <button
          className={cn(
            'hover-button active rounded-md p-1 text-gray-400 hover:text-gray-900 dark:text-gray-400/70 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400 md:invisible md:group-hover:visible md:group-[.final-completion]:visible',
            !isLast ? 'md:opacity-0 md:group-hover:opacity-100' : '',
          )}
          onClick={regenerate}
          type='button'
          title={'com_ui_regenerate'}
        >
          RegenerateIcon
        </button>
      ) : null}
      {continueSupported ? (
        <button
          className={cn(
            'hover-button active rounded-md p-1 hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400/70 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400 md:invisible md:group-hover:visible ',
            !isLast ? 'md:opacity-0 md:group-hover:opacity-100' : '',
          )}
          onClick={handleContinue}
          type='button'
          title={'com_ui_continue'}
        >
          ContinueIcon
        </button>
      ) : null}
    </div>
  );
}

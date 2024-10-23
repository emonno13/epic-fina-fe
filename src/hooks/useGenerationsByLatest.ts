type TUseGenerations = {
  message: any;
  isSubmitting: boolean;
  isEditing?: boolean;
  latestMessage: TMessage | null;
};

export default function useGenerationsByLatest({
  message,
  isSubmitting,
  isEditing = false,
  latestMessage,
}: TUseGenerations) {
  const { error, message_id, is_finished, finish_reason, role } = message ?? {};

  const continueSupported = latestMessage?.message_id === message_id && is_finished === false && !isEditing;

  const regenerateEnabled = !(role === 'human') && !isEditing && !isSubmitting;

  const hideEditButton = isSubmitting || error || !(role === 'human');

  return {
    continueSupported,
    regenerateEnabled,
    hideEditButton,
  };
}

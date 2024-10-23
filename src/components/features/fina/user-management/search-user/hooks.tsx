import { useSetDocumentDetail } from '@schema-form/features/hooks';

export const useOpenUserInfoModal = () => {
  const setDocumentDetail = useSetDocumentDetail();
  return (record = {}, tabKey = 'loan') => {
    setDocumentDetail(
      {
        ...record,
        _viewUserInfo: true,
        _userInfoTabKey: tabKey,
      },
      false,
    );
  };
};

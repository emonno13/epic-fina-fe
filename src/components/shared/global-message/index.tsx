import { Alert } from 'antd';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { useClearGlobalMessage, useGlobalMessages } from '../../../schema-form/features/hooks';

const GlobalMessage = ({ rendering = true }) => {
  const { t } = useTranslation('admin-common');
  const globalMessages = useGlobalMessages();
  const clearGlobalMessage = useClearGlobalMessage();
  
  const { error, errorMessage, successMessage } = globalMessages;

  const message = useMemo(() => {
    if (error) return errorMessage;
    return successMessage;
  }, [error, errorMessage, successMessage]);

  useEffect(() => {
    return () => {
      clearGlobalMessage();
    };
  }, []);

  if (!rendering) {
    return null;
  }
  return (
    <div className={'m-b-10'}>
      <Alert
        {...{
          message: <span>{t(message)}</span>,
          type: error ? 'error' : 'info',
          banner: true,
          closable: true,
        }}
      />
    </div>
  );
};

export default GlobalMessage;

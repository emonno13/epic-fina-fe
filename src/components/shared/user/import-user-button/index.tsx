import { UploadOutlined } from '@ant-design/icons';
import {
  HButton,
  HButtonProps,
} from '@components/shared/common-form-elements/h-confirmation-button';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { memo } from 'react';

export const ImportButton = memo((props: HButtonProps) => {
  const { t } = useTranslation('common');
  const { push, locale } = useRouter();
  const handleCreateNewDocument = () => {
    push(`/${locale ? `${locale}/` : ''}admin/users/import`);
  };
  return (
    <HButton
      {...{
        ...props,
        size: 'large',
        shape: 'round',
        className: 'control-btn m-l-10',
        onClick: handleCreateNewDocument,
        icon: <UploadOutlined />,
      }}
    >
      {t('Import')}
    </HButton>
  );
});

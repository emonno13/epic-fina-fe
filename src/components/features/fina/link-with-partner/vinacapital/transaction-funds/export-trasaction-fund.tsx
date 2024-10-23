import { DownloadOutlined } from '@ant-design/icons';
import { isEqual } from 'lodash';
import { memo } from 'react';

import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { useHaveDownloadPermission } from '@dynamic-configuration/hooks';
import { useHTranslation } from '@lib/i18n';
import { useCurrentUser } from '@lib/providers/auth';

const ExportButtonTransactionFund = memo((props: any) => {
  const { t } = useHTranslation('admin');
  const currentUser = useCurrentUser();
  const haveRightToDownload = useHaveDownloadPermission();
  const {
    downloadUrl = `${process.env.NEXT_PUBLIC_STATIC_CDN}/transactions/export-fund/${currentUser.id}`,
  } = props;

  if (!haveRightToDownload) return <></>;

  const handleExport = () => {
    if (!window) return;
    window.open(downloadUrl);
  };

  return (
    <HButton
      {...{
        ...props,
        size: 'large',
        shape: 'round',
        className: 'control-btn m-l-10',
        onClick: handleExport,
        icon: <DownloadOutlined />,
      }}
    >
      {t('Export')}
    </HButton>
  );
}, isEqual);

export default ExportButtonTransactionFund;

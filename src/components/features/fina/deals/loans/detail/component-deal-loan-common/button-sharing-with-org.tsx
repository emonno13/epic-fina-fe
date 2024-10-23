import { ShareAltOutlined } from '@ant-design/icons';
import { HPButton } from '@components/shared/accessibility/h-p-button';
import { useHTranslation } from '../../../../../../../lib/i18n';
import { PERMISSION_DEAL } from '../../../utils';

import './component-deal-loan-common.module.scss';

export const HButtonSharingWithOrg = (props) => {
  const { t } = useHTranslation('admin-common');
  const { onSharingWithOrg, isEditBank } = props;
  if (isEditBank) {
    return null;
  }
  return (
    <>
      <HPButton
        {...{
          permissions: [PERMISSION_DEAL.SHARING_WITH_ORG],
          className: 'sharing-btn m-r-10',
          icon: <ShareAltOutlined />,
          onClick: onSharingWithOrg,
        }}
      >
        {t('Share', { vn: 'Chia sẻ' })}
      </HPButton>
    </>
  );
};

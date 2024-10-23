import { useHTranslation } from '@lib/i18n';
import { Button } from 'antd';
import { useCurrentUser } from '../../../../../../../lib/providers/auth';
import { USER_TYPES } from '../../../../../../../types/organization';
import { ClickableOpacity } from '../../../../../../shared/utils/clickable-opacity';

import './component-deal-loan-common.module.scss';

export const HButtonControlDeal = (props) => {
  const { isEdit, onEditDocument, onCancelDocument, refEditBtn } = props;
  return (
    <DealControlButtons
      {...{ isEdit, onEditDocument, onCancelDocument, refEditBtn }}
    />
  );
};

export const DealControlButtons = (props) => {
  const { t } = useHTranslation('admin-common');
  const { isEdit, onEditDocument, onCancelDocument, refEditBtn } = props;
  const currentUser: any = useCurrentUser();
  const isOrgStaff = currentUser.type === USER_TYPES.staff;
  if (isEdit) {
    return null;
  }
  return (
    <>
      <Button
        className="deal-control-btn m-r-10"
        type="primary"
        ref={refEditBtn}
        onClick={onEditDocument}
      >
        {t('Edit')}
      </Button>
      <ClickableOpacity
        {...{
          onClick: onCancelDocument,
          confirmation: {
            message: t('Do you want to delete?', {
              vn: isOrgStaff
                ? 'Bạn có muốn xóa bản ghi'
                : 'Bạn có muốn từ chói hồ sơ',
            }),
          },
        }}
      >
        <Button className="deal-control-btn" type="primary" danger>
          {t(isOrgStaff ? 'Cancellation' : 'Refuse')}
        </Button>
      </ClickableOpacity>
    </>
  );
};

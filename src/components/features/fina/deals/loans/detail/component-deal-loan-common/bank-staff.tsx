import HCard from '@components/shared/common/h-card';
import { useHTranslation } from '@lib/i18n';
import { FiledViewer } from '../../../../../../shared/common/configuration/field-viewer';
import { PreViewUser } from '../../../deals-component-common/preview-user';
import { useCurrentUser } from '../../../../../../../lib/providers/auth';
import { USER_TYPES } from '../../../../../crm/tasks/constans';

export const BankStaff = ({ isEditBank, dealDetail, onEditDocument }) => {
  const { t } = useHTranslation('admin-common');
  const currentUser = useCurrentUser();
  const isOnyViewPermission = [
    USER_TYPES.customer,
    USER_TYPES.collaborator,
  ].includes(currentUser.type);
  const editDocumentComponent = isOnyViewPermission ? (
    '_'
  ) : (
    <a onClick={onEditDocument}>{t('add', { en: 'Add', vn: 'Bổ sung' })}</a>
  );
  if (isEditBank) {
    return null;
  }

  return (
    <HCard
      {...{
        title: t('Bank staff handle'),
        titleProps: {
          tooltip: t('Bank staff handle'),
          style: {
            color: '#064DD6',
            fontWeight: 700,
          },
        },
      }}
    >
      <FiledViewer
        {...{
          label: t('Execute partner'),
          value: dealDetail?.executePartner?.name || editDocumentComponent,
        }}
      />

      <FiledViewer
        {...{
          label: t('Financial staff'),
          value: (
            <PreViewUser
              {...{ onEditDocument, user: dealDetail?.partnerStaff }}
            />
          ),
        }}
      />
    </HCard>
  );
};

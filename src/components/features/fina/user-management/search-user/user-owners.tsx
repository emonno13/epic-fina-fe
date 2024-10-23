import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { ItemViewer } from '../../../../shared/common/configuration/item-viewer';
import { PreViewUser } from '../../deals/deals-component-common/preview-user';

const UserOwners = ({ showTitle = true, record }) => {
  const { t } = useHTranslation('common');
  return (
    <div>
      {showTitle && <p>{t('Owned by', { vn: 'Sở hữu bởi' })}</p>}
      {record.createdBy && (
        <PreViewUser
          user={record.createdBy}
          userTitle={t('Created By', { vn: 'Người tạo' })}
        />
      )}
      {record.owner ? (
        <PreViewUser
          user={record.owner}
          userTitle={t('Owner', { vn: 'Người sở hữu' })}
        />
      ) : (
        <ItemViewer
          {...{
            label: t('Owner', { vn: 'Sở hữu bởi' }),
            value: record.owner
              ? ConverterUtils.showUserConverter(record.owner)
              : 'Admin',
            labelClassName: 'm-b-0i',
          }}
        />
      )}
    </div>
  );
};

export default UserOwners;

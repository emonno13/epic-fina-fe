import { PhoneCall } from '@components/shared/stringee';
import { useHTranslation } from '@lib/i18n';
import { ConverterUtils } from '../../../../lib/converter';
import { TableUtils } from '../../../../lib/table-utils';
import { USER_RELATIONSHIP_LABEL_MAPPING } from '../../../shared/user/constants';

export const RelatedPersonSearchResultSchema = (props: any) => {
  const { mainUser } = props;
  const { t } = useHTranslation('admin-common');
  return [
    TableUtils.createTableColumnConfig({
      title: t('Organization'),
      dataIndex: 'org',
      sortable: true,
      key: 'orgId',
      render: ConverterUtils.showOrgConverter,
    }),

    TableUtils.createTableColumnConfig({
      title: t('Code'),
      dataIndex: 'code',
      sortable: true,
      key: 'code',
    }),
    {
      title: t('Full name'),
      dataIndex: 'fullName',
      key: 'name',
    },
    {
      title: t('Relationship', { vn: 'Mối quan hệ' }),
      dataIndex: 'relatedPerson',
      key: 'name',
      render: (relatedPerson, user) => {
        const person = relatedPerson.filter(
          (item: any) => item.userId === mainUser.id,
        )[0];
        return (
          <span>
            {person ? USER_RELATIONSHIP_LABEL_MAPPING[person.relationship] : ''}
          </span>
        );
      },
    },
    TableUtils.createTableColumnConfig({
      title: t('Has Account', { vn: 'Đã có tài khoản' }),
      dataIndex: 'hasAccount',
      key: 'hasAccount',
      render: (hasAccount) => (hasAccount ? 'Ok' : '-'),
    }),
    {
      title: t('Call', { vn: 'Số điện thoại' }),
      dataIndex: 'id',
      key: 'id',
      width: '190px',
      render: (_, user) => {
        const tels = [...(user.tels || [])];
        return tels.map(
          (phoneData) =>
            phoneData?.tel && (
              <PhoneCall
                {...{ phoneNumber: `${phoneData?.tel}`, userInfo: user }}
              />
            ),
        );
      },
    },
    TableUtils.createColumnCreatedBy(),
    TableUtils.createEditAndDeleteControlColumn(),
  ];
};

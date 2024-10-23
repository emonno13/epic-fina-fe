import { useState } from 'react';

import { CallPhoneFcssSDKConvert } from '@lib/fccs-sdk-convert';
import { ConverterUtils } from '../../../../../../../../lib/converter';
import { useHTranslation } from '../../../../../../../../lib/i18n';
import { endpoints } from '../../../../../../../../lib/networks/endpoints';
import { TableUtils } from '../../../../../../../../lib/table-utils';
import { HTable } from '../../../../../../../../schema-form/features';
import HFeature from '../../../../../../../../schema-form/features/feature';
import { HSearchFormHiddenAble } from '../../../../../../../../schema-form/features/search-form';
import { FormUtils } from '../../../../../../../../schema-form/utils/form-utils';
import { HButton } from '../../../../../../../shared/common-form-elements/h-confirmation-button';
import { HModal } from '../../../../../../../shared/common/h-modal';

export const TestTargetGroupModal = ({ targetGroups = [] }) => {
  const { t } = useHTranslation('admin-common');
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      <HButton
        {...{
          children: 'Test target group',
          onClick: () => setShowEditModal(true),
        }}
      />
      <HModal
        {...{
          title: 'Test target group',
          visible: showEditModal,
          centered: true,
          onOk: () => setShowEditModal(false),
          onCancel: () => setShowEditModal(false),
          okText: 'Ok',
          width: '90%',
        }}
      >
        <HFeature
          {...{
            featureId: 'targetGroupUser',
            documentIdName: 'targetGroupUserId',
            endpoint: endpoints.endpointWithApiDomain(
              '/message-workflows/resolve-users-by-target-groups',
            ),
            useQueryParams: false,
          }}
        >
          <HSearchFormHiddenAble
            {...{
              method: 'POST',
              hiddenValues: FormUtils.createSearchHiddenValues({
                targetGroups,
              }),
            }}
          />

          <HTable
            schema={() => [
              TableUtils.createTableColumnConfig({
                title: t('Code'),
                dataIndex: 'code',
                sortable: true,
                key: 'code',
                // render: (code, user) => <Link href={`/admin/users/all?documentId=${user?.id}`}>{code}</Link>,
              }),
              {
                title: t('Full name'),
                dataIndex: 'fullName',
                key: 'fullName',
                render: (fullName, user) =>
                  fullName || (
                    <span>{ConverterUtils.getFullNameUser(user)}</span>
                  ),
              },
              TableUtils.createTableColumnConfig({
                title: 'Email',
                dataIndex: 'emails',
                key: 'emails',
                sortable: true,
                render: (emails) => {
                  if (Array.isArray(emails) && emails.length > 0) {
                    return emails.map((item) => item?.email).join(', ');
                  }
                  return '';
                },
              }),
              {
                title: t('Call', { vn: 'Số điện thoại' }),
                dataIndex: 'id',
                key: 'id',
                width: '190px',
                render: (_, user) => {
                  const tels = [...(user.tels || [])];
                  return (
                    <CallPhoneFcssSDKConvert
                      {...{ phones: tels, userInfo: user }}
                    />
                  );
                },
              },
            ]}
          />
        </HFeature>
      </HModal>
    </>
  );
};

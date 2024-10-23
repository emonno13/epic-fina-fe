import HCard from '@components/shared/common/h-card';
import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { Drawer, Empty } from 'antd';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { ORGANIZATION_TYPES, USER_TYPES } from 'types/organization';
import { isEmpty } from 'underscore';
import { FiledViewer } from '../../../../../../shared/common/configuration/field-viewer';
import { PreViewUser } from '../../../deals-component-common/preview-user';

const RenderCustomerUpdate = dynamic(
  () => import('@components/features/business/customer/render-customer-update'),
  { ssr: false },
);

export const CustomerInformation = ({ detail, onEditDocument }) => {
  const { t } = useHTranslation('admin-common');
  const [isVisibleCustomerUpdate, setVisibleCustomerUpdate] =
    useState<boolean>(false);

  const customer = detail?.user;

  if (isEmpty(customer)) return <Empty />;

  return (
    <>
      <HCard
        {...{
          title: t('Customer information'),
          titleProps: {
            style: {
              color: '#064DD6',
              fontWeight: 700,
            },
            tooltip: t('Customer information'),
          },
        }}
      >
        <FiledViewer
          {...{
            label: t('Customer'),
            value: (
              <PreViewUser
                user={customer}
                onEditDocument={onEditDocument}
                showEmails={false}
                callbackFunctionWhenClickToName={() =>
                  setVisibleCustomerUpdate(true)
                }
              />
            ),
          }}
        />
      </HCard>

      <Drawer
        {...{
          placement: 'right',
          visible: isVisibleCustomerUpdate,
          width: '50%',
          footer: null,
          title: <div>{ConverterUtils.getFullNameUser(customer)}</div>,
          onClose: () => setVisibleCustomerUpdate(false),
        }}
      >
        <RenderCustomerUpdate
          {...{
            orgId: '',
            orgType: ORGANIZATION_TYPES.SUB_ORG,
            type: USER_TYPES.customer,
            user: detail?.user,
          }}
        />
      </Drawer>
    </>
  );
};

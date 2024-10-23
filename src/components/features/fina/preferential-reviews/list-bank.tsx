import { HSelect } from '@components/shared/common-form-elements/select';
import { useHTranslation } from '@lib/i18n';
import { HForm } from '@schema-form/h-form';
import { createSchemaItem } from '@schema-form/h-types';
import { Button, Form, notification } from 'antd';
import { useState } from 'react';
import { ORGANIZATION_TYPES } from 'types/organization';

import './preferential-modal-custom.scss';

const ListBank = ({ listBank = [], dataBank = [], addBank }) => {
  const { t } = useHTranslation('admin-common');
  const [org, setOrg] = useState({});
  const [form] = Form.useForm();

  const checkBankAndAddBank = () => {
    const id = form.getFieldValue('orgId');

    if (form.getFieldValue('orgId')) {
      const orgInList = listBank?.find((el: any) => el?.org?.id === id);

      if (orgInList) {
        notification.error({ message: 'Ngân hàng này đã có trong danh sách' });
        return;
      }

      const orgInFina = dataBank?.find((el: any) => el?.org?.id === id);
      if (orgInFina) {
        addBank(orgInFina);

        form.setFieldsValue({ orgId: undefined });
        return;
      }

      addBank(org);
      form.setFieldsValue({ orgId: undefined });
    }
  };

  return (
    <HForm
      {...{
        form,
        hideControlButton: true,
        schema: () => [
          createSchemaItem({
            Component: HSelect,
            name: 'orgId',
            colProps: { span: 24 },
            rowProps: { gutter: { xs: 8, md: 8 } },
            label: t('Organization'),
            rules: [
              {
                required: true,
                message: t('Organization is required', {
                  vn: 'Tổ chức là bắt buộc',
                }),
              },
            ],
            componentProps: {
              modernLabel: true,
              placeholder: t('Enter organization', { vn: 'Chọn tổ chức' }),
              showSearch: true,
              searchWhenHiddenValueChange: true,
              endpoint: '/organizations/suggestion',
              hiddenValues: {
                type: ORGANIZATION_TYPES.BANK,
                parentOrgId: '60e0533b8cf80a69dda333dc',
              },
              onChangeSelected: (orgDetail) => {
                setOrg({
                  id: orgDetail.id,
                  code: orgDetail.code,
                  orgPaths: orgDetail.orgPaths,
                });
              },
              optionsConverter: (document) => ({
                ...document,
                label: document?.name || '',
              }),
            },
          }),
          createSchemaItem({
            Component: () => (
              <div style={{ textAlign: 'center' }}>
                <Button
                  className=""
                  {...{
                    onClick: checkBankAndAddBank,
                    style: {
                      width: '100px',
                      height: '100%',
                      backgroundColor: '#0068ff',
                      color: '#fff',
                    },
                  }}
                >
                  Thêm
                </Button>
              </div>
            ),
            colProps: { span: 24 },
          }),
        ],
        onDataReadyToSubmit: (values) => {
          return {
            ...values,
          };
        },
      }}
    />
  );
};

export default ListBank;

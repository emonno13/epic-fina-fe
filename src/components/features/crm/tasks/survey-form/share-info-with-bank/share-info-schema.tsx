import { createHDynamicSchemaFormItems } from '@components/shared/common-form-elements/h-dynamic-form-items';
import { HSelect } from '@components/shared/common-form-elements/select';
import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { HSubForm } from '@schema-form/h-form';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { GROUP_TYPES } from '@types/group';
import { Checkbox, Typography } from 'antd';
import { useState } from 'react';

import './share-info-with-bank.module.scss';
const { Text } = Typography;

export const ShareSchemaForm = (props: HFormProps): HFormItemProps[] => {
  const { transport, form } = props;
  const { productId } = transport;
  const checked = form?.getFieldValue('isAllBank');
  const [isAllBank, setIsAllBank] = useState<boolean>(
    checked === undefined ? true : checked,
  );
  const { t } = useHTranslation('admin-common');

  return [
    createSchemaItem({
      Component: Checkbox,
      name: 'isAllBank',
      label: (
        <div>
          <div>
            {t('All bank & staff', { vn: 'Tất cả ngân hàng & nhân viên' })}
          </div>
          <Text type="danger" italic>
            (Những ngân hàng có gói vay phù với sản phẩm vay đã chọn)
          </Text>
        </div>
      ),
      valuePropName: 'checked',
      componentProps: {
        onChange: (e) => {
          setIsAllBank(e?.target?.checked);
        },
      },
    }),
    createHDynamicSchemaFormItems({
      label: t('Partner will share', { vn: 'Đối tác sẽ được chia sẻ' }),
      name: 'groupPartner',
      className: 'group-partner',
      componentProps: {
        schemaItems: (field) => [
          createSchemaItem({
            Component: HSelect,
            name: 'bankId',
            colProps: { span: 11 },
            rowProps: { gutter: { xs: 16, md: 16 } },
            componentProps: {
              showSearch: true,
              allowClear: true,
              endpoint: `organizations/products/${productId}`,
              placeholder: t('Select bank', { vn: 'Chọn ngân hàng' }),
              optionsConverter: (document: any) => {
                document.label = document?.name || '';
                return document;
              },
              disabled: isAllBank,
            },
          }),
          createSchemaItem({
            name: 'bankId',
            colProps: { span: 11 },
            className: 'm-b-0',
            Component: ({ value: bankId }) => {
              return (
                <HSubForm
                  schema={() => [
                    createSchemaItem({
                      Component: HSelect,
                      name: [field?.name, 'userIds'],
                      componentProps: {
                        showSearch: true,
                        allowClear: true,
                        mode: 'multiple',
                        endpoint: `users/product/${productId}`,
                        searchWhenHiddenValueChange: true,
                        placeholder: t('All users', {
                          vn: 'Tất cả người dùng',
                        }),
                        optionsConverter: (document: any) => {
                          document.label = `${ConverterUtils.getFullNameUser(document)} (${document?.org?.name || ''})`;
                          return document;
                        },
                        disabled: isAllBank,
                        hiddenValues: {
                          bankId,
                        },
                      },
                    }),
                  ]}
                />
              );
            },
          }),
        ],
      },
    }),
    createSchemaItem({
      Component: HSelect,
      name: 'groupIds',
      rowProps: { gutter: { xs: 24, md: 24 } },
      colProps: { span: 12 },
      label: t('Group will be shared', { vn: 'Nhóm sẽ được chia sẻ' }),
      componentProps: {
        mode: 'multiple',
        showSearch: true,
        endpoint: 'groups/suggestion',
        hiddenValues: {
          type: GROUP_TYPES.TELLER,
        },
      },
    }),
  ];
};

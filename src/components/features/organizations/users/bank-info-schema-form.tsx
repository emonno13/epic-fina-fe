import { createHDynamicSchemaFormItems } from '@components/shared/common-form-elements/h-dynamic-form-items';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Input } from 'antd';
import { ORGANIZATION_TYPES } from '../../../../types/organization';
import { createOrganizationSuggestionElement } from '../../../shared/common-form-elements/select';

export const BankInfoDetailSchema = (props: HFormProps): HFormItemProps[] => {
  const schema: any[] = [];
  schema.push(
    ...[
      createHDynamicSchemaFormItems({
        name: 'banks',
        componentProps: {
          schemaItems: [
            createOrganizationSuggestionElement(
              {
                name: 'bankId',
                label: 'Bank',
                componentProps: {
                  orientation: 'left',
                  placeholder: 'Please select a bank',
                },
              },
              { type: ORGANIZATION_TYPES.BANK },
            ),
            createSchemaItem({
              Component: Input,
              name: 'bankAccount',
              colProps: { span: 24 },
              label: 'Bank Account No',
              rules: [
                { required: true, message: 'Bank Account No is required' },
              ],
              componentProps: {
                orientation: 'left',
                placeholder: 'Enter the Bank Account No',
              },
            }),
            createSchemaItem({
              Component: Input,
              colProps: { span: 24 },
              label: 'Account Holder',
              name: 'bankAccountHolder',
              componentProps: {
                orientation: 'left',
                placeholder: 'Enter the Account Holder',
              },
            }),
          ],
        },
      }),
    ],
  );

  return schema;
};

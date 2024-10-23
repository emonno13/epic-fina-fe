import { AlignLeftOutlined, QuestionCircleTwoTone } from '@ant-design/icons';
import { HSelect } from '@components/shared/common-form-elements/select';
import { SelectUtils } from '@components/shared/common-form-elements/select/Utils';
import { createSchemaLabelItem } from '@components/shared/common/h-label/h-label-title';
import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { createSchemaItem, HFormProps } from '@schema-form/h-types';
import { ORGANIZATION_TYPES } from 'types/organization';
import { USER_TYPES } from '../../constans';

export default function useAssignPartnerSchemaForm() {
  const { t } = useHTranslation('admin');
  return (props?: HFormProps) => {
    return [
      createSchemaLabelItem({
        colProps: { xs: 24, sm: 24, md: 12 },
        rowProps: { gutter: { xs: 24, md: 24 } },
        componentProps: {
          firstIcon: <AlignLeftOutlined />,
          label: t('Processing partner', { vn: 'Đối tác xử lý' }),
          lastIcon: <QuestionCircleTwoTone />,
        },
      }),
      createSchemaItem({
        Component: HSelect,
        label: t('Assign to staff of partner', {
          vn: 'Giao cho nhân viên của đối tác',
        }),
        name: 'assignToPartnerStaffIds',
        colProps: { xs: 24, sm: 24, md: 12 },
        rowProps: { gutter: { xs: 24, md: 24 } },
        componentProps: {
          placeholder: t('Enter name/phone number/email/code to search', {
            vn: 'Nhập tên/sdt/email/code để tìm kiếm',
          }),
          hiddenValues: {
            type: USER_TYPES.staff,
          },
          mode: 'multiple',
          showSearch: true,
          searchWhenHiddenValueChange: true,
          endpoint: 'users/real-estate-seller/suggestion',
          optionsConverter: (document) => {
            document.label = `${ConverterUtils.getFullNameUser(document)}[${document?.org?.name}]`;
            return document;
          },
          withRelations: [
            {
              relation: 'org',
              scope: {
                fields: ['name'],
              },
            },
          ],
        },
      }),
      SelectUtils.createOrganizationSuggestionElement({
        label: t('Assign to partner', { vn: 'Giao cho đối tác' }),
        name: 'assignToPartnerId',
        colProps: { xs: 24, sm: 24, md: 12 },
        componentProps: {
          placeholder: t('Enter name/phone number/email/code to search', {
            vn: 'Nhập tên/sdt/email/code để tìm kiếm',
          }),
          mode: 'single',
          hiddenValues: {
            type: ORGANIZATION_TYPES.REAL_ESTATE,
          },
          optionsConverter: (document) => {
            document.label = document.name;
            return document;
          },
        },
      }),
    ];
  };
}

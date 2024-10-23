import { useHTranslation } from '@lib/i18n';
import { Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

import { createSchemaItem } from '@schema-form/h-types';
import { useDocumentDetail } from '../../../../../../schema-form/features/hooks';
import { createHDynamicSchemaFormItems } from '../../../../../shared/common-form-elements/h-dynamic-form-items';
import { createSchemaLabelItem } from '../../../../../shared/common/h-label/h-label-title';
import { ReferenceSetTemplateMappingKeys } from '../mapping-keys/mapping-keys';

import './detail-view.module.scss';

export const ReferenceSetTemplateSchemaForm = (props) => {
  const { t } = useHTranslation('admin-common');
  const { setVisibleModal, dataMapping } = props?.transport;
  const referenceSetTemplate = useDocumentDetail();

  const testMapping = referenceSetTemplate
    ? [
        createSchemaLabelItem({
          componentProps: {
            label: t('Test mapping Keys', { vn: 'Test mapping Keys' }),
            titleTooltip: t('Test mapping Keys', { vn: 'Test mapping Keys' }),
          },
        }),
        createSchemaItem({
          Component: ReferenceSetTemplateMappingKeys,
          componentProps: {
            transport: {
              setVisibleModal,
              dataMapping,
            },
          },
        }),
      ]
    : [];

  return [
    createSchemaLabelItem({
      componentProps: {
        label: t('General Info', { vn: 'General Info' }),
        titleTooltip: t('General Info', { vn: 'General Info' }),
      },
    }),
    createSchemaItem({
      Component: Input,
      rowProps: { gutter: { xs: 24, md: 24 } },
      name: 'name',
      colProps: { span: 12 },
      rules: [{ required: true, message: t('Name is required.') }],
      label: t('Name'),
    }),
    createSchemaItem({
      Component: TextArea,
      name: 'description',
      rowProps: { gutter: { xs: 24, md: 24 } },
      colProps: { span: 12 },
      label: t('Description'),
    }),
    createSchemaLabelItem({
      componentProps: {
        label: t('Mapping Keys', { vn: 'Mapping Keys' }),
        titleTooltip: t('Mapping Keys', { vn: 'Mapping Keys' }),
      },
    }),
    createHDynamicSchemaFormItems({
      name: 'mappingKeys',
      label: 'Mapping keys',
      className: 'mapping-keys',
      componentProps: {
        schemaItems: [
          createSchemaItem({
            Component: Input,
            rowProps: { gutter: { xs: 24, md: 24 } },
            colProps: { span: 9 },
            label: <span />,
            name: 'key',
            componentProps: {
              placeholder: 'key',
            },
          }),
          createSchemaItem({
            Component: Input,
            colProps: { span: 9 },
            label: '',
            name: 'value',
            componentProps: {
              placeholder: 'mapping value',
            },
          }),
        ],
      },
    }),
    ...testMapping,
  ];
};

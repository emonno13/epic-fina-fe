import { HTinyEditor } from '@components/shared/common-form-elements/h-tiny-editor';
import { HSubForm } from '@schema-form/h-form';
import { Checkbox, Input, Tabs } from 'antd';
import { useHTranslation } from '../../../lib/i18n';
import { useIsNewDocument } from '../../../schema-form/features/hooks/document-detail-hooks';
import { createSchemaItem, HFormProps } from '../../../schema-form/h-types';
import { getTypeTemplate, TYPE_TEMPLATE } from './constant';

const { TabPane } = Tabs;

export const TemplateNotificationDetailSchema = (props: HFormProps) => {
  const { t } = useHTranslation('admin-common');
  const isNewDocument = useIsNewDocument();
  return [
    createSchemaItem({
      Component: Input,
      label: t('Code'),
      rendering: !isNewDocument,
      colProps: { span: 8 },
      rowProps: { gutter: { xs: 8, md: 16 } },
      name: 'code',
      componentProps: {
        disabled: true,
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'title',
      colProps: { span: 12 },
      rules: [
        {
          required: true,
          message: t('Title is required', { vn: 'Tiêu đề là bắt buộc' }),
        },
      ],
      label: t('Title'),
      componentProps: {
        placeholder: t('Title'),
      },
    }),
    createSchemaItem({
      Component: Checkbox.Group,
      name: 'typeTemplate',
      label: t('Type notification', { vn: 'Loại thông báo' }),
      rules: [
        {
          required: true,
          message: t('Type Notification'),
        },
      ],
      className: 'm-b-0',
      rowProps: { gutter: { xs: 8, md: 16 } },
      initialValue: [TYPE_TEMPLATE.browser],
      componentProps: {
        options: getTypeTemplate(t),
      },
    }),
    createSchemaItem({
      Component: TabTypeTemplate,
      rowProps: { gutter: { xs: 8, md: 16 } },
      name: 'typeTemplate',
    }),
  ];
};

export const TabTypeTemplate = ({ value }) => {
  return <Tabs>{generateTabPane(value)}</Tabs>;
};

export const generateTabPane = (listData: string[]) => {
  const { t } = useHTranslation('admin-common');
  return listData?.map((el, index) => {
    return (
      <TabPane tab={el} key={index}>
        <HSubForm
          schema={() => [
            createSchemaItem({
              Component: Input,
              name: ['details', `${el}`, 'title'],
              colProps: { span: 12 },
              rules: [
                {
                  required: true,
                  message: t('Title is required', {
                    vn: 'Tiêu đề là bắt buộc',
                  }),
                },
              ],
              rowProps: { gutter: { xs: 8, md: 16 } },
              label: t('Title'),
              componentProps: {
                placeholder: t('Enter title', { vn: 'Nhập vào tiêu đề' }),
              },
            }),
            ...createCreateSchemaItemContent(el),
          ]}
        />
      </TabPane>
    );
  });
};

const createCreateSchemaItemContent = (typeTemplate) => {
  const { t } = useHTranslation('admin-common');
  if (typeTemplate !== TYPE_TEMPLATE.email) {
    return [
      createSchemaItem({
        Component: Input.TextArea,
        name: ['details', `${typeTemplate}`, 'content'],
        colProps: { span: 24 },
        label: t('Content'),
        rules: [
          {
            required: true,
            message: t('Content is required', {
              vn: 'Nội dung cần phải được nhập',
            }),
          },
        ],
        componentProps: {
          rows: 4,
          placeholder: t('Enter the content', { vn: 'Nhập vào nội dung' }),
        },
      }),
    ];
  }
  return [
    createSchemaItem({
      Component: HTinyEditor,
      name: ['details', `${typeTemplate}`, 'content'],
      colProps: { span: 24 },
      rowProps: { gutter: { xs: 8, md: 16 } },
      rules: [
        {
          required: true,
          message: t('Content is required', {
            vn: 'Nội dung cần phải được nhập',
          }),
        },
      ],
      label: t('Content'),
      componentProps: {
        rows: 4,
        placeholder: t('Enter the content', { vn: 'Nhập vào  nội dung' }),
      },
    }),
  ];
};

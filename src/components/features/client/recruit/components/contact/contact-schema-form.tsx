import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { useHTranslation } from '../../../../../../lib/i18n';
import {
  HInput,
  HTextArea,
} from '../../../../../shared/common-form-elements/h-input';

export const ContactSchema = (props: HFormProps): HFormItemProps[] => {
  const { t } = useHTranslation('recruit');

  return [
    createSchemaItem({
      Component: HInput,
      name: 'fullName',
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: 'Họ và tên',
      componentProps: {
        placeholder: t('jobs.enterFullName'),
      },
    }),
    createSchemaItem({
      Component: HInput,
      name: 'email',
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: 'Email',
      componentProps: {
        placeholder: t('jobs.enterEmail'),
      },
    }),

    createSchemaItem({
      Component: HInput,
      name: 'subject',
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: 'Subject',
      componentProps: {
        placeholder: t('jobs.subject', {
          en: 'Enter subject',
          vn: 'Nhập chủ đề',
        }),
      },
    }),
    createSchemaItem({
      Component: HTextArea,
      name: 'message',
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: 'Message',
      componentProps: {
        placeholder: t('jobs.message', {
          en: 'Enter message',
          vn: 'Nhập tin nhắn',
        }),
      },
    }),
  ];
};

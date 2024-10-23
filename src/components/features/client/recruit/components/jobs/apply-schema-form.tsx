import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { message } from 'antd';
import { useHTranslation } from '../../../../../../lib/i18n';
import {
  HInput,
  HTextArea,
} from '../../../../../shared/common-form-elements/h-input';
import { HUpload } from '../../../../../shared/common-form-elements/h-upload';
import CvUpload from './cv-upload';

const maxSize = 10 * 1024 * 1024;

export const ApplySchema = (props: HFormProps): HFormItemProps[] => {
  const { t } = useHTranslation('recruit');

  return [
    createSchemaItem({
      Component: HInput,
      name: 'fullName',
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: t('jobs.fullName'),
      componentProps: {
        placeholder: t('jobs.enterFullName'),
      },
    }),
    createSchemaItem({
      Component: HInput,
      name: 'email',
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: t('jobs.email'),
      componentProps: {
        placeholder: t('jobs.enterEmail'),
      },
    }),

    createSchemaItem({
      Component: HInput,
      name: 'phone',
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: t('jobs.phone'),
      componentProps: {
        placeholder: t('jobs.enterPhone'),
      },
    }),
    createSchemaItem({
      Component: HTextArea,
      name: 'coverLetter',
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: t('jobs.coverLetter'),
      componentProps: {
        placeholder: t('jobs.enterLetter'),
      },
    }),
    createSchemaItem({
      Component: HUpload,
      name: 'cv',
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: t('jobs.cv'),
      componentProps: {
        accept: '.doc,.docx,.pdf',
        renderChild: (value, fileList) => <CvUpload {...{ value, fileList }} />,
        listType: 'text',
        showUploadList: false,
        multiple: false,
        beforeUpload: async (file) => {
          const isValidSize = file.size > maxSize;
          if (isValidSize) {
            message.error(`${file.name} is more than 10MB`);
          }
          return;
        },
      },
    }),
  ];
};

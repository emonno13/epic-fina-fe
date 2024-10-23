import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Tag } from 'antd';
import moment from 'moment';
import { useHTranslation } from '../../../../lib/i18n';
import { HDatePicker } from '../../../shared/common-form-elements/date-picker';
import { HInput } from '../../../shared/common-form-elements/h-input';
import HTinyEditor from '../../../shared/common-form-elements/h-tiny-editor';
import { HSelect } from '../../../shared/common-form-elements/select';
import { WELFARE_OPTIONS } from './constant';

export const RecruitJobEditSchema = (props: HFormProps): HFormItemProps[] => {
  const { t } = useHTranslation('recruit');

  return [
    createSchemaItem({
      Component: HInput,
      rules: [
        {
          required: true,
          message: t('error.jobTitle'),
        },
      ],
      name: 'jobTitle',
      colProps: { xs: 24, sm: 24, md: 12 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: t('jobs.jobTitle'),
      componentProps: {
        placeholder: t('placeholder.jobTitle'),
      },
    }),
    createSchemaItem({
      Component: HInput,
      rules: [
        {
          required: true,
          message: t('error.workplace'),
        },
      ],
      name: 'workplace',
      colProps: { xs: 24, sm: 24, md: 12 },

      label: t('jobs.workplace'),
      componentProps: {
        placeholder: t('placeholder.workplace'),
      },
    }),
    createSchemaItem({
      Component: HInput,
      rules: [
        {
          required: true,
          message: t('error.careerLevel'),
        },
      ],
      name: 'careerLevel',
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('jobs.careerLevel'),
      componentProps: {
        placeholder: t('placeholder.careerLevel'),
      },
    }),

    createSchemaItem({
      Component: HInput,
      rules: [
        {
          required: true,
          message: t('error.formality'),
        },
      ],
      name: 'formality',
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('jobs.formality'),
      componentProps: {
        placeholder: t('placeholder.formality'),
      },
    }),

    createSchemaItem({
      Component: HInput,
      rules: [
        {
          required: true,
          message: t('error.experience'),
        },
      ],
      name: 'experience',
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('jobs.experience'),
      componentProps: {
        placeholder: t('placeholder.experience'),
      },
    }),

    createSchemaItem({
      Component: HInput,
      rules: [
        {
          required: true,
          message: t('error.salary'),
        },
      ],
      name: 'salary',
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('jobs.salary'),
      componentProps: {
        placeholder: t('placeholder.salary'),
      },
    }),

    createSchemaItem({
      Component: HInput,
      rules: [
        {
          required: true,
          message: t('error.career'),
        },
      ],
      name: 'career',
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('jobs.career'),
      componentProps: {
        placeholder: t('placeholder.career'),
      },
    }),

    createSchemaItem({
      Component: HDatePicker,
      name: 'applicationDeadline',
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('jobs.applicationDeadline'),
      componentProps: {
        style: { width: '100%' },
        showTime: true,
        format: 'DD/MM/YYYY',
        defaultValue: moment(),
      },
    }),

    createSchemaItem({
      Component: HSelect,
      rowProps: { gutter: { xs: 24, md: 24 } },
      name: 'welfare',
      label: t('jobs.welfare'),
      componentProps: {
        mode: 'multiple',
        optionValues: WELFARE_OPTIONS,
        tagRender: (e) => <Tag color="blue">{e.label}</Tag>,
      },
    }),

    createSchemaItem({
      Component: HTinyEditor,
      rules: [
        {
          required: true,
          message: t('error.jobDescription'),
        },
      ],
      name: 'jobDescription',
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: t('jobs.jobDescription'),
      componentProps: {
        style: { width: '100%' },
      },
    }),

    createSchemaItem({
      Component: HTinyEditor,
      rules: [
        {
          required: true,
          message: t('error.jobRequirements'),
        },
      ],
      name: 'jobRequirements',
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: t('jobs.jobRequirements'),
      componentProps: {
        style: { width: '100%' },
      },
    }),
  ];
};

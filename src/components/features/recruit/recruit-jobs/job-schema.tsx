import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { useHTranslation } from '../../../../lib/i18n';
import { HInput } from '../../../shared/common-form-elements/h-input';

export const RecruitJobShortSchema = (props: HFormProps): HFormItemProps[] => {
  const { t } = useHTranslation('recruit');

  return [
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
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: t('jobs.career'),
      componentProps: {
        placeholder: t('placeholder.career'),
      },
    }),
  ];
};

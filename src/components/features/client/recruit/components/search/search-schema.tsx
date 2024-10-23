import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { useHTranslation } from '../../../../../../lib/i18n';
import { HInput } from '../../../../../shared/common-form-elements/h-input';
import { HSelect } from '../../../../../shared/common-form-elements/select';
import { Office } from '../../../../fina/products/bonds/constant';
import CustomLabel from './custom-label';

import './search-form.module.scss';

export const SearchSchema = (props: HFormProps): HFormItemProps[] => {
  const { t } = useHTranslation('recruit');

  return [
    createSchemaItem({
      Component: HInput,
      name: 'jobTitle',
      colProps: { xs: 24, sm: 24, md: 8 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: <CustomLabel t={t('home.searchKeyword')} />,
      componentProps: {
        placeholder: t('home.job'),
      },
    }),
    createSchemaItem({
      Component: HSelect,
      className: 'search-form__leftText',
      name: 'career',
      label: <CustomLabel t={t('home.career')} />,
      colProps: { xs: 24, sm: 24, md: 8 },
      componentProps: {
        allowClear: false,
        optionValues: Office(t),
        placeholder: t('home.all'),
      },
    }),
    createSchemaItem({
      Component: HSelect,
      className: 'm-b-0 search-form__leftText',
      name: 'workplace',
      label: <CustomLabel t={t('home.office')} />,
      colProps: { xs: 24, sm: 24, md: 8 },
      componentProps: {
        allowClear: false,
        optionValues: Office(t),
        placeholder: t('home.all'),
      },
    }),
  ];
};

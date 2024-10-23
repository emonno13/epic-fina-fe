import { useHTranslation } from '@lib/i18n';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '../../../../../../schema-form/h-types';
import { createSchemaLabelItem } from '../../../../../shared/common/h-label/h-label-title';
import { NAMESPACE_DOCUMENT } from '../../utils';
import { DocumentProduct } from '../product-component-common/product-document';

export const DocumentTemplateSchemaForm = (
  props: HFormProps,
  namespace,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const label =
    namespace === NAMESPACE_DOCUMENT.product
      ? t('Paper by product')
      : t('Paper by financial units');
  const titleTooltip =
    namespace === NAMESPACE_DOCUMENT.product
      ? t('Paper by product')
      : t('Paper by financial units');
  return [
    createSchemaLabelItem({
      componentProps: {
        label: label,
        titleTooltip: titleTooltip,
      },
    }),
    createSchemaItem({
      Component: DocumentProduct,
      colProps: { xs: 24, sm: 24, md: 24 },
      componentProps: { ...props, namespace },
    }),
  ];
};

import { PRODUCT_CATEGORIES, PRODUCT_TYPES } from 'types/organization';
import { createSchemaItem, HFormItemProps, HFormProps } from '../../../../../../../schema-form/h-types';
import { createSchemaLabelItem } from '../../../../../../shared/common/h-label/h-label-title';
import { PropertyInformation, VehicleInformation } from '../../product-component-common/product-category';
import { useHTranslation } from '../../../../../../../lib/i18n';

export const ProductCategoryDetail = (props: HFormProps, typeCategory): HFormItemProps[] => {
  const dynamicSchema: HFormItemProps[] = [];
  const { t } = useHTranslation('admin-common');
  dynamicSchema.push(
    createSchemaLabelItem({
      componentProps: {
        label: t('Details'),
        titleTooltip: t('Details'),
      },
    }),
  );
  switch (typeCategory) {
    case PRODUCT_CATEGORIES[PRODUCT_TYPES.loan].vehicle:
      return ([
        ...dynamicSchema,
        ...VehicleInformationSchemaItem(props),
      ]);
    case PRODUCT_CATEGORIES[PRODUCT_TYPES.loan].real_estate:
      return ([
        ...dynamicSchema,
        ...ReInformationSchemaItem(props),
      ]);
    default:
      return ([
        ...dynamicSchema,
        ...ReInformationSchemaItem(props),
      ]);
  }
};

export const ReInformationSchemaItem = (props: HFormProps): HFormItemProps[] => {
  return ([
    createSchemaItem({
      Component: PropertyInformation,
      componentProps: { ...props },
    }),
  ]);
};

export const VehicleInformationSchemaItem = (props: HFormProps): HFormItemProps[] => {
  return ([
    createSchemaItem({
      Component: VehicleInformation,
      componentProps: { ...props },
    }),
  ]);
};

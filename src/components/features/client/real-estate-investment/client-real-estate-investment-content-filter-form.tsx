import {
  PROPERTIES_STATUS,
  PROPERTIES_TYPE,
} from '@components/features/fina/properties/contansr';
import { HInput } from '@components/shared/common-form-elements/h-input';
import { HSelect } from '@components/shared/common-form-elements/select';
import { ArrowDownSmallIcon, SearchSmallIcon } from '@icons';
import { useHTranslation } from '@lib/i18n';
import HSearchForm, {
  HResetPaginationButton,
} from '@schema-form/features/search-form';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { PRODUCT_TYPES } from '@types/organization';

const ClientRealEstateInvestmentListMainFilterForm = ({
  hiddenValues = {},
}) => {
  const { t } = useHTranslation('common');

  return (
    <div className="client-bond-list-main-filter-form">
      <HSearchForm
        {...{
          withRelations: ['org'],
          schema: (props) => ClientRealEstateInvestmentFilterFormSchema(props),
          resetIfSuccess: false,
          hiddenValues: {
            where: { status: PROPERTIES_STATUS.ACTIVE, publish: true },
            ...hiddenValues,
          },
          onDataReadyToSubmit: (formValues) => {
            const param = { ...formValues };

            if (formValues.name) {
              return {
                ...param,
                name: {
                  like: formValues.name,
                  options: 'i',
                },
              };
            }

            return {
              ...param,
              name: {
                like: formValues.name,
              },
            };
          },
          isAppendData: true,
        }}
      />
      <HResetPaginationButton
        {...{
          className: 'client-bond-list-main-filter-form__search-btn',
        }}
      >
        <SearchSmallIcon /> {t('Search', { vn: 'Tìm kiếm' })}
      </HResetPaginationButton>
    </div>
  );
};

export default ClientRealEstateInvestmentListMainFilterForm;

export const ClientRealEstateInvestmentFilterFormSchema = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const defaultSchema = [
    createSchemaItem({
      Component: HInput,
      label: 'Tìm kiếm bất động sản',
      name: 'name',
      colProps: { span: 24 },
      componentProps: {
        placeholder: 'Nhập từ khóa tìm kiếm',
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: 'Danh mục sản phẩm',
      colProps: { xs: 24, sm: 24, md: 24 },
      name: 'categoryId',
      componentProps: {
        endpoint: 'categories/suggestion',
        hiddenValues: { type: PRODUCT_TYPES.real_estate },
        suffixIcon: <ArrowDownSmallIcon />,
        placeholder: t('Enter the product category', {
          vn: 'Nhập vào danh mục sản phẩm',
        }),
        optionsConverter: (document) => {
          document.label = `${document?.name} - ${document.code}`;
          return document;
        },
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: 'Loại hình bất động sản',
      name: 'type',
      colProps: { span: 24 },
      componentProps: {
        placeholder: 'Loại hình bất động sản',
        suffixIcon: <ArrowDownSmallIcon />,
        options: [
          { label: 'Chung cư', value: PROPERTIES_TYPE.APARTMENT },
          { label: 'Nhà mặt đất', value: PROPERTIES_TYPE.GROUND_HOUSE },
        ],
      },
    }),
  ];

  return defaultSchema;
};

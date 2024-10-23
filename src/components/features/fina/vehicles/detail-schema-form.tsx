import { VehicleCategoryDetailSchemaForm } from '@components/features/fina/vehicles/categories/detail-schema-form';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Input, Radio } from 'antd';
import { useHTranslation } from '../../../../lib/i18n';
import { ORGANIZATION_TYPES } from '../../../../types/organization';
import {
  createOrganizationSuggestionElement,
  HSelect,
} from '../../../shared/common-form-elements/select';
import { QuickCreateRootOrgSchema } from '../../organizations/detail-schemas/quick-create-root-org-schema-form';
import { VEHICLE_CATEGORY_TYPES } from './categories/constant';
import { getStatusVehicle } from './utils';

export const VehiclesDetailSchemaForm = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  return [
    createSchemaItem({
      Component: HSelect,
      label: t('Type'),
      name: 'vehicleTypeId',
      componentProps: {
        endpoint: 'vehicles-categories/suggestion',
        placeholder: 'Select vehicle type',
        optionsConverter: (document) => {
          document.label = `${document?.name} - ${document.code}`;
          return document;
        },
        hiddenValues: { type: VEHICLE_CATEGORY_TYPES.TYPE },
        newItemOption: {
          formProps: {
            schema: VehicleCategoryDetailSchemaForm,
            nodeName: 'vehicles-categories',
            hiddenValues: { type: VEHICLE_CATEGORY_TYPES.TYPE },
          },
        },
      },
    }),
    // createSchemaItem({
    //   Component: Input,
    //   name: "name",
    //   colProps: {span: 24},
    //   label: "Vehicles title",
    //   rules: [
    //     {required: true, message: ValidationMessages.requiredMessage("Vehicles name")}
    //   ],
    //   componentProps: {
    //     placeholder: "Enter the Vehicles name",
    //   }
    // }),
    createOrganizationSuggestionElement(
      {
        name: 'orgId',
        label: t('vehicle.brand'),
        componentProps: {
          searchWhenHidenValueChange: true,
          newItemOption: {
            formProps: {
              schema: QuickCreateRootOrgSchema,
              nodeName: 'organizations',
              hiddenValues: { type: ORGANIZATION_TYPES.CAR_COMPANY },
            },
            label: t('Create a brand', { vn: 'Tạo hãng xe mới' }),
          },
        },
      },
      { type: ORGANIZATION_TYPES.CAR_COMPANY },
    ),
    createSchemaItem({
      Component: HSelect,
      label: t('vehicle.model'),
      name: 'vehicleCategoryId',
      componentProps: {
        endpoint: 'vehicles-categories/suggestion',
        placeholder: t('Select Category vehicles', { vn: 'Chọn loại xe' }),
        optionsConverter: (document) => {
          document.label = `${document?.name} - ${document.code}`;
          return document;
        },
        hiddenValues: { type: VEHICLE_CATEGORY_TYPES.MODEL },
        newItemOption: {
          formProps: {
            schema: VehicleCategoryDetailSchemaForm,
            nodeName: 'vehicles-categories',
            hiddenValues: { type: VEHICLE_CATEGORY_TYPES.MODEL },
          },
        },
      },
    }),
    createSchemaItem({
      Component: Radio.Group,
      colProps: { span: 24 },
      label: t('Status'),
      rowProps: { gutter: { xs: 8, md: 24 } },
      componentProps: {
        placeholder: t('vehicle.status'),
        options: getStatusVehicle(t),
      },
    }),
    createSchemaItem({
      Component: Input.TextArea,
      name: 'description',
      colProps: { span: 24 },
      rowProps: { gutter: { xs: 8, md: 16 } },
      label: t('Description'),
      componentProps: {
        rows: 6,
        placeholder: 'Enter the description',
      },
    }),
  ];
};

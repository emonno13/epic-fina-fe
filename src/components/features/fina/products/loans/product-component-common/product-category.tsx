import { PROPERTIES_STATUS } from '@components/features/fina/properties/contansr';
import { Card, Radio } from 'antd';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useHTranslation } from '../../../../../../lib/i18n';
import { HSubForm } from '../../../../../../schema-form/h-form';
import {
  createSchemaItem,
  HFormProps,
} from '../../../../../../schema-form/h-types';
import { ORGANIZATION_TYPES } from '../../../../../../types/organization';
import {
  createOrganizationSuggestionElement,
  HSelect,
} from '../../../../../shared/common-form-elements/select';
import { SelectUtils } from '../../../../../shared/common-form-elements/select/Utils';
import { ItemViewer } from '../../../../../shared/common/configuration/item-viewer';
import { QuickCreateRootOrgSchema } from '../../../../organizations/detail-schemas/quick-create-root-org-schema-form';
import { VEHICLE_CATEGORY_TYPES } from '../../../vehicles/categories/constant';
import { VehicleCategoryDetailSchemaForm } from '../../../vehicles/categories/detail-schema-form';
import { getStatusVehicle } from '../../../vehicles/utils';

const info = 'info';

export const PropertyInformation = (props: HFormProps) => {
  const { t } = useHTranslation('admin-common');
  const { initialValues } = props;
  const [projectID, setProjectID] = useState(initialValues?.info?.projectId);
  const [propertyInfo, setPropertyInfo] = useState<any>();

  const setPropertyInfoInitialValue = (document) => {
    if (
      initialValues?.info?.propertyId === document?.id &&
      propertyInfo?.id !== document?.id &&
      !propertyInfo
    ) {
      setPropertyInfo(document);
    }
  };

  return (
    <HSubForm
      schema={() => [
        SelectUtils.createProjectSuggestionElement({
          name: 'projectId',
          label: t('Project'),
          rowProps: { gutter: { xs: 8, md: 24 } },
          colProps: { span: 24 },
          componentProps: {
            placeholder: t('Select a project'),
            mode: 'single',
            searchWhenHidenValueChange: true,
            optionsConverter: (document) => {
              document.label = `${document?.name} - ${document?.code || ''}`;
              return document;
            },
            onChangeSelected: (document) => {
              setProjectID(document.id);
              props.form?.resetFields([info]);
              setPropertyInfo(null);
            },
          },
        }),
        createSchemaItem({
          Component: HSelect,
          colProps: { span: 24 },
          name: [info, 'propertyId'],
          rowProps: { gutter: { xs: 8, md: 24 } },
          label: t('Property'),
          componentProps: {
            placeholder: t('Select a property'),
            optionsConverter: (document) => {
              document.label = `${document?.name} - ${document?.code || ''}`;
              setPropertyInfoInitialValue(document);
              return document;
            },
            searchWhenHidenValueChange: true,
            endpoint: projectID ? 'properties/suggestion' : '/',
            hiddenValues: projectID
              ? { projectId: projectID, status: PROPERTIES_STATUS.ACTIVE }
              : {},
            withRelations: ['org'],
            onChangeSelected: (document) => {
              setPropertyInfo(document);
            },
          },
        }),
        createSchemaItem({
          Component: RenderDetailPropertyInformation,
          componentProps: { value: propertyInfo || null },
        }),
      ]}
    />
  );
};

export const VehicleInformation = (props: HFormProps) => {
  const { t } = useHTranslation('admin-common');
  return (
    <HSubForm
      schema={() => [
        createSchemaItem({
          Component: HSelect,
          label: t('Type'),
          name: [info, 'vehicleTypeId'],
          componentProps: {
            endpoint: 'categories/public/suggestion',
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
          colProps: { span: 24 },
          name: [info, 'vehicleCategoryId'],
          label: t('vehicle.model'),
          rowProps: { gutter: { xs: 8, md: 24 } },
          componentProps: {
            placeholder: t('Select Category vehicles', { vn: 'Chọn loại xe' }),
            endpoint: 'categories/public/suggestion',
            optionsConverter: (document) => {
              document.label = `${document?.name} - ${document?.code || ''}`;
              return document;
            },
            hiddenValues: { type: VEHICLE_CATEGORY_TYPES.MODEL },
            newItemOption: {
              formProps: {
                schema: VehicleCategoryDetailSchemaForm,
                nodeName: 'vehicles-categories',
              },
            },
          },
        }),
        createSchemaItem({
          Component: Radio.Group,
          colProps: { span: 24 },
          name: [info, 'statusVehicle'],
          label: t('vehicle.status'),
          rowProps: { gutter: { xs: 8, md: 24 } },
          componentProps: {
            placeholder: t('vehicle.status'),
            options: getStatusVehicle(t),
          },
        }),
      ]}
    />
  );
};

const RenderDetailPropertyInformation = (value) => {
  const { t } = useTranslation('admin-common');
  if (value.value) {
    return (
      <Card title={t('Information property')} style={{ width: '100%' }}>
        <ItemViewer
          {...{
            label: t('Investor '),
            value: value?.value?.org?.name,
            labelClassName: 'm-b-0i',
          }}
        />
        <ItemViewer
          {...{
            label: t('Real Estate product code'),
            value: value?.value?.code,
            labelClassName: 'm-b-0i',
          }}
        />
        <ItemViewer
          {...{
            label: t('Real Estate product name'),
            value: value?.value?.name,
            labelClassName: 'm-b-0i',
          }}
        />
        <ItemViewer
          {...{
            label: t('Address'),
            value: value?.value?.address,
            labelClassName: 'm-b-0i',
          }}
        />
        <ItemViewer
          {...{
            label: t('Link'),
            value: value?.value?.link,
            labelClassName: 'm-b-0i',
          }}
        />
        <ItemViewer
          {...{
            label: t('Description'),
            value: value?.value?.description,
            labelClassName: 'm-b-0i',
          }}
        />
      </Card>
    );
  }
  return <span />;
};

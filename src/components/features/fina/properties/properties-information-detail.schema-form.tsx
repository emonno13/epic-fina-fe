import { Input, InputNumber, Radio } from 'antd';
import { Checkbox } from 'antd';
import React, { useState } from 'react';
import {
  getOptionBalconyDirection,
  getOptionDemand,
  getOptionPropertiesType,
  getOptionUtilityProperties,
  PROPERTIES_TYPE,
  UTILITY_PROPERTIES,
} from './contansr';
import { createSchemaItem, HFormItemProps, HFormProps } from '../../../../schema-form/h-types';
import { useHTranslation } from '../../../../lib/i18n';
import { createSchemaLabelItem } from '../../../shared/common/h-label/h-label-title';
import { HSelect } from '../../../shared/common-form-elements/select';
import { HUploadImages } from '../../../shared/common-form-elements/h-upload';
import { HTinyEditor } from '../../../shared/common-form-elements/h-tiny-editor';
import { usePrivateEnvironment } from '../../../../system/hooks';
import { HSubForm } from '../../../../schema-form/h-form';

import './properties.module.scss';

const CheckboxGroup = Checkbox.Group;

export const PropertiesInformationDetailSchema = (props: HFormProps): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const utilityProperties = usePrivateEnvironment('config_properties') || [];
  const { initialValues } = props;
  const [typeProperties, setTypeProperties] = useState(initialValues?.type);
  return ([
    createSchemaLabelItem({
      componentProps: {
        label: t('DETAILS', { vn: 'THÔNG TIN CHI TIẾT' }),
        titleTooltip: t('DETAILS', { vn: 'THÔNG TIN CHI TIẾT' }),
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('Type of property', { vn: 'Loại hình bất động sản' }),
      name: 'type',
      rowProps: { gutter: { xs: 8, md: 24 } },
      colProps: { span: 12 },
      rules: [
        { required: true, message: t('Type of property', { vn: 'Loại hình bất động sản là bắt buộc' }) },
      ],
      componentProps: {
        placeholder: t('Type of property', { vn: 'Loại hình bất động sản' }),
        options: getOptionPropertiesType(t),
        onChange: (document) => {
          setTypeProperties(document);
        },
      },
    }),
    createSchemaItem({
      Component: Radio.Group,
      label: t('Demand', { vn: 'Nhu cầu' }),
      name: 'demand',
      colProps: { span: 12 },
      componentProps: {
        placeholder: t('Demand', { vn: 'Nhu cầu' }),
        options: getOptionDemand(t),
      },
    }),
    createSchemaItem({
      Component: HUploadImages,
      name: 'images',
      rowProps: { gutter: { xs: 8, md: 24 } },
      colProps: { span: 12 },
      label: t('Images', { vn: 'Hình ảnh' }),
    }),
    createSchemaItem({
      Component: Input,
      name: 'address',
      colProps: { span: 12 },
      label: t('Address', { vn: 'Mã căn hộ/sản phâm' }),
      componentProps: {
        placeholder: t('Address', { vn: 'Mã căn hộ/sản phâm' }),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'map',
      colProps: { span: 24 },
      label: t('Map', { vn: 'Map' }),
      componentProps: {
        placeholder: t('Map', { vn: 'Map (url)' }),
      },
    }),
    createSchemaItem({
      Component: Input.TextArea,
      name: 'mapDesc',
      colProps: { span: 12 },
      label: t('Location Description', { vn: 'Mô tả vị trí' }),
      componentProps: {
        placeholder: t('Location Description', { vn: 'Mô tả vị trí' }),
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('Balcony Direction', { vn: 'Hướng ban công' }),
      name: 'balconyDirection',
      rowProps: { gutter: { xs: 8, md: 24 } },
      colProps: { span: 12 },
      componentProps: {
        placeholder: t('Balcony Direction', { vn: 'Hướng ban công' }),
        options: getOptionBalconyDirection(t),
      },
    }),
    createSchemaItem({
      Component: InputNumber,
      name: 'sleepNumber',
      colProps: { span: 12 },
      label: t('Sleep Number', { vn: 'Số phòng ngủ' }),
      componentProps: {
        style: { width: '100%' },
        min: 0,
        placeholder: t('Sleep Number', { vn: 'Số phòng ngủ' }),
      },
    }),
    ...MetaDataGroundHouse({ ...props, typeProperties }),
    createSchemaItem({
      Component: InputNumber,
      name: 'totalArea',
      colProps: { span: 12 },
      rowProps: { gutter: { xs: 8, md: 24 } },
      label: t('Total Area (m2)', { vn: 'Diện tích (m2)' }),
      componentProps: {
        style: { width: '100%' },
        min: 0,
        placeholder: t('Total Area (m2)', { vn: 'Diện tích (m2)' }),
      },
    }),
    createSchemaItem({
      Component: InputNumber,
      name: 'numberOfToilets',
      colProps: { span: 12 },
      label: t('Number Of Toilets', { vn: 'Số WC' }),
      componentProps: {
        style: { width: '100%' },
        min: 0,
        placeholder: t('Number Of Toilets', { vn: 'Số WC' }),
      },
    }),
    createSchemaItem({
      Component: InputNumber,
      name: 'expectedPrice',
      colProps: { span: 12 },
      label: t('Expected price', { vn: 'Giá dự kiến (VND)' }),
      componentProps: {
        style: { width: '100%' },
        min: 0,
        formatter: value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        parser: value => value.replace(/(,*)/g, ''),
        placeholder: t('Expected price', { vn: 'Giá dự kiến' }),
      },
    }),
    createSchemaItem({
      Component: HTinyEditor,
      name: 'content',
      label: 'Content',
      rules: [{ required: true, message: 'Content is required!' }],
      colProps: { span: 24 },
    }),
    ...utilityProperties?.map((el: any) => {
      return (
        createSchemaItem({
          Component: React.Fragment,
          label: el?.name,
          colProps: { xs: 24, sm: 24, md: 12 },
          componentProps: {
            children: <HSubForm schema={() => [...UtilityPropertiesSchema({ ...props, options: el })]}/>,
          },
        })
      );
    }),
  ]);
};

export const UtilityPropertiesSchema = (props: any): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const { options, form } = props;
  const utilityProperties = usePrivateEnvironment('config_properties');
  const optionsM = options?.value?.map((el: any) => {
    return { label: el?.name, value: el?.name, checked: true };
  });

  const ChangeOptionUtility = (document) => {
    const utility = utilityProperties?.find(el => el.code === options.code);
    let defaultOption: string[] = [];
    if (document.target.value === UTILITY_PROPERTIES.FULLY) {
      defaultOption = utility?.value?.map(el => el.name);
    } else {
      utility?.value?.forEach(el => {
        if (el?.tags?.includes(document.target.value)) {
          defaultOption.push(el.name);
        }
      });
    }
    form.setFieldsValue({
      utilityProperties: {
        ...form.getFieldValue('utilityProperties'),
        [options.code.toLowerCase()]: {
          options: [
            ...defaultOption,
          ],
        },
      },
    });
  };
  return ([
    createSchemaItem({
      Component: Radio.Group,
      colProps: { span: 24 },
      className: 'utility-label',
      name: ['utilityProperties', `${options.code?.toLowerCase()}`, 'package'],
      componentProps: {
        options: getOptionUtilityProperties(t),
        onChange: ChangeOptionUtility,
      },
    }),
    createSchemaItem({
      Component: CheckboxGroup,
      colProps: { span: 24 },
      rowProps: { gutter: { xs: 8, md: 24 } },
      name: ['utilityProperties', `${options.code?.toLowerCase()}`, 'options'],
      componentProps: {
        options: optionsM,
      },
    }),
  ]);
};

export const MetaDataGroundHouse = (props: any): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const { typeProperties } = props;
  if (typeProperties === PROPERTIES_TYPE.GROUND_HOUSE) {
    return ([
      createSchemaItem({
        Component: InputNumber,
        name: 'width',
        colProps: { span: 12 },
        rowProps: { gutter: { xs: 8, md: 24 } },
        label: t('Width', { vn: 'Mặt tiền (m)' }),
        componentProps: {
          style: { width: '100%' },
          min: 0,
          placeholder: t('Width', { vn: 'Mặt tiền (m)' }),
        },
      }),
      createSchemaItem({
        Component: InputNumber,
        name: 'height',
        colProps: { span: 12 },
        label: t('Height', { vn: 'Chiều dài mảnh đất (m)' }),
        componentProps: {
          style: { width: '100%' },
          min: 0,
          placeholder: t('Height', { vn: 'Chiều dài mảnh đất (m)' }),
        },
      }),
      createSchemaItem({
        Component: InputNumber,
        name: 'acreageBuild',
        colProps: { span: 12 },
        rowProps: { gutter: { xs: 8, md: 24 } },
        label: t('Acreage Build (m2)', { vn: 'Diện tích xậy dựng (m2)' }),
        componentProps: {
          style: { width: '100%' },
          min: 0,
          placeholder: t('Acreage Build (m2)', { vn: 'Diện tích xậy dựng (m2)' }),
        },
      }),
      createSchemaItem({
        Component: InputNumber,
        name: 'numberOfFloors',
        colProps: { span: 12 },
        label: t('Number Of Floors', { vn: 'Số tầng' }),
        componentProps: {
          style: { width: '100%' },
          min: 0,
          placeholder: t('Number Of Floors', { vn: 'Số tầng' }),
        },
      }),
    ]);
  }
  return [];
};
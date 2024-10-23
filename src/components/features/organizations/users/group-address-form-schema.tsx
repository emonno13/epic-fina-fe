import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import { Input } from 'antd';

import { SelectUtils } from '../../../shared/common-form-elements/select/Utils';
import { createSchemaItem } from '../../../../schema-form/h-types';

export const GroupAddressFormSchema = () => {
  const { t } = useTranslation('admin-common');
  const [countryId, setCountryId] = useState();
  const [stateId, setStateId] = useState();
  const [districtId, setDistrictId] = useState();

  return [
    SelectUtils.createLocationSelectionElement({
      name: 'countryId',
      label: t('Quốc gia / Vùng lãnh thổ'),
      colProps: { span: 6 },
      rowProps: { gutter: { xs: 8, md: 16 } },
      componentProps: {
        placeholder: t('Chọn quốc gia / vùng lãnh thổ'),
        hiddenValues: { type: 'country' },
        onChangeSelected: async (document)=>{
          setCountryId(document?.id);
        },
      },
    }),
    SelectUtils.createLocationSelectionElement({
      name: 'stateId',
      label: t('Tỉnh / TP trực thuộc TW'),
      colProps: { span: 6 },
      componentProps: {
        placeholder: t('Chọn Tỉnh / TP trực thuộc TW'),
        hiddenValues: {
          type: 'state',
          parentId: countryId,
        },
        searchWhenHidenValueChange: true,
        onChangeSelected: async (document)=>{
          setStateId(document?.id);
        },
      },
    }),
    SelectUtils.createLocationSelectionElement({
      name: 'districtId',
      label: t('Quận / Huyện'),
      colProps: { span: 6 },
      componentProps: {
        placeholder: t('Chọn quận / huyện'),
        hiddenValues: {
          type: 'town_district',
          parentId: stateId,
        },
        searchWhenHidenValueChange: true,
        onChangeSelected: async (document)=>{
          setDistrictId(document?.id);
        },
      },
    }),
    SelectUtils.createLocationSelectionElement({
      name: 'subDistrictId',
      label: t('Phường / Xã'),
      colProps: { span: 6 },
      componentProps: {
        placeholder: t('Chọn phường / xã'),
        hiddenValues: {
          type: 'sub_district',
          parentId: districtId,
        },
        searchWhenHidenValueChange: true,
      },
    }),
    createSchemaItem({
      Component: Input,
      colProps: { span: 24 },
      name: 'address',
      componentProps: {
        placeholder: t('Nhập địa chỉ'),
      },
    }),
  ];
};

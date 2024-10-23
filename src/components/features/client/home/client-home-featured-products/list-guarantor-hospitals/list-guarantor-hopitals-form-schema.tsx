import { CaretDownOutlined } from '@ant-design/icons';
import { HSelect } from '@components/shared/common-form-elements/select';
import { AddressSvg } from '@icons';
import { createSchemaItem } from '@schema-form/h-types';
import { useHTranslation } from '../../../../../../lib/i18n';

import './list-guarantor-hospitals.module.scss';

const ListGuarantorHospitalFormSchema = ({ searchForm }) => {
  const { t } = useHTranslation('admin-common');

  return [
    createSchemaItem({
      Component: HSelect,
      name: 'stateId',
      label: <RenderLabelLocation />,
      className: 'list-hospital-client__search-form',
      componentProps: {
        placeholder: t('Select location', { vn: 'Chọn khu vực' }),
        hiddenValues: {
          type: 'state',
          'info.countryCode': 'VN',
        },
        showSearch: true,
        allowClear: true,
        endpoint: 'locations/public/suggestion',
        searchWhenHidenValueChange: true,
        optionsConverter: (document) => {
          document.label = `${document?.description}`;
          return document;
        },
        onChange: () => searchForm?.submit(),
        suffixIcon: (
          <CaretDownOutlined className="list-hospital-client__search-form_icon-search" />
        ),
      },
    }),
  ];
};

export default ListGuarantorHospitalFormSchema;

const RenderLabelLocation = () => {
  return (
    <div className="list-hospitals-client__title-search-form">
      <AddressSvg />
      <div className="list-hospitals-client__title-search-form__title">
        Khu vực:{' '}
      </div>
    </div>
  );
};

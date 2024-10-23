import { HFeature } from '@schema-form/features';
import HSearchForm from '@schema-form/features/search-form';
import { Form } from 'antd';
import { useMemo } from 'react';
import { useHTranslation } from '../../../../../../lib/i18n';
import { endpoints } from '../../../../../../lib/networks/endpoints';
import ListGuarantorHospitalFormSchema from './list-guarantor-hopitals-form-schema';
import ViewDetailListGuarantorDetail from './view-detail-list-guarantor-detail';

const ListGuarantorHospitalDetailSchema = ({ insuranceData }) => {
  const { t } = useHTranslation('admin-common');
  const productId = useMemo(() => insuranceData.id.toString(), [insuranceData]);
  const [searchForm] = Form.useForm();

  return (
    <div className="list-hospitals-client">
      <HFeature
        {...{
          featureId: 'organizations-hospitals',
          searchForm,
        }}
      >
        <HSearchForm
          {...{
            endpoint: endpoints.generateNodeEndpoint(
              `products/${productId}/organizations/suggestion`,
            ),
            placeholder: t('Enter guarantee hospital name', {
              vn: 'Nhập tên bệnh viện bảo lãnh',
            }),
            advancedSchema: () =>
              ListGuarantorHospitalFormSchema({ searchForm }),
            className: 'list-hospitals-client__search-icon',
            isSearchForm: true,
            resetIfSuccess: false,
          }}
        />
        <ViewDetailListGuarantorDetail />
      </HFeature>
    </div>
  );
};

export default ListGuarantorHospitalDetailSchema;

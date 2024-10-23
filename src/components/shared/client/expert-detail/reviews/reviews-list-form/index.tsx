import { useHTranslation } from '@lib/i18n';
import { HForm } from '@schema-form/h-form';
import { createSchemaItem } from '@schema-form/h-types';
import { Form } from 'antd';
import {
  ExpertDetailOrderOptions,
  ExpertDetailProductTypeOptions,
  ExpertDetailRateOptions,
} from '../../constants';
import { ExpertDetailBuildingsIcon } from '../../icons/exper-detail.buildings-icon';
import { ExpertDetailFunnelIcon } from '../../icons/exper-detail.funnel-icon';
import { ExpertDetailOrderIcon } from '../../icons/exper-detail.order-icon';
import ExpertDetailReviewsFormFilterBtn from './reviews-list-form-filter-btn';

import './expert-detail-reviews-list-form.module.scss';

const ExpertDetailReviewsListForm = ({ onFormChanging }) => {
  const { t } = useHTranslation('common');
  const [form] = Form.useForm();

  const onProductTypeChange = () => {
    const values = form.getFieldsValue();

    if (!values.where.type) delete values.where.type;
    if (!values.order) delete values.order;
    if (!values.where.rate) delete values.where.rate;

    onFormChanging(values);
  };

  return (
    <div className="expert-detail-reviews-list-form">
      <HForm
        {...{
          form,
          removeControlActions: true,
          schema: (props) => [
            createSchemaItem({
              Component: ExpertDetailReviewsFormFilterBtn,
              name: ['where', 'type'],
              colProps: { span: 8 },
              rowProps: { gutter: 16 },
              componentProps: {
                label: t('Product', { vn: 'Sản phẩm' }),
                icon: <ExpertDetailBuildingsIcon />,
                options: ExpertDetailProductTypeOptions(t),
                onChange: onProductTypeChange,
              },
              initialValue: '',
            }),
            createSchemaItem({
              Component: ExpertDetailReviewsFormFilterBtn,
              name: 'order',
              colProps: { span: 8 },
              componentProps: {
                label: t('Sort', { vn: 'Sắp xếp' }),
                icon: <ExpertDetailOrderIcon />,
                options: ExpertDetailOrderOptions(t),
                onChange: onProductTypeChange,
              },
              initialValue: 'createdAt DESC',
            }),
            createSchemaItem({
              Component: ExpertDetailReviewsFormFilterBtn,
              name: ['where', 'rate'],
              colProps: { span: 8 },
              componentProps: {
                label: t('Filter', { vn: 'Lọc' }),
                icon: <ExpertDetailFunnelIcon />,
                options: ExpertDetailRateOptions(t),
                onChange: onProductTypeChange,
              },
              initialValue: '',
            }),
          ],
        }}
      />
    </div>
  );
};

export default ExpertDetailReviewsListForm;

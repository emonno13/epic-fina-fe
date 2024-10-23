import { HSubForm } from '@schema-form/h-form';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Col, Row } from 'antd';
import {
  RealEstateSchemaFormDetail,
  RealEstateSchemaFormShort,
} from './real-estate-detail-schema-form';

export const RealEstateDetailSchemaForm = (
  props: HFormProps,
): HFormItemProps[] => {
  return [
    createSchemaItem({
      Component: ({ children }) => {
        return <Row gutter={16}>{children}</Row>;
      },
      componentProps: {
        children: (
          <>
            <Col span={12}>
              <HSubForm schema={() => [...RealEstateSchemaFormShort(props)]} />
            </Col>
            <Col span={12}>
              <HSubForm schema={() => [...RealEstateSchemaFormDetail(props)]} />
            </Col>
          </>
        ),
      },
    }),
  ];
};

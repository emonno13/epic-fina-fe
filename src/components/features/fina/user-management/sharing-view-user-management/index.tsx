import { CheckOutlined, CloseOutlined, EyeOutlined } from '@ant-design/icons';
import { HSelect } from '@components/shared/common-form-elements/select';
import { Link } from '@components/shared/link';
import {
  USER_TYPES,
  USER_TYPES_LABEL_MAPPING,
} from '@components/shared/user/constants';
import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { TableUtils } from '@lib/table-utils';
import { HFeature, HTable } from '@schema-form/features';
import { HFeatureForm } from '@schema-form/features/forms/h-feature-form';
import {
  useDocumentDetail,
  useSearchForm,
  useSetDocumentDetail,
} from '@schema-form/features/hooks';
import HSearchForm from '@schema-form/features/search-form';
import { HSubForm } from '@schema-form/h-form';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { RelationUtils } from '@schema-form/utils/form-utils';
import { Checkbox, Col, Row, Select, Tabs } from 'antd';
import { FC } from 'react';
import { isEmpty } from 'underscore';
import { HDocumentDrawerPanel } from '../../../../../schema-form/features/panels';
import { FiledViewer } from '../../../../shared/common/configuration/field-viewer';
import HCard from '../../../../shared/common/h-card';
import { ClickableOpacity } from '../../../../shared/utils/clickable-opacity';
import DocumentManagement from '../../../profiles/document-management';
import { PreViewUser } from '../../deals/deals-component-common/preview-user';

const { TabPane } = Tabs;

const SharingViewUserManagement: FC = () => {
  const { t } = useHTranslation('admin-common');
  const featureId = 'users/sharing-view';
  return (
    <HFeature featureId={featureId}>
      <HSearchForm
        endpoint={endpoints.generateNodeEndpoint('/users/sharing-view')}
        advancedSchema={SharingViewUserManagementAdvancedSchema}
        resetIfSuccess={false}
        withRelations={[
          RelationUtils.entity('state', ['id', 'description']),
          RelationUtils.entity('district', ['id', 'description']),
          RelationUtils.entity('subDistrict', ['id', 'description']),
        ]}
      />
      <HDocumentDrawerPanel
        title={t('Detail', { vn: 'Chi tiết' })}
        hiddenDocumentButtonControls={true}
      >
        <HFeatureForm schema={SharingViewUserManagementFormSchemaDetail} />
      </HDocumentDrawerPanel>
      <HTable
        scroll={{ x: 'max-content' }}
        schema={() => SharingViewUserManagementTableSchemaDetail({ featureId })}
      />
    </HFeature>
  );
};

export default SharingViewUserManagement;

const RecordsView: FC<{ values: any; recordFieldName: string }> = ({
  values = {},
  recordFieldName = '',
}) => {
  if (!values || isEmpty(values) || !recordFieldName) return <></>;
  const isHaveRecords = values[recordFieldName];
  return (
    <div>
      {isHaveRecords ? (
        <CheckOutlined />
      ) : (
        <CloseOutlined style={{ color: '#ff4d4f' }} />
      )}
    </div>
  );
};

const SharingViewUserManagementTableSchemaDetail = ({ featureId }) => {
  const { t } = useHTranslation('admin-common');
  const setDocumentDetail = useSetDocumentDetail(featureId);
  return [
    TableUtils.createTableColumnConfig({
      title: t('Account', { vn: 'Người dùng' }),
      render: (document) => {
        return (
          <>
            <PreViewUser
              user={document}
              showEmails={false}
              isShowViewFullPhoneNumberAction={false}
            />
            <FiledViewer
              widthLabel={'45px'}
              label={'code'}
              value={document?.code}
            />
          </>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Task counselling', { vn: 'Yêu cầu tư vấn' }),
      render: (values) => (
        <RecordsView values={values} recordFieldName={'taskCounsellings'} />
      ),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Insurance claim', { vn: 'Yêu cầu BTBH' }),
      render: (values) => (
        <RecordsView values={values} recordFieldName={'insuranceClaims'} />
      ),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Deal loan', { vn: 'Hồ sơ vay' }),
      render: (values) => (
        <RecordsView values={values} recordFieldName={'dealLoans'} />
      ),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Deal insurance', { vn: 'Hồ sơ bảo hiểm' }),
      render: (values) => (
        <RecordsView values={values} recordFieldName={'dealInsurances'} />
      ),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Deal insurance claim', { vn: 'Hồ sơ BTBH' }),
      render: (values) => (
        <RecordsView values={values} recordFieldName={'dealInsuranceClaims'} />
      ),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Type'),
      dataIndex: 'type',
      key: 'type',
      render: (type) => t(USER_TYPES_LABEL_MAPPING[type]),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Gender', { vn: 'Giới tính' }),
      dataIndex: 'gender',
      key: 'gender',
      render: ConverterUtils.renderGender,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Address', { vn: 'Địa chỉ' }),
      render: (document) => (
        <div style={{ maxWidth: '350px' }}>
          {ConverterUtils.showUserAddress(document)}
        </div>
      ),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Action'),
      render: (document) => {
        const detailLink = `/admin/fina-staff/customers/sharing-view?documentId=${document.id}`;
        const handleViewDetail = () => {
          setDocumentDetail(document);
        };

        return (
          <ClickableOpacity onClick={handleViewDetail}>
            <Link href={detailLink}>
              <EyeOutlined />
            </Link>
          </ClickableOpacity>
        );
      },
    }),
  ];
};

const OPTIONS_RECORDS = [
  { label: 'Yêu cầu tư vấn', value: 'TASK_COUNSELLING' },
  { label: 'Yêu cầu bồi thường bảo hiểm', value: 'INSURANCE_CLAIM' },
  { label: 'Hồ sơ vay', value: 'DEAL_LOAN' },
  { label: 'Hồ sơ bảo hiểm', value: 'DEAL_INSURANCE' },
  { label: 'Hồ sơ bồi thường bảo hiểm', value: 'DEAL_INSURANCE_CLAIM' },
];

const SharingViewUserManagementAdvancedSchema = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const form = useSearchForm();

  return [
    createSchemaItem({
      Component: Select,
      name: 'type',
      colProps: { xs: 12, sm: 12, md: 6 },
      rowProps: { gutter: { xs: 24, md: 12 } },
      componentProps: {
        options: [
          {
            value: USER_TYPES.CUSTOMER,
            label: t(USER_TYPES_LABEL_MAPPING[USER_TYPES.CUSTOMER]),
          },
          {
            value: USER_TYPES.COLLABORATOR,
            label: t(USER_TYPES_LABEL_MAPPING[USER_TYPES.COLLABORATOR]),
          },
          {
            value: USER_TYPES.OTHERS,
            label: t(USER_TYPES_LABEL_MAPPING[USER_TYPES.OTHERS]),
          },
        ],
        placeholder: t('Type'),
        allowClear: true,
      },
    }),
    ...LocationSchemaDetail({ form }),
    createSchemaItem({
      Component: Checkbox.Group,
      name: 'recordsType',
      label: t('Transactions', { vn: 'Hồ sơ' }),
      rowProps: { gutter: { xs: 24, md: 12 } },
      componentProps: {
        options: OPTIONS_RECORDS,
      },
    }),
  ];
};

export const LocationSchemaDetail = ({ form }) => {
  const { t } = useHTranslation('admin-common');
  return [
    createSchemaItem({
      Component: HSelect,
      name: 'stateId',
      colProps: { xs: 12, sm: 12, md: 6 },
      rowProps: { gutter: { xs: 24, md: 12 } },
      componentProps: {
        placeholder: t('Chọn Tỉnh / TP trực thuộc TW'),
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
        onChange: () => {
          form?.setFieldsValue({
            districtId: undefined,
            subDistrictId: undefined,
          });
        },
      },
    }),
    createSchemaItem({
      className: 'm-b-0',
      Component: ({ value: stateId }) => (
        <HSubForm
          schema={() => [
            createSchemaItem({
              Component: HSelect,
              name: 'districtId',
              className: 'm-b-0',
              colProps: { xs: 24, sm: 24, md: 12 },
              rowProps: { gutter: { xs: 24, md: 12 } },
              componentProps: {
                placeholder: t('Chọn quận / huyện'),
                hiddenValues: {
                  type: 'town_district',
                  parentId: stateId,
                },
                showSearch: true,
                allowClear: true,
                endpoint: 'locations/public/suggestion',
                searchWhenHidenValueChange: true,
                optionsConverter: (document) => {
                  document.label = `${document?.description}`;
                  return document;
                },
                onChange: () =>
                  form?.setFieldsValue({ subDistrictId: undefined }),
              },
            }),
            createSchemaItem({
              className: 'm-b-0',
              Component: ({ value: districtId }) => (
                <HSubForm
                  schema={() => [
                    createSchemaItem({
                      Component: HSelect,
                      name: 'subDistrictId',
                      className: 'm-b-0',
                      componentProps: {
                        placeholder: t('Chọn phường / xã'),
                        hiddenValues: {
                          type: 'sub_district',
                          parentId: districtId,
                        },
                        optionsConverter: (document) => {
                          document.label = `${document?.description}`;
                          return document;
                        },
                        showSearch: true,
                        allowClear: true,
                        endpoint: 'locations/public/suggestion',
                        searchWhenHidenValueChange: true,
                      },
                    }),
                  ]}
                />
              ),
              name: 'districtId',
              colProps: { xs: 24, sm: 24, md: 12 },
            }),
          ]}
        />
      ),
      name: 'stateId',
      colProps: { xs: 24, sm: 24, md: 12 },
    }),
  ];
};

const SharingViewUserManagementFormSchemaDetail = (
  props: HFormProps,
): HFormItemProps[] => {
  const documentDetail = useDocumentDetail();
  const { t } = useHTranslation('admin-common');
  const { code, type, gender } = documentDetail;

  return [
    createSchemaItem({
      Component: () => {
        return (
          <Row>
            <Col md={12} sm={24}>
              <HCard title={t('Information')}>
                <FiledViewer
                  widthLabel={'150px'}
                  label={t('User', { vn: 'Người dùng' })}
                  value={
                    <PreViewUser
                      user={documentDetail}
                      showEmails={false}
                      isShowViewFullPhoneNumberAction={false}
                    />
                  }
                />
                <FiledViewer widthLabel={'150px'} label={'Code'} value={code} />
                <FiledViewer
                  widthLabel={'150px'}
                  label={t('Type')}
                  value={t(USER_TYPES_LABEL_MAPPING[type])}
                />
                <FiledViewer
                  widthLabel={'150px'}
                  label={t('Gender')}
                  value={ConverterUtils.renderGender(gender)}
                />
                <FiledViewer
                  widthLabel={'150px'}
                  label={t('Address')}
                  value={ConverterUtils.showUserAddress(documentDetail)}
                />
                <FiledViewer
                  widthLabel={'150px'}
                  label={t('Owner', { vn: 'Người tạo' })}
                  value={ConverterUtils.getFullNameUser(
                    documentDetail?.createBy,
                  )}
                />
              </HCard>
            </Col>
            <Col span={24}>
              <DocumentManagement userId={documentDetail?.id} />
            </Col>
          </Row>
        );
      },
    }),
  ];
};

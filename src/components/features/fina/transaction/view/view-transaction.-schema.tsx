import { AlignLeftOutlined, InboxOutlined } from '@ant-design/icons';
import { StaffSchemaForm } from '@components/features/client/buy-insurance/components/form-staff';
import {
  createOrganizationSuggestionElement,
  HSelect,
} from '@components/shared/common-form-elements/select';
import { endpoints } from '@lib/networks/endpoints';
import { TableUtils } from '@lib/table-utils';
import { HTable } from '@schema-form/features';
import { HForm, HSubForm } from '@schema-form/h-form';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { FormUtils } from '@schema-form/utils/form-utils';
import {
  Button,
  Col,
  Form,
  Input,
  message,
  notification,
  Row,
  Tag,
  Typography,
} from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import { isEmpty } from 'lodash';
import { useTranslation } from 'next-i18next';
import { useMemo, useState } from 'react';
import {
  ConverterUtils,
  useGenerateConcealContent,
} from '../../../../../lib/converter';
import { FormatterUtils } from '../../../../../lib/formatter';
import { useHTranslation } from '../../../../../lib/i18n';
import {
  useDocumentDetail,
  useSearchForm,
  useSetDocumentDetailVisibility,
} from '../../../../../schema-form/features/hooks';
import { FiledViewer } from '../../../../shared/common/configuration/field-viewer';
import {
  createSchemaLabelItem,
  LabelItem,
} from '../../../../shared/common/h-label/h-label-title';
import {
  PreViewCompany,
  PreViewUser,
} from '../../deals/deals-component-common/preview-user';
import { PRODUCT_TYPE } from '../../products/utils';
import { TRANSACTION_TYPE } from '../constant';
import { TimeLineTransaction } from './timeline-transaction';
import {
  excelTypesFile,
  importExcel,
  normalizeDataImportListOfBeneficiaries,
} from './utils';

import './view-transaction.scss';

const { Title } = Typography;

export const TRANSACTION_ACTION = {
  IMPORT: 'import',
  CREATE: 'create',
};

export const ViewTransaction = ({ type }) => {
  const document = useDocumentDetail();
  const [rawData, setRawData] = useState<any[]>([]);
  const { t } = useHTranslation('admin-common');
  const [form] = Form.useForm();
  const setDocumentDetailVisibility = useSetDocumentDetailVisibility();
  const searchForm = useSearchForm();
  const customers = document?.customers || [];
  const data = useMemo(
    () => normalizeDataImportListOfBeneficiaries(rawData),
    [rawData],
  );

  const handleConfirmUpload = async (type?: string) => {
    try {
      const values = await form.validateFields();
      await FormUtils.submitForm(
        {
          ...values,
          customers: data,
          action: TRANSACTION_ACTION.IMPORT,
          statusPayment: type,
        },
        {
          endpoint: endpoints.endpointWithApiDomain(
            '/transactions/public/insurance-multiple',
          ),
          method: 'post',
          useDefaultMessage: true,
          onGotSuccess: () => {
            searchForm?.submit();
            setDocumentDetailVisibility(false);
          },
        },
      );
    } catch (e) {
      FormUtils.showFormValidateFailMessage();
    }
  };

  if (!document?.id) {
    return (
      <>
        <HForm
          {...{
            form,
            schema: InsuranceTransactionDetailSchemaForm,
            transport: { setRawData, data },
            hideControlButton: true,
            initialValues: {
              legal: 'staff',
            },
          }}
        />
        <div className="wrapper-view-transaction">
          <Button
            onClick={() => handleConfirmUpload()}
            type="primary"
            size="large"
          >
            {t('Create an unpaid profile', { vn: 'Tạo hồ sơ chưa thanh toán' })}
          </Button>

          <Button
            onClick={() => handleConfirmUpload('success')}
            type="primary"
            size="large"
          >
            {t('Create a paid profile', { vn: 'Tạo hồ sơ đã thanh toán' })}
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <LabelItem
            label={t('Transaction information', { vn: 'Thông tin giao dịch' })}
            firstIcon={<AlignLeftOutlined />}
            titleTooltip={t('Transaction information', {
              vn: 'Thông tin giao dịch bảo hiểm',
            })}
          />
          <FiledViewer
            {...{
              className: 'm-t-20',
              label: t('Transaction'),
              value: <Tag color={'rgb(0, 104, 255)'}>#{document?.code}</Tag>,
              widthLabel: '20%',
            }}
          />
          <FiledViewer
            {...{
              label: t('Product'),
              value: document?.product?.name,
              widthLabel: '20%',
            }}
          />
          <FiledViewer
            {...{
              label: t('Total Amount', {
                en: 'Total Amount',
                vn: 'Tổng tiền',
              }),
              value: FormatterUtils.formatAmount(
                document?.totalAmount || 0,
                'VND',
              ),
              widthLabel: '20%',
            }}
          />
          <FiledViewer
            {...{
              label: t('Total Amount Paid', {
                en: 'Total Amount Paid',
                vn:
                  type === TRANSACTION_TYPE.LOAN
                    ? 'Đã đối soát'
                    : 'Đã thanh toán',
              }),
              value: FormatterUtils.formatAmount(
                document?.totalAmountPaid || 0,
                'VND',
              ),
              widthLabel: '20%',
            }}
          />
          <FiledViewer
            {...{
              label: t('Created at'),
              value: ConverterUtils.fullDatetimeConverter(
                document?.createdAt || '',
              ),
              widthLabel: '20%',
            }}
          />
          {!isEmpty(document?.company) ? (
            <PreViewCompany
              {...{ company: document?.company, calssName: '' }}
            />
          ) : (
            <FiledViewer
              {...{
                label: t('Contract owner', { vn: 'Chủ hợp đồng' }),
                value: <PreViewUser {...{ user: document?.staff }} />,
                widthLabel: '20%',
              }}
            />
          )}
          {document?.customer && (
            <FiledViewer
              {...{
                label: t('Customer'),
                value: <PreViewUser {...{ user: document?.customer }} />,
                widthLabel: '20%',
              }}
            />
          )}
        </Col>
        <Col span={12}>
          <LabelItem
            label={t('Transaction detail information', {
              vn: 'Thông tin chi tiết giao dịch',
            })}
            firstIcon={<AlignLeftOutlined />}
            titleTooltip={t('Transaction detail information', {
              vn: 'Thông tin chi tiết giao dịch',
            })}
          />
          <Row align="middle" className={'m-t-20'}>
            <TimeLineTransaction {...{ data: document?.transactionDetails }} />
          </Row>
        </Col>
      </Row>
      {!isEmpty(customers) && (
        <div className="m-t-20">
          <LabelItem
            label={t('Beneficiary information', {
              vn: 'Thông tin người hưởng bảo hiểm',
            })}
            firstIcon={<AlignLeftOutlined />}
            titleTooltip={t('Beneficiary information', {
              vn: 'Thông tin người hưởng bảo hiểm',
            })}
          />
          <HTable
            {...{
              schema: () => TableSchemaCustomers(),
              dataSource: customers,
              pagination: false,
              className: 'm-t-20',
              scroll: { x: 1000 },
            }}
          />
        </div>
      )}
    </>
  );
};

const ImportInsuranceBeneficiaryTable = (props: { data: any[] }) => {
  const data = props?.data || [];

  return (
    <HTable
      {...{
        schema: ImportInsuranceBeneficiarySchemaDetailTable,
        dataSource: data,
      }}
    />
  );
};

const ImportInsuranceBeneficiarySchemaDetailTable = () => {
  const { t } = useHTranslation('admin-common');

  return [
    TableUtils.createTableColumnConfig({
      title: t('Full name', { vn: 'Tên đầy đủ' }),
      dataIndex: 'fullName',
      key: 'fullName',
      width: 150,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Date of birth', { vn: 'Sinh nhật' }),
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      width: 150,
      render: (value) => ConverterUtils.dateConverter(value),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Gender'),
      dataIndex: 'gender',
      key: 'gender',
      width: 150,
    }),
    TableUtils.createTableColumnConfig({
      title: t('CMND'),
      dataIndex: 'idNumber',
      key: 'idNumber',
      width: 150,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Relationship', { vn: 'Quan hệ với chủ hợp đồng' }),
      dataIndex: 'relationship',
      key: 'relationship',
      width: 150,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Type', { vn: 'Loại' }),
      dataIndex: 'type',
      key: 'type',
      width: 150,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Package', { vn: 'Gói bảo hiểm' }),
      dataIndex: 'package',
      key: 'package',
      width: 150,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Price', { vn: 'Giá' }),
      dataIndex: 'price',
      key: 'price',
      width: 150,
      render: (value) => ConverterUtils.formatNumber(value),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Start time', { vn: 'Ngày có hiệu lực' }),
      dataIndex: 'startTime',
      key: 'startTime',
      width: 150,
      render: (value) => {
        if (value) return ConverterUtils.dateConverter(value);
        return '_';
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Email'),
      dataIndex: 'email',
      key: 'email',
      width: 150,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Tel'),
      dataIndex: 'tel',
      key: 'tel',
      width: 150,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Organization'),
      dataIndex: 'org',
      key: 'org',
      width: 200,
    }),
  ];
};

const TableSchemaCustomers = () => {
  const { t } = useTranslation('admin-common');
  const generateConcealContent = useGenerateConcealContent();
  return [
    TableUtils.createTableColumnConfig({
      title: t('fullName'),
      dataIndex: 'fullName',
      width: 400,
      key: 'fullName',
      render: (name, data) => {
        return (
          <div>
            <FiledViewer
              {...{
                label: t('Full name', { vn: 'Tên' }),
                value: data?.fullName,
              }}
            />
            <FiledViewer
              {...{
                label: t('cmnd'),
                value: data?.idNumber,
              }}
            />
            <FiledViewer
              {...{
                label: t('Tel'),
                value: generateConcealContent(data?.tel),
              }}
            />
            <FiledViewer
              {...{
                label: t('Email'),
                value: generateConcealContent(data?.email),
              }}
            />
          </div>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('meta'),
      dataIndex: 'meta',
      width: 300,
      key: 'meta',
      render: (meta) => <span>{meta?.name || ''}</span>,
    }),
    TableUtils.createTableColumnConfig({
      title: t('packagePrice'),
      width: 300,
      key: 'packagePrice',
      dataIndex: 'meta',
      render: (meta) => FormatterUtils.formatAmount(meta?.amount || 0, 'VND'),
    }),
  ];
};

export const InsuranceTransactionDetailSchemaForm = (
  props: HFormProps,
): HFormItemProps[] => {
  const { transport } = props;
  const { setRawData, data } = transport;
  const { t } = useHTranslation('admin-common');
  const handleImportExcel = (file) => {
    if (!file) {
      message.error('Tải lên không thành công');
      return;
    }
    importExcel(file, setRawData);
  };
  const configs = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    onChange: (info) => {
      const file = info?.file;
      if (file?.status === 'done') {
        if (!excelTypesFile.includes(file?.type)) {
          notification.error({
            message: t('Fail', 'Không thành công'),
            description: t('Only excel file upload', {
              vn: 'Chỉ tải lên tệp excel',
            }),
          });
          return;
        }
        message.success(
          `${info.file.name} ${t('upload file successfully', { vn: 'tải lên thành công' })}`,
        );
        handleImportExcel(file?.originFileObj);
      }
      if (file?.status === 'error') {
        message.error(
          `${info.file.name} ${t('upload file fail', { vn: 'tải lên thất bại' })}`,
        );
      }
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
    },
  };
  const orgForm = [
    createSchemaLabelItem({
      colProps: { span: 24 },
      rowProps: { gutter: { xs: 16, md: 16 } },
      componentProps: {
        label: 'THÔNG TIN CÔNG TY',
      },
    }),
    createOrganizationSuggestionElement({
      label: t('NAME OF SMALL ISSUANCE ORGANIZATION', {
        vn: 'TÊN TỔ CHỨC PHÁT HÀNH',
      }),
      name: 'companyId',
      colProps: { span: 12 },
      rowProps: { gutter: { xs: 8, md: 16 } },
      rules: [
        {
          required: true,
          message: t('Organization is required', {
            vn: 'Chọn tổ chức là bắc buộc',
          }),
        },
      ],
      componentProps: {
        endpoint: 'organizations/public/suggestion',
        searchWhenHidenValueChange: true,
        placeholder: t('Enter the issuer name', {
          vn: 'Nhập tên tổ chức phát hành',
        }),
        mode: 'single',
        optionsConverter: (document) => {
          document.label = `${document?.name || ''}`;
          return document;
        },
      },
    }),
    createSchemaItem({
      Component: Input,
      label: t('Người đại diện', { vn: 'Người đại diện' }),
      name: 'surrogate',
      rules: [
        {
          required: true,
          message: t('Surrogate is required', {
            vn: 'Chọn người đại diện là bắt buộc',
          }),
        },
      ],
      colProps: { span: 12 },
      componentProps: {
        placeholder: t('Enter surrogate', { vn: 'Nhập tên người đại diện' }),
      },
    }),
    createSchemaItem({
      Component: Input,
      label: t('Chức vụ', { vn: 'Chức vụ' }),
      name: 'surrogateLevel',
      colProps: { span: 12 },
      rules: [
        {
          required: true,
          message: t('Level is required', {
            vn: 'Chọn chức vụ người đại diện',
          }),
        },
      ],
      componentProps: {
        placeholder: t('Level', { vn: 'Nhập chức vụ' }),
      },
    }),
  ];

  const fileImportForm = [
    createSchemaItem({
      Component: HSelect,
      label: t('Product insurance', { vn: 'Sản phẩm bảo hiểm' }),
      name: 'productId',
      colProps: { xs: 24, sm: 24, md: 12 },
      rules: [
        {
          required: true,
          message: 'Sản phẩm bảo hiểm là bắt buộc',
        },
      ],
      componentProps: {
        endpoint: 'products/suggestion',
        placeholder: t('Product insurance', { vn: 'Sản phẩm bảo hiểm' }),
        showSearch: true,
        hiddenValues: {
          type: PRODUCT_TYPE.INSURANCE,
        },
      },
    }),
    createSchemaItem({
      Component: () => (
        <Dragger {...configs}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            {t('Click or drag file to this area to upload', {
              vn: 'Nhấp hoặc kéo tệp vào khu vực này để tải lên',
            })}
          </p>
          <p className="ant-upload-hint">
            {t(
              'Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files',
              {
                vn: 'Hỗ trợ tải lên đơn lẻ. Nghiêm cấm tải lên dữ liệu công ty hoặc dữ liệu khác tập tin ban nhạc',
              },
            )}
          </p>
        </Dragger>
      ),
    }),
    createSchemaItem({
      Component: () => (
        <>
          <Title
            {...{
              level: 4,
            }}
          >
            {t('Insurance beneficiary', { vn: 'Danh sách người thụ hưởng' })}
          </Title>
          <ImportInsuranceBeneficiaryTable data={data} />
        </>
      ),
      hidden: !data.length,
    }),
  ];

  return [
    createSchemaItem({
      Component: HSelect,
      label: t('Legal', { vn: 'Pháp nhân' }),
      name: 'legal',
      colProps: { xs: 24, sm: 24, md: 12 },
      rowProps: { gutter: { xs: 8, md: 16 } },
      rules: [
        {
          required: true,
          message: 'Chọn pháp nhân là bắt buộc',
        },
      ],
      componentProps: {
        placeholder: t('Legal', { vn: 'Chọn pháp nhân' }),
        options: [
          { label: 'Tổ chức', value: 'org' },
          { label: 'Cá nhân', value: 'staff' },
        ],
      },
    }),
    createSchemaItem({
      Component: SubFormLegal,
      name: 'legal',
      componentProps: {
        staffForm: StaffSchemaForm(),
        orgForm: orgForm,
      },
    }),
    ...fileImportForm,
  ];
};

const SubFormLegal = (props: any) => {
  if (props?.value === 'staff') {
    return <HSubForm schema={() => props.staffForm} />;
  }

  if (props?.value === 'org') {
    return <HSubForm schema={() => props.orgForm} />;
  }

  return <></>;
};

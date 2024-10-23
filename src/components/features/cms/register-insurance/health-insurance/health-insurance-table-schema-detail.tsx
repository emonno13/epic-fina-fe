import { EyeOutlined } from '@ant-design/icons';
import { TYPE } from '@components/features/client/buy-insurance/components/form-staff';
import {
  PreViewCompany,
  PreViewUser,
} from '@components/features/fina/deals/deals-component-common/preview-user';
import { FiledViewer } from '@components/shared/common/configuration/field-viewer';
import { Tag, Tooltip } from 'antd';
import { ConverterUtils } from 'lib/converter';
import { FormatterUtils } from 'lib/formatter';
import { useHTranslation } from 'lib/i18n';
import { TableUtils } from 'lib/table-utils';
import { isEmpty } from 'lodash';
import { useOnDocumentClick } from '../../../../../schema-form/features/hooks/table-hooks';
import { ClickableOpacity } from '../../../../shared/utils/clickable-opacity';
import { getStepByDealInsuranceStatus } from './health-insurance-staff-schema-detail';
import { RegisterInsuranceUtils } from './utils';

export const HealthInsuranceTableSchemaDetail = (props) => {
  const { employeeBuy } = props;
  const { t } = useHTranslation('admin-common');
  const onDocumentClick = useOnDocumentClick();

  const schema = [
    TableUtils.createTableColumnConfig({
      title: t('Code'),
      dataIndex: 'code',
      key: 'code',
      width: 50,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Package', { vn: 'Gói bảo hiểm' }),
      dataIndex: 'meta',
      key: 'meta',
      render: (meta, item) => {
        return (
          <div>
            <FiledViewer
              {...{
                label: t('Organizations'),
                value: item?.org?.name,
                widthLabel: '25%',
              }}
            />
            <FiledViewer
              {...{
                label: t('Product', { vn: 'Sản phẩm bảo hiểm' }),
                value: item?.product?.name,
                widthLabel: '25%',
              }}
            />
            <FiledViewer
              {...{
                label: t('Package', { vn: 'Gói bảo hiểm' }),
                value: meta?.name,
                widthLabel: '25%',
              }}
            />
            <FiledViewer
              {...{
                label: t('amount', { vn: 'Thanh toán' }),
                value: FormatterUtils.formatAmount(meta?.amount, 'VND'),
                widthLabel: '25%',
              }}
            />
          </div>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Chủ hợp đồng', { vn: 'Chủ hợp đồng' }),
      dataIndex: 'createdBy',
      key: 'createdBy',
      className: 'contract-holder-insurance',
      responsive: ['md'],
      render: (_, dealDocument) => {
        const { company, createdBy } = dealDocument || {};
        if (!isEmpty(company)) return <PreViewCompany {...{ company }} />;
        return <PreViewUser user={createdBy} />;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Customer'),
      dataIndex: 'user',
      key: 'user',
      responsive: ['md'],
      render: (user) => {
        return <PreViewUser user={user} />;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Created at'),
      dataIndex: 'createdAt',
      sortable: true,
      key: 'createdAt',
      render: ConverterUtils.fullDatetimeConverter,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Status'),
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const step = getStepByDealInsuranceStatus[status];
        return <Tag color={step?.color}>{step?.name}</Tag>;
      },
    }),
  ];

  if (employeeBuy === TYPE.relative) {
    schema.push(
      TableUtils.createTableColumnConfig({
        title: t('Relative', { vn: 'Người thân' }),
        dataIndex: 'relation',
        key: 'relation',
        render: (record) => RegisterInsuranceUtils.renderUser({ ...record, t }),
      }),
    );
  }

  return [
    ...schema,
    {
      title: t('Action'),
      width: 100,
      responsive: ['md'],
      render: (document) => {
        return (
          <div className="d-f-center">
            <Tooltip title={'Chi tiết'}>
              <div>
                <ClickableOpacity onClick={() => onDocumentClick(document)}>
                  <EyeOutlined />
                </ClickableOpacity>
              </div>
            </Tooltip>
          </div>
        );
      },
    },
  ];
};

import { EyeOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import Tooltip from 'antd/lib/tooltip';
import { isEmpty } from 'lodash';
import { ItemViewer } from '@components/shared/common/configuration/item-viewer';
import { useHTranslation } from '@lib/i18n';
import { TableUtils } from '@lib/table-utils';
import { TRANSACTION_TYPE } from './constant';
import { FormatterUtils } from '../../../../lib/formatter';
import { useCurrentUser } from '../../../../lib/providers/auth';
import {
  PreViewCompany,
  PreViewUser,
} from '../deals/deals-component-common/preview-user';

export const TransactionTableSchema = (props) => {
  const { t } = useHTranslation('admin-common');
  const currentUser = useCurrentUser();

  return [
    TableUtils.createTableColumnConfig({
      title: t('Thông tin giao dịch'),
      sortable: true,
      width: '30%',
      render: (_, document: any) => {
        return (
          <div>
            <ItemViewer
              {...{
                label: t('Code'),
                value: <Tag color={'rgb(0, 104, 255)'}>#{document.code}</Tag>,
                labelClassName: 'm-b-0i',
              }}
            />
            {document?.type === TRANSACTION_TYPE.LOAN && (
              <>
                <ItemViewer
                  {...{
                    label: t('Bank(s)', { vn: 'Ngân hàng' }),
                    value: document?.partner?.name,
                    labelClassName: 'm-b-0i',
                  }}
                />
                <ItemViewer
                  {...{
                    label: t('Dela', { vn: 'Hồ sơ vay' }),
                    value: (
                      <Tooltip placement="topLeft" title="Click me">
                        <a
                          href={`${location.origin}/admin/deals/loans?dealId=${document?.objectId}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <EyeOutlined />
                        </a>
                      </Tooltip>
                    ),
                    labelClassName: 'm-b-0i',
                  }}
                />
              </>
            )}
            <ItemViewer
              {...{
                label: t('Status'),
                value: (
                  <>
                    <Tag color="green">{t(document?.status)}</Tag>
                  </>
                ),
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: t('Product'),
                value: document?.product?.name,
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: t('Total Amount', {
                  en: 'Total Amount',
                  vn: 'Tổng tiền',
                }),
                value: FormatterUtils.formatAmount(
                  document?.totalAmount || 0,
                  'vnđ',
                ),
                labelClassName: 'm-b-0i',
              }}
            />
            {document?.type === TRANSACTION_TYPE.INSURANCE &&
              document?.metaData?.certLink && (
                <ItemViewer
                  {...{
                    label: t('Certificate', { vn: 'Chứng chỉ' }),
                    value: (
                      <Tooltip placement="topLeft" title="Click me">
                        <a
                          href={document?.metaData?.certLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <EyeOutlined />
                        </a>
                      </Tooltip>
                    ),
                    labelClassName: 'm-b-0i',
                  }}
                />
              )}
          </div>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('customer.n.staff'),
      dataIndex: 'customer',
      sortable: true,
      key: 'user',
      width: '30%',
      responsive: ['md'],
      render: (customer, document) => {
        const { staff, company } = document || {};
        if (!isEmpty(company)) return <PreViewCompany {...{ company }} />;
        return (
          <div style={{ width: 250 }}>
            <PreViewUser user={customer} userTitle={'Người hưởng'} />
            <PreViewUser user={document.staff} userTitle={'Người mua'} />
          </div>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Product'),
      dataIndex: 'product',
      sortable: true,
      key: 'product',
      width: '30%',
      render: (product, document) => {
        const productUrl =
          product?.info?.productUrlOriginal &&
          product?.info?.codeGatewayGlobalCare
            ? `${product?.info?.productUrlOriginal}?staff_id=${currentUser.id}&token=${product?.info?.codeGatewayGlobalCare}`
            : product?.info?.productUrlOriginal;
        return (
          <div>
            <ItemViewer
              {...{
                label: t('Code'),
                value: <Tag color={'rgb(0, 104, 255)'}>#{product?.code}</Tag>,
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: t('Product name'),
                value: product?.name,
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: t('Link product'),
                value: (
                  <Tooltip placement="topLeft" title="Click me">
                    <a href={productUrl} target="_blank" rel="noreferrer">
                      {' '}
                      <EyeOutlined />
                    </a>
                  </Tooltip>
                ),
                labelClassName: 'm-b-0i',
              }}
            />
          </div>
        );
      },
    }),
    TableUtils.createColumnCreatedAt(),
    TableUtils.createEditColumn(),
  ];
};

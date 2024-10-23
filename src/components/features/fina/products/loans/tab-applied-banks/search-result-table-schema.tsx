import React from 'react';
import { Tag } from 'antd';
import { useRouter } from 'next/router';
import { TableUtils } from '@lib/table-utils';
import { ClickableOpacity } from '@components/shared/utils/clickable-opacity';
import { ConverterUtils } from '../../../../../../lib/converter';
import { ItemViewer } from '../../../../../shared/common/configuration/item-viewer';
import {
  LOAN_STATUSES_COLOR_MAPPING,
  LOAN_STATUSES_LABEL_MAPPING,
} from '../../utils';
import { useHTranslation } from '../../../../../../lib/i18n';

export const ProductDetailsTableSchema = (props) => {
  const { t } = useHTranslation('admin-common');
  const isNotShowAction = props?.isNotShowAction;
  const { locale } = useRouter();

  const actionProductDetail = isNotShowAction ? (
    <></>
  ) : (
    TableUtils.createEditAndDeleteControlColumn()
  );

  return [
    TableUtils.createTableColumnConfig({
      title: t('Organizations'),
      dataIndex: 'org',
      // sortable: true,
      key: 'orgId',
      render: (_, document: any) => {
        return (
          <div className={'product'}>
            <div className={'product__mobile'}>
              <ItemViewer
                {...{
                  label: t('Code'),
                  value: (
                    <Tag color={'rgb(0, 104, 255)'}>#{document?.code}</Tag>
                  ),
                  labelClassName: 'm-b-0i',
                }}
              />
            </div>
            <ItemViewer
              {...{
                label: t('Organizations'),
                value: ConverterUtils.showOrgConverter(document?.org),
                labelClassName: 'm-b-0i',
              }}
            />
            <div className={'product__mobile'}>
              <ItemViewer
                {...{
                  label: t('Name'),
                  value: document?.name,
                  labelClassName: 'm-b-0i',
                }}
              />
              <ItemViewer
                {...{
                  label: t('Time application (Start time)'),
                  value: ConverterUtils.dateConverter(document?.applyFrom),
                  labelClassName: 'm-b-0i',
                }}
              />
              <ItemViewer
                {...{
                  label: t('Time application (End time)'),
                  value: ConverterUtils.dateConverter(document?.applyTo),
                  labelClassName: 'm-b-0i',
                }}
              />
            </div>
          </div>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Preferential interest rate'),
      dataIndex: 'name',
      // sortable: true,
      responsive: ['md'],
      render: (_, document: any) => {
        return (
          <div style={{ maxWidth: '200px' }}>
            <ItemViewer
              {...{
                label: t('Preferential interest rate (%)'),
                value: document?.info?.preferentialRate,
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: t('Offer period (month)'),
                value: document?.info?.preferentialTime,
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: t('Interest rate after incentives (%)'),
                value: document?.info?.afterPreferentialRate,
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: t('Reference interest rate'),
                value: document?.info?.preferentialReference,
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: t('Amplitude %'),
                value: document?.info?.amplitude,
                labelClassName: 'm-b-0i',
              }}
            />
          </div>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Borrow time'),
      dataIndex: 'name',
      // sortable: true,
      responsive: ['md'],
      render: (_, document: any) => {
        return (
          <div>
            <ItemViewer
              {...{
                label: t('Minimum loan period (month)'),
                value: document?.info?.minTime || 0,
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: t('Maximum loan period (year)'),
                value: document?.info?.maxTime || 0,
                labelClassName: 'm-b-0i',
              }}
            />
          </div>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Terms'),
      dataIndex: 'name',
      sortable: true,
      responsive: ['md'],
      render: (_, document: any) => {
        return (
          <div>
            <ItemViewer
              {...{
                label: t('Minimum loan amount (đ)'),
                value: document?.info?.minMoney || 0,
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: t('Maximum loan amount (đ)'),
                value: document?.info?.maxMoney || 0,
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: t('Maximum loan rate (%)'),
                value: document?.info?.maxRate || 0,
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: t('Early repayment fee'),
                value: document?.info?.earlyRepaymentFee || 0,
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: t('Other fees'),
                value: document?.info?.otherFees || 0,
                labelClassName: 'm-b-0i',
              }}
            />
          </div>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Status'),
      dataIndex: 'status',
      sortable: true,
      key: 'status',
      responsive: ['md'],
      render: (status) => (
        <Tag color={LOAN_STATUSES_COLOR_MAPPING[status]}>
          {t(LOAN_STATUSES_LABEL_MAPPING[status])}
        </Tag>
      ),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Thông tin bổ sung '),
      render: (document) => {
        return (
          <div>
            <ItemViewer
              {...{
                label: 'Sản phẩm vay:',
                value: (
                  <ClickableOpacity
                    onClick={() => {
                      window.open(
                        `${window.location.origin}/${locale}/admin/products/loans?documentId=${document?.product?.id}`,
                        '_blank',
                      );
                    }}
                    className="p-r-10"
                    tooltip={document?.product?.name}
                  >
                    <a>{document?.product?.name}</a>
                  </ClickableOpacity>
                ),
                labelClassName: 'm-b-0i',
              }}
            />

            <ItemViewer
              {...{
                label: 'Danh mục sản phẩm:',
                value: (
                  <ClickableOpacity
                    onClick={() => {
                      window.open(
                        `${window.location.origin}/${locale}/admin/products/categories?loan_productsId=${document?.category?.id}`,
                        '_blank',
                      );
                    }}
                    className="p-r-10"
                    tooltip={document?.category?.name}
                  >
                    <a>{document?.category?.name}</a>
                  </ClickableOpacity>
                ),
                labelClassName: 'm-b-0i',
              }}
            />
          </div>
        );
      },
    }),
    actionProductDetail,
  ];
};

import { useState } from 'react';

import { Tabs } from 'antd';
import moment from 'moment';

import { DownloadOutlined } from '@ant-design/icons';
import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { useCurrentUser } from '@lib/providers/auth';
import { LoanProductCommissionReceiveTableSchema } from './loan-product/commission-receive/search-result-table-schema';
import { InsuranceProductCommissionReceiveTableSchema } from './insurances/commission-receive/search-result-table-schema';
import { CommissionAdvanceFormSchema } from './commission-advance-form-schema';
import { LoanProductCommissionReceiveDetailForm } from './loan-product/commission-receive/detail-schema-form';
import { InsurancesProductCommissionReceiveDetailForm } from './insurances/commission-receive/detail-schema-form';
import { useHTranslation } from '../../../../../lib/i18n';
import { HFeature, HTable } from '../../../../../schema-form/features';
import HSearchForm from '../../../../../schema-form/features/search-form';
import { FormatterUtils } from '../../../../../lib/formatter';
import { FormUtils } from '../../../../../schema-form/utils/form-utils';
import { useTaxVAT } from '../hooks';

import './index.scss';

const { TabPane } = Tabs;

export const CommissionStatisticBox = ({
  title = '',
  type = '',
  beforeVAT = '',
  afterVAT = '',
}) => {
  const { t } = useHTranslation('admin-common');

  return (
    <>
      <h2
        className={`commission-summary__title commission-summary__title--${type}`}
      >
        {title}
      </h2>
      <div className={'commission-summary__amount'}>
        <table style={{ margin: '0 auto' }}>
          <tbody>
            <tr>
              <td className={'text-left'}>{t('Trước thuế')}</td>
              <td>:</td>
              <td style={{ paddingLeft: '1rem' }}>
                <strong>{beforeVAT}</strong>
              </td>
            </tr>
            <tr>
              <td className={'text-left'}>{t('Sau thuế')}</td>
              <td>:</td>
              <td style={{ paddingLeft: '1rem' }}>
                <strong>{afterVAT}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export const CommissionTabViewer = ({
  type = '',
  featureId = '',
  documentIdName = '',
  ...props
}) => {
  const { t } = useHTranslation('admin-common');
  const currentUser: any = useCurrentUser();
  const { children } = props;
  const [metadata, setMetadata] = useState({
    totalForControl: 0,
    totalNotForControl: 0,
    totalCancelled: 0,
  });
  const VAT = useTaxVAT();

  const onGotSearchResult = (searchResult) => {
    const { metadata } = searchResult;
    setMetadata(metadata);
  };

  const handleDataReadyToSubmit = (data) => {
    if (data?.from) {
      data.createdAt = FormUtils.getQueryBetweenDays(
        data?.from,
        data?.to || moment().add(1, 'days').format('YYYY/MM/DD'),
      );
      delete data.from;
      delete data.to;
    }
  };

  const handleExportDocument = () => {
    (window as any).open(
      `${process.env.NEXT_PUBLIC_STATIC_CDN}/commissions/export/${currentUser?.id}-${type}`,
    );
  };

  return (
    <HFeature
      {...{
        featureId: featureId || 'commissions',
        documentIdName: documentIdName || 'commissionId',
        nodeName: 'commissions',
        documentRelations: [
          'transactionDetail',
          'deal',
          'dealDetail',
          {
            relation: 'transaction',
            scope: {
              include: [
                { relation: 'partner' },
                { relation: 'staff' },
                { relation: 'customer' },
                {
                  relation: 'product',
                  scope: {
                    include: [{ relation: 'org' }],
                  },
                },
              ],
            },
          },
        ],
      }}
    >
      <HSearchForm
        {...{
          withRelations: [
            'transactionDetail',
            'deal',
            'dealDetail',
            {
              relation: 'transaction',
              scope: {
                include: [
                  { relation: 'partner' },
                  { relation: 'staff' },
                  { relation: 'customer' },
                  {
                    relation: 'product',
                    scope: {
                      include: [{ relation: 'org' }],
                    },
                  },
                ],
              },
            },
          ],
          hiddenFields: {
            type: 'receive',
            transactionType: type,
          },
          // hiddenCreateButton: false,
          advancedSchema: () => CommissionAdvanceFormSchema({ type }),
          transport: {
            type,
          },
          onDataReadyToSubmit: handleDataReadyToSubmit,
          onGotSuccess: onGotSearchResult,
          resetIfSuccess: false,
          renderRightSuffix: (
            <HButton
              {...{
                ...props,
                size: 'large',
                shape: 'round',
                className: 'control-btn m-l-10',
                onClick: handleExportDocument,
                icon: <DownloadOutlined />,
              }}
            >
              {' '}
              {t('Export')}
            </HButton>
          ),
        }}
      />

      <ul className={'commission-summary'}>
        <li className={'commission-summary__item'}>
          <CommissionStatisticBox
            {...{
              title: t('Chưa đối soát'),
              type: 'not-for-control',
              beforeVAT: FormatterUtils.formatAmount(
                metadata.totalNotForControl / (1 + VAT),
                'VND',
              ),
              afterVAT: FormatterUtils.formatAmount(
                metadata.totalNotForControl,
                'VND',
              ),
            }}
          />
        </li>
        <li className={'commission-summary__item'}>
          <CommissionStatisticBox
            {...{
              title: t('Đã đối soát'),
              type: 'for-control',
              beforeVAT: FormatterUtils.formatAmount(
                metadata.totalForControl / (1 + VAT),
                'VND',
              ),
              afterVAT: FormatterUtils.formatAmount(
                metadata.totalForControl,
                'VND',
              ),
            }}
          />
        </li>
        <li className={'commission-summary__item'}>
          <CommissionStatisticBox
            {...{
              title: t('Đã huỷ'),
              type: 'cancelled',
              beforeVAT: FormatterUtils.formatAmount(
                metadata.totalCancelled / (1 + VAT),
                'VND',
              ),
              afterVAT: FormatterUtils.formatAmount(
                metadata.totalCancelled,
                'VND',
              ),
            }}
          />
        </li>
      </ul>

      {children}

      <HTable
        schema={
          type === 'loan'
            ? LoanProductCommissionReceiveTableSchema
            : InsuranceProductCommissionReceiveTableSchema
        }
      />
    </HFeature>
  );
};

export default () => {
  const { t } = useHTranslation('admin-common');
  return (
    <Tabs>
      <TabPane tab={t('Tín dụng')} key={'commission_loan'}>
        <CommissionTabViewer
          type={'loan'}
          featureId={'commissionReceiveLoan'}
          documentIdName={'loanReceiveId'}
        >
          <LoanProductCommissionReceiveDetailForm />
        </CommissionTabViewer>
      </TabPane>

      <TabPane tab={t('Bảo hiểm')} key={'commission_insurance'}>
        <CommissionTabViewer
          type={'insurances'}
          featureId={'commissionReceiveInsurance'}
          documentIdName={'insuranceReceiveId'}
        >
          <InsurancesProductCommissionReceiveDetailForm />
        </CommissionTabViewer>
      </TabPane>
    </Tabs>
  );
};

import { PreViewUser } from '@components/features/fina/deals/deals-component-common/preview-user';
import { HComment } from '@components/shared/common-form-elements/h-comment';
import { FiledViewer } from '@components/shared/common/configuration/field-viewer';
import HCard from '@components/shared/common/h-card';
import DocumentManagement from '@components/shared/documents';
import { FormatterUtils } from '@lib/formatter';
import { useHTranslation } from '@lib/i18n';
import { Empty } from 'antd';
import { isEmpty } from 'lodash';
import { memo } from 'react';

import './deal-loan-detail.module.scss';

interface DealLoanDetailInformationProps {
  taskData?: any;
  dealData?: any;
}

export const DealLoanDetailInformation = memo(
  (props: DealLoanDetailInformationProps) => {
    const { taskData = {}, dealData = {} } = props;
    const { user } = taskData;
    const { t } = useHTranslation('admin-common');
    const { loanMoney = 0, timeLoan = 0, product, code } = dealData;

    if (!taskData || isEmpty(taskData)) return <Empty />;

    return (
      <div className="deal-loan-detail-information">
        {code && (
          <FiledViewer
            {...{
              label: t('Code'),
              value: <a>#{code}</a>,
              widthLabel: '5%',
            }}
          />
        )}

        <HCard
          {...{
            title: t('Customer information'),
            titleProps: {
              style: {
                color: '#064DD6',
                fontWeight: 700,
              },
              tooltip: t('Customer information'),
            },
            className: 'm-t-20',
          }}
        >
          <FiledViewer
            {...{
              label: t('Customer'),
              value: <PreViewUser user={user} />,
            }}
          />
        </HCard>

        {!isEmpty(dealData) && (
          <>
            <HCard
              {...{
                title: t('Loan amount information', {
                  vn: 'Thông tin khoản vay',
                }),
                titleProps: {
                  style: {
                    color: '#064DD6',
                    fontWeight: 700,
                  },
                  tooltip: t('Loan amount information', {
                    vn: 'Thông tin khoản vay',
                  }),
                },
                className: 'm-t-20',
              }}
            >
              <FiledViewer
                {...{
                  label: t('Loan demand', { vn: 'Nhu cầu vay' }),
                  value: product?.name || '',
                }}
              />

              <FiledViewer
                {...{
                  label: t('Amount want to borrow', { vn: 'Số tiền muốn vay' }),
                  value: FormatterUtils.formatAmount(
                    parseInt(loanMoney),
                    'VND',
                  ),
                }}
              />

              <FiledViewer
                {...{
                  label: t('borrow period of time', { vn: 'Thời hạn vay' }),
                  value: FormatterUtils.formatAmount(
                    parseInt(timeLoan),
                    'tháng',
                  ),
                }}
              />
            </HCard>

            <HCard
              {...{
                title: t('Related documents', { vn: 'Giấy tờ liên quan' }),
                titleProps: {
                  style: {
                    color: '#064DD6',
                    fontWeight: 700,
                  },
                  tooltip: t('Related documents', { vn: 'Giấy tờ liên quan' }),
                },
                className: 'm-t-20',
              }}
            >
              <DocumentManagement
                {...{
                  objectId: dealData?.id,
                  objectType: 'deal_loan',
                  documentTemplateId: dealData?.documentTemplateId,
                  isDisabled: dealData?.isDocumentsCompleted,
                }}
              />
            </HCard>

            <HCard
              {...{
                title: t('Note'),
                titleProps: {
                  style: {
                    color: '#064DD6',
                    fontWeight: 700,
                  },
                  tooltip: t('Note'),
                },
                className: 'm-t-20',
              }}
            >
              <HComment documentId={dealData.id} />
            </HCard>
          </>
        )}
      </div>
    );
  },
);

import LoanCalc from '@components/shared/client/loan-calculator';
import LoanCalculatorWrapper from '@components/shared/client/loan-calculator-wrapper';
import ClientPageCover from '@components/shared/client/page-cover';
import { useHTranslation } from '@lib/i18n';
import Head from 'next/head';

import './client.calculator.scss';

const ClientCalculator = () => {
  const { t } = useHTranslation('common');

  return (
    <LoanCalculatorWrapper>
      <Head>
        <title>Công cụ tính</title>
      </Head>
      <div className="client-calculator">
        <ClientPageCover
          {...{
            title: t('client_calculator_cover_title', {
              en: 'Loan calculator',
              vn: 'Công cụ tính khoản vay',
            }),
            breadCrumbRoutes: [
              {
                path: '/cong-cu-tinh',
                breadcrumbName: t('Loan calculator', { vn: 'Công cụ tính' }),
              },
            ],
          }}
        />
        <div className="max-w-1100 m-auto">
          <LoanCalc />
        </div>
      </div>
    </LoanCalculatorWrapper>
  );
};

export default ClientCalculator;

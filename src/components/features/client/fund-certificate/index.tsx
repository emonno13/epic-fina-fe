import { PopoverExplain } from '@components/shared/popover-explain';
import Head from 'next/head';
import { useEffect, useRef } from 'react';
import { useHTranslation } from '../../../../lib/i18n';
import { HFeature } from '../../../../schema-form/features';
import { HSearchFormHiddenAble } from '../../../../schema-form/features/search-form';
import FundCertificatesTable from '../../../shared/client/fund-certificates/fund-certificates-table';
import ClientLeaveInfoForm from '../../../shared/client/leave-info-form';
import ClientPageCover from '../../../shared/client/page-cover';
import { filterFundList } from './constants';

const ClientFundCertificate = () => {
  const { t } = useHTranslation('admin-common');
  const clientFundRef: any = useRef(null);

  useEffect(() => {
    clientFundRef?.current?.scrollIntoView();
  }, []);

  return (
    <div
      className={'client-fund-certificate'}
      style={{ marginBottom: '30px' }}
      ref={clientFundRef}
    >
      <Head>
        <title>Chứng chỉ quỹ</title>
      </Head>
      <ClientPageCover
        {...{
          title: t('Chứng chỉ quỹ', {
            en: 'Fund certificate',
            vn: 'Chứng chỉ quỹ',
          }),
          breadCrumbRoutes: [
            {
              path: '/danh-sach-chung-chi-quy',
              breadcrumbName: t('fund-certificate', { vn: 'Chứng chỉ quỹ' }),
            },
          ],
          imageSrc: '/assets/images/client_loan_list_cover.png',
        }}
      />
      <ClientLeaveInfoForm isNew={true} />
      <div className={'max-w-1100 m-auto'}>
        <HFeature
          {...{
            featureId: 'fund-product',
            nodeName: 'products/public-fund',
          }}
        >
          <HSearchFormHiddenAble
            withRelations={['org']}
            hiddenValues={{
              filter: { ...filterFundList },
            }}
          />
          <div
            className="fund-certificates-wrapper"
            style={{ marginLeft: '16px', marginRight: '16px' }}
          >
            <div className="fund-certificates-wrapper__title">
              {t('Fund certificates', { vn: 'Chứng chỉ quỹ' })} &nbsp;
              <PopoverExplain
                title="Chứng chỉ quỹ"
                content={
                  'Là loại chứng khoán xác nhận quyền sở hữu của nhà đầu tư đối với một phần vốn góp của quỹ đầu tư chứng khoán'
                }
              />
            </div>

            <div className="fund-certificates-wrapper__des">
              <span>Lãi suất cao ưu đãi</span>
            </div>

            <FundCertificatesTable />
          </div>
        </HFeature>
      </div>
    </div>
  );
};

export default ClientFundCertificate;

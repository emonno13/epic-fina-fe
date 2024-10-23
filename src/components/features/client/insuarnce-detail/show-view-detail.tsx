import ClientPageCover from '@components/shared/client/page-cover';
import { useHTranslation } from '@lib/i18n';
import Head from 'next/head';
import InsuranceDetailViewDetail from './insurance-detail-view-detail.schema';

import './insurance-detail.module.scss';

const ShowViewDetail = (props) => {
  const { t } = useHTranslation('comomn');
  const { categoryName = '' } = props;

  const goBack = () => {
    history.back();
  };

  return (
    <div className="insurance-detail-content">
      <Head>
        <title>Danh sách bảo hiểm</title>
      </Head>
      <ClientPageCover
        {...{
          title: t('client_insurances_cover_title', {
            en: categoryName,
            vn: categoryName,
          }),
          description: t('client_insurances_cover_desc', {
            en: "FINA's insurance products are insurance products related to Real Estate, People and Property in Real Estate.",
            vn: 'Sản phẩm bảo hiểm của FINA là những sản phẩm bảo hiểm liên quan tới lĩnh vực Bất Động Sản, Con người và Tài sản trong Bất Động sản.',
          }),
          homeRoute: '/bao-hiem',
          breadCrumbRoutes: [
            {
              path: '/danh-sach-bao-hiem',
              breadcrumbName: t('Insurance list', { vn: 'Danh sách bảo hiểm' }),
            },
            {
              path: '',
              breadcrumbName: categoryName,
            },
          ],
        }}
      />
      <div className="max-w-1100 m-auto">
        <div className="insurance-detail-left-back insurance-list-detail-back">
          {/* <ClickableOpacity onClick={() => goBack()}>
						<ArrowLeftCircleSvg />
					</ClickableOpacity>
					{categoryName} */}
        </div>
        <InsuranceDetailViewDetail />
      </div>
    </div>
  );
};

export default ShowViewDetail;

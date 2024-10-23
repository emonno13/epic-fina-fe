import { KIND_OF_PROJECTS } from '@components/features/fina/projects/utils';
import FeaturedNews from '@components/shared/client/featured-news';
import { HomeRealEstates } from '@components/shared/client/home-real-estate';
import ClientLoanCalculatorIntroduction from '@components/shared/client/loan-calculator-introduction';
import ClientPageCover from '@components/shared/client/page-cover';
import ClientWhyChooseUs from '@components/shared/client/why-choose-us';
import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Pagination } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { PAGE_SIZE_DESKTOP, PAGE_SIZE_MOBILE } from './constants';

import './real-estates.module.scss';

const ClientRealEstates = () => {
  const { t } = useHTranslation('common');
  const [realEstates, setRealEstates] = useState<any>({
    data: [],
    total: 0,
  });
  const { query, push, locale } = useRouter();
  const isMobile = useIsMobile();
  const pageSize = isMobile ? PAGE_SIZE_MOBILE : PAGE_SIZE_DESKTOP;
  const fetchData = useCallback(async (query) => {
    const { page = '1', kindOf = KIND_OF_PROJECTS.ALL } = query;
    await FormUtils.submitForm(
      {},
      {
        isSearchForm: true,
        nodeName: 'projects/public',
        hiddenValues: {
          filter: {
            limit: pageSize,
            skip: (+page - 1) * pageSize,
            where: {
              kindOf: kindOf === 'all' ? undefined : kindOf,
              active: true,
            },
          },
        },
        resetIfSuccess: false,
        onGotSuccess: setRealEstates,
      },
    );
  }, []);

  useEffect(() => {
    fetchData(query);
  }, [query]);

  const onPaginationChange = async (page) => {
    await push(
      `/${locale}/danh-sach-bat-dong-san?page=${page}&kindOf=${query?.kindOf || 'all'}`,
    );
  };

  return (
    <div className="client-real-estates">
      <Head>
        <title>Danh sách bất động sản</title>
      </Head>
      <ClientPageCover
        {...{
          title: t('client_real_estates_cover_title', {
            en: 'Real estates project',
            vn: 'BĐS Dự án',
          }),
          description: t('client_real_estates_cover_desc', {
            en: "FINA's insurance products are insurance products related to Real Estate, People and Property in Real Estate.",
            vn: 'Sản phẩm bảo hiểm của FINA là những sản phẩm bảo hiểm liên quan tới lĩnh vực Bất Động Sản, Con người và Tài sản trong Bất Động sản.',
          }),
          breadCrumbRoutes: [
            {
              path: '/danh-sach-bat-dong-san',
              breadcrumbName: t('Real estates project list', {
                vn: 'Danh sách BĐS',
              }),
            },
          ],
          imageSrc: '/assets/images/loan-to-buy-project.png',
        }}
      />

      <div className="client-real-estates__list">
        <div className=" max-w-1100 m-auto">
          <HomeRealEstates
            {...{
              realEstates,
            }}
          />
          <Pagination
            {...{
              current: +(query?.page || '1'),
              pageSize: pageSize,
              total: realEstates.total,
              onChange: onPaginationChange,
              showSizeChanger: false,
              className: 'pagination',
            }}
          />
        </div>
      </div>
      <ClientWhyChooseUs />
      <ClientLoanCalculatorIntroduction />
      <FeaturedNews />
    </div>
  );
};

export default ClientRealEstates;

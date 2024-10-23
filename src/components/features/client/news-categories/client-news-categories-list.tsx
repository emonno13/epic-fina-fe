/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import NewsList from '@components/shared/client/news-list';
import { useTableSourceData } from '@schema-form/features/hooks';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Col, Menu, Pagination, Row, Select } from 'antd';
import { ArrowDownIconSvg } from 'icons';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import './news-categories.module.scss';

const ClientNewsCategoriesList = () => {
  const newsCategories = useTableSourceData() || [];
  const [categoryActive, setCategoryActive] = useState('');
  const [dataNews, setDataNews] = useState<any>({ data: [], total: 0 });
  // const [dataNewsFeatured, setDataNewsFeatured] = useState<any>([]);
  const { query, push, locale } = useRouter();
  const clientNewsCategory: any = useRef(null);

  useEffect(() => {
    clientNewsCategory?.current?.scrollIntoView();
  }, [categoryActive]);

  // const handleFetchRandomNews = (query) => {
  //   const { categoryId } = query;

  //   FormUtils.submitForm(
  //     {
  //       request: {
  //         categoryId: categoryId || categoryActive,
  //         numberOutstanding: NUMBER_OUTSTANDING,
  //         numberNew: NUMBER_NEW,
  //       },
  //     },
  //     {
  //       endpoint: endpoints.endpointWithApiDomain('/news/news-random'),
  //       method: 'get',
  //       onGotSuccess: (response) => {
  //         setDataNewsFeatured(response?.data);
  //         handleFetchNews(query, response?.data?.map(el => el?.id));
  //       },
  //     },
  //   );
  // };

  const handleFetchNews = async (query) => {
    const { categoryId, page } = query;

    await FormUtils.submitForm(
      {},
      {
        nodeName: 'news/public',
        isSearchForm: true,
        withRelations: ['category'],
        hiddenValues: {
          filter: {
            limit: 9,
            skip: (Number(page || 1) - 1) * 9,
            where: {
              categoryId: categoryId || categoryActive,
              isActive: true,
              // id: { nin: ids || [] },
            },
          },
        },
        onGotSuccess: (response) => setDataNews(response),
      },
    );
  };

  const handleChangeCategory = async (e) =>
    await push(`/${locale}/danh-muc-tin-tuc?categoryId=${e?.key}`);

  useEffect(() => {
    if (query && query?.categoryId) {
      setCategoryActive(query?.categoryId as string);
      return;
    }

    if (newsCategories?.length > 0) {
      setCategoryActive(
        newsCategories?.length > 0 ? newsCategories[0]?.id : '',
      );
      return;
    }
  }, [newsCategories, query]);

  useEffect(() => {
    // handleFetchRandomNews(query);
    handleFetchNews(query);
  }, [categoryActive]);

  const onPaginationChange = async (page) => {
    await push(
      `/${locale}/danh-muc-tin-tuc?categoryId=${query?.categoryId}&page=${page}`,
    );
  };

  return (
    <div className="client-news-categories-list" ref={clientNewsCategory}>
      <Row gutter={[16, 16]}>
        <Col
          {...{ xs: 24, sm: 24, md: 6, lg: 6 }}
          className="client-news-categories-left"
        >
          <div className="client-news-categories-left-wrapper">
            <h2 className="client-news-categories-left-title">Danh mục</h2>

            <Menu
              onClick={handleChangeCategory}
              selectedKeys={[categoryActive]}
            >
              {newsCategories?.map((menu) => (
                <Menu.Item key={menu?.id}>{menu?.name}</Menu.Item>
              ))}
            </Menu>
          </div>

          <Select
            value={categoryActive}
            options={newsCategories?.map((category) => ({
              label: category?.name,
              value: category?.id,
            }))}
            onChange={(id) => handleChangeCategory({ key: id })}
            suffixIcon={<ArrowDownIconSvg />}
            size="large"
            style={{ width: '100%' }}
          />
        </Col>

        <Col
          {...{ xs: 24, sm: 24, md: 18, lg: 18 }}
          className="client-news-categories-right"
        >
          <h2 className="client-news-categories-right-title">
            {
              newsCategories?.find(
                (category) => category?.id === categoryActive,
              )?.name
            }
          </h2>
          <>
            {/* <HCarousel
                {...{
                  autoplay: true,
                  speed: 300,
                  slidesToShow: 1,
                  arrows: true,
                  prevArrow: (
                    <span>
                      <IconArrowLeft />
                    </span>
                  ),
                  nextArrow: (
                    <span>
                      <IconArrowRight />
                    </span>
                  ),
                }}
                className="client-news-categories-right-carousel"
              >
                {dataNewsFeatured?.map((newsData) => (
                  <NewsSlideItem {...{ newsData }} key={newsData?.id} />
                ))}
              </HCarousel> */}

            <NewsList {...{ data: dataNews?.data || [] }} />

            {dataNews.total > 0 && (
              <Pagination
                {...{
                  className: 'client-news-categories-list-pagination',
                  current: Number(query.page || 1),
                  pageSize: 12,
                  total: dataNews.total,
                  onChange: onPaginationChange,
                  showSizeChanger: false,
                }}
              />
            )}
          </>
        </Col>
      </Row>
    </div>
  );
};

export default ClientNewsCategoriesList;

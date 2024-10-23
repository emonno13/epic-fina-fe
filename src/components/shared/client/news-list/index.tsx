import { Col, Row } from 'antd';
import { useMemo } from 'react';
import Image from 'next/image';
import { ConverterUtils } from '@lib/converter';
import { rgbDataURL } from '@components/shared/atom/rgb';

import './news-list.module.scss';

export const NewsListItem = ({ newsData }) => {
  const { image, description, title, slug, author, createdAt } = newsData;
  const href = useMemo(() => `/tin-tuc/${slug}`, [slug]);

  return (
    <div className="news-list-item">
      <a
        className="news-list-item__link"
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        {/* <img src={image} /> */}
        <div className="news-list-item-image">
          <Image
            placeholder="blur"
            blurDataURL={rgbDataURL(220, 220, 220)}
            src={image}
            width={1}
            height={1}
            layout="responsive"
          />
        </div>
      </a>
      <a href={href} target="_blank" rel="noreferrer">
        <h1
          className="news-list-item__title"
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </a>
      <p className="news-list-item__author">
        {author} . {ConverterUtils.dateConverterToString(createdAt)}
      </p>
      <p
        className="news-list-item__desc"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};

const NewsList = ({ data }) => {
  if (!Array.isArray(data) || data.length < 0) {
    return null;
  }
  return (
    <Row gutter={[16, 16]}>
      {data.map((newsData, index) => (
        <Col
          key={`news-list-item-${index}-${newsData?.id}`}
          {...{ xs: 24, sm: 24, md: 8 }}
        >
          <NewsListItem {...{ newsData }} />
        </Col>
      ))}
    </Row>
  );
};

export default NewsList;

/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from '@components/shared/link';
import { ConverterUtils } from '@lib/converter';

import './news-categories.module.scss';

const NewsSlideItem = ({ newsData }: any) => {
  const { image, description, title, slug, author, createdAt } = newsData;
  const href = `/tin-tuc/${slug}`;

  return (
    <Link className="news-slide-item" href={href}>
      <div
        className="news-slide-item-wrapper"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="news-slide-item-overlay">
          <h1
            className="news-slide-item-title"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p className="news-slide-item-author">
            {author} . {ConverterUtils.dateConverterToString(createdAt)}
          </p>
          <p
            className="news-slide-item-desc"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    </Link>
  );
};

export default NewsSlideItem;

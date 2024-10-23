/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { ConverterUtils } from '@lib/converter';

import './news.module.scss';

const NewsCustomItemLeft = ({ newsData }: any) => {
  const { image, description, title, slug, author, createdAt } = newsData;
  const href = `/tin-tuc/${slug}`;

  return (
    <a
      className="news-custom-item-left"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <div
        className="news-custom-item-left-wrapper"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="news-custom-item-left-overlay">
          <h1
            className="news-custom-item-left-title"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p className="news-custom-item-left-author">
            {author} . {ConverterUtils.dateConverterToString(createdAt)}
          </p>
          <p
            className="news-custom-item-left-desc"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    </a>
  );
};

export default NewsCustomItemLeft;

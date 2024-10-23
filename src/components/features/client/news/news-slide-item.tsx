import { rgbDataURL } from '@components/shared/atom/rgb';
import { ConverterUtils } from '@lib/converter';
import Image from 'next/image';

import './news.module.scss';

const NewsSlideItem = ({ newsData, position }: any) => {
  const { image, description, title, slug, author, createdAt, category } =
    newsData;
  const href = `/tin-tuc/${slug}`;

  return (
    <a href={href} target="_blank" rel="noreferrer">
      <div
        className={`news-slide-item-home news-slide-item-home-${position}`}
        // style={{ backgroundImage: `url(${image})` }}
      >
        <div className="news-slide-item-home-image">
          <Image
            placeholder="blur"
            blurDataURL={rgbDataURL(220, 220, 220)}
            src={image}
            width={1}
            height={1}
            layout="responsive"
          />
        </div>
        <div className="news-slide-item-home-overlay">
          {/* <span className="news-slide-item-home-category">
            {category?.name}
          </span> */}
          <h1
            className="news-slide-item-home-title"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p className="news-slide-item-home-author">
            {author} . {ConverterUtils.dateConverterToString(createdAt)}
          </p>
          <p
            className="news-slide-item-home-desc"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    </a>
  );
};

export default NewsSlideItem;

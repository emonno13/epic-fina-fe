import { rgbDataURL } from '@components/shared/atom/rgb';
import { Link } from '@components/shared/link';
import { HFeature } from '@schema-form/features';
import { useTableSourceData } from '@schema-form/features/hooks';
import { HSearchFormHiddenAble } from '@schema-form/features/search-form';
import Image from 'next/image';

const ClientHomeNewsListByCategoryItem = ({ newsData }) => {
  const { image, title, slug } = newsData;
  const href = `/tin-tuc/${slug}`;

  return (
    <div className="client-home-list-by-category-item">
      <Link href={href}>
        <div className="client-home-list-by-category-item__image">
          {!!image && !!image.trim() && (
            <Image
              placeholder="blur"
              blurDataURL={rgbDataURL(220, 220, 220)}
              src={image}
              width={16}
              height={9}
              alt="thumbnail"
              layout="responsive"
            />
          )}
        </div>
      </Link>
      <Link href={href}>
        <h2 className="client-home-list-by-category-item__title">{title}</h2>
      </Link>
    </div>
  );
};

const ClientHomeNewsListByCategoryDisplay = () => {
  const news = useTableSourceData();
  if (!news?.length) {
    return null;
  }
  return (
    <div className="client-home-news-list-by-category">
      {news.map((newsData) => (
        <ClientHomeNewsListByCategoryItem
          key={`client-home-news-list-by-category-item-${newsData.id}`}
          {...{ newsData }}
        />
      ))}
    </div>
  );
};

const ClientHomeNewsListByCategory = ({ categoryData }) => {
  return (
    <HFeature
      {...{
        featureId: `clientHomeNewsByCategory${categoryData.id}`,
        nodeName: 'news/public',
      }}
    >
      <HSearchFormHiddenAble
        {...{
          hiddenFields: {
            categoryId: categoryData.id,
          },
          hiddenValues: {
            filter: {
              where: {
                isActive: true,
              },
            },
          },
          pagination: {
            filter: {
              limit: 3,
            },
          },
        }}
      />
      <ClientHomeNewsListByCategoryDisplay />
    </HFeature>
  );
};

export default ClientHomeNewsListByCategory;

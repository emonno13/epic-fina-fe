import { CLIENT_PRODUCT_DETAIL_ROUTE } from '@components/features/client/product-detail/constants';
import { rgbDataURL } from '@components/shared/atom/rgb';
import { Link } from '@components/shared/link';
import cls from 'classnames';
import { FavoriteIcon } from 'icons';
import Image from 'next/image';

const IMAGE_REAL_ESTATE_DEFAULT =
  'https://media.cntraveler.com/photos/53da60a46dec627b149e66f4/master/pass/hilton-moorea-lagoon-resort-spa-moorea-french-poly--110160-1.jpg';

const HomeProjectListItem = ({ projectData, className = '' }) => {
  const { name, slug, images } = projectData;
  const imageUrl =
    images?.[0] && images?.[0]?.trim() ? images[0] : IMAGE_REAL_ESTATE_DEFAULT;

  return (
    <Link href={`/${CLIENT_PRODUCT_DETAIL_ROUTE.PROJECT}/${slug}`}>
      <div className={cls(className, 'home-project-list-item')}>
        <div className="home-project-list-item__image">
          <Image
            placeholder="blur"
            blurDataURL={rgbDataURL(220, 220, 220)}
            src={imageUrl}
            width={1}
            height={1}
            layout="responsive"
          />
        </div>
        <span className="home-project-list-item__content">
          <div className="home-project-list-item__content__info">
            <span className="home-project-list-item__content__info__name">
              {name}
            </span>
          </div>
          <div className="home-project-list-item__content__favorite-icon">
            <FavoriteIcon />
          </div>
        </span>
      </div>
    </Link>
  );
};

export default HomeProjectListItem;

import { CLIENT_PRODUCT_DETAIL_ROUTE } from '@components/features/client/product-detail/constants';
import { Link } from '@components/shared/link';

const HomeRealEstateListItem = ({ realEstateData }) => {
  const { name, description, image, slug } = realEstateData;
  return (
    <Link href={`/${CLIENT_PRODUCT_DETAIL_ROUTE.REAL_ESTATE}/${slug}`}>
      <div className="client-home-real-estate-list-item">
        <span className="client-home-real-estate-list-item__image">
          <i
            style={{
              backgroundImage: image
                ? `url("${image}")`
                : "url('https://cdn.fina.com.vn/production/default/bce92bfc-bb35-40c2-82cf-f2c7df3d35e6.png')",
            }}
          />
        </span>
        <div className="client-home-real-estate-list-item__content">
          <div className="client-home-real-estate-list-item__content__name">
            {name}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HomeRealEstateListItem;

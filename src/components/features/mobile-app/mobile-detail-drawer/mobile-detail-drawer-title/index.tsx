import { useDocumentDetail } from '@schema-form/features/hooks';

import './mobile-detail-drawer-title.scss';

const MobileDetailDrawerTitle = ({ titleHeight }) => {
  const { info, name } = useDocumentDetail();
  const imgSrc = info?.image?.url
    ? info?.image?.url
    : '/assets/images/default-product-image.jpg';

  return (
    <div className="mobile-detail-drawer-title" style={{ height: titleHeight }}>
      <div className="mobile-detail-drawer-title__title">{name}</div>
      <div className="mobile-detail-drawer-title__thumb">
        <img src={imgSrc} />
      </div>
    </div>
  );
};

export default MobileDetailDrawerTitle;

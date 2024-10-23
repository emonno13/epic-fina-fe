import AlmaImageCarousel from '../../common/image-carousel';

const AlmaServicePanelDetail = ({ detail, images = [], title }) => {
  return (
    <div className="alma-service-panel-detail">
      <AlmaImageCarousel>
        {images.map((fileName, index) => (
          <div key={`alma-service-panel-image-${index}-${fileName}`} className="alma-service-panel-detail__image">
            <img src={`/assets/images/${fileName}`} />
          </div>
        ))}
      </AlmaImageCarousel>
      <h1 className="alma-service-panel-detail__title">
        {title}
      </h1>
      <div className="alma-service-panel-detail__detail-container">
        {detail}
      </div>
    </div>
  );
};

export default AlmaServicePanelDetail;
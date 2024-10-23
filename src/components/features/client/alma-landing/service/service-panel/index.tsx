import { HModal } from '@components/shared/common/h-modal';
import { useHTranslation } from '@lib/i18n';
import { useState } from 'react';
import AlmaServiceViewMoreArrowIcon from '../../icons/alma-service-view-more-arrow-icon';
import AlmaServicePanelDetail from './service-panel.detail';

const AlmaServicePanel = ({ thumbImage, title, desc, detail, images }) => {
  const { t } = useHTranslation('common');
  const [visible, setVisible] = useState(false);
  const handleCancel = () => {
    setVisible(false);
  };
  const handleOpen = () => {
    setVisible(true);
  };
  return (
    <div className="alma-service-panel">
      <div className="alma-service-panel__thumb-image">
        <img src={`/assets/images/${thumbImage}`} />
      </div>
      <div className="alma-service-panel__content">
        <h1 className="alma-service-panel__title">{title}</h1>
        <p className="alma-service-panel__desc">{desc}</p>
        <div className="alma-service-panel__view-more">
          <span onClick={handleOpen}>{t('View more', { vn: 'Xem thêm' })}</span>
          <div className="alma-service-panel__view-more-icon">
            <AlmaServiceViewMoreArrowIcon />
          </div>
        </div>
      </div>
      <HModal
        {...{
          visible,
          onCancel: handleCancel,
          footer: null,
          width: 670,
          className: 'alma-service-panel-modal',
        }}
      >
        <AlmaServicePanelDetail
          {...{
            title,
            detail,
            images,
          }}
        />
      </HModal>
    </div>
  );
};

export default AlmaServicePanel;

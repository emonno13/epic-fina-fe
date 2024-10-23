import { HModal, HModalProps } from '@components/shared/common/h-modal';
import ImageGallery, { ReactImageGalleryProps } from 'react-image-gallery';

import 'react-image-gallery/styles/scss/image-gallery.scss';

export interface HGalleryProps extends ReactImageGalleryProps {
  visible?: boolean;
  onClose?: any;
  classNameModal?: string;
  modalProps?: HModalProps;
}

export const HGallery = (props: HGalleryProps) => {
  const {
    visible = false,
    onClose,
    modalProps = {},
    classNameModal = 'preview-gallery-modal',
  } = props;

  return (
    <HModal
      {...{
        height: '80%',
        width: '80%',
        style: { top: 20 },
        visible,
        onCancel: () => onClose(),
        footer: false,
        className: classNameModal,
        ...modalProps,
      }}
    >
      <ImageGallery {...props} />
    </HModal>
  );
};

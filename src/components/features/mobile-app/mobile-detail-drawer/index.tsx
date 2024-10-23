import { useResizeHeightWhenScroll } from '@lib/hooks/sroll';
import { HDocumentDrawerPanel } from '@schema-form/features/panels';
import { HDocumentDrawerPanelProps } from '@schema-form/features/panels/drawer';
import { MAX_TITLE_HEIGHT, MIN_TITLE_HEIGHT } from './constants';
import MobileDetailDrawerTitle from './mobile-detail-drawer-title';

import './mobile-detail-drawer.scss';

const MobileDetailDrawer = (props: HDocumentDrawerPanelProps) => {
  const { children, className, title, ...restProps } = props;
  const titleHeight = useResizeHeightWhenScroll({
    maxHeight: MAX_TITLE_HEIGHT,
    minHeight: MIN_TITLE_HEIGHT,
  });
  return (
    <HDocumentDrawerPanel
      {...restProps}
      footer={null}
      closeIcon={<img src="/assets/images/ic_mobile-back-arrow.svg" />}
      className="mobile-detail-drawer"
      title={<MobileDetailDrawerTitle titleHeight={titleHeight} />}
    >
      {children}
    </HDocumentDrawerPanel>
  );
};

export default MobileDetailDrawer;

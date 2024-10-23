import { HParagraph } from '@components/shared/atom/h-paragraph';
import ViewMoreButton from '@components/shared/atom/view-more-button';
import { Empty } from 'antd';
import cls from 'classnames';
import { useTranslation } from 'next-i18next';
import { Fragment, ReactNode, useCallback } from 'react';
import {
  useClientFeature,
  useNumberOfRemainingData,
  useOpenClientDocumentDetail,
} from '../hooks/client-feature-hook';
import ClientFeaturePagination, {
  ClientFeaturePaginationProps,
} from '../pagination';

import './client-feature-list.module.scss';

type ClientFeatureListProps = {
  empty?: ReactNode;
  renderItem: (item: any, onClick?: () => void) => ReactNode;
  showLoadMore?: boolean;
  itemClassName?: string;
  disabledOpenDocumentDetail?: boolean;
  showPagination?: boolean;
  isCustomRenderListItem?: boolean;
  paginationProps?: ClientFeaturePaginationProps;
};

const ClientFeatureList = (props: ClientFeatureListProps) => {
  const {
    empty,
    renderItem,
    showLoadMore = false,
    itemClassName,
    disabledOpenDocumentDetail = false,
    showPagination = false,
    isCustomRenderListItem = false,
    paginationProps = {},
  } = props;
  const { dataSource } = useClientFeature();
  const { t } = useTranslation('common');
  const numberOfRemainingData = useNumberOfRemainingData();
  const openClientDocumentDetail = useOpenClientDocumentDetail();

  const onItemClick = useCallback(
    (item) => {
      if (disabledOpenDocumentDetail) return;
      openClientDocumentDetail(item);
    },
    [disabledOpenDocumentDetail, openClientDocumentDetail],
  );

  if (dataSource?.length === 0) {
    if (empty) return <>{empty}</>;
    return <Empty />;
  }
  return (
    <div className="client-feature-list">
      {!isCustomRenderListItem &&
        dataSource.map((item) => (
          <div
            key={`client-list-item-${item?.id}`}
            onClick={() => onItemClick(item)}
            className={cls('item', itemClassName)}
          >
            {renderItem(item)}
          </div>
        ))}
      {isCustomRenderListItem &&
        dataSource.map((item) => (
          <Fragment key={`client-list-item-${item?.id}`}>
            {renderItem(item, () => onItemClick(item))}
          </Fragment>
        ))}
      {showLoadMore && (
        <ViewMoreButton
          {...{
            className: 'view-more-button',
          }}
        >
          <HParagraph
            {...{
              fontSize: 13,
              semiStrong: true,
            }}
          >
            {t('loadMore')}
          </HParagraph>
          <div className={'number-of-remaining-data'}>
            {numberOfRemainingData}
          </div>
        </ViewMoreButton>
      )}
      {showPagination && <ClientFeaturePagination {...paginationProps} />}
    </div>
  );
};

export default ClientFeatureList;

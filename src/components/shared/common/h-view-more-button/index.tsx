import { useHTranslation } from '@lib/i18n';
import { setPagination } from '@schema-form/features/actions';
import { useFeatureId, useSearchForm } from '@schema-form/features/hooks';
import {
  usePagination,
  useTableSourceData,
} from '@schema-form/features/hooks/table-hooks';
import { Button, ButtonProps } from 'antd';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import './h-view-more-button.module.scss';

type HViewMoreButtonProps = ButtonProps;
const HViewMoreButton = (props: HViewMoreButtonProps) => {
  const { t } = useHTranslation('common');
  const pagination = usePagination();
  const dataSource = useTableSourceData();
  const searchForm = useSearchForm();
  const featureId = useFeatureId();
  const dispatch = useDispatch();
  const shouldRender = useMemo(() => {
    if (!Array.isArray(dataSource) || dataSource.length < 1 || !pagination) {
      return false;
    }
    return dataSource.length < pagination.total;
  }, [pagination, dataSource]);
  const onClick = () => {
    const page = pagination?.page || 1;
    dispatch(
      setPagination({
        featureId,
        pagination: {
          isAppendData: true,
          page: page + 1,
        },
      }),
    );
    searchForm?.submit();
  };
  if (!shouldRender) {
    return null;
  }
  return (
    <div className="ui-h-view-more-button">
      <Button
        {...{
          ...props,
          type: 'primary',
          onClick,
          children: props.children || t('View more', { vn: 'Xem thêm' }),
        }}
      />
    </div>
  );
};

export default HViewMoreButton;

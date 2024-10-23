import {
  useSubmitLoadMore,
  useViewMoreCondition,
} from '@schema-form/client-features/hooks/client-feature-hook';
import { Button, ButtonProps } from 'antd';
import { useCallback } from 'react';

const ViewMoreButton = (props: ButtonProps) => {
  const { onClick } = props;
  const viewMoreCondition = useViewMoreCondition();
  const submitLoadMore = useSubmitLoadMore();

  const onButtonClick = useCallback(
    (e) => {
      if (onClick) onClick(e);
      submitLoadMore();
    },
    [onClick, submitLoadMore],
  );

  if (!viewMoreCondition) {
    return null;
  }
  return (
    <Button
      {...{
        ...props,
        onClick: onButtonClick,
      }}
    />
  );
};

export default ViewMoreButton;

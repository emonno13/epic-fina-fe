import React, { useCallback } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

import { Button } from 'antd';

const BackButton = ({ onClick }) => {
  const onBackButtonClick = useCallback(() => {
    if (onClick) onClick();
  }, [onClick]);

  return (
    <div onClick={onBackButtonClick} className="backButtonWrap">
      <Button
        className="backButton"
        icon={<FontAwesomeIcon className="backButtonIcon" icon={faLongArrowAltLeft} />}
      >
        Trở lại
      </Button>
    </div>
  );
};

export default BackButton;

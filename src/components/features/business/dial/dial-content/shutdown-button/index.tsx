import { SVGIcon } from '@components/shared/atom/svg-icon';
import { setEndingCall } from '@components/shared/stringee/actions';
import { ShutDownSvg } from '@icons';
import { useHTranslation } from '@lib/i18n';
import { useCurrentUser } from '@lib/providers/auth';
import classNames from 'classnames';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { setShowDetailCallRecord } from '../../actions';
import { useSetCurrentControl } from '../../hooks';

import './shutdown-btn.module.scss';

interface ShutDownBtnProps {
  className?: string;
  handleShutDown?: Function;
  hasHiddenBtn?: boolean;
  changeLayoutModal?: Function;
}

export const ShutDownButton = (props: ShutDownBtnProps) => {
  const {
    className,
    handleShutDown,
    hasHiddenBtn = true,
    changeLayoutModal,
  } = props;
  const dispatch = useDispatch();
  const { t } = useHTranslation('admin-common');
  const currentUser = useCurrentUser();
  const setCurrentControl = useSetCurrentControl();
  const stringee = useSelector((state: RootStateOrAny) => state.stringee);
  const { namespace } = stringee;

  const handleEndCall = () => {
    if (handleShutDown) {
      handleShutDown();
      return;
    }

    dispatch(setShowDetailCallRecord(false));
    dispatch(setEndingCall({ namespace, currentUser }));
  };

  const handleClick = () => {
    setCurrentControl('');
    changeLayoutModal && changeLayoutModal();
  };

  return (
    <div className="control-btn">
      <div
        onClick={handleEndCall}
        className={classNames('shutdown-btn', className)}
      >
        <SVGIcon svg={<ShutDownSvg />} />
      </div>
      {hasHiddenBtn && (
        <span onClick={handleClick} className="hidden-btn">
          {t('Hidden', { vn: 'Ẩn' })}
        </span>
      )}
    </div>
  );
};

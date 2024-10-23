import cls from 'classnames';
import SurveyLayoutHeader from './header';

import './survey-layout.module.scss';

const SurveyLayout = ({ children, alternateStyle = false, style }) => {
  return (
    <div
      className={cls('survey-layout', {
        alternate: alternateStyle,
      })}
      style={style}
    >
      <SurveyLayoutHeader />
      <div>
        {children}
      </div>
    </div>
  );
};

export default SurveyLayout;

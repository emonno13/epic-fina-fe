
import ScrollAnimation from 'react-animate-on-scroll';
import cls from 'classnames';
import { ReactNode } from 'react';

type HSectionPropType = {
  children: ReactNode;
  className?: string;
  animateIn? : string;
};

const HScrollAnimation = (props: HSectionPropType) => {
  return (
    <ScrollAnimation {...{
      animateIn: props?.animateIn || 'fadeInLeft',
      animateOnce: true,
      duration: 1.2,
    }}
    className={cls(props?.className)}
    >
      {props?.children}
    </ScrollAnimation>
  );
};

export default HScrollAnimation;

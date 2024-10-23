import { useEffect } from 'react';

import './mobile-loan-calculator.scss';

const MobileLoanCalculator = () => {
  useEffect(() => {
    const bodyNode = document.getElementsByTagName('body')[0];
    window.scrollTo({ top: 0, behavior: 'smooth' });
    bodyNode.style.overflow = 'hidden';
    return () => {
      bodyNode.style.overflow = 'auto';
    };
  }, []);
  return (
    <div className="mobile-loan-calculator">
      <iframe src="https://cms-v2.fina.com.vn/embeded/cong-cu-tinh" />
    </div>
  );
};

export default MobileLoanCalculator;

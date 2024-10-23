import HCarousel from '@components/shared/common/h-carousel';
import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import BankComponent from './bank';

import './bank.module.scss';

const BanksComponent = (props: any) => {
  const { t } = useHTranslation('common');
  const isMobile = useIsMobile();

  const { banks = [] } = props;

  return (
    <div className="banks">
      {isMobile ? (
        <>
          {banks.map((bank, index) => {
            return <BankComponent bank={bank} key={index} />;
          })}
        </>
      ) : (
        <HCarousel
          {...{
            autoplay: false,
            className: 'loan-package-wrapper-carousel',
          }}
        >
          {banks.map((bank, index) => {
            return <BankComponent bank={bank} key={index} />;
          })}
        </HCarousel>
      )}
    </div>
  );
};

export default BanksComponent;

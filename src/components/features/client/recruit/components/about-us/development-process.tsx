import { useHTranslation } from '../../../../../../lib/i18n';
import { useIsTablet } from '../../../../../../lib/hooks/use-media';
import { FirstSvg, FourthSvg, SecondSvg, ThirdSvg } from '../../icons';

import './development-process.module.scss';

const DevelopmentProcess = () => {
  const { t } = useHTranslation('recruit');
  const isTablet = useIsTablet();
  return (
    <>
      <div className="development-process">
        <div className="development-process__overlay"/>
        <div className="development-process__body">
          <p className="development-process__title">
            {t('development_process', { vn: 'Quá trình phát triển', en: 'Development process' })}
          </p>
          {
            isTablet ?
              <div>
                <FirstSvg style={svg}/>
                <SecondSvg style={svg}/>
                <ThirdSvg style={svg}/>
                <FourthSvg style={svg}/>
              </div>
              :
              <img src={'/assets/images/information-about-us.png'} width="85%" />
          }
        </div>

      </div>
    </>
  );
};

export default DevelopmentProcess;

const svg = {
  margin: '-3px 0',
  width: '100%',
};

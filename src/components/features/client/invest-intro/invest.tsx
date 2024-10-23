import { rgbDataURL } from '@components/shared/atom/rgb';
import HContainer from '@components/shared/common/h-container';
import { useIsMobile } from '@lib/hooks/use-media';
import Image from 'next/image';
import { isArray } from 'underscore';
import { useInvestIntroTransaction } from './hooks';

import './invest.module.scss';

export const Invest = () => {
  const t = useInvestIntroTransaction();
  const isMobile = useIsMobile();

  const urlIconCommon = '/assets/images/invest-intro_invest_step';
  const contentsOfStep1 = [
    t('ct-1-step-1'),
    t('ct-2-step-1'),
    t('ct-3-step-1'),
  ];
  const contentsOfStep2 = t('ct-1-step-2');
  const contentsOfStep3 = [t('ct-1-step-3'), t('ct-2-step-3')];
  const stepSettings: IStep[] = [
    {
      urlIcon: `${urlIconCommon}1.svg`,
      ratioIcon: isMobile ? { x: 83, y: 125 } : { x: 128, y: 193 },
      step: t('step-1'),
      des: t('des-step-1'),
      contents: contentsOfStep1,
      number: 1,
    },
    {
      urlIcon: `${urlIconCommon}2.svg`,
      ratioIcon: isMobile ? { x: 84, y: 84 } : { x: 148, y: 149 },
      step: t('step-2'),
      des: t('des-step-2'),
      contents: contentsOfStep2,
      number: 2,
    },
    {
      urlIcon: `${urlIconCommon}3.svg`,
      ratioIcon: isMobile ? { x: 88, y: 88 } : { x: 117, y: 117 },
      step: t('step-3'),
      des: t('des-step-3'),
      contents: contentsOfStep3,
      number: 3,
    },
  ];

  return (
    <div className="invest">
      <HContainer>
        <h2 className="h2-title">{t('invest-title')}</h2>
        <div className="steps">
          {stepSettings.map((step: IStep, idx: number) => (
            <div
              className={`step-wrapper-${step.number}`}
              key={`invest-step-${idx}`}
            >
              <div />
              <Step {...step} />
            </div>
          ))}
        </div>
      </HContainer>
    </div>
  );
};

interface IStep {
  urlIcon: string;
  ratioIcon: { x: number; y: number };
  step: string;
  des: string;
  contents: string | string[];
  number: number;
}
const Step = ({ urlIcon, step, des, contents, ratioIcon, number }: IStep) => {
  return (
    <div className={`step step-${number}`}>
      <div style={{ width: ratioIcon.x }} className="icon">
        <Image
          placeholder="blur"
          blurDataURL={rgbDataURL(220, 220, 220)}
          src={urlIcon}
          width={ratioIcon.x}
          height={ratioIcon.y}
          alt="invest-icon"
          layout="responsive"
        />
      </div>
      <div className="content">
        <div className="header">
          <h3 className="step-tit">{step}</h3>
          <span className="des-tit">{des}</span>
        </div>
        <div className="main-content">
          {isArray(contents) ? (
            <ul>
              {(contents as string[]).map((content: string, idx: number) => (
                <li key={`invest-content-${idx}`}>
                  <span dangerouslySetInnerHTML={{ __html: content }}></span>
                </li>
              ))}
            </ul>
          ) : (
            <span dangerouslySetInnerHTML={{ __html: contents }}></span>
          )}
        </div>
      </div>
    </div>
  );
};

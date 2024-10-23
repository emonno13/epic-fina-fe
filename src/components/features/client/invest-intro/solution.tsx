import { rgbDataURL } from '@components/shared/atom/rgb';
import HContainer from '@components/shared/common/h-container';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useInvestIntroTransaction } from './hooks';

import './solution.module.scss';

export const Solution = () => {
  const solutionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window) return;
    (window as any).solutionRef = solutionRef;
  }, []);

  return (
    <div ref={solutionRef} className="solution">
      <HContainer>
        <Header />
        <Content />
      </HContainer>
    </div>
  );
};

const Header = () => {
  const t = useInvestIntroTransaction();
  return (
    <div className="header">
      <h2 className="h2-title">
        <span>{t('solution-tit1')}</span>
        <span>{t('solution-tit2')}</span>
      </h2>
    </div>
  );
};

const Content = () => {
  const t = useInvestIntroTransaction();
  const contents = [
    {
      icon: '/assets/images/invest-intro_solution_ct1.svg',
      title: t('solution-ctt1'),
      text: t('solution-ct1'),
    },
    {
      icon: '/assets/images/invest-intro_solution_ct2.svg',
      title: t('solution-ctt2'),
      text: t('solution-ct2'),
    },
    {
      icon: '/assets/images/invest-intro_solution_ct3.svg',
      title: t('solution-ctt3'),
      text: t('solution-ct3'),
    },
  ];
  return (
    <div className="content">
      {contents.map((item: any, idx: number) => (
        <ContentItem
          key={`ct-item-${idx}`}
          icon={item.icon}
          title={item.title}
          text={item.text}
        />
      ))}
    </div>
  );
};

const ContentItem = ({ icon, title, text }) => {
  return (
    <div className="content-item">
      <div className="content-item-img">
        <Image
          placeholder="blur"
          blurDataURL={rgbDataURL(220, 220, 220)}
          src={icon}
          width={100}
          height={100}
          alt="invest-ct-item"
          layout="responsive"
        />
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
};

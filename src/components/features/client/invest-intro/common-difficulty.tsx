/* eslint-disable @next/next/no-img-element */

import { rgbDataURL } from '@components/shared/atom/rgb';
import { HSmallContainer } from '@components/shared/common/h-container';
import { useIsMobile } from '@lib/hooks/use-media';
import { ArrowDown } from 'icons';
import Image from 'next/image';
import { ReactNode } from 'react';
import { InvestButton } from './common/invest-btn';
import { useInvestIntroTransaction } from './hooks';

import './common-difficulty.module.scss';

export const CommonDifficulty = () => {
  return (
    <div className="common-difficulty">
      <HSmallContainer>
        <Content />
      </HSmallContainer>
    </div>
  );
};

const Content = () => {
  const t = useInvestIntroTransaction();
  const isMobile = useIsMobile();
  const difficulties = [
    { content: t('content-item-1') },
    { content: t('content-item-2') },
    { content: t('content-item-3') },
  ];
  return (
    <div className="content">
      <div className="image-content">
        <Image
          placeholder="blur"
          blurDataURL={rgbDataURL(220, 220, 220)}
          src={'/assets/images/invest-intro_people.svg'}
          width={isMobile ? 216 : 289}
          height={isMobile ? 397 : 529}
          alt="invest-intro-main-image"
          layout="responsive"
        />
      </div>
      {!isMobile && <div className={'space-content'} />}
      <div className={'main-content'}>
        <h2 className="title">
          <span className="tit-item title1">{t('difficult')}</span>
          <span className="tit-item title2">{t('newInvestor')}</span>
          <span className="tit-item title3">{t('usually')}</span>
        </h2>
        <div className="text">
          {difficulties.map((item: any, idx: number) => (
            <ContentItem key={`ct-item-${idx}`} text={item.content} />
          ))}
        </div>
        <SolutionBtn />
      </div>
    </div>
  );
};

export const ContentItem = ({ text }: { text: string | ReactNode }) => {
  return (
    <div className="content-item">
      <span className="logo">
        <img src="/assets/images/invest-intro_logo.png" />
      </span>
      <p className="text">{text}</p>
    </div>
  );
};

const SolutionBtn = () => {
  const t = useInvestIntroTransaction();
  const isMobile = useIsMobile();

  const scrollToSolution = () => {
    if (!window) return;
    const globalContainerRef = (window as any)?.mainViewRef?.current;
    const offsetTop = (window as any)?.solutionRef?.current?.offsetTop;
    globalContainerRef.scrollTo(0, offsetTop - 100);
  };

  return (
    <InvestButton onClick={() => scrollToSolution()} type={'primary'}>
      {t('solutionForYou')}
      {!isMobile && <ArrowDown />}
    </InvestButton>
  );
};

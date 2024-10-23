import React from 'react';
import { CommonDifficulty } from './common-difficulty';
import { Solution } from './solution';
import { Product } from './product';
import { Invest } from './invest';
import { InvestmentOptions } from './investment-options';
import { ExperienceInvestNow } from './experience-invest-now';
import { InvestInFina } from './invest-in-fina';
import ClientHomeBanner from '../home/client-home-banner';

import './invest-intro.module.scss';

const InvestIntro = ({ banners = [] }) => {
  return <div className="invest-intro">
    <ClientHomeBanner {...{ banners }} />
    <div className="share-bg">
      <CommonDifficulty/>
      <Solution/>
    </div>
    <Product/>
    <Invest/>
    <InvestmentOptions />
    <ExperienceInvestNow />
    <InvestInFina/>
  </div>;
};

export default InvestIntro;

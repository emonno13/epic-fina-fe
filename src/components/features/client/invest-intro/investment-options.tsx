import { rgbDataURL } from '@components/shared/atom/rgb';
import HContainer from '@components/shared/common/h-container';
import HTabs from '@components/shared/common/h-tabs';
import { Link } from '@components/shared/link';
import { ArrowDown } from '@icons';
import { useIsMobile } from '@lib/hooks/use-media';
import Image from 'next/image';
import { ContentItem } from './common-difficulty';
import ComingSoon from './common/coming-soon';
import { InvestButton } from './common/invest-btn';
import { useInvestIntroTransaction } from './hooks';
import { useTabSettings } from './product';

import './investment-options.module.scss';
const TabPane = HTabs.TabPane;

export const InvestmentOptions = () => {
  const t = useInvestIntroTransaction();

  return (
    <div className="investment-options">
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
      <h2 className="h2-title">{t('invest-options-title')}</h2>
      <p className="des">{t('invest-options-des')}</p>
    </div>
  );
};

const Content = () => {
  const t = useInvestIntroTransaction();
  const tabSettings = useTabSettings(t);
  const isMobile = useIsMobile();
  return (
    <div className={'content'}>
      <HTabs
        tabBarGutter={isMobile ? 12 : 16}
        centered={true}
        type="button"
        defaultActiveKey={tabSettings.FUND.key}
      >
        <TabPane tab={tabSettings.FUND.tab} key={tabSettings.FUND.key}>
          <ContentTabFund />
          <ActivityResult />
          <Link href="/danh-sach-chung-chi-quy">
            <InvestButton type="primary">
              {t('investNow')}
              <ArrowDown />
            </InvestButton>
          </Link>
        </TabPane>
        <TabPane tab={tabSettings.BOND.tab} key={tabSettings.BOND.key}>
          <ComingSoon>
            <div className="bond-coming-soon-wrapper">
              <Image
                placeholder="blur"
                blurDataURL={rgbDataURL(220, 220, 220)}
                src={'/assets/images/invest-intro_bond_comingsoon.svg'}
                alt="bond-image-coming-soon"
                layout="responsive"
                width={329}
                height={310}
              />
            </div>
          </ComingSoon>
          {/* <ContentTabBond/>
        <ActivityResult/> */}
        </TabPane>
        <TabPane tab={tabSettings.DEPOSIT.tab} key={tabSettings.DEPOSIT.key}>
          <ComingSoon>
            <div className="deposit-coming-soon-wrapper">
              <Image
                placeholder="blur"
                blurDataURL={rgbDataURL(220, 220, 220)}
                src={'/assets/images/invest-intro_deposit_comingsoon.svg'}
                alt="deposit-image-coming-soon"
                layout="responsive"
                width={329}
                height={310}
              />
            </div>
          </ComingSoon>
          {/* <ContentTabDeposit/>
        <ActivityResult/> */}
        </TabPane>
      </HTabs>
    </div>
  );
};

const ContentTabFund = () => {
  const t = useInvestIntroTransaction();
  const fundContent = [
    { content: t('options_fund1') },
    { content: t('options_fund2') },
    { content: t('options_fund3') },
    { content: t('options_fund4') },
  ];
  return (
    <div className={'tab-fund'}>
      <div className="content">
        {fundContent.map((item: any, i: number) => (
          <ContentItem key={`fund-it-${i}`} text={item.content} />
        ))}
      </div>
    </div>
  );
};

// const ContentTabBond = () => {
//   const t = useInvestIntroTransaction();
//   const bondContent = [
//     { content: t('options_bond1') },
//     { content: t('options_bond2') },
//     { content: t('options_bond3') },
//   ];
//   return <div className={'tab-bond'}>
//     <div className="content">
//       {bondContent.map((item: any, i: number) => (<ContentItem key={`fund-it-${i}`} text={item.content}/>))}
//     </div>
//   </div>;
// };

// const ContentTabDeposit = () => {
//   const t = useInvestIntroTransaction();
//   const depositContent = [
//     { content: t('deposit-content1') },
//     { content: t('deposit-content2') },
//     { content: t('deposit-content3') },
//   ];
//   return <div className={'tab-deposit'}>
//     <div className="content">
//       {depositContent.map((item: any, i: number) => (<ContentItem key={`fund-it-${i}`} text={item.content}/>))}
//     </div>
//   </div>;
// };

const ActivityResult = () => {
  const t = useInvestIntroTransaction();
  const isMobile = useIsMobile();

  const tableImageSize = isMobile ? { x: 311, y: 226 } : { x: 1030, y: 377 };
  const tableImageUrl = isMobile
    ? '/assets/images/invest-intro_options_table_mobile.png'
    : '/assets/images/invest-intro_options_table.png';

  return (
    <div className="activity-result">
      <h3 className="title">
        <p>{t('options_tit')}</p>
        <span>({t('options_subtit')} 14/12/2022)</span>
      </h3>
      <div className="table">
        <Image
          placeholder="blur"
          blurDataURL={rgbDataURL(220, 220, 220)}
          src={tableImageUrl}
          alt="deposit-image"
          layout="responsive"
          width={tableImageSize.x}
          height={tableImageSize.y}
        />
      </div>
    </div>
  );
};

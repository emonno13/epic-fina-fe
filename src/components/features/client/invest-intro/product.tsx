import { useInvestIntroTransaction } from '@components/features/client/invest-intro/hooks';
import { rgbDataURL } from '@components/shared/atom/rgb';
import HContainer from '@components/shared/common/h-container';
import HTabs from '@components/shared/common/h-tabs';
import { Link } from '@components/shared/link';
import { useIsMobile } from '@lib/hooks/use-media';
import { Col, Row, Tabs } from 'antd';
import Image from 'next/image';
import { ContentItem } from './common-difficulty';
import ComingSoon from './common/coming-soon';
import { InvestButton } from './common/invest-btn';

import './product.module.scss';
const TabPane = Tabs.TabPane;
export const Product = () => {
  const t = useInvestIntroTransaction();
  return (
    <div className="product">
      <HContainer>
        <h2 className={'h2-title'}>{t('product-tit')}</h2>
        <Content />
      </HContainer>
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
        </TabPane>
        <TabPane tab={tabSettings.BOND.tab} key={tabSettings.BOND.key}>
          <ContentTabBond />
        </TabPane>
        <TabPane tab={tabSettings.DEPOSIT.tab} key={tabSettings.DEPOSIT.key}>
          <ContentTabDeposit />
        </TabPane>
      </HTabs>
    </div>
  );
};

const ContentTabFund = () => {
  const isMobile = useIsMobile();
  const t = useInvestIntroTransaction();

  const fundContent = [
    { content: t('fund-content1') },
    { content: t('fund-content2') },
    { content: t('fund-content3') },
  ];

  return (
    <Row gutter={isMobile ? [16, 16] : [33, 33]} className="content-tab-fund">
      <Col {...{ xs: 24, sm: 24, md: 16 }}>
        <h3 className="des">{t('fund-des')}</h3>
        <div className="content">
          {fundContent.map((item: any, i: number) => (
            <ContentItem key={`fund-it-${i}`} text={item.content} />
          ))}
        </div>
        {!isMobile && (
          <Link href="/danh-sach-chung-chi-quy">
            <InvestButton type={'primary'}>{t('investNow')}</InvestButton>
          </Link>
        )}
      </Col>
      {isMobile && (
        <Col span={24}>
          <Link href="/danh-sach-chung-chi-quy">
            <InvestButton type={'primary'}>{t('investNow')}</InvestButton>
          </Link>
        </Col>
      )}
      <Col {...{ xs: 24, sm: 24, md: 8 }}>
        <div className="invest-img">
          <Image
            placeholder="blur"
            blurDataURL={rgbDataURL(220, 220, 220)}
            src={'/assets/images/invest-intro_product_fund.svg'}
            width={isMobile ? 307 : 330}
            height={isMobile ? 283 : 304}
            alt="fund-image"
            layout="responsive"
          />
        </div>
      </Col>
    </Row>
  );
};

const ContentTabBond = () => {
  return (
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
  );
  // const isMobile = useIsMobile();
  // const t = useInvestIntroTransaction();
  // const fundContent = [
  //   { content: t('bond-content1') },
  //   { content: t('bond-content2') },
  //   { content: t('bond-content3') },
  // ];
  // return <Row gutter={isMobile ? [16, 16] : [33, 33]} className="content-tab-fund">
  //   <Col {...{ xs: 24, sm: 24, md: 16 }}>
  //     <h3 className="des">{t('bond-des')}</h3>
  //     <div className="content">
  //       {fundContent.map((item: any, i: number) => (<ContentItem key={`fund-it-${i}`} text={item.content}/>))}
  //     </div>
  //   </Col>
  //   {isMobile && <Col span={24}>
  //     <InvestButton type={'primary'}>{t('investNow')}</InvestButton>
  //   </Col>}
  //   <Col {...{ xs: 24, sm: 24, md: 8 }}>
  //     <div className="invest-img">
  //       <Image
  //         placeholder="blur"
  //         blurDataURL={rgbDataURL(220, 220, 220)}
  //         src={'/assets/images/invest-intro_product_bond.svg'}
  //         width={isMobile ? 307 : 330}
  //         height={isMobile ? 283 : 304}
  //         alt="bond-image"
  //         layout="responsive"
  //       />
  //     </div>
  //   </Col>
  //   {!isMobile && <Col span={24}>
  //     <InvestButton type={'primary'}>{t('investNow')}</InvestButton>
  //   </Col>}
  // </Row>;
};

const ContentTabDeposit = () => {
  return (
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
  );
  // const isMobile = useIsMobile();
  // const t = useInvestIntroTransaction();
  // const fundContent = [
  //   { content: t('deposit-content1') },
  //   { content: t('deposit-content2') },
  //   { content: t('deposit-content3') },
  // ];
  // return <Row gutter={isMobile ? [16, 16] : [33, 33]} className="content-tab-fund">
  //   <Col {...{ xs: 24, sm: 24, md: 16 }}>
  //     <h3 className="des">{t('deposit-des')}</h3>
  //     <div className="content">
  //       {fundContent.map((item: any, i: number) => (<ContentItem key={`fund-it-${i}`} text={item.content}/>))}
  //     </div>
  //   </Col>
  //   {isMobile && <Col span={24}>
  //     <InvestButton type={'primary'}>{t('investNow')}</InvestButton>
  //   </Col>}
  //   <Col {...{ xs: 24, sm: 24, md: 8 }}>
  //     <div className="invest-img">
  //       <Image
  //         placeholder="blur"
  //         blurDataURL={rgbDataURL(220, 220, 220)}
  //         src={'/assets/images/invest-intro_product_deposit.svg'}
  //         width={isMobile ? 307 : 330}
  //         height={isMobile ? 283 : 304}
  //         alt="deposit-image"
  //         layout="responsive"
  //       />
  //     </div>
  //   </Col>
  //   {!isMobile && <Col span={24}>
  //     <InvestButton type={'primary'}>{t('investNow')}</InvestButton>
  //   </Col>}
  // </Row>;
};
export const useTabSettings = (t) => ({
  FUND: { tab: t('fund'), key: 'fund' },
  BOND: { tab: t('bond'), key: 'bond' },
  DEPOSIT: { tab: t('deposit'), key: 'deposit' },
});

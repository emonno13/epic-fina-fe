import DownloadAppBtnGroup from '@components/shared/common/download-app-btn-group/download-app-btn-group';
import HContainer from '@components/shared/common/h-container';
import { Col, Row } from 'antd';
import { ContentItem } from './common-difficulty';
import { useInvestIntroTransaction } from './hooks';

import './experience-invest-now.module.scss';

export const ExperienceInvestNow = () => {
  const t = useInvestIntroTransaction();

  const contents = [
    { content: t('exper-invest_st1'), addonContent: <DownloadAppBtnGroup /> },
    { content: t('exper-invest_st2'), addonContent: <></> },
    { content: t('exper-invest_st3'), addonContent: <></> },
  ];

  return (
    <div className="experience-invest-now">
      <div className="experience-invest-now-header">
        <HContainer>
          <h2>{t('experience')}</h2>
          <h1>{t('invest-w-fina')}</h1>
        </HContainer>
      </div>

      <div className="experience-invest-now-content">
        <HContainer>
          <Row gutter={[16, 16]}>
            <Col {...{ xs: 24, sm: 24, md: 14, lg: 14 }}>
              <div className="experience-invest-now-content-left">
                <p className="experience-invest-now-content-left-desc">
                  {t('exper-invest_des')}
                </p>
                <div className="experience-invest-now-content-steps">
                  {contents.map((item: any, idx: number) => (
                    <ContentItem
                      key={`experience_ct_item_${idx}`}
                      text={
                        <>
                          {
                            <div
                              dangerouslySetInnerHTML={{ __html: item.content }}
                            />
                          }
                          {item.addonContent}
                        </>
                      }
                    />
                  ))}
                </div>
              </div>
            </Col>
            <Col {...{ xs: 24, sm: 24, md: 10, lg: 10 }}>
              <div className="experience-invest-now-content-right">
                <img src="/assets/images/image-phone-invest.png" alt="" />
              </div>
            </Col>
          </Row>
          <span className="line" />
        </HContainer>
      </div>
    </div>
  );
};

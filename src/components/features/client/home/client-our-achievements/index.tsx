import { NEWS_STATUS } from '@components/features/news-management/news/constant';
import { rgbDataURL } from '@components/shared/atom/rgb';
import FeaturedNewsCarousel from '@components/shared/client/featured-news/featured-news.carousel';
import { IconArrowRight } from '@icons/rsvgs/arrow-right';
import { useHTranslation } from '@lib/i18n';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Button, Col, Row } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import './styles.module.scss';

const ClientOurAchievements = () => {
  const { t } = useHTranslation('common');
  const [achievements, setAchievements] = useState<any[]>([]);

  const fetchAchievements = async () => {
    await FormUtils.submitForm(
      {},
      {
        nodeName: 'news/public',
        isSearchForm: true,
        hiddenValues: {
          filter: {
            limit: 12,
            skip: 0,
            where: {
              type: NEWS_STATUS.ACHIEVEMENT,
            },
          },
        },
        onGotSuccess: (response) => setAchievements(response?.data),
      },
    );
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  if (achievements?.length === 0) return null;

  return (
    <div className="client-our-achievements">
      <div className="max-w-1100 m-auto">
        <h2 className="client-our-achievements-title">
          {t('Our Achievements', { vn: 'Thành tựu của chúng tôi' })}
        </h2>

        <FeaturedNewsCarousel {...{ slidesToShow: 1, infinite: true }}>
          {achievements?.map((achievement) => (
            <AchievementItem achievement={achievement} key={achievement?.id} />
          ))}
        </FeaturedNewsCarousel>
      </div>
    </div>
  );
};

export default ClientOurAchievements;

const AchievementItem = ({ achievement }) => {
  const { t } = useHTranslation('common');
  const { locale } = useRouter();

  return (
    <div className="client-our-achievements-item" key={achievement?.id}>
      <Row gutter={[10, 10]}>
        <Col {...{ xs: 24, sm: 24, md: 12, lg: 12 }}>
          <div className="client-our-achievements-item-image">
            <Image
              placeholder="blur"
              blurDataURL={rgbDataURL(220, 220, 220)}
              src={achievement?.image}
              width={1.25}
              height={1}
              layout="responsive"
            />
          </div>
        </Col>
        <Col {...{ xs: 24, sm: 24, md: 12, lg: 12 }}>
          <div className="client-our-achievements-item-right">
            <div>
              <h2 className="client-our-achievements-item-right-title">
                {achievement?.title}
              </h2>
              <p
                className="client-our-achievements-item-right-desc"
                dangerouslySetInnerHTML={{ __html: achievement?.description }}
              />
              <Button
                type="link"
                href={`/${locale}/tin-tuc/${achievement?.slug}`}
                target="_bank"
              >
                {t('See detail', { vn: 'Xem chi tiết' })} <IconArrowRight />
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

import { useIsMobile } from '@lib/hooks/use-media';
import { MobileUtils } from '@lib/utils/mobile';
import { Carousel } from 'antd';
import Cookies from 'js-cookie';
import { useEffect, useMemo, useState } from 'react';
import {
  useCurrentUser,
  useIsAuthenticated,
} from '../../../../lib/providers/auth';
import { USER_TYPES } from '../../../../types/organization';
import { HModal } from '../../../shared/common/h-modal';
import { RouteUtils } from '../../../shared/layout/router-contaner/utils';
import AppIntroduceBanner from './app-introduce-banner';

import './banner-recruitment.scss';

export const BannerRecruitment = () => {
  const currentUser = useCurrentUser();
  const [banner, setBanner] = useState(true) as any;
  const cookieBanner = Cookies.get('h2bannerRecruitment');
  const isMobile = useIsMobile();
  const isAuthenticated = useIsAuthenticated();
  const isWebView = MobileUtils.checkIsWebView();

  const appIntroductionCondition = useMemo(
    () => !isWebView && isMobile,
    [isWebView, isMobile],
  );

  const recruitmentBannerCondition = useMemo(
    () =>
      isAuthenticated &&
      !currentUser.hasCollaboratorContract &&
      currentUser?.type !== USER_TYPES.staff,
    [isAuthenticated, currentUser],
  );

  const dislayModalCondition = useMemo(() => {
    return appIntroductionCondition || recruitmentBannerCondition;
  }, [recruitmentBannerCondition, appIntroductionCondition]);

  useEffect(() => {
    if (dislayModalCondition) {
      if (cookieBanner) {
        setBanner(false);
      } else {
        setBanner(true);
        Cookies.set('h2bannerRecruitment', JSON.stringify(true), {
          expires: 0.5,
        });
      }
    }
  }, [dislayModalCondition]);

  if (!dislayModalCondition) {
    return null;
  }
  return (
    <HModal
      {...{
        visible: banner,
        footer: null,
        onCancel: () => {
          setBanner(false);
        },
        style: { top: '15px' },
        bodyStyle: { padding: 0 },
        centered: true,
      }}
    >
      <Carousel>
        {appIntroductionCondition && <AppIntroduceBanner {...{ setBanner }} />}
        {recruitmentBannerCondition && (
          <div
            className={'banner_recruitment'}
            onClick={async () => {
              setBanner(false);
              await RouteUtils.redirect('/admin/profiles/account-identifier');
            }}
          >
            <img
              src={'/assets/images/banner_recruitment.jpg'}
              alt="Fina recruitment"
            />
          </div>
        )}
      </Carousel>
    </HModal>
  );
};

export default BannerRecruitment;

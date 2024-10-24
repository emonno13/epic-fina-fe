import {
  useAuth,
  useCurrentUser,
  useIsAuthenticated,
} from '@lib/providers/auth';
import { requestInformationUser } from '@store/actions';
import { USER_TYPES } from '@types/organization';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ConverterUtils } from '../../../../lib/converter';
import { HModal } from '../../../shared/common/h-modal';
import { RouteUtils } from '../../../shared/layout/router-contaner/utils';

const CollaboratorNoti = () => {
  const currentUser = useCurrentUser();
  const isAuthenticated = useIsAuthenticated();
  const dispatch = useDispatch();
  const { setCurrentUser } = useAuth();

  const [banner, setBanner] = useState() as any;
  const cookieBanner = Cookies.get('h2bannerRecruitment');
  useEffect(() => {
    if (isAuthenticated) {
      if (cookieBanner) {
        setBanner(false);
      } else {
        setBanner(true);
        Cookies.set('h2bannerRecruitment', JSON.stringify(true), {
          expires: 0.5,
        });
      }
    }
  }, [isAuthenticated]);
  useEffect(() => {
    if (currentUser?.id) {
      dispatch(
        requestInformationUser({
          userId: currentUser.id,
          callback: (response) => {
            setCurrentUser({
              ...response,
              fullName: ConverterUtils.getFullNameUser(response),
            });
          },
        }),
      );
    }
  }, [currentUser?.id]);
  if (
    !isAuthenticated ||
    currentUser.hasCollaboratorContract ||
    currentUser?.type === USER_TYPES.staff
  ) {
    return null;
  }
  return (
    <HModal
      {...{
        visible: banner,
        footer: null,
        width: '35%',
        onCancel: () => {
          setBanner(false);
        },
        bodyStyle: { padding: 0 },
      }}
    >
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
    </HModal>
  );
};

export default CollaboratorNoti;

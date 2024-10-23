import { useEffect, useState } from 'react';
import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { useFetchCurrentUser } from '@components/features/profiles/referrer/hooks';
import NoDataSurvey from './components/no-data';
import ModalAffiliate from './components/modal/modal-add-partner';
import { IconLinkCheck } from './components/icons/icon-link-check';
import Detail from './components/detail';
import {
  IconArrowRight,
  IconCurrentIncome,
} from '../earnings-commissions/constants';

import './styles.module.scss';

const titleScreen = 'Tài khoản liên kết';

export const partners = [
  {
    name: 'VinaCapital',
    icon: '/assets/images/vina_capital_logo.png',
    keyCheck: 'investmentNumber',
  },
];

export const modals = {
  home: { name: 'noti', width: 390 },
  // đồng bộ tài khoản
  add: { name: 'add', width: 600 },
  otp: { name: 'otp', width: 595 },
  succeedAdd: { name: 'succeedAdd', width: 595 },
  // tạo mới tài khoản
  create: { name: 'create', width: 795 },
  otpCreate: { name: 'otpCreate', width: 595 },
  succeedCreate: { name: 'succeedCreate', width: 424 },
  // huỷ liên kết
  reject: { name: 'reject', width: 424 },
  succeedReject: { name: 'succeedReject', width: 424 },
};

const ProfileAffiliate = () => {
  const isMobile = useIsMobile();
  const { t } = useHTranslation('admin-common');
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState('');
  const [allPartner, setAllPartner]: any = useState([]);
  const [partnerItem, setPartner]: any = useState(undefined);
  const currentUser = useFetchCurrentUser();

  const next = () => {
    setVisible(true);
    setType(modals.home.name);
  };

  useEffect(() => {
    if (!type) {
      setVisible(false);
    }
  }, [type]);

  useEffect(() => {
    if (currentUser?.id) {
      setAllPartner(partners?.filter((el) => currentUser?.[el.keyCheck]) || []);
    }
  }, [currentUser]);

  return (
    <div className="profile-information profile-information-affiliate">
      {isMobile && (
        <div>
          <IconCurrentIncome />
          <h2 className="profile-information-title">
            {t(titleScreen, { vn: titleScreen })}
          </h2>
          <IconArrowRight />
        </div>
      )}
      <div className="profile-el-wrapper">
        {!partnerItem && (
          <>
            <div className="profile-information-title">
              {t(titleScreen, { vn: titleScreen })}
            </div>
            {allPartner?.length === 0 ? (
              <NoDataSurvey next={next} />
            ) : (
              <>
                <div className="profile-information-affiliate-show">
                  {allPartner?.map((partner, index) => {
                    return (
                      <div
                        key={index}
                        className="profile-information-affiliate-show-item"
                        onClick={() => {
                          setPartner(partner);
                        }}
                      >
                        <div className="profile-information-affiliate-show-item-view">
                          <img src={partner?.icon} alt="" width={64} />
                          <div>{partner?.name}</div>
                        </div>
                        <div className="profile-information-affiliate-show-item-icon">
                          <IconLinkCheck />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            <div className="profile-information-affiliate-partner">
              <p className="profile-information-affiliate-partner-title">
                Đối tác liên kết với FINA
              </p>
              <div className="profile-information-affiliate-partner-list">
                {partners?.map((el, index) => {
                  return (
                    <div
                      key={index}
                      className="profile-information-affiliate-partner-item"
                    >
                      <img src={el.icon} alt={el?.name} width={52} />
                      <div className="profile-information-affiliate-partner-item-title">
                        {el?.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {partnerItem && (
          <Detail
            back={() => {
              setPartner(undefined);
            }}
            partner={partnerItem}
            currentUser={currentUser}
            openModal={() => {
              setVisible(true);
              setType(modals.reject.name);
            }}
          />
        )}

        <ModalAffiliate
          {...{
            visible,
            setVisible,
            type,
            setType,
          }}
        />
      </div>
    </div>
  );
};

export default ProfileAffiliate;

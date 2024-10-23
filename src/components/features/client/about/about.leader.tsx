import { useHTranslation } from '@lib/i18n';
import { Modal } from 'antd';
import { useState } from 'react';
import { getLeaderData } from './constant';

const ClientAboutLeaderInfo = ({ infoData }) => {
  const { name, image, position, info } = infoData;
  return (
    <div className="client-about-leader-info">
      <div className="client-about-leader-info__desc">
        <div className="client-about-leader-info__desc__image">
          <img src={image} />
        </div>
        <div>
          <h3>{name}</h3>
          <p>{position}</p>
        </div>
      </div>
      <ul className="client-about-leader-info__content">
        {info.map((infoText, index) => (
          <li
            key={`client-about-leader-info-item-${index}`}
            className="client-about-leader-info__content__item"
          >
            {infoText}
          </li>
        ))}
      </ul>
    </div>
  );
};

const ClientAboutLeader = () => {
  const { t } = useHTranslation('common');
  const leaderData = getLeaderData(t);
  const [visible, setVisible] = useState<boolean>(false);
  const [leaderInfoData, setLeaderInfoData] = useState<any>({});

  const onOpenInfoLeader = (infoData) => {
    setVisible(true);
    setLeaderInfoData(infoData);
  };

  return (
    <div className="client-about-leader">
      <div className="max-w-1100 m-auto">
        <h3 className="client-about-leader__title">
          {t('clien_about_leader_title', {
            vn: 'Đội ngũ lãnh đạo',
            en: 'Leadership team',
          })}
        </h3>
        <div className="client-about-leader__list">
          {leaderData.map((infoData, index) => {
            const { image, name, position } = infoData;
            return (
              <div
                key={`client-about-leader-${index}`}
                {...{
                  className: 'client-about-leader__list__item',
                }}
              >
                <div className="client-about-leader__list__item__image">
                  <img src={image} onClick={() => onOpenInfoLeader(infoData)} />
                </div>
                <h3>{name}</h3>
                <p>{position}</p>
              </div>
            );
          })}
        </div>
      </div>
      <Modal
        {...{
          title: t('clien_about_leader_modal_title', {
            en: 'Leadership Information',
            vn: 'Thông tin lãnh đạo',
          }),
          onCancel: () => setVisible(false),
          visible,
          footer: null,
          width: 770,
        }}
      >
        <ClientAboutLeaderInfo {...{ infoData: leaderInfoData }} />
      </Modal>
    </div>
  );
};

export default ClientAboutLeader;

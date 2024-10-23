import { PhoneOutlined } from '@ant-design/icons';
import { useGenerateConcealContent } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { Button } from 'antd';
import { LinkedinIcon, TelegramIcon } from 'next-share';
import QRCode from 'qrcode.react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { endpoints } from '../../../../../lib/networks/endpoints';
import { FormUtils } from '../../../../../schema-form/utils/form-utils';

const ExpertDetailHeaderContact = ({ data, onCreateRequest }) => {
  const { tels, advancedInformation } = data;
  const { t } = useHTranslation('common');
  const [tel, setTel] = useState<any>('');
  const [revealTel, setRevealTel] = useState<boolean>(false);
  const [card, setCard] = useState<any>('');

  const generateConcealContent = useGenerateConcealContent();

  const originalTel = useMemo(() => tels?.[0].tel || '', [tels]);
  const zaloLink = useMemo(
    () => advancedInformation?.linkZalo || '',
    [advancedInformation],
  );
  const telegramLink = useMemo(
    () => advancedInformation?.linkTelegram || '',
    [advancedInformation],
  );
  const linkedInLink = useMemo(
    () => advancedInformation?.linkLinkedIn || '',
    [advancedInformation],
  );

  const onTelClick = useCallback(
    (e) => {
      if (!revealTel) {
        e.preventDefault();
        setTel(originalTel);
        setRevealTel(true);
      }
    },
    [revealTel, originalTel],
  );

  useEffect(() => {
    FormUtils.submitForm(
      {},
      {
        method: 'get',
        endpoint: endpoints.generateNodeEndpoint(`/users/${data?.id}/card`),
        onGotSuccess: (response) => {
          setCard(response);
        },
      },
    );
  }, []);

  useEffect(() => {
    setTel(generateConcealContent(originalTel));
  }, [originalTel]);

  return (
    <div className="expert-detail-header-contact">
      <div className="expert-detail-header-contact-btns">
        <Button
          {...{
            className: 'expert-detail-header-contact-btns__tel',
            type: 'link',
            href: `tel:${tel}`,
            onClick: onTelClick,
          }}
        >
          <PhoneOutlined />
          <span>{tel}</span>
        </Button>
        <Button
          {...{
            className: 'expert-detail-header-contact-btns__zalo',
            type: 'link',
            href: zaloLink || '#counselling-form',
            target: zaloLink ? '_blank' : '_self',
          }}
        >
          <img
            style={{ width: '24px', height: '24px' }}
            {...{
              src: 'https://inkythuatso.com/uploads/thumbnails/800/2021/09/zalo-logo-inkythuatso-14-15-05-01.jpg',
              alt: 'zalo',
            }}
          />
          <span>Zalo</span>
        </Button>
        <Button
          {...{
            className: 'expert-detail-header-contact-btns__tel',
            type: 'link',
            href: telegramLink || '#counselling-form',
            target: telegramLink ? '_blank' : '_self',
          }}
        >
          <TelegramIcon style={{ width: '24px', height: '24px' }} />
          <span>Telegram</span>
        </Button>
        <Button
          {...{
            className: 'expert-detail-header-contact-btns__tel',
            type: 'link',
            href: linkedInLink || '#counselling-form',
            target: linkedInLink ? '_blank' : '_self',
          }}
        >
          <LinkedinIcon style={{ width: '24px', height: '24px' }} />
          <span>LinkedIn</span>
        </Button>
      </div>
      <Button
        {...{
          type: 'primary',
          className: 'expert-detail-header-contact-create-request',
          onClick: onCreateRequest,
        }}
      >
        {t('Create a consultation request', { vn: 'Tạo yêu cầu tư vấn' })}
      </Button>

      {card && (
        <div className={'expert-detail-header-contact-vcard'}>
          <Button
            {...{
              type: 'primary',
              className: 'expert-detail-header-contact-create-request',
              onClick: () => {
                const result = card.replaceAll(
                  'X-SOCIALPROFILE;CHARSET=UTF-8;',
                  `X-SOCIALPROFILE;${data?.fullName}`,
                );
                const url =
                  'data:text/x-vcard;charset=utf-8,' +
                  encodeURIComponent(result);
                document.location.href = url;
              },
            }}
          >
            Download Contact
          </Button>

          <br />
          <QRCode value={card} />
        </div>
      )}
    </div>
  );
};

export default ExpertDetailHeaderContact;

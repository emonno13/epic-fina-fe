import { DoubleLeftOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { useRouter } from 'next/router';
import { getMenuDisplayByUserTypeConfig } from './constanst';
import { PlayerScreen } from './player-screen';
import { usePositionByCode } from '../../../dynamic-configuration/hooks';
import { ConverterUtils } from '../../../lib/converter';
import { useIsMobile } from '../../../lib/hooks/use-media';
import { useHTranslation } from '../../../lib/i18n';
import { useCurrentUser } from '../../../lib/providers/auth';
import { ImageUtils } from '../../../lib/utils/image';
import { FiledViewer } from '../../shared/common/configuration/field-viewer';

const ProfilesManager = ({ screenInit }) => {
  const { t } = useHTranslation('admin-common');
  const isMobile = useIsMobile();
  const [screen, setScreen] = useState(screenInit || 'information');
  const currentUser = useCurrentUser();
  const position = usePositionByCode(currentUser?.positionCodes?.[0]);
  const menus = getMenuDisplayByUserTypeConfig(currentUser.type, t);
  const { query, push, locale } = useRouter();

  const switchScreen = (key) => {
    setScreen(key);
    push(`/${locale}/admin/profiles?screen=${key}`);
  };

  useEffect(() => {
    if (isMobile) {
      setScreen(false);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (query?.screen) {
        setScreen(query?.screen);
      }
    }, 1000);
  }, []);

  return (
    <div className={'profiles-manager'}>
      {(isMobile && !screen) && <div className={'profiles-manager__nav-wrap'}>
        <div className={'profiles-manager__avatar'}>
          <div className={'profiles-manager__avatar-image'}>
            <img
              src={currentUser.avatar ? ImageUtils.getOriginalUrl(currentUser.avatar) : '/assets/images/alma-customer-avatar-3.png'}
              alt=""/>
          </div>
          <div className={'profiles-manager__avatar-short-info'}>
            <div className={'profiles-manager__avatar-short-info-user-name'}>
              {ConverterUtils.getFullNameUser(currentUser)}
            </div>
            <div className={'profiles-manager__avatar-short-info-position'}>
              {position ? `${position.name}` : t(currentUser.type)}
            </div>
          </div>
        </div>
        <div className={'profiles-manager__information'}>
          <FiledViewer {...{
            tooltipContent: t('Mã giới thiệu'),
            label: t('Mã giới thiệu'),
            value: currentUser?.refCode,
            labelClassName: 'm-b-0i',
          }}/>
          <FiledViewer {...{
            tooltipContent: t('Mã định danh'),
            label: t('Mã định danh'),
            value: currentUser.code,
            labelClassName: 'm-b-0i',
          }}/>
          <FiledViewer {...{
            tooltipContent: t('Phone', { vn: 'Số điện thoại' }),
            label: t('Phone', { vn: 'Số điện thoại' }),
            value: currentUser?.tels?.[0]?.tel || t('Not update', { vn: 'Chưa cập nhật' }),
            labelClassName: 'm-b-0i',
          }}/>
          <FiledViewer {...{
            tooltipContent: t('Email'),
            label: t('Email'),
            value: currentUser?.emails?.[0]?.email || t('Not update', { vn: 'Chưa cập nhật' }),
            labelClassName: 'm-b-0i',
          }}/>
        </div>
        <div className={'profiles-manager__menu'}>
          <Scrollbars>
            <ul>
              {menus.map((item: any) => {
                return (
                  <li className={item.key === screen ? 'active' : ''} key={item.key}
                    onClick={() => switchScreen(item.key)}>
                    {item.icon && <item.icon/>}<span
                      className={'profiles-manager__menu-item-text'}>{item.label}</span>
                  </li>
                );
              })}
            </ul>
          </Scrollbars>
        </div>
      </div>}
      {!isMobile && <div className={'profiles-manager__nav-wrap'}>
        <div className={'profiles-manager__avatar'}>
          <div className={'profiles-manager__avatar-image'}>
            <img
              src={currentUser.avatar ? ImageUtils.getOriginalUrl(currentUser.avatar) : '/assets/images/alma-customer-avatar-3.png'}
              alt=""/>
          </div>
          <div className={'profiles-manager__avatar-short-info'}>
            <div className={'profiles-manager__avatar-short-info-user-name'}>
              {ConverterUtils.getFullNameUser(currentUser)}
            </div>
            <div className={'profiles-manager__avatar-short-info-position'}>
              {position ? `${position.name}` : t(currentUser.type)}
            </div>
          </div>
        </div>
        <div className={'profiles-manager__information'}>
          <FiledViewer {...{
            tooltipContent: t('Mã giới thiệu'),
            label: t('Mã giới thiệu'),
            value: currentUser?.refCode,
            labelClassName: 'm-b-0i',
          }}/>
          <FiledViewer {...{
            tooltipContent: t('Mã định danh'),
            label: t('Mã định danh'),
            value: currentUser.code,
            labelClassName: 'm-b-0i',
          }}/>
          <FiledViewer {...{
            tooltipContent: t('Phone', { vn: 'Số điện thoại' }),
            label: t('Phone', { vn: 'Số điện thoại' }),
            value: currentUser?.tels?.[0]?.tel || t('Not update', { vn: 'Chưa cập nhật' }),
            labelClassName: 'm-b-0i',
          }}/>
          <FiledViewer {...{
            tooltipContent: t('Email'),
            label: t('Email'),
            value: currentUser?.emails?.[0]?.email || t('Not update', { vn: 'Chưa cập nhật' }),
            labelClassName: 'm-b-0i',
          }}/>
        </div>
        <div className={'profiles-manager__menu'}>
          <Scrollbars>
            <ul>
              {menus.map((item: any) => {
                return (
                  <li className={item.key === screen ? 'active' : ''} key={item.key}
                    onClick={() => switchScreen(item.key)}>
                    {item.icon && <item.icon/>}<span
                      className={'profiles-manager__menu-item-text'}>{item.label}</span>
                  </li>
                );
              })}
            </ul>
          </Scrollbars>
        </div>
      </div>}


      {screen && <div className={'profiles-manager__content'}>
        {isMobile && <div onClick={() => {setScreen(false);}} className={'profile-back-menu'}>
          <DoubleLeftOutlined/> {t('Back', { vn: 'Quay lại' })}</div>}
        <Scrollbars>
          <PlayerScreen {...{ screen }}/>
        </Scrollbars>
      </div>}
    </div>
  );
};
export default ProfilesManager;

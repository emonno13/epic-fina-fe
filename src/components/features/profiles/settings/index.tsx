import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { useForm } from 'antd/lib/form/Form';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { SettingSchemaForm } from './setting-schema-form';
// import { PlayerScreen } from './player-screen';
import { useCurrentUser } from '../../../../lib/providers/auth';
import { HForm } from '../../../../schema-form/h-form';
import { requestInformationUser } from '../../../../store/actions';
import { getMenuDisplayByUserTypeSetting } from '../constanst';
import { PlayerScreen } from '../player-screen';

import '../user-information/user-information.module.scss';
import './setting.module.scss';

const SettingManager = () => {
  const { t } = useTranslation('admin-common');
  const { t: t_h } = useHTranslation('admin-common');

  const dispatch = useDispatch();
  const [form] = useForm();
  const currentUser = useCurrentUser();
  const [initialValues, setInitialValues] = useState();
  const [screen, setScreen] = useState('setting');

  useEffect(() => {
    dispatch(
      requestInformationUser({
        userId: currentUser.id,
        callback: (response) => {
          const initialValues = {
            ...response.settings,
          };
          setInitialValues(initialValues);
        },
      }),
    );
  }, []);

  const menus = getMenuDisplayByUserTypeSetting(currentUser.type, t_h);

  const switchScreen = (key) => {
    setScreen(key);
  };

  if (!initialValues) {
    return <></>;
  }
  return (
    <div className={'user-information_form-setting'}>
      <div className="menu-bar" style={{ marginBottom: '20px' }}>
        {menus.map((item: any) => {
          return (
            <button
              className={
                item.key === screen
                  ? 'active menu-bar__button'
                  : 'no-active menu-bar__button'
              }
              key={item.key}
              onClick={() => switchScreen(item.key)}
            >
              {item.icon && <item.icon />}
              <span className={'profiles-manager__menu-item-text'}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {screen !== 'setting' ? (
        <PlayerScreen {...{ screen }} />
      ) : (
        <SettingUser />
      )}
    </div>
  );
};

export default SettingManager;

const SettingUser = () => {
  const { t } = useTranslation('admin-common');
  const { t: t_h } = useHTranslation('admin-common');

  const dispatch = useDispatch();
  const [form] = useForm();
  const currentUser = useCurrentUser();
  const [initialValues, setInitialValues] = useState();
  const [screen, setScreen] = useState('setting');

  useEffect(() => {
    dispatch(
      requestInformationUser({
        userId: currentUser.id,
        callback: (response) => {
          const initialValues = {
            ...response.settings,
          };
          setInitialValues(initialValues);
        },
      }),
    );
  }, []);

  const menus = getMenuDisplayByUserTypeSetting(currentUser.type, t_h);

  const switchScreen = (key) => {
    setScreen(key);
  };

  if (!initialValues) {
    return <></>;
  }
  return (
    <div className={'user-information_form-setting'}>
      <div className={'user-information_form-setting-content'}>
        <HForm
          {...{
            endpoint: endpoints.endpointWithApiDomain(
              `/config-setting/${currentUser?.id}`,
            ),
            method: 'post',
            resetIfSuccess: false,
            form,
            initialValues,
            summitButtonStyleFull: true,
            submitButtonLabel: t('Tiếp tục'),
            hideSubmitAndContinueButton: true,
            schema: SettingSchemaForm,
            layout: 'horizontal',
          }}
        />
      </div>
    </div>
  );
};

import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { useCurrentUser } from '@lib/providers/auth';
import { HForm } from '@schema-form/h-form';
import { Col, Modal, Row } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { CloseIconLargeSvg } from 'icons';
import { ChangePasswordFormSchema } from './change-password-form-schema';
import {
  IconChangePasswordSuccess,
  IconCheckBlue,
  IconWarning,
} from './constants';

import '../styles.module.scss';

const ProfileSettingChangePassword = () => {
  const { t } = useHTranslation('common');
  const currentUser: any = useCurrentUser();
  const [form] = useForm();
  const isMobile = useIsMobile();

  const notes = [
    t('profile.minLength'),
    t('profile.includeLowercase'),
    t('profile.includeNumber'),
  ];

  const handleSubmit = () => form.submit();

  return (
    <div className="profile-setting-change-password">
      <div className="profile-el-wrapper">
        <h2 className="profile-information-title">
          {t('profile.changePassword')}
        </h2>

        <div className="profile-change-password">
          <div className="profile-change-password-warning">
            <IconWarning /> {t('profile.warning')}
          </div>

          <div className="profile-change-password-content">
            <Row gutter={isMobile ? [0, 0] : [40, 40]}>
              <Col {...{ xs: 24, sm: 24, md: 12 }}>
                <HForm
                  {...{
                    endpoint: endpoints.endpointWithApiDomain(
                      `/users/${currentUser?.id}/reset-password-confirm`,
                    ),
                    method: 'put',
                    onGotSuccess: (res) => {
                      Modal.success({
                        className: 'profile-info-modal',
                        title: '',
                        width: 390,
                        closeIcon: <CloseIconLargeSvg />,
                        closable: true,
                        content: (
                          <>
                            <IconChangePasswordSuccess />
                            <h2>{t('Đổi mật khẩu thành công')}</h2>
                          </>
                        ),
                      });
                      form.resetFields();
                    },
                    form,
                    summitButtonStyleFull: true,
                    resetIfSuccess: false,
                    hideControlButton: true,
                    schema: ChangePasswordFormSchema,
                    useDefaultMessage: true,
                  }}
                />
                {!isMobile && (
                  <HButton
                    type="primary"
                    onClick={handleSubmit}
                    className="btn-change-password-profile"
                  >
                    {t('profile.changePassword')}
                  </HButton>
                )}
              </Col>
              <Col {...{ xs: 24, sm: 24, md: 12 }}>
                <div className="profile-change-password-notes">
                  <h4 className="profile-change-password-notes-title">
                    {t('profile.note')}: <br />
                    {t('profile.passwordMustInclude')}:
                  </h4>

                  {notes?.map((note, index) => (
                    <div key={index} className="profile-change-password-note">
                      <IconCheckBlue /> <span>{note}</span>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>

            {isMobile && (
              <HButton
                type="primary"
                onClick={handleSubmit}
                className="btn-change-password-profile"
                block
              >
                {t('profile.changePassword')}
              </HButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingChangePassword;

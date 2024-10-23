import { useHTranslation } from '@lib/i18n';
import { Radio } from 'antd';
import { useRouter } from 'next/router';

import '../styles.module.scss';

const ProfileSettingLanguage = () => {
  const { t } = useHTranslation('common');
  const router = useRouter();
  const { locale } = useRouter();

  const onChange = (e) => {
    const { asPath, push } = router;
    push(asPath, asPath, { locale: e.target.value });
  };

  return (
    <div className="profile-setting-language">
      <div className="profile-el-wrapper">
        <h2 className="profile-information-title">{t('Language')}</h2>
        <div className="profile-setting-language-desc">
          {t('profile.chooseYourLanguage')}
        </div>

        <Radio.Group onChange={onChange} value={locale || 'vn'}>
          <Radio value={'vn'}>{t('Vietnamese', { vn: 'Tiếng Việt' })}</Radio>
          <Radio value={'en'}>{t('English', { vn: 'Tiếng Anh' })}</Radio>
        </Radio.Group>
      </div>
    </div>
  );
};

export default ProfileSettingLanguage;

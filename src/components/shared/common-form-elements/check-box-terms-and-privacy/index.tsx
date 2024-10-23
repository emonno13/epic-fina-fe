import PrivacyPolicyModal from '@components/shared/privacy-policy';
import TermsOfUserModal from '@components/shared/terms';
import { useHTranslation } from '@lib/i18n';
import { HFormItemProps, createSchemaItem } from '@schema-form/h-types';
import { Checkbox } from 'antd';
import { useState } from 'react';

export const useCheckBoxTermsAndPrivacyFormItem = () => {
  const [visibleTerms, setVisibleTerms] = useState<boolean>(false);
  const [visiblePrivacy, setVisiblePrivacy] = useState<boolean>(false);
  const { t } = useHTranslation('common');

  return (props?: HFormItemProps) => {
    const { componentProps, ...restProps } = props ?? {};
    return createSchemaItem({
      name: 'term-and-privacy',
      valuePropName: 'checked',
      ...restProps,
      Component: Checkbox,
      componentProps: {
        ...componentProps,
        children: (
          <div style={{ textAlign: 'start' }}>
            {t('I have read and agree to the', {
              vn: 'Tôi đã đọc và đồng ý với các',
            })}
            <a onClick={() => setVisibleTerms(true)}>
              {t(' Terms of user ', { vn: ' Điều khoản sử dụng ' })}
            </a>
            {t('and', { vn: 'và' })}
            <a onClick={() => setVisiblePrivacy(true)}>
              {t(' Privacy policy ', { vn: ' Chính sách bảo mật ' })}
            </a>
            {t('of FINA', { vn: 'của FINA' })}

            <TermsOfUserModal
              destroyOnClose
              onCancel={() => setVisibleTerms(false)}
              visible={visibleTerms}
            />
            <PrivacyPolicyModal
              destroyOnClose
              onCancel={() => setVisiblePrivacy(false)}
              visible={visiblePrivacy}
            />
          </div>
        ),
      },
    });
  };
};

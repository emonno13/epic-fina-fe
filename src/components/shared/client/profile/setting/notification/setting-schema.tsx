import {
  ACCOUNT,
  CONFIG_SETTING,
  SETTING_EMAIL,
  SETTING_SMS,
} from '@components/features/profiles/settings/constant';
import { useHTranslation } from '@lib/i18n';
import { HSubForm } from '@schema-form/h-form';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Col, Row, Switch } from 'antd';

export const SettingSchemaForm = (props: HFormProps): HFormItemProps[] => {
  const { t } = useHTranslation('common');
  const { form } = props;

  const onChangeConfigAll = (document, type) => {
    const CONFIG = type === CONFIG_SETTING.EMAIL ? SETTING_EMAIL : SETTING_SMS;
    if (document) {
      const value = {
        ...Object.values(CONFIG).reduce((accumulator: any, current: any) => {
          return {
            ...accumulator,
            [current]: true,
          };
        }, {}),
      };
      return form?.setFieldsValue({ [type]: value });
    }
    return form?.setFieldsValue({ [type]: undefined });
  };

  const onChangeConfigChildren = (document, type) => {
    const CONFIG = type === CONFIG_SETTING.EMAIL ? SETTING_EMAIL : SETTING_SMS;
    const valueOld = form?.getFieldValue(type);
    if (!document) {
      return form?.setFieldsValue({
        [type]: {
          ...valueOld,
          [CONFIG.ALL]: false,
        },
      });
    }
    if (
      Object.values(valueOld).filter((el) => !!el).length ===
      Object.values(CONFIG).length - 1
    ) {
      return form?.setFieldsValue({
        [type]: {
          ...valueOld,
          [CONFIG.ALL]: true,
        },
      });
    }
  };

  return [
    createSchemaItem({
      Component: () => {
        return (
          <Row gutter={[16, 16]}>
            <Col {...{ xs: 24, sm: 24, md: 12, lg: 12 }}>
              <div className="profile-setting-notification-item">
                <div className="profile-title">
                  {t('profile.notificationFromSMS')}
                </div>
                <HSubForm
                  schema={() =>
                    NotificationSMSSchema({
                      onChangeConfigAll,
                      onChangeConfigChildren,
                    })
                  }
                />
              </div>

              <div className="profile-setting-notification-item">
                <div className="profile-title">
                  {t('profile.notificationFromAccount')}
                </div>
                <HSubForm schema={NotificationAccountSchema} />
              </div>
            </Col>
            <Col {...{ xs: 24, sm: 24, md: 12, lg: 12 }}>
              <div className="profile-setting-notification-item">
                <div className="profile-title">
                  {t('profile.notificationFromEmail')}
                </div>
                <HSubForm
                  schema={() =>
                    NotificationEmailSchema({
                      onChangeConfigAll,
                      onChangeConfigChildren,
                    })
                  }
                />
              </div>
            </Col>
          </Row>
        );
      },
    }),
  ];
};

const NotificationSMSSchema = ({
  onChangeConfigAll,
  onChangeConfigChildren,
}) => {
  const { t } = useHTranslation('common');

  return [
    createSchemaItem({
      Component: Switch,
      name: [CONFIG_SETTING.SMS, SETTING_SMS.ALL],
      colProps: { xs: 24, sm: 24, md: 24 },
      label: t('All sms', { vn: 'Tất cả tin nhắn' }),
      valuePropName: 'checked',
      componentProps: {
        onChange: (document) => onChangeConfigAll(document, CONFIG_SETTING.SMS),
      },
    }),
    createSchemaItem({
      Component: Switch,
      name: [CONFIG_SETTING.SMS, SETTING_SMS.UPDATE_DEAL],
      colProps: { xs: 24, sm: 24, md: 24 },
      label: t('Update profile status\n', { vn: 'Cập nhật trạng thái hồ sơ' }),
      valuePropName: 'checked',
      componentProps: {
        onChange: (document) =>
          onChangeConfigChildren(document, CONFIG_SETTING.SMS),
      },
    }),
    createSchemaItem({
      Component: Switch,
      name: [CONFIG_SETTING.SMS, SETTING_SMS.CONTROLLED_ROSES],
      colProps: { xs: 24, sm: 24, md: 24 },
      label: t('Controlled roses', { vn: 'Hoa hồng được đối soát' }),
      valuePropName: 'checked',
      componentProps: {
        onChange: (document) =>
          onChangeConfigChildren(document, CONFIG_SETTING.SMS),
      },
    }),
  ];
};

const NotificationAccountSchema = () => {
  const { t } = useHTranslation('common');

  return [
    createSchemaItem({
      Component: Switch,
      name: [CONFIG_SETTING.ACCOUNT, ACCOUNT.PUBLIC],
      colProps: { xs: 24, sm: 24, md: 24 },
      label: t('Public account', { vn: 'Công khai tài khoản' }),
      valuePropName: 'checked',
    }),
    createSchemaItem({
      Component: Switch,
      name: [CONFIG_SETTING.ACCOUNT, ACCOUNT.READY_RECEIVE_CALL],
      colProps: { xs: 24, sm: 24, md: 24 },
      label: t('Ready receive call', { vn: 'Sẵn sàng nhận cuộc gọi' }),
      valuePropName: 'checked',
    }),
  ];
};

const NotificationEmailSchema = ({
  onChangeConfigAll,
  onChangeConfigChildren,
}) => {
  const { t } = useHTranslation('common');

  return [
    createSchemaItem({
      Component: Switch,
      name: [CONFIG_SETTING.EMAIL, SETTING_EMAIL.ALL],
      colProps: { xs: 24, sm: 24, md: 24 },
      label: t('All email', { vn: 'Tất cả email' }),
      valuePropName: 'checked',
      componentProps: {
        onChange: (document) =>
          onChangeConfigAll(document, CONFIG_SETTING.EMAIL),
      },
    }),
    createSchemaItem({
      Component: Switch,
      name: [CONFIG_SETTING.EMAIL, SETTING_EMAIL.UPDATE_DEAL],
      colProps: { xs: 24, sm: 24, md: 24 },
      label: t('Email Update profile status\n', {
        vn: 'Email cập nhật trạng thái hồ sơ',
      }),
      valuePropName: 'checked',
      componentProps: {
        onChange: (document) =>
          onChangeConfigChildren(document, CONFIG_SETTING.EMAIL),
      },
    }),
    createSchemaItem({
      Component: Switch,
      name: [CONFIG_SETTING.EMAIL, SETTING_EMAIL.AGGREGATION_DEAL_BY_WEEK],
      colProps: { xs: 24, sm: 24, md: 24 },
      valuePropName: 'checked',
      label: t('Email summarizing profile status by week', {
        vn: 'Email tổng hợp trạng thái hồ sơ theo tuần',
      }),
      componentProps: {
        onChange: (document) =>
          onChangeConfigChildren(document, CONFIG_SETTING.EMAIL),
      },
    }),
    createSchemaItem({
      Component: Switch,
      name: [CONFIG_SETTING.EMAIL, SETTING_EMAIL.AGGREGATION_DEAL_BY_MONTH],
      colProps: { xs: 24, sm: 24, md: 24 },
      valuePropName: 'checked',
      label: t('Monthly interest rate update email', {
        vn: 'Email cập nhật lãi suất hàng tháng',
      }),
      componentProps: {
        onChange: (document) =>
          onChangeConfigChildren(document, CONFIG_SETTING.EMAIL),
      },
    }),
    createSchemaItem({
      Component: Switch,
      name: [CONFIG_SETTING.EMAIL, SETTING_EMAIL.UPDATE_INFORMATION],
      colProps: { xs: 24, sm: 24, md: 24 },
      valuePropName: 'checked',
      label: t('Email update policy, news from FINA', {
        vn: 'Email cập nhật chính sách, tin tức từ FINA',
      }),
      componentProps: {
        onChange: (document) =>
          onChangeConfigChildren(document, CONFIG_SETTING.EMAIL),
      },
    }),
  ];
};

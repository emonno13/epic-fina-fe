import { createSchemaLabelItem } from '@components/shared/common/h-label/h-label-title';
import { Divider, Switch } from 'antd';
import { useHTranslation } from '../../../../lib/i18n';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '../../../../schema-form/h-types';
import {
  ACCOUNT,
  CONFIG_SETTING,
  SETTING_EMAIL,
  SETTING_SMS,
} from './constant';

export const SettingSchemaForm = (props: HFormProps): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
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
    createSchemaLabelItem({
      colProps: { span: 24 },
      rowProps: { gutter: { xs: 16, md: 16 } },
      componentProps: {
        label: t('Information'),
        titleTooltip: t('Information'),
      },
    }),
    createSchemaItem({
      Component: Divider,
      colProps: { span: 24 },
      componentProps: {
        orientation: 'left',
        plain: true,
        children: 'SMS',
        className: 'm-b-0 m-t-0',
      },
    }),
    createSchemaItem({
      Component: Switch,
      name: [CONFIG_SETTING.SMS, SETTING_SMS.ALL],
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('All sms', { vn: 'Tất cả tin nhắn' }),
      className: 'setting-layout setting-layout__sms-all',
      valuePropName: 'checked',
      componentProps: {
        onChange: (document) => onChangeConfigAll(document, CONFIG_SETTING.SMS),
      },
    }),
    createSchemaItem({
      Component: Switch,
      name: [CONFIG_SETTING.SMS, SETTING_SMS.UPDATE_DEAL],
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('Update profile status\n', { vn: 'Cập nhật trạng thái hồ sơ' }),
      className: 'setting-layout',
      valuePropName: 'checked',
      componentProps: {
        onChange: (document) =>
          onChangeConfigChildren(document, CONFIG_SETTING.SMS),
      },
    }),
    createSchemaItem({
      Component: Switch,
      name: [CONFIG_SETTING.SMS, SETTING_SMS.CONTROLLED_ROSES],
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('Controlled roses', { vn: 'Hoa hồng được đối soát' }),
      className: 'setting-layout',
      valuePropName: 'checked',
      componentProps: {
        onChange: (document) =>
          onChangeConfigChildren(document, CONFIG_SETTING.SMS),
      },
    }),
    createSchemaItem({
      Component: Divider,
      colProps: { span: 24 },
      componentProps: {
        orientation: 'left',
        plain: true,
        children: 'Email',
        className: 'm-b-0 m-t-0',
      },
    }),
    createSchemaItem({
      Component: Switch,
      name: [CONFIG_SETTING.EMAIL, SETTING_EMAIL.ALL],
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('All email', { vn: 'Tất cả email' }),
      className: 'setting-layout setting-layout__email-all',
      valuePropName: 'checked',
      componentProps: {
        onChange: (document) =>
          onChangeConfigAll(document, CONFIG_SETTING.EMAIL),
      },
    }),
    createSchemaItem({
      Component: Switch,
      name: [CONFIG_SETTING.EMAIL, SETTING_EMAIL.UPDATE_DEAL],
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('Email Update profile status\n', {
        vn: 'Email cập nhật trạng thái hồ sơ',
      }),
      valuePropName: 'checked',
      className: 'setting-layout',
      componentProps: {
        onChange: (document) =>
          onChangeConfigChildren(document, CONFIG_SETTING.EMAIL),
      },
    }),
    createSchemaItem({
      Component: Switch,
      name: [CONFIG_SETTING.EMAIL, SETTING_EMAIL.AGGREGATION_DEAL_BY_WEEK],
      colProps: { xs: 24, sm: 24, md: 12 },
      valuePropName: 'checked',
      label: t('Email summarizing profile status by week', {
        vn: 'Email tổng hợp trạng thái hồ sơ theo tuần',
      }),
      className: 'setting-layout',
      componentProps: {
        onChange: (document) =>
          onChangeConfigChildren(document, CONFIG_SETTING.EMAIL),
      },
    }),
    createSchemaItem({
      Component: Switch,
      name: [CONFIG_SETTING.EMAIL, SETTING_EMAIL.AGGREGATION_DEAL_BY_MONTH],
      colProps: { xs: 24, sm: 24, md: 12 },
      valuePropName: 'checked',
      label: t('Monthly interest rate update email', {
        vn: 'Email cập nhật lãi suất hàng tháng',
      }),
      className: 'setting-layout',
      componentProps: {
        onChange: (document) =>
          onChangeConfigChildren(document, CONFIG_SETTING.EMAIL),
      },
    }),
    createSchemaItem({
      Component: Switch,
      name: [CONFIG_SETTING.EMAIL, SETTING_EMAIL.UPDATE_INFORMATION],
      colProps: { xs: 24, sm: 24, md: 12 },
      valuePropName: 'checked',
      label: t('Email update policy, news from FINA', {
        vn: 'Email cập nhật chính sách, tin tức từ FINA',
      }),
      className: 'setting-layout',
      componentProps: {
        onChange: (document) =>
          onChangeConfigChildren(document, CONFIG_SETTING.EMAIL),
      },
    }),
    createSchemaItem({
      Component: Divider,
      colProps: { span: 24 },
      componentProps: {
        orientation: 'left',
        plain: true,
        children: 'Tài khoản',
        className: 'm-b-0 m-t-0',
      },
    }),
    createSchemaItem({
      Component: Switch,
      name: [CONFIG_SETTING.ACCOUNT, ACCOUNT.PUBLIC],
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('Public account', { vn: 'Công khai tài khoản' }),
      className: 'setting-layout',
      valuePropName: 'checked',
    }),
    createSchemaItem({
      Component: Switch,
      name: [CONFIG_SETTING.ACCOUNT, ACCOUNT.READY_RECEIVE_CALL],
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('Ready receive call', { vn: 'Sẵn sàng nhận cuộc gọi' }),
      className: 'setting-layout',
      valuePropName: 'checked',
    }),
  ];
};

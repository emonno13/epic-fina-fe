import { Input } from 'antd';

import { HInput } from '@components/shared/common-form-elements/h-input';
import { useHTranslation } from '@lib/i18n';
import { ValidationMessages } from '@lib/validation-message';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { HSelect } from '../../../../shared/common-form-elements/select';

export const QueueDetailSchemaForm = (props: HFormProps): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');

  return [
    createSchemaItem({
      Component: Input,
      name: 'name',
      colProps: { span: 24 },
      label: t('Name'),
      rules: [
        { required: true, message: ValidationMessages.requiredMessage('Name') },
      ],
      componentProps: {
        placeholder: t('Enter the name', { vn: 'Nhập vào tên' }),
      },
    }),
    createSchemaItem({
      Component: Input.TextArea,
      name: 'description',
      colProps: { span: 24 },
      label: t('Description'),
      componentProps: {
        rows: 6,
        placeholder: t('Enter the description', { vn: 'Nhập vào mô tả' }),
      },
    }),
    // createSchemaItem({
    // 	Component: Radio.Group,
    // 	name: 'recordCall',
    // 	colProps: { span: 24 },
    // 	rowProps: { gutter: { xs: 24, md: 24 } },
    // 	label: t('Record call'),
    // 	componentProps: {
    // 		defaultValue: 'yes',
    // 		optionType: 'button',
    // 		buttonStyle: 'solid',
    // 		options: [
    // 			{label: t('Yes'), value: 'yes'},
    // 			{label: t('No'), value: 'no'},
    // 		],
    // 	},
    // }),
    createSchemaItem({
      Component: HSelect,
      name: 'greetingFileId',
      colProps: { span: 24 },
      label: t('Music on standby', { vn: 'Nhạc chờ (voice)' }),
      componentProps: {
        showSearch: true,
        searchWhenHiddenValueChange: true,
        withRelations: ['file'],
        endpoint: 'greeting-files/suggestion',
        subFormName: 'greetingFile',
        optionsConverter: (option) => ({
          ...option,
          label: option?.description || option?.file?.name || option?.code,
        }),
      },
    }),
    // createSchemaItem({
    // 	Component: InputNumber,
    // 	name: 'answerTimeout',
    // 	colProps: {span: 24},
    // 	label: t('Wait agent answer timeout (s)'),
    // 	componentProps: {
    // 		min: 0,
    // 	},
    // }),
    // createSchemaItem({
    // 	Component: InputNumber,
    // 	name: 'standbyTimeMax',
    // 	colProps: {span: 24},
    // 	label: t('Standby time max (s)', {vn: 'Thời gian chờ tối đa (giây)'}),
    // 	componentProps: {
    // 		min: 0,
    // 	},
    // }),
    createSchemaItem({
      Component: HInput,
      name: 'phoneBackup',
      label: t(
        'Number phone will forward when all users are busy (or not online)',
        {
          vn: 'Số điện chuyển tiếp khi các user bận ( hoặc không có user đang trực )',
        },
      ),
      rules: [
        {
          pattern: /^(\d{1,2})?\d{9}$/gm,
          message: t('Your phone is not valid', {
            vn: 'Không đúng định dạng số điện thoại',
          }),
        },
      ],
      componentProps: {
        modernLabel: true,
        placeholder: t('Enter the phone', { vn: 'Số điện thoại' }),
      },
    }),
  ];
};

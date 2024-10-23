import { HSelect } from '@components/shared/common-form-elements/select';
import { HRadioGroup } from '@components/shared/common/h-radio-group';
import { USER_TYPES } from '@components/shared/user/constants';
import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Input, InputNumber, Radio, Typography } from 'antd';
import { isEmpty } from 'lodash';
import { useMemo } from 'react';
import { getAgentTypeCallOptions } from 'types/agent-type-call';
import { GROUP_TYPES } from 'types/group';
import {
  CATEGORY_DOCUMENTATION_STATUS,
  CATEGORY_DOCUMENTATION_STATUS_OPTIONS,
} from '../../docs/category-documentation/constant';

const { Text } = Typography;

export const schemaForm = (props: HFormProps): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  return [
    createSchemaItem({
      Component: Input,
      name: 'name',
      colProps: { span: 24 },
      label: t('Name', { vn: 'Tiêu đề' }),
      rules: [
        {
          required: true,
          message: t('Tiêu đề là bắt buộc', { vn: 'Tiêu đề là bắt buộc' }),
        },
      ],
      componentProps: {
        placeholder: t('Enter title', { vn: 'Nhập tiêu đề' }),
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('type', { vn: 'Phân loại' }),
      colProps: { span: 24 },
      name: 'type',
      rules: [
        {
          message: 'Trường này là bắt buộc',
        },
      ],
      componentProps: {
        placeholder: 'Phân loại yêu cầu tư vấn',
        options: [
          { label: t('Vay'), value: 'counselling' },
          { label: t('Bồi thường bồi hiểm'), value: 'claim-insurance' },
          { label: t('Trái phiếu'), value: 'bond' },
          { label: t('Chứng chỉ quỹ'), value: 'fund' },
        ],
      },
    }),
    createSchemaItem({
      Component: HRadioGroup,
      colProps: { span: 12 },
      label: t('Status'),
      initialValue: CATEGORY_DOCUMENTATION_STATUS.ACTIVE,
      componentProps: {
        placeholder: t('Status'),
        optionType: 'button',
        buttonStyle: 'solid',
        options: CATEGORY_DOCUMENTATION_STATUS_OPTIONS,
      },
      name: 'status',
    }),
  ];
};

export const AddUserSchemaForm = (
  props: HFormProps,
  groupDocumentDetail,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');

  const hiddenValuesUser = useMemo(() => {
    if (groupDocumentDetail?.type === GROUP_TYPES.ALL) {
      return {};
    }
    return {
      type: groupDocumentDetail?.type || USER_TYPES.STAFF,
    };
  }, [groupDocumentDetail]);

  return [
    createSchemaItem({
      Component: HSelect,
      name: 'userId',
      rowProps: { gutter: { xs: 24, md: 24 } },
      colProps: { span: 12 },
      label: t('Agent', { vn: 'Thành viên' }),
      rules: [
        {
          required: true,
          message: t('Agent is required', { vn: 'Thành viên là bắt buộc' }),
        },
      ],
      componentProps: {
        showSearch: true,
        searchWhenHiddenValueChange: true,
        endpoint: 'users/suggestion',
        withRelations: ['org'],
        hiddenValues: hiddenValuesUser,
        optionsConverter: generateLabelUserElement,
        placeholder: t('Chọn người xử lý', { vn: 'Chọn người xử lý' }),
      },
    }),
    createSchemaItem({
      Component: InputNumber,
      name: 'numberIndex',
      colProps: { span: 12 },
      label: t('Thứ tự ưu tiên', { vn: 'Thứ tự ưu tiên' }),
      rules: [
        {
          required: true,
          message: t('Thứ tự ưu tiên là bắt buộc', {
            vn: 'Thứ tự ưu tiên là bắt buộc',
          }),
        },
      ],
      componentProps: {
        placeholder: t('Enter ...', { vn: 'Nhập thứ tự ưu tiên' }),
        style: {
          width: '100%',
        },
      },
    }),
    createSchemaItem({
      Component: InputNumber,
      name: 'maxTask',
      colProps: { span: 12 },
      label: t('Số lượng YCTV tối đa', { vn: 'Số lượng YCTV tối đa' }),
      rules: [
        {
          required: true,
          message: t('Số lượng Yêu cầu tư vấn là bắt buộc', {
            vn: 'Số lượng Yêu cầu tư vấn là bắt buộc',
          }),
        },
      ],
      componentProps: {
        placeholder: t('Enter max number pending task', {
          vn: 'Nhập Số lượng Yêu cầu tư vấn',
        }),
        style: {
          width: '100%',
        },
      },
    }),
    createSchemaItem({
      Component: InputNumber,
      name: 'maxTaskInDay',
      colProps: { span: 12 },
      label: t('Số lượng YCTV trong ngày', { vn: 'Số lượng YCTV trong ngày' }),
      rules: [
        {
          required: true,
          message: t('Số lượng Yêu cầu tư vấn là bắt buộc', {
            vn: 'Số lượng Yêu cầu tư vấn là bắt buộc',
          }),
        },
      ],
      componentProps: {
        placeholder: t('Enter max number pending task', {
          vn: 'Nhập Số lượng Yêu cầu tư vấn',
        }),
        style: {
          width: '100%',
        },
      },
    }),
    createSchemaItem({
      Component: Radio.Group,
      name: 'status',
      colProps: { span: 12 },
      label: t('status', { vn: 'Trạng thái nhận cuộc gọi' }),
      initialValue: 'active',
      componentProps: {
        defaultValue: 'active',
        optionType: 'button',
        buttonStyle: 'solid',
        options: getAgentTypeCallOptions(t),
      },
    }),
  ];
};

const generateLabelUserElement = (userDocument, optionsConverter) => {
  const newDocument = optionsConverter
    ? optionsConverter(userDocument)
    : userDocument;
  const org = userDocument?.org;
  newDocument.label = (
    <div>
      <span>{`${ConverterUtils.getFullNameUser(userDocument)} ${userDocument?.code ? `- ${userDocument?.code}` : ''}`}</span>
      {!isEmpty(org) && (
        <div>
          <Text italic type="secondary">
            {org?.code + ' - ' + org?.name}
          </Text>
        </div>
      )}
    </div>
  );
  return newDocument;
};

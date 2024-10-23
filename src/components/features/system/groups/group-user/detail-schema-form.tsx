import { Radio, Typography } from 'antd';

import { useHTranslation } from '@lib/i18n';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { getAgentTypeCallOptions } from '@types/agent-type-call';
import { GROUP_TYPES } from '@types/group';
import { isEmpty } from 'lodash';
import { useMemo } from 'react';
import { ConverterUtils } from '../../../../../lib/converter';
import { HSelect } from '../../../../shared/common-form-elements/select';
import { USER_TYPES } from '../../../../shared/user/constants';
const { Text } = Typography;
export const GroupUserDetailSchemaForm = (
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
      },
    }),
    createSchemaItem({
      Component: Radio.Group,
      name: 'status',
      colProps: { span: 6 },
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

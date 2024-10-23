import { FolderAddOutlined } from '@ant-design/icons';
import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { HModal } from '@components/shared/common/h-modal';
import { endpoints } from '@lib/networks/endpoints';
import { HForm } from '@schema-form/h-form';
import Form from 'antd/lib/form';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ORGANIZATION_TYPES } from 'types/organization';
import { GROUP_TYPE } from '../common';
import { DetailSchemaForm } from './detail-schema-form';

export const CreateGroup = (props) => {
  const { onGotSuccess, selectedRowKeys = [], orgType } = props;
  const { t } = useTranslation('common');
  const [form] = Form.useForm();
  const groupType = convertOrgToGroupType(orgType);
  const [visible, setVisible] = useState(false);
  const canAddGroup = !selectedRowKeys?.length;

  const handleGotSuccess = (result) => {
    setVisible(false);
    onGotSuccess && onGotSuccess(result);
  };

  return (
    <>
      <HButton
        {...{
          size: 'large',
          shape: 'round',
          className: 'control-btn m-l-5',
          icon: <FolderAddOutlined />,
          disabled: canAddGroup,
          onClick: () => setVisible(true),
        }}
      >
        {t('Add Group')}
      </HButton>
      <HModal
        {...{
          visible,
          onCancel: () => setVisible(false),
          onOk: () => form.submit(),
        }}
      >
        <HForm
          {...{
            schema: DetailSchemaForm,
            method: 'put',
            endpoint: endpoints.endpointWithApiDomain('/groups/organizations'),
            onGotSuccess: handleGotSuccess,
            form,
            hideControlButton: true,
            transport: {
              groupType,
            },
            hiddenValues: {
              orgIds: selectedRowKeys,
            },
          }}
        />
      </HModal>
    </>
  );
};

export const convertOrgToGroupType = (type) => {
  switch (type) {
    case ORGANIZATION_TYPES.SUB_ORG:
      return GROUP_TYPE.ORGANIZATION;

    default:
      return GROUP_TYPE.USER;
  }
};

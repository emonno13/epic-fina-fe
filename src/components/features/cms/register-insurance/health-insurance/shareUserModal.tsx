import { Button, Form } from 'antd';
import { useHTranslation } from '../../../../../lib/i18n';
import { HFeatureForm } from '../../../../../schema-form/features/forms/h-feature-form';
import { createSchemaItem } from '../../../../../schema-form/h-types';
import { HSelect } from '../../../../shared/common-form-elements/select';
import { HModal } from '../../../../shared/common/h-modal';
import { ConverterUtils } from '../../../../../lib/converter';
import { endpoints } from '../../../../../lib/networks/endpoints';

const ShareUserModal = ({ isVisible, setIsVisible, healthInsuranceIs, searchForm }) => {
  const { t } = useHTranslation('admin-common');
  const [form] = Form.useForm();
  const handleCancel = () => {
    setIsVisible(false);
  };
  const initialValues = {
    userIds: healthInsuranceIs?.sharingWithUserIds,
  };

  const handleUpdate = () => {
    form.submit();
  };

  return (
    <HModal width="450px"  {...{
      onCancel:() => setIsVisible(false),
      visible: isVisible,
      title: t('Xác nhận'),
      hideSubmitAndContinueButton: true,
      submitButtonLabel: t('Đồng ý'),
      footer: (
        <div>
          <Button {...{
            onClick: () => {handleCancel();},
            danger: true,
          }}>
						Thoát
          </Button>
          <Button {...{
            type: 'primary',
            onClick: () => {handleUpdate();},
          }}>
						Xác nhận
          </Button>
        </div>
      ),
    }}>
      <HFeatureForm {...{
        form,
        initialValues,
        endpoint: endpoints.generateNodeEndpoint(`participate-insurances/${healthInsuranceIs?.id}/share-with-user`),
        onGotSuccess: () => {
          setIsVisible(false);
          searchForm.submit();
        },
        schema: () => [
          createSchemaItem({
            Component: HSelect,
            name: 'userIds',
            colProps: { span: 24 },
            label: 'Chia sẻ cho những người:',
            componentProps: {
              mode: 'multiple',
              placeholder: 'Select users',
              showSearch: true,
              searchWhenHiddenValueChange: true,
              endpoint: '/users/suggestion',
              optionsConverter: (document) => {
                document.label = `${ConverterUtils.getFullNameUser(document)} ${document?.code ? `- ${document?.code}` : ''}`;
                return document;
              },
              hiddenValues: {
                hasAccount: true,
              },
            },
          }),
        ],
        hideSubmitAndContinueButton: true,
      }}/>
    </HModal>
  );
};

export default ShareUserModal;

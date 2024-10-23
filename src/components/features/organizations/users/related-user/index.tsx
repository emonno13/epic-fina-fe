import { UsergroupAddOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Button, Form, notification } from 'antd';
import { HModal } from '../../../../shared/common/h-modal';
import { HButton } from '../../../../shared/common-form-elements/h-confirmation-button';
import { HForm } from '../../../../../schema-form/h-form';
import { endpoints } from '../../../../../lib/networks/endpoints';
import { createSchemaItem } from '../../../../../schema-form/h-types';
import { HSelect } from '../../../../shared/common-form-elements/select';
import { ConverterUtils } from '../../../../../lib/converter';
import { USER_RELATIONSHIP_OPTIONS } from '../../../../shared/user/constants';
import { useHTranslation } from '../../../../../lib/i18n';

export const AddRelatedUser = ({ documentDetail, searchForm }) => {
  const { t } = useHTranslation('admin-common');
  const [isVisible, setIsVisible] = useState(false);
  const [relatedUserId, setRelatedUserId] = useState({});
  const [relatedPerson, setRelatedPerson] = useState([]);
  const [form] = Form.useForm();

  const handleRelatedUser = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    const listUser = documentDetail?.relatedPerson?.map(item => item?.userId);
    setRelatedPerson(listUser);
  }, []);

  return (
    <>
      <HButton {...{
        size: 'large',
        shape: 'round',
        className: 'create-ralated-btn',
        onClick: () => setIsVisible(true),
        icon: <UsergroupAddOutlined />,
      }}>
				Thêm người liên quan
      </HButton>
      <HModal {...{
        title: 'Thêm người liên quan',
        visible: isVisible,
        onCancel: () => {
          setIsVisible(false);
        },
        centered: true,
        width: '40%',
        onOk: () => {
          setIsVisible(false);
        },
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
              onClick: () => {handleRelatedUser();},
            }}>
							Xác nhận
            </Button>
          </div>
        ),
      }}>
        <HForm {...{
          form,
          endpoint: endpoints.generateNodeEndpoint(`/users/${documentDetail?.id}/related-person/${relatedUserId}`),
          method: 'put',
          hideControlButton: true,
          onGotSuccess: () => {
            searchForm.submit();
            notification.success({
              message: 'Thêm người liên quan thành công',
            });
            setIsVisible(false);
          },
          onDataReadyToSubmit: (data) => {
            data.relatedPerson = [{
              userId: documentDetail.id,
              relationship: data.relationship,
            }];
            delete data.relationship;
            return data;
          },
          schema: () => [
            createSchemaItem({
              Component: HSelect,
              colProps: { span: 23 },
              rowProps: { gutter: { xs: 8, md: 16 } },
              label: 'Người liên quan',
              rules: [{
                required: true,
                message: 'Người liên quan là bắt buộc',
              }],
              name: 'relatedUserId',
              componentProps: {
                hiddenValues: { id: { nin: [documentDetail?.id,...relatedPerson] } },
                endpoint: 'users/suggestion',
                placeholder:'Người liên quan',
                onChangeSelected: (option) => {
                  setRelatedUserId(option?.id);
                },
                optionsConverter: (document) => {
                  document.label = `${ConverterUtils.getFullNameUser(document)} ${document?.code ? `- ${document?.code}` : ''}`;
                  return document;
                },
              },
            }),
            createSchemaItem({
              Component: HSelect,
              label: t('RELATIONSHIP'),
              colProps: { span: 23 },
              rowProps: { gutter: { xs: 8, md: 16 } },
              name: 'relationship',
              rules: [{
                required: true,
                message: t('Relationship is required'),
              }],
              componentProps: {
                placeholder: t('RELATIONSHIP'),
                options: USER_RELATIONSHIP_OPTIONS,
              },
            }),
          ],
        }}/>
      </HModal>
    </>
  );
};





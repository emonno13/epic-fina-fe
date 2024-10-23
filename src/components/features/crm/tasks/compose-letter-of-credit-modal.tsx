import { HModal } from '@components/shared/common/h-modal';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Button, Checkbox, Form, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useHTranslation } from '../../../../lib/i18n';
import { endpoints } from '../../../../lib/networks/endpoints';
import {
  useDocumentDetail,
  useDocumentIdName,
  useSearchForm,
} from '../../../../schema-form/features/hooks';
import { HForm } from '../../../../schema-form/h-form';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '../../../../schema-form/h-types';
import HTinyEditor from '../../../shared/common-form-elements/h-tiny-editor';
import { RouteUtils } from '../../../shared/layout/router-contaner/utils';
import { documentTemplateBaseCode, fontSizes } from './constans';
import { getDocumentsByDocumentTemplateCode } from './utils';

import './task.module.scss';

export const ComposeLetterOfCreditModal = (props) => {
  const { t } = useHTranslation('admin-common');
  const {
    isVisibleComposeLetter = false,
    setIsVisibleComposeLetter,
    taskId,
    handleCreditOfferLetterPreview = (f) => f,
  } = props;
  const [form] = Form.useForm();
  const documentIdName = useDocumentIdName();
  const searchForm = useSearchForm();
  const document = useDocumentDetail();

  const updateCreditOfferLetter = async (document) => {
    handleCreditOfferLetterPreview();
    await FormUtils.submitForm(document, {
      method: 'put',
      endpoint: endpoints.generateNodeEndpoint(`/tasks/${taskId}`),
      useDefaultMessage: true,
    });
  };
  const initialValues = {
    contentLetter: document?.contentLetter,
  };

  const handleSendLetter = () => {
    handleCreditOfferLetterPreview();
    form?.submit();
  };

  const handleViewLetter = async () => {
    const contentLetter = form?.getFieldsValue();
    await updateCreditOfferLetter(contentLetter);
    window.open(
      `${window.location.origin}/thu-chao-tin-dung?taskId=${taskId}`,
      '_blank',
    );
  };

  const handleSaveCreditOfferLetter = async () => {
    try {
      const values = await form?.validateFields();
      updateCreditOfferLetter(values);
      setIsVisibleComposeLetter(false);
    } catch (err: any) {
      FormUtils.showFormValidateFailMessage();
    }
  };
  const handleCancel = () => {
    setIsVisibleComposeLetter(false);
  };

  const handleGotSuccess = () => {
    setIsVisibleComposeLetter(false);
    Modal.success({
      title: t('Send letter of credit successfully!', {
        vn: 'Gửi thư chào thành công!',
      }),
      centered: true,
      onOk: () => {
        RouteUtils.redirectToDocumentDetail(undefined, documentIdName);
        searchForm?.submit();
      },
    });
  };

  return (
    <HModal
      {...{
        title: (
          <>
            <h2>Soạn thư chào tín dụng</h2>
            <h5>
              (Nội dung chỉnh sửa thuộc những phần tuỳ chỉnh trên thư chào. Sau
              khi chỉnh sửa có thể xem lại nội dung toàn bộ thư chào khi đã lên
              template)
            </h5>
          </>
        ),
        visible: isVisibleComposeLetter,
        onCancel: () => {
          setIsVisibleComposeLetter(false);
        },
        centered: true,
        width: '1200px',
        footer: (
          <div>
            <Button
              {...{
                onClick: () => {
                  handleCancel();
                },
              }}
            >
              Hủy
            </Button>
            <Button
              {...{
                onClick: handleViewLetter,
                type: 'primary',
              }}
            >
              Xem trước thư chào
            </Button>
            <Button
              {...{
                onClick: handleSendLetter,
                type: 'primary',
              }}
            >
              Gửi cho khách
            </Button>
            <Button
              {...{
                onClick: handleSaveCreditOfferLetter,
                type: 'primary',
              }}
            >
              Lưu
            </Button>
          </div>
        ),
      }}
    >
      <HForm
        {...{
          form,
          endpoint: endpoints.generateNodeEndpoint(
            `tasks/update-content-letter-and-send-letter/${taskId}`,
          ),
          method: 'put',
          hideControlButton: true,
          initialValues,
          onDataReadyToSubmit: (values) => {
            return {
              ...values,
              taskId,
            };
          },
          onGotSuccess: handleGotSuccess,
          schema: ComposeLetterOfCreditModalSchemaDetail,
          transport: { t },
        }}
      />
    </HModal>
  );
};

const ComposeLetterOfCreditModalSchemaDetail = (
  props: HFormProps,
): HFormItemProps[] => {
  const [documentTemplates, setDocumentTemplates] = useState<
    { label: string; value: string }[]
  >([]);
  const { transport } = props;
  const { t } = transport;
  useEffect(() => {
    (async () => {
      const documents = await getDocumentsByDocumentTemplateCode(
        documentTemplateBaseCode,
      );
      setDocumentTemplates(
        documents.map((el: any) => ({
          label: el?.name || '',
          value: el?.name || '',
        })),
      );
    })();
  }, []);

  return [
    createSchemaItem({
      Component: HTinyEditor,
      name: ['contentLetter', 'policiesAndConditions'],
      label: t('Một số chính sách và điều khoản'),
      rules: [
        {
          required: true,
          message: 'Chính sách và điều khoản là bắt buộc',
        },
      ],
      componentProps: {
        placeholder: t('Enter the policies and conditions', {
          vn: 'Nhập vào một số chính sách và điều khoản',
        }),
        fontsizeFormats: fontSizes,
      },
    }),
    createSchemaItem({
      Component: HTinyEditor,
      name: ['contentLetter', 'interestRate'],
      label: t('Một số lãi suất nổi bật'),
      rules: [
        {
          required: true,
          message: 'Lãi suất nổi bật là bắt buộc',
        },
      ],
      componentProps: {
        fontsizeFormats: fontSizes,
      },
    }),
    createSchemaItem({
      Component: HTinyEditor,
      name: ['contentLetter', 'proposalAndProcess'],
      label: t('Đề xuất và điều khoản'),
      rules: [
        {
          required: true,
          message: 'Đề xuất và điều khoản',
        },
      ],
      componentProps: {
        fontsizeFormats: fontSizes,
      },
    }),
    createSchemaItem({
      Component: Checkbox.Group,
      className: 'select-documents',
      name: ['contentLetter', 'documents'],
      label: t('Các hồ sơ cần chuẩn bị:'),
      componentProps: {
        options: documentTemplates,
      },
    }),
  ];
};

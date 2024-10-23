import { RouteUtils } from '@components/shared/layout/router-contaner/utils';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import {
  useDocumentDetail,
  useDocumentIdName,
  useSearchForm,
  useSetDocumentDetail,
  useSetDocumentDetailVisibility,
} from '@schema-form/features/hooks';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Modal, notification } from 'antd';

export const useShareWithBank = () => {
  const setVisibleDrawn = useSetDocumentDetailVisibility();
  const documentIdName = useDocumentIdName();
  const setTaskData = useSetDocumentDetail();
  const searchForm = useSearchForm();
  const { t } = useHTranslation('admin-common');
  const taskData = useDocumentDetail();

  return async ({
    formShare,
    surveyQuestionForm,
    setVisibleShareInfoWithBank,
    responseUpdateSurveyResult = { id: '' },
  }) => {
    const data = formShare?.getFieldsValue() || {};
    if (isInvalidPartnerShare(data)) {
      notification.error({ message: 'Chưa chọn đối tác chia sẻ' });
      return;
    }
    const { isAllBank, groupPartner, groupIds } = data;

    await FormUtils.submitForm(
      {
        taskId: taskData?.id,
        productId:
          taskData?.productId || surveyQuestionForm?.getFieldValue('productId'),
        groupPartner,
        isAllBank,
        groupIds,
      },
      {
        endpoint: endpoints.endpointWithApiDomain(
          `/survey-results/share-with-bank/${taskData?.surveyResultId || responseUpdateSurveyResult?.id}`,
        ),
        method: 'put',
        useDefaultMessage: true,
        onGotSuccess: async () => {
          setVisibleShareInfoWithBank(false);
          Modal.success({
            title: t('Register successfully!', {
              vn: 'Chia sẻ thông tin thành công!',
            }),
            centered: true,
            onOk: () => {
              setVisibleDrawn(false);
              RouteUtils.redirectToDocumentDetail(undefined, documentIdName);
              setTaskData({}, false);
            },
          });
          await searchForm?.submit();
        },
      },
    );
  };
};

const isInvalidPartnerShare = (data: any = {}) => {
  const { isAllBank, groupPartner } = data;
  if (!isAllBank && !groupPartner[0]) {
    return true;
  }

  if (isAllBank) {
    return false;
  }

  let hasInvalidBankId = false;
  for (const partner of groupPartner) {
    if (!partner?.bankId) {
      hasInvalidBankId = true;
      break;
    }
  }

  return hasInvalidBankId;
};

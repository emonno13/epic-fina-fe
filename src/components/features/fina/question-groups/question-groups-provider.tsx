import { endpoints } from '@lib/networks/endpoints';
import { httpRequester } from '@lib/networks/http';
import {
  useDocumentDetail,
  useIsNewDocument,
} from '@schema-form/features/hooks/document-detail-hooks';
import Form from 'antd/es/form';
import notification from 'antd/lib/notification';
import React, { createContext, useEffect, useState } from 'react';
import {
  useDocumentDetailVisibility,
  useOnCloseDocumentDetail,
} from '../../../../schema-form/features/hooks';
import { useReloadSearchResult } from '../../../../schema-form/features/hooks/search-form-hooks';

export enum QUESTION_GROUP_TYPE {
  NORMAL = 'normal_question_tab',
  GENERAL = 'general_question_tab',
}

type QuestionGroupsContextType = {
  questionGroupType: string;
  changeQuestionGroupType: (key: string) => void;
  createGeneralQuestionForm: any;
  onModalClose: () => void;
  onModalSubmit: ({ isSubmitAndContinue }) => void;
  onModalSubmitAndContinue: () => void;
};

const QuestionGroupsContext = createContext<QuestionGroupsContextType | null>(
  null,
);

const QuestionGroupsProvider: React.FC = ({ children }) => {
  const [createGeneralQuestionForm] = Form.useForm();
  const isCreateNew = useIsNewDocument();
  const questionGroup = useDocumentDetail();
  const documentDetailVisibility = useDocumentDetailVisibility();
  const closeDocumentDetailPopover = useOnCloseDocumentDetail();
  const [questionGroupType, setQuestionGroupType] = useState<string>(
    QUESTION_GROUP_TYPE.NORMAL,
  );

  const handleReloadOnGotSuccess = useReloadSearchResult();

  // When modal close, set Tab is normal
  useEffect(() => {
    if (!documentDetailVisibility) {
      setQuestionGroupType(QUESTION_GROUP_TYPE.NORMAL);
    }
  }, [documentDetailVisibility]);

  const onModalClose = () => {
    createGeneralQuestionForm.resetFields();
    handleReloadOnGotSuccess();
    closeDocumentDetailPopover({});
  };

  const onModalSubmit = async ({ isSubmitAndContinue }) => {
    await createGeneralQuestionForm.validateFields();
    try {
      const submitData = createGeneralQuestionForm.getFieldsValue();

      if (isCreateNew) {
        await httpRequester.postToApi({
          url: endpoints.endpointWithApiDomain('/question-groups/general'),
          params: submitData,
        });
      } else {
        await httpRequester.putToApi({
          url: endpoints.endpointWithApiDomain(
            `/question-groups/general/${questionGroup?.id}`,
          ),
          params: submitData,
        });
      }

      isCreateNew && createGeneralQuestionForm.resetFields();
      !isSubmitAndContinue && onModalClose();

      notification.info({
        message: isCreateNew ? 'Dữ liệu được tạo' : 'Dữ liệu được cập nhập',
        description: isCreateNew
          ? 'Dữ liệu đã tạo thành công.'
          : 'Dữ liệu được cập nhập thành công.',
      });
    } catch (error) {
      console.log(error);
      notification.error({
        message: 'Thất bại',
        description: isCreateNew
          ? 'Dữ liệu không được tạo.'
          : 'Dữ liệu không được cập nhập.',
      });
    }
  };

  const onModalSubmitAndContinue = async () => {
    onModalSubmit({ isSubmitAndContinue: true });
  };

  const changeQuestionGroupType = (key: string) => {
    setQuestionGroupType(key);
  };

  return (
    <QuestionGroupsContext.Provider
      value={{
        questionGroupType,
        changeQuestionGroupType,
        createGeneralQuestionForm,
        onModalClose,
        onModalSubmit,
        onModalSubmitAndContinue,
      }}
    >
      {children}
    </QuestionGroupsContext.Provider>
  );
};

const useQuestionGroupsContext = (): QuestionGroupsContextType => {
  const context = React.useContext(QuestionGroupsContext);
  if (!context) {
    throw new Error(
      'useQuestionGroupsContext must be used within a QuestionGroupsProvider',
    );
  }
  return context;
};
export {
  QuestionGroupsContext,
  QuestionGroupsProvider,
  useQuestionGroupsContext,
};

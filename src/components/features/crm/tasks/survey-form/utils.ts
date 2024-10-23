import { CALCULATION_QUESTION_GROUP_CODE } from '@components/shared/questions/question/types';
import { endpoints } from '@lib/networks/endpoints';
import { FormUtils } from '@schema-form/utils/form-utils';
import { FormInstance } from 'antd';
import { PRODUCT_TYPES } from 'types/organization';

export const fetchQuestionGroup = async (props: {
  groupKey: string;
  setGroup: (value: string) => void;
}) => {
  const { groupKey, setGroup } = props;
  let orCondition: any = {};

  if (groupKey) {
    orCondition = { productType: groupKey };
  }

  if (groupKey === PRODUCT_TYPES.loan) {
    orCondition = {
      or: [
        { code: CALCULATION_QUESTION_GROUP_CODE.QG_LOAN_ABILITY },
        { code: CALCULATION_QUESTION_GROUP_CODE.QG_LOAN_PLAN_CALCULATION },
        { productType: groupKey },
      ],
    };
  }

  await FormUtils.submitForm(
    {},
    {
      endpoint: endpoints.generateNodeEndpoint('/question-groups/for-task'),
      hiddenValues: {
        filter: {
          where: orCondition,
        },
      },
      method: 'get',
      onGotSuccess: (response) => {
        setGroup(response.map((el) => ({ label: el?.name, value: el?.id })));
      },
    },
  );
};

export const fetchLoanPlanCalculationQuestionGroup = async (props: {
  id: string;
  setQuestionGroup: (value: object) => void;
}) => {
  const { id, setQuestionGroup } = props;
  if (!id) {
    setQuestionGroup({});
    return;
  }
  await FormUtils.submitForm(
    {},
    {
      method: 'get',
      endpoint: endpoints.generateNodeEndpoint(`question-groups/public/${id}`),
      onGotSuccess: setQuestionGroup,
    },
  );
};

export const fetchLoanPlanCalculationQuestionGroupIdByCode = async (props: {
  setQuestionGroupId: (value: object) => void;
}) => {
  const { setQuestionGroupId } = props;
  await FormUtils.submitForm(
    {},
    {
      method: 'get',
      endpoint: endpoints.generateNodeEndpoint('question-groups'),
      hiddenValues: {
        filter: {
          where: {
            code: 'QG_LOAN_CORE',
          },
        },
      },
      onGotSuccess: (res) => {
        setQuestionGroupId(res?.data?.[0]?.id);
      },
    },
  );
};

export const fetchSurveyResultByCustomerId = async (props: {
  userInfoId: string;
  setSurveyResult: (value: object) => void;
  form: FormInstance;
}) => {
  const { userInfoId, setSurveyResult, form } = props;
  if (!userInfoId) {
    form.setFieldsValue({
      surveyDetails: [],
    });
    return;
  }
  await FormUtils.submitForm(
    {},
    {
      nodeName: 'survey-results',
      hiddenValues: {
        filter: {
          where: {
            customerId: userInfoId,
          },
        },
      },
      onGotSuccess: (response) => {
        setSurveyResult(response?.data?.[0]);
        form.setFieldsValue({
          surveyDetails: response?.data?.[0]?.surveyDetails || [],
        });
      },
    },
  );
};

export const fetchSurveyResult = async (props: {
  documentId: string;
  setSurveyResult: (value: object) => void;
  form: FormInstance;
}) => {
  const { documentId, setSurveyResult, form } = props;
  if (!documentId) {
    form.setFieldsValue({
      surveyDetails: [],
    });
    return;
  }
  await FormUtils.submitForm(
    {},
    {
      nodeName: 'survey-results',
      documentId,
      onGotSuccess: (response) => {
        setSurveyResult(response);
        form.setFieldsValue({
          surveyDetails: response?.surveyDetails || [],
        });
      },
    },
  );
};

export const fetchTaskDetail = async (props: {
  documentId: any;
  setDataDetail: (value: object) => void;
}) => {
  const { documentId, setDataDetail } = props;
  if (!documentId) {
    setDataDetail({});
    return;
  }
  await FormUtils.submitForm(
    {},
    {
      method: 'get',
      endpoint: endpoints.generateNodeEndpoint(`tasks/${documentId}`),
      onGotSuccess: setDataDetail,
    },
  );
};

export const onFormSurveyQuestionGotSuccess = async (props: {
  response: any;
  questionsId: string;
  setSurveyResult: (value: any) => void;
  form: FormInstance;
  taskId: string;
}) => {
  const { response, questionsId, setSurveyResult, form, taskId } = props;
  await FormUtils.submitForm(
    {
      surveyResultId: response?.id,
      questionGroupId: questionsId,
    },
    {
      nodeName: 'tasks',
      method: 'put',
      documentId: taskId,
      onGotSuccess: () => {
        fetchSurveyResult({
          documentId: response?.id || '',
          setSurveyResult,
          form,
        });
      },
    },
  );
};

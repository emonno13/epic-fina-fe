import { TFunction } from 'next-i18next';
import { CALCULATION_QUESTION_GROUP_CODE, CALCULATION_QUESTION_CODE, QUESTION_SELECTION_MODE } from './types';

export const QuestionUtils = {
  checkIsCalculationQuestionGroup(questionGroup: any) {
    return Object.values(CALCULATION_QUESTION_GROUP_CODE).includes(questionGroup?.code);
  },
  checkIsCalculationQuestion(question: any) {
    return Object.values(CALCULATION_QUESTION_CODE).includes(question?.code);
  },
  checkQuestionGroupHasCalculationQuestion(questionGroup: any) {
    const { pairingQuestionGroupIds } = questionGroup;
    return Array.isArray(pairingQuestionGroupIds) && pairingQuestionGroupIds.length > 0;
  },
  getSelectionModeOptions(t: TFunction) {
    return [
      {
        label: t('Multiple', { vn: 'Chọn nhiều' }),
        value: QUESTION_SELECTION_MODE.MULTIPLE,
      },
      {
        label: t('Single', { vn: 'Chọn một' }),
        value: QUESTION_SELECTION_MODE.SINGLE,
      },
    ];
  },
};

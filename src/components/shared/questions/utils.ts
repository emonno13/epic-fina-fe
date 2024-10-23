import { QUESTION_TYPES } from './question/types';

export const SurveyQuestionUtils = {
  ruleRequired: (questions) => {
    return [
      () => ({
        validator(_, value) {
          const mappingResultContentByQuestionCode = {};
          value.forEach(el => {
            if ([QUESTION_TYPES.OPEN_ENDED, QUESTION_TYPES.OPEN_ENDED_NUMBER, QUESTION_TYPES.DATE].includes(el.type)) {
              mappingResultContentByQuestionCode[el?.questionData?.code] = el?.content;
            }
            if ([QUESTION_TYPES.TEXT_SELECTION].includes(el.type)) {
              mappingResultContentByQuestionCode[el?.questionData?.code] = el?.selectedOptions?.[0]?.content?.toString();
            }
          });
          for (const question of questions) {
            if (!question?.required) {
              continue;
            }
            if (!mappingResultContentByQuestionCode[question?.code]) {
              return Promise.reject('Vui lòng điền đầy đủ các trường bắt buộc!');
            }
          }
          return Promise.resolve();
        },
      }),
    ];
  },
};

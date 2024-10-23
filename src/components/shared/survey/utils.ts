
export const SurveyUtils = {
  getSurveyDetail(surveyDetails, questionId) {
    if (Array.isArray(surveyDetails) && surveyDetails.length > 0) {
      return surveyDetails.find((detail) => detail?.questionId === questionId);
    }
    return {};
  },
  requireCondition(surveyDetail) {
    const { content, selectedOptions } = surveyDetail || {};
    return !!content || (Array.isArray(selectedOptions) && selectedOptions.length > 0);
  },
};

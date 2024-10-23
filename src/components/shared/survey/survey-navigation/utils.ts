export const SurveyNavigationUtils = {
  checkIsAnswered({ question, result }) {
    const foundedResult = result.find(({ questionId }) => questionId === question.id);
    return !!(foundedResult?.content || foundedResult?.selectedOptions?.length);
  },
};

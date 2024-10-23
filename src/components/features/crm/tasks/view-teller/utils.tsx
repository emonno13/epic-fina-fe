import { CODE_QUERY_NOTE, TASK_RESPONSE_STATUS } from '../../../../../constants/crm/task';

export const modifyDataSource = (data, currentUserId, maxPeopleReceived) => {
  if (!data.length) {
    return [];
  }

  return data.map(el => {
    const surveyDetails = el?.surveyDetails || [];
    const bankFeedbacks = el?.bankFeedbacks || [];
    let totalPeopleReceive = 0;
    let responseStatus = '';
    let date;
    let content;
    let responseDate;
    const taskStatus = el?.task?.status;
    let bankNote = '';

    bankFeedbacks.forEach((item: any) => {
      if (item?.responseStatus === TASK_RESPONSE_STATUS.RECEIVED) {
        totalPeopleReceive++;
      }
      if (item?.userId === currentUserId) {
        content = item?.content;
        responseStatus = item?.responseStatus;
        bankNote = item?.bankNote;
        date = new Date(item?.responseDate);
        responseDate = new Date(date.setHours(date.getHours() + 12));
      }
    });

    if (totalPeopleReceive >= maxPeopleReceived && responseStatus === TASK_RESPONSE_STATUS.WAITING_TO_RECEIVE) {
      responseStatus = TASK_RESPONSE_STATUS?.ENOUGH_PEOPLE_TO_ACCEPT;
    }

    const note = surveyDetails.map(item => CODE_QUERY_NOTE.includes(
      item?.questionData?.code) ?
      { [item?.questionData?.code || 'key'] :
        item?.content ||
        item?.selectedOptions[0]?.content }
      : {});

    return {
      ...el,
      note,
      totalPeopleReceive,
      responseStatus,
      responseDate,
      content,
      taskStatus,
      bankNote,
    };
  });
};



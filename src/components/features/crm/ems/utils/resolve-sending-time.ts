import { TRIGGER_BASED_ON, TRIGGER_DEADLINE_TYPE, TRIGGER_INTERVAL_UNIT } from '../message-workflow/constant';

export const resolveSendingTime = (triggerPrototype: any, event: any): number => {
  const eventStartTime = new Date(event.startTime).getTime();
  const eventEndTime = new Date(event.endTime).getTime();
  const triggerDeadlineType = triggerPrototype.deadlineType;
  const triggerInterval = triggerPrototype.interval;
  const triggerActivated = triggerPrototype.activated;
  const oneDayMilliseconds = 24 * 60 * 60 * 1000;
  const oneWeekMilliseconds = oneDayMilliseconds * 7;
  const positions = { monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5, saturday: 6, sunday: 7 };

  if (triggerPrototype.basedOn === TRIGGER_BASED_ON.BEFORE) {
    if (triggerDeadlineType === TRIGGER_DEADLINE_TYPE.EVENT_START_TIME) {
      if (triggerInterval === TRIGGER_INTERVAL_UNIT.DAY) {
        const actualSendingDate = new Date(eventStartTime - triggerActivated * oneDayMilliseconds);
        actualSendingDate.setHours(+triggerPrototype.hour);
        actualSendingDate.setMinutes(+triggerPrototype.minute);

        return actualSendingDate.getTime();
      } else if (triggerInterval === TRIGGER_INTERVAL_UNIT.WEEKS) {
        let actualSendingDate;
        const eventStartTimeDayOfWeek = new Date(event.startTime).getDay();

        if (eventStartTimeDayOfWeek === 0) {
          actualSendingDate = new Date(eventStartTime - (triggerActivated + 1 ) * oneWeekMilliseconds - (eventStartTimeDayOfWeek - positions[triggerPrototype?.sendingDay]) * oneDayMilliseconds);

        } else {
          actualSendingDate = new Date(eventStartTime - triggerActivated * oneWeekMilliseconds - (eventStartTimeDayOfWeek - positions[triggerPrototype?.sendingDay]) * oneDayMilliseconds);
        }

        actualSendingDate.setHours(+triggerPrototype.hour);
        actualSendingDate.setMinutes(+triggerPrototype.minute);

        return actualSendingDate.getTime();
      }

      throw new Error('Trigger interval invalid!');
    } else if (triggerDeadlineType === TRIGGER_DEADLINE_TYPE.EVENT_END_TIME) {
      if (triggerInterval === TRIGGER_INTERVAL_UNIT.DAY) {
        const actualSendingDate = new Date(eventEndTime - triggerActivated * oneDayMilliseconds);
        actualSendingDate.setHours(+triggerPrototype.hour);
        actualSendingDate.setMinutes(+triggerPrototype.minute);

        return actualSendingDate.getTime();
      } else if (triggerInterval === TRIGGER_INTERVAL_UNIT.WEEKS) {
        let actualSendingDate;
        const eventEndTimeDayOfWeek = new Date(event.endTime).getDay();

        if (eventEndTimeDayOfWeek === 0) {
          actualSendingDate = new Date(eventEndTime - (triggerActivated + 1) * oneWeekMilliseconds - (eventEndTimeDayOfWeek - positions[triggerPrototype?.sendingDay]) * oneDayMilliseconds);
        } else {
          actualSendingDate = new Date(eventEndTime - triggerActivated * oneWeekMilliseconds - (eventEndTimeDayOfWeek - positions[triggerPrototype?.sendingDay]) * oneDayMilliseconds);
        }

        actualSendingDate.setHours(+triggerPrototype.hour);
        actualSendingDate.setMinutes(+triggerPrototype.minute);

        return actualSendingDate.getTime();
      }
    }

    throw new Error('Trigger deadline type invalid');
  }

  if (triggerDeadlineType === TRIGGER_DEADLINE_TYPE.EVENT_START_TIME) {
    if (triggerInterval === TRIGGER_INTERVAL_UNIT.DAY) {
      const actualSendingDate = new Date(eventStartTime + triggerActivated * oneDayMilliseconds);
      actualSendingDate.setHours(+triggerPrototype.hour);
      actualSendingDate.setMinutes(+triggerPrototype.minute);

      return actualSendingDate.getTime();
    } else if (triggerInterval === TRIGGER_INTERVAL_UNIT.WEEKS) {
      let actualSendingDate;
      const eventStartTimeDayOfWeek = new Date(event.startTime).getDay();
      if (eventStartTimeDayOfWeek === 0) {
        actualSendingDate = new Date(eventStartTime + (triggerActivated - 1) * oneWeekMilliseconds + (positions[triggerPrototype?.sendingDay] - eventStartTimeDayOfWeek) * oneDayMilliseconds);
      } else {
        actualSendingDate = new Date(eventStartTime + triggerActivated * oneWeekMilliseconds + (positions[triggerPrototype?.sendingDay] - eventStartTimeDayOfWeek) * oneDayMilliseconds);
      }
      actualSendingDate.setHours(+triggerPrototype.hour);
      actualSendingDate.setMinutes(+triggerPrototype.minute);

      return actualSendingDate.getTime();
    }

    throw new Error('Trigger interval invalid!');
  } else if (triggerDeadlineType === TRIGGER_DEADLINE_TYPE.EVENT_END_TIME) {
    if (triggerInterval === TRIGGER_INTERVAL_UNIT.DAY) {
      const actualSendingDate = new Date(eventEndTime + triggerActivated * oneDayMilliseconds);
      actualSendingDate.setHours(+triggerPrototype.hour);
      actualSendingDate.setMinutes(+triggerPrototype.minute);

      return actualSendingDate.getTime();
    } else if (triggerInterval === TRIGGER_INTERVAL_UNIT.WEEKS) {
      let actualSendingDate;
      const eventEndTimeDayOfWeek = new Date(event.endTime).getDay();
      if (eventEndTimeDayOfWeek === 0) {
        actualSendingDate = new Date(eventEndTime + (triggerActivated - 1) * oneWeekMilliseconds + (positions[triggerPrototype?.sendingDay] - eventEndTimeDayOfWeek) * oneDayMilliseconds);
      } else {
        actualSendingDate = new Date(eventEndTime + triggerActivated * oneWeekMilliseconds + (positions[triggerPrototype?.sendingDay] - eventEndTimeDayOfWeek) * oneDayMilliseconds);
      }
      actualSendingDate.setHours(+triggerPrototype.hour);
      actualSendingDate.setMinutes(+triggerPrototype.minute);

      return actualSendingDate.getTime();
    }
  }

  throw new Error('Trigger deadline type invalid');
};

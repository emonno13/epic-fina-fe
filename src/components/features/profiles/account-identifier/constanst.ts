
export const STEP = {
  PERSON_INFORMATION: 'person-information',
  CARD: 'crad',
  CONTRACT: 'contract',
};

export const STEP_IDENTIFIER = {
  [STEP.PERSON_INFORMATION]: {
    name: 'Thông tin cá nhân',
    disable: false,
  },
  [STEP.CARD]: {
    name: 'CMND/CCCD',
    disable: false,
  },
  [STEP.CONTRACT]: {
    name: 'Hợp đồng CTV',
    disable: true,
  },
};

export const WELFARE = {
  INSURANCE : 'insurance',
  TOURISM: 'tourism',
  HEALTH_CARE: 'health_care',
  SALARY_INCREASE : 'salary_increase',
  ALLOWANCE : 'allowance',
  VACATION_MODE : 'vacation_mode',

};
export const WELFARE_OPTIONS = [
  { value: WELFARE.INSURANCE, label: 'Bảo hiểm' },
  { value: WELFARE.TOURISM, label: 'Du lịch' },
  { value: WELFARE.HEALTH_CARE, label: 'Chăm sóc sức khỏe' },
  { value: WELFARE.SALARY_INCREASE, label: 'Tăng lương' },
  { value: WELFARE.ALLOWANCE, label: 'Phụ cấp' },
  { value: WELFARE.VACATION_MODE, label: 'Chế độ nghỉ phép' },
];

export const getLabel = (e: string[])  => {
  const arr: Array<{label, value}> = WELFARE_OPTIONS.filter(option => (e.includes(option.value)));
  return arr.map(val => val.label).join(', ');
};

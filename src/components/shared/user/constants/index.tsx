export const USER_TYPES = {
  STAFF: 'staff',
  CUSTOMER: 'customer',
  COLLABORATOR: 'collaborator',
  TELLER: 'teller',
  SELLER: 'seller',
  INSURANCE_AGENT: 'insurance_agent',
  REAL_ESTATE: 'real_estate',
  OTHERS: 'others',
};

export const USER_TYPES_LABEL_MAPPING = {
  [USER_TYPES.CUSTOMER]: 'Customer',
  [USER_TYPES.STAFF]: 'FINA Staff',
  [USER_TYPES.COLLABORATOR]: 'Collaborator',
  [USER_TYPES.TELLER]: 'Teller',
  [USER_TYPES.SELLER]: 'Seller',
  [USER_TYPES.INSURANCE_AGENT]: 'Insurance agent',
  [USER_TYPES.REAL_ESTATE]: 'Real estate',
  [USER_TYPES.OTHERS]: 'others',
};

export const USER_TYPES_COLOR_MAPPING = {
  [USER_TYPES.CUSTOMER]: 'pink',
  [USER_TYPES.COLLABORATOR]: 'cyan',
};

export const USER_TYPE_OPTIONS = [{
  label: 'Customer',
  value: USER_TYPES.CUSTOMER,
}, {
  label: 'Collaborator',
  value: USER_TYPES.COLLABORATOR,
}, {
  label: 'Teller',
  value: USER_TYPES.TELLER,
}, {
  label: 'FINA staff',
  value: USER_TYPES.STAFF,
}];

export const USER_FIELDS = {
  BANK: 'bank',
  INSURANCE: 'insurance',
  REAL_ESTATE: 'real_estate',
};

export const USER_FIELD_OPTIONS = [{
  label: 'Ngân hàng',
  value: USER_FIELDS.BANK,
}, {
  label: 'Bảo hiểm',
  value: USER_FIELDS.INSURANCE,
}, {
  label: 'Bất động sản',
  value: USER_FIELDS.REAL_ESTATE,
}];

export const USER_RELATIONSHIP = {
  FATHER: 'father',
  MOTHER: 'mother',
  CHILD: 'child',
  WIFE: 'wife',
  HUSBAND: 'husband',
  SIBLINGS: 'siblings',
  FRIEND: 'friend',
  AUNT_AND_UNCLE: 'aunt_and_uncle',
  OTHER: 'other',
};

export const USER_RELATIONSHIP_OPTIONS = [{
  label: 'Bố',
  value: USER_RELATIONSHIP.FATHER,
}, {
  label: 'Mẹ',
  value: USER_RELATIONSHIP.MOTHER,
}, {
  label: 'Con',
  value: USER_RELATIONSHIP.CHILD,
}, {
  label: 'Vợ',
  value: USER_RELATIONSHIP.WIFE,
}, {
  label: 'Chồng',
  value: USER_RELATIONSHIP.HUSBAND,
}, {
  label: 'Anh / chị / em',
  value: USER_RELATIONSHIP.SIBLINGS,
}, {
  label: 'Bạn bè',
  value: USER_RELATIONSHIP.FRIEND,
}, {
  label: 'Cô / dì / chú / bác',
  value: USER_RELATIONSHIP.AUNT_AND_UNCLE,
}, {
  label: 'Khác',
  value: USER_RELATIONSHIP.OTHER,
}];

export const USER_RELATIONSHIP_LABEL_MAPPING = {
  [USER_RELATIONSHIP.FATHER]: 'Bố',
  [USER_RELATIONSHIP.MOTHER]: 'Mẹ',
  [USER_RELATIONSHIP.CHILD]: 'Con',
  [USER_RELATIONSHIP.WIFE]: 'Vợ',
  [USER_RELATIONSHIP.HUSBAND]: 'Chồng',
  [USER_RELATIONSHIP.SIBLINGS]: 'Anh / chị / em',
  [USER_RELATIONSHIP.FRIEND]: 'Bạn bè',
  [USER_RELATIONSHIP.AUNT_AND_UNCLE]: 'Cô / dì / chú / bác',
  [USER_RELATIONSHIP.OTHER]: 'Khác',
};

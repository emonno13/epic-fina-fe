import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { TFunction } from 'next-i18next';

export const DOCUMENT_TEMPLATE_STATUSES = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  IN_USE: 'in_use',
  DELETED: 'deleted',
};

export const DOCUMENT_TEMPLATE_STATUSES_OPTIONS = (t: TFunction) => [
  { value: DOCUMENT_TEMPLATE_STATUSES.DRAFT, label: t('Draft') },
  { value: DOCUMENT_TEMPLATE_STATUSES.ACTIVE, label: t('Active') },
  { value: DOCUMENT_TEMPLATE_STATUSES.INACTIVE, label: t('In-Active') },
  { value: DOCUMENT_TEMPLATE_STATUSES.IN_USE, label: t('In use') },
];

export const DOCUMENT_TEMPLATE_STATUSES_LABEL_MAPPING = {
  [DOCUMENT_TEMPLATE_STATUSES.DRAFT]: 'Draft',
  [DOCUMENT_TEMPLATE_STATUSES.ACTIVE]: 'Active',
  [DOCUMENT_TEMPLATE_STATUSES.INACTIVE]: 'In-Active',
  [DOCUMENT_TEMPLATE_STATUSES.IN_USE]: 'In use',
  [DOCUMENT_TEMPLATE_STATUSES.DELETED]: 'Deleted',
};

export const DOCUMENT_TEMPLATE_STATUSES_COLOR_MAPPING = {
  [DOCUMENT_TEMPLATE_STATUSES.DRAFT]: 'yellow',
  [DOCUMENT_TEMPLATE_STATUSES.ACTIVE]: 'blue',
  [DOCUMENT_TEMPLATE_STATUSES.INACTIVE]: 'red',
  [DOCUMENT_TEMPLATE_STATUSES.IN_USE]: 'green',
};

export const DOCUMENT_DETAIL_VERSIONS = {
  MAIN: 'main',
  COPY: 'copy',
  MAIN_COPY: 'main_copy',
  NOTARIZED: 'Notarized',
  READY_TO_PACKING_SLIP: 'ready_to_packing_slip',
  DELETED: 'deleted',
};

export const DOCUMENT_DETAIL_STATUSES = {
  APPLY: 'apply',
  NOT_APPLY: 'not_apply',
};

export const DOCUMENT_DETAIL_STATUSES_OPTIONS = [
  { value: DOCUMENT_DETAIL_STATUSES.APPLY, label: 'Apply' },
  { value: DOCUMENT_DETAIL_STATUSES.NOT_APPLY, label: 'Not apply yet' },
];
export const DOCUMENT_DETAIL_REQUIRED_OPTIONS = [
  { value: true, label: <CheckOutlined /> },
  { value: false, label: <CloseOutlined /> },
];

export const DOCUMENT_DETAIL_STATUSES_LABEL_MAPPING = {
  [DOCUMENT_DETAIL_STATUSES.NOT_APPLY]: 'Not apply yet',
  [DOCUMENT_DETAIL_STATUSES.APPLY]: 'Apply',

};

export const DOCUMENT_DETAIL_STATUSES_COLOR_MAPPING = {
  [DOCUMENT_DETAIL_STATUSES.NOT_APPLY]: 'red',
  [DOCUMENT_DETAIL_STATUSES.APPLY]: 'green',
};


export const DOCUMENT_DETAIL_VERSIONS_OPTIONS = [
  { value: DOCUMENT_DETAIL_VERSIONS.MAIN, label: 'Main' },
  { value: DOCUMENT_DETAIL_VERSIONS.COPY, label: 'Copy' },
  { value: DOCUMENT_DETAIL_VERSIONS.MAIN_COPY, label: 'Main copy' },
  { value: DOCUMENT_DETAIL_VERSIONS.NOTARIZED, label: 'Notarized' },
];

export const DOCUMENT_TEMPLATE_DETAILS_VERSIONS_LABEL_MAPPING = {
  [DOCUMENT_DETAIL_VERSIONS.MAIN]: 'Main',
  [DOCUMENT_DETAIL_VERSIONS.MAIN_COPY]: 'Main copy',
  [DOCUMENT_DETAIL_VERSIONS.COPY]: 'Copy',
  [DOCUMENT_DETAIL_VERSIONS.NOTARIZED]: 'Notarized',
};

export const DOCUMENT_TEMPLATE_DETAILS_VERSIONS_COLOR_MAPPING = {
  [DOCUMENT_DETAIL_VERSIONS.MAIN]: 'red',
  [DOCUMENT_DETAIL_VERSIONS.MAIN_COPY]: 'blue',
  [DOCUMENT_DETAIL_VERSIONS.COPY]: 'green',
  [DOCUMENT_DETAIL_VERSIONS.NOTARIZED]: 'yellow',
};

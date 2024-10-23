export enum USER_ROLE {
  ADMIN = 'admin',
  COMPANY_ADMIN = 'company-admin',
  COMPANY_USER = 'company-user',
  PERSONAL = 'personal',
}

export enum ContentTypes {
  TEXT = 'text',
  TOOL_CALL = 'tool_call',
  IMAGE_FILE = 'image_file',
  ERROR = 'error',
}

export enum Constants {
  /** Key for the app's version. */
  VERSION = 'v0.7.2',
  /** Key for the Custom Config's version (librechat.yaml). */
  CONFIG_VERSION = '1.1.3',
  /** Standard value for the first message's `parentMessageId` value, to indicate no parent exists. */
  NO_PARENT = '00000000-0000-0000-0000-000000000000',
  /** Fixed, encoded domain length for Azure OpenAI Assistants Function name parsing. */
  ENCODED_DOMAIN_LENGTH = 10,
  /** Identifier for using current_model in multi-model requests. */
  CURRENT_MODEL = 'current_model',
}

export enum LocalStorageKeys {
  /** Key for the admin defined App Title */
  APP_TITLE = 'appTitle',
  /** Key for the last conversation setup. */
  LAST_CONVO_SETUP = 'lastConversationSetup',
  /** Key for the last BingAI Settings */
  LAST_BING = 'lastBingSettings',
  /** Key for the last selected model. */
  LAST_MODEL = 'lastSelectedModel',
  /** Key for the last selected tools. */
  LAST_TOOLS = 'lastSelectedTools',
  /** Key for the last selected spec by name*/
  LAST_SPEC = 'lastSelectedSpec',
  /** Key for temporary files to delete */
  FILES_TO_DELETE = 'filesToDelete',
  /** Prefix key for the last selected assistant ID by index */
  ASST_ID_PREFIX = 'assistant_id__',
  /** Key for the last selected fork setting */
  FORK_SETTING = 'forkSetting',
  /** Key for remembering the last selected option, instead of manually selecting */
  REMEMBER_FORK_OPTION = 'rememberForkOption',
  /** Key for remembering the split at target fork option modifier */
  FORK_SPLIT_AT_TARGET = 'splitAtTarget',
  /** Key for saving text drafts */
  TEXT_DRAFT = 'textDraft_',
  /** Key for saving file drafts */
  FILES_DRAFT = 'filesDraft_',
}

export enum DecreeType {
  BOOKMARK = 'bookmark',
  REFERENCE = 'reference',
  CITATION = 'citation',
}

export enum REPLY_TYPE {
  NORMAL = 'Trả lời thông dụng',
  PRO = 'Trả lời chuyên nghiệp',
}

export enum OTHERS_SEARCH_DRAWER_KEY {
  GOOGLE = 'Google',
  THUVIENPHAPLUAT = 'Thuvienphapluat',
}

export const ENTERPRISE_LOGO = [
  {
    styles: { width: 193.06, height: 64.2 },
    link: '/logo/partner/yoga-therapy.png',
  },
  {
    styles: { width: 284.77, height: 65.78 },
    link: '/logo/partner/van-hanh-medical-center.png',
  },
  {
    styles: { width: 198.87, height: 75.66 },
    link: '/logo/partner/care-plus-vietnam.png',
  },
  {
    styles: { width: 184, height: 82.23 },
    link: '/logo/partner/now-fit.png',
  },
  {
    styles: { width: 95.5, height: 77.18 },
    link: '/logo/partner/dha-healthcare.png',
  },
  {
    styles: { width: 151.89, height: 69.66 },
    link: '/logo/partner/mien-hai-dang.png',
  },
  {
    styles: { width: 134, height: 86 },
    link: '/logo/partner/victoria-fitness-yoga.png',
  },
  {
    styles: { width: 144, height: 69.12 },
    link: '/logo/partner/pivie.png',
  },
  {
    styles: { width: 150, height: 62.54 },
    link: '/logo/partner/khoe-spa.png',
  },
  {
    styles: { width: 183, height: 76 },
    link: '/logo/partner/citigym.png',
  },
  {
    styles: { width: 95.56, height: 65.32 },
    link: '/logo/partner/elite-fitness.png',
  },
  {
    styles: { width: 180, height: 71.4 },
    link: '/logo/partner/vyoga.png',
  },
  {
    styles: { width: 129.16, height: 69.62 },
    link: '/logo/partner/we-link.png',
  },
  {
    styles: { width: 237.39, height: 45.8 },
    link: '/logo/partner/california-fitness-yoga.png',
  },
];

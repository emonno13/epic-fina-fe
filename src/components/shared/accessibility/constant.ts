export const ADMIN_PERMISSIONS: any = {
  SITE_OWNER: 'SITE_OWNER',
  SUPPER_ADMIN: 'SUPPER_ADMIN',
  ADMIN: 'ADMIN',
  SITE_USER: 'SITE_USER',
};

export const TYPE_PERMISSION: any = {
  SYS_PERMISSION: 'sys_permission',
  MODEL_PERMISSION: 'model_permission',
};

export const generatePermission = (modelName) => {
  const MODEL_NAME = modelName?.toUpperCase();
  return {
    CREATE: `C_${MODEL_NAME}`,
    UPDATE: `U_${MODEL_NAME}`,
    DELETE: `D_${MODEL_NAME}`,
    VIEW_ALL: `V_${MODEL_NAME}`,
    VIEW_MY_DATA_ONLY: `V_MDT_${MODEL_NAME}`,
    VIEW_DETAIL: `V_D_${MODEL_NAME}`,
    SUGGESTION: `S_${MODEL_NAME}`,
    // VIEW_ALL_INSIDE_ORG: `V_INS_${MODEL_NAME}`,
    // VIEW_ALL_SHARING: `VS_${MODEL_NAME}`,
    SHARING_WITH_ORG: `SO_${MODEL_NAME}`,
    // SHARING_WITH_STAFF: `SS_${MODEL_NAME}`,
    // SHARING_MY_DOCUMENT_WITH_ORG: `SMO_${MODEL_NAME}`,
    // SHARING_MY_DOCUMENT_WITH_STAFF: `SMS_${MODEL_NAME}`,
  };
};
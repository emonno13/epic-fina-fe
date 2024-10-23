export enum IVR_KEYPRESS_ACTION {
  GO_TO_QUEUE = 'go_to_queue',
  GO_TO_IVR_NODE = 'go_to_ivr_node',
  GO_TO_PHONE_NUMBER = 'go_to_phone_number',
  STOP_CALL = 'stop_call',
}

export const IVR_KEYPRESS_ACTION_OPTIONS = [
  {
    label: 'Đến một hàng đợi',
    value: IVR_KEYPRESS_ACTION.GO_TO_QUEUE,
  },
  {
    label: 'Đến một nút IVR',
    value: IVR_KEYPRESS_ACTION.GO_TO_IVR_NODE,
  },
  {
    label: 'Đến một số điện thoại',
    value: IVR_KEYPRESS_ACTION.GO_TO_PHONE_NUMBER,
  },
  /*{
    label: 'Dừng cuộc gọi',
    value: IVR_KEYPRESS_ACTION.STOP_CALL,
  }*/
];

export const IVR_KEYPRESS_ACTION_LABEL_MAPPING = {
  [IVR_KEYPRESS_ACTION.GO_TO_QUEUE]: 'Đến một hàng đợi',
  [IVR_KEYPRESS_ACTION.GO_TO_IVR_NODE]: 'Đến một nút IVR',
  [IVR_KEYPRESS_ACTION.GO_TO_PHONE_NUMBER]: 'Đến một số điện thoại',
  [IVR_KEYPRESS_ACTION.STOP_CALL]: 'Dừng cuộc gọi',
};

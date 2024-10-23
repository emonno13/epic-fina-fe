import { TFunction } from 'react-i18next';
import { NEW_ITEM_DOCUMENT_ID } from '../forms/h-item-form';

export const generateDefaultTitle = (t: TFunction, itemDocument: any) => {
  console.log(itemDocument);
  if (!itemDocument?.id || itemDocument?.id === NEW_ITEM_DOCUMENT_ID) {
    return t('new_item_document', { vn: 'Tạo mới', en: 'Create new Item' });
  }
  return t('new_item_document', { vn: 'Cập nhật', en: 'Update' });
};
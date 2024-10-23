import { FormInstance } from 'antd';
import { DEFAULT_FIELD_NAME_OF_SEO } from './constants';

type UpdateSeoFieldsType = {
  nameTag?: string,
  form?: FormInstance,
};

export const onUpdateSeoFields = (param?: UpdateSeoFieldsType) => {
  const { nameTag = DEFAULT_FIELD_NAME_OF_SEO, form } = param || {};

  const onUpdateField = (value, field) => {
    const seoValues = form?.getFieldValue(nameTag);
    form?.setFieldsValue({
      [nameTag]: {
        ...seoValues,
        [field]: value,
      },
    });
  };

  const onUpdateTitle = (value) => {
    onUpdateField(value, 'title');
  };

  const onUpdateDescription = (value) => {
    onUpdateField(value, 'description');
  };

  const onUpdateUrl = (value) => {
    onUpdateField(value, 'url');
  };

  const onUpdateImage = (value) => {
    onUpdateField(value, 'image');
  };

  const onUpdateAuthor = (value) => {
    onUpdateField(value, 'author');
  };

  return {
    onUpdateTitle,
    onUpdateDescription,
    onUpdateUrl,
    onUpdateImage,
    onUpdateAuthor,
  };
};

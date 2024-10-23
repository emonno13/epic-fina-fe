import { Input, Switch, Tabs } from 'antd';
import { debounce } from 'lodash';

import { HInput } from '@components/shared/common-form-elements/h-input';
import { DEFAULT_FIELD_NAME_OF_SEO } from '@components/shared/common-form-elements/h-seo-element/constants';
import { onUpdateSeoFields } from '@components/shared/common-form-elements/h-seo-element/utils';
import { HSlug } from '@components/shared/common-form-elements/h-slug';
import { HTabsWithSeoPane } from '@components/shared/common-form-elements/h-tab/h-tabs-with-seo-pane';
import { HTinyEditor } from '@components/shared/common-form-elements/h-tiny-editor';
import { HUploadImage } from '@components/shared/common-form-elements/h-upload';
import { HSelect } from '@components/shared/common-form-elements/select';
import { SelectUtils } from '@components/shared/common-form-elements/select/Utils';
import { setFormSlugValue } from '@components/shared/common-form-elements/utils';
import { HRadioGroup } from '@components/shared/common/h-radio-group';
import { useHTranslation } from '@lib/i18n';
import { ConvertUtils } from '@lib/utils/convert';
import { useIsNewDocument } from '@schema-form/features/hooks/document-detail-hooks';
import { HSubForm } from '@schema-form/h-form';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { PRODUCT_TYPES } from 'types/organization';
import { NEWS_STATUS, NEWS_STATUS_OPTIONS } from './constant';

export const useNewsDetailWithSeoSchemaForm = () => {
  const { t } = useHTranslation('admin-common');

  return (props: HFormProps): HFormItemProps[] => [
    createSchemaItem({
      Component: () => {
        return (
          <HTabsWithSeoPane>
            <Tabs.TabPane
              tab={t('News detail', { vn: 'Tin tức chi tiết' })}
              key="news-detail"
            >
              <HSubForm schema={() => NewsDetailSchemaForm(props)} />
            </Tabs.TabPane>
          </HTabsWithSeoPane>
        );
      },
    }),
  ];
};

export const NewsDetailSchemaForm = (props: HFormProps): HFormItemProps[] => {
  const { form } = props;

  const isNewDocument = useIsNewDocument();
  const { t } = useHTranslation('admin-common');

  const {
    onUpdateDescription,
    onUpdateTitle,
    onUpdateUrl,
    onUpdateImage,
    onUpdateAuthor,
  } = onUpdateSeoFields({
    form,
    nameTag: DEFAULT_FIELD_NAME_OF_SEO,
  });

  const handleDescriptionChange = (e) => {
    onUpdateDescription(e.target.value);
  };

  const handleAuthorChange = (e) => {
    onUpdateAuthor(e.target.value);
  };

  const onTitleChange = (e) => {
    const value = e?.target?.value;
    onUpdateTitle(value);
    if (isNewDocument) {
      setFormSlugValue(value, form);
      onUpdateUrl(`${location.origin}/tin-tuc/${ConvertUtils.slugify(value)}`);
    }
  };

  const handleImageChange = (image) => {
    onUpdateImage(image);
    form?.setFieldsValue({
      image: image?.url || '',
    });
  };

  return [
    createSchemaItem({
      Component: HInput,
      name: 'title',
      colProps: { span: 12 },
      rowProps: { gutter: { xs: 10, md: 20 } },
      label: t('Title', { vn: 'Tên bài viết' }),
      rules: [
        {
          required: true,
          message: t('Title is required', { vn: 'Tiêu đề là bắt buộc' }),
          whitespace: true,
        },
      ],
      componentProps: {
        modernLabel: true,
        placeholder: t('Enter the title', { vn: 'Tiêu đề' }),
        onChange: debounce(onTitleChange, 300),
      },
    }),
    createSchemaItem({
      Component: HInput,
      label: t('Author', { vn: 'Tác giả' }),
      colProps: { span: 12 },
      name: 'author',
      rules: [
        {
          required: true,
          message: t('Author is required', { vn: 'Tác giả là bắt buộc' }),
          whitespace: true,
        },
      ],
      componentProps: {
        modernLabel: true,
        placeholder: t('Enter the author', { vn: 'Tác giả' }),
        onChange: debounce(handleAuthorChange, 300),
      },
    }),
    createSchemaItem({
      Component: HSelect,
      name: 'hashtagIds',
      colProps: { span: 12 },
      label: 'Hashtag',
      componentProps: {
        modernLabel: true,
        mode: 'multiple',
        placeholder: 'Select hashtag',
        showSearch: true,
        searchWhenHiddenValueChange: true,
        endpoint: 'hashtags/public/suggestion',
        optionsConverter: (document) => {
          document.label = `${document?.name}`;
          return document;
        },
        newItemOption: {
          formProps: {
            schema: () => [
              createSchemaItem({
                Component: HInput,
                label: t('Hashtag', { vn: 'Hashtag' }),
                colProps: { span: 24 },
                name: 'name',
                // rules: [{ required: true }],
                componentProps: {
                  // modernLabel: true,
                  placeholder: 'Nhập Hashtag',
                },
              }),
            ],
            nodeName: 'hashtags',
            label: 'Tạo mới hashtag',
          },
        },
      },
    }),
    SelectUtils.createCategorySuggestionElement({
      label: t('News category', { vn: 'Danh mục tin tức' }),
      name: 'categoryId',
      colProps: { span: 12 },
      rules: [
        {
          required: true,
          message: t('News category is required', {
            vn: 'Danh mục tin tức là bắt buộc',
          }),
        },
      ],
      componentProps: {
        modernLabel: true,
        hiddenValues: {
          type: PRODUCT_TYPES.news,
        },
        searchWhenHidenValueChange: true,
      },
    }),
    createSchemaItem({
      Component: HSlug,
      name: 'slug',
      colProps: { span: 24 },
      label: t('Slug'),
      rules: [
        {
          required: true,
          message: t('Slug is required', { vn: 'Slug là bắt buộc' }),
          whitespace: true,
        },
      ],
      componentProps: {
        modernLabel: true,
        placeholder: t('Enter slug'),
      },
    }),
    createSchemaItem({
      Component: Input.TextArea,
      label: t('Description'),
      colProps: { span: 24 },
      name: 'description',
      rules: [
        {
          required: true,
          message: t('Description is required', { vn: 'Mô tả là bắt buộc' }),
          whitespace: true,
        },
      ],
      componentProps: {
        maxLength: 500,
        placeholder: t('Enter the desription', { vn: 'Mô tả' }),
        onChange: debounce(handleDescriptionChange, 300),
      },
    }),
    createSchemaItem({
      Component: HTinyEditor,
      name: 'content',
      label: t('Content', { vn: 'Nội dung' }),
      rules: [
        {
          required: true,
          message: t('Content is required!', { vn: 'Nội dung là bắt buộc' }),
          whitespace: true,
        },
      ],
      colProps: { span: 24 },
      className: 'mb-24',
    }),
    createSchemaItem({
      Component: HInput,
      label: t('Support button', { vn: 'Support button' }),
      colProps: { span: 12 },
      rowProps: { gutter: { xs: 10, md: 20 } },
      name: 'textSupportButton',
      componentProps: {
        modernLabel: true,
        placeholder: t('Support button', { vn: 'Support button' }),
      },
    }),
    createSchemaItem({
      Component: HInput,
      label: t('URL support button', { vn: 'URL support button' }),
      colProps: { span: 12 },
      name: 'urlSupportButton',
      componentProps: {
        modernLabel: true,
        placeholder: t('Enter URL support button', {
          vn: 'Nhập liên kết support button',
        }),
      },
    }),
    createSchemaItem({
      Component: HUploadImage,
      name: 'image',
      colProps: { span: 4 },
      label: 'Image',
      rules: [
        {
          required: true,
          message: t('Image is required', { vn: 'Ảnh là bắt buộc' }),
        },
      ],
      componentProps: {
        useImageCrop: false,
        onChange: debounce(handleImageChange, 300),
      },
    }),
    createSchemaItem({
      Component: Switch,
      name: 'isOutstanding',
      colProps: { span: 4 },
      label: t('Tin tức nổi bật', { en: 'Featured news' }),
      valuePropName: 'checked',
      initialValue: false,
    }),
    createSchemaItem({
      Component: Switch,
      name: 'isActive',
      colProps: { span: 4 },
      label: t('Trạng thái', { en: 'Status' }),
      valuePropName: 'checked',
      initialValue: true,
    }),
    createSchemaItem({
      Component: HRadioGroup,
      colProps: { span: 8 },
      label: t('Loại', { en: 'Type' }),
      componentProps: {
        optionType: 'button',
        buttonStyle: 'solid',
        options: NEWS_STATUS_OPTIONS,
      },
      initialValue: NEWS_STATUS.NEWS,
      name: 'type',
    }),
  ];
};

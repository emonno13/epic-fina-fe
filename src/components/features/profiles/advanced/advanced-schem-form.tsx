import { useHTranslation } from '@lib/i18n';
import { Divider, Input } from 'antd';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '../../../../schema-form/h-types';
import { HSelect } from '../../../shared/common-form-elements/select';
import { getLabelExpertise } from '../constanst';

export const getUniqueOption = (documents) => {
  return [...new Map(documents.map((item) => [item['id'], item])).values()];
};

export const AdvancedInformationDetailSchemaForm = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const advancedInformation = 'advancedInformation';
  const { initialValues, form } = props;

  return [
    createSchemaItem({
      Component: Divider,
      colProps: { span: 24 },
      componentProps: {
        orientation: 'left',
        plain: true,
        children: t('Quote', { vn: 'Trích dẫn' }),
        className: 'm-b-0 m-t-0',
      },
    }),
    createSchemaItem({
      Component: Input,
      name: [advancedInformation, 'quote'],
      colProps: { xs: 24, sm: 24, md: 24 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: t('Quote', { vn: 'Trích dẫn' }),
      componentProps: {
        maxLength: 70,
        placeholder: t('Quote', { vn: 'Trích dẫn' }),
      },
    }),
    createSchemaItem({
      Component: Input.TextArea,
      name: [advancedInformation, 'quoteDescription'],
      colProps: { span: 24 },
      label: t('Quote description', { vn: 'Mô tả trích dẫn' }),
      componentProps: {
        rows: 3,
        maxLength: 200,
        placeholder: t('Quote description', { vn: 'Mô tả trích dẫn' }),
      },
    }),
    createSchemaItem({
      Component: Divider,
      colProps: { span: 24 },
      componentProps: {
        orientation: 'left',
        plain: true,
        children: t('Identification information', {
          vn: 'Thông tin định danh',
        }),
        className: 'm-b-0 m-t-0',
      },
    }),
    createSchemaItem({
      Component: Input.TextArea,
      name: [advancedInformation, 'about'],
      colProps: { span: 24 },
      label: t('About', { vn: 'Giới thiệu' }),
      componentProps: {
        rows: 6,
        placeholder: t('Enter the about', {
          vn: 'Nhập vào thông tin giới thiệu',
        }),
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('Areas of expertise', { vn: 'Lĩnh vực chuyên môn' }),
      colProps: { xs: 24, sm: 24, md: 24 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      name: [advancedInformation, 'expertise'],
      componentProps: {
        mode: 'tags',
        placeholder: t('Areas of expertise', { vn: 'Lĩnh vực chuyên môn' }),
        options: getLabelExpertise(t),
      },
    }),
    createSchemaItem({
      Component: Divider,
      colProps: { span: 24 },
      componentProps: {
        orientation: 'left',
        plain: true,
        className: 'm-b-0 m-t-0',
        children: t('Market in charge', { vn: 'Thị trường phụ trách' }),
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('Province / City', { vn: 'Quân, Huyên, Tỉnh / Thành Phố' }),
      colProps: { xs: 24, sm: 24, md: 24 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      name: [advancedInformation, 'market'],
      componentProps: {
        hiddenValues: {
          'info.countryCode': 'VN',
          type: { inq: ['state', 'town_district'] },
        },
        withRelations: ['parent'],
        endpoint: 'locations/public/suggestion',
        showSearch: true,
        allowClear: true,
        searchWhenHidenValueChange: true,
        mode: 'multiple',
        placeholder: t('Province / City', {
          vn: 'Quân, Huyên, Tỉnh / Thành Phố',
        }),
        optionsConverter: (document) => {
          document.value = document?.parent
            ? `${document.description}, ${document?.parent?.description || document?.parent?.name}`
            : document.description;
          return document;
        },
        OptionsComponent: (document) => {
          return document?.parent
            ? `${document.description}, ${document?.parent?.description || document?.parent?.name}`
            : document.description;
        },
        onChangeSelected: (document) => {
          const location = [...document];
          const provinceIds = [
            ...new Set(
              location.map((item: any) => item?.id).filter((item) => !item),
            ),
          ];
          const advancedInformation = {
            ...form?.getFieldValue('advancedInformation'),
            provinceIds: [
              ...new Set([...provinceIds, initialValues?.provinceIds]),
            ],
          };
          form?.setFieldsValue({ advancedInformation });
        },
      },
    }),
    createSchemaItem({
      Component: Divider,
      colProps: { span: 24 },
      componentProps: {
        orientation: 'left',
        plain: true,
        children: t('Social network', { vn: 'Mạng xã hội' }),
        className: 'm-b-0 m-t-0',
      },
    }),
    createSchemaItem({
      Component: Input,
      name: [advancedInformation, 'linkFb'],
      colProps: { xs: 24, sm: 24, md: 12 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: t('Facebook'),
      componentProps: {
        placeholder: t('Facebook'),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: [advancedInformation, 'linkZalo'],
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('Zalo'),
      componentProps: {
        placeholder: t('Zalo'),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: [advancedInformation, 'linkLinkedIn'],
      colProps: { xs: 24, sm: 24, md: 12 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: t('LinkedIn'),
      componentProps: {
        placeholder: t('LinkedIn'),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: [advancedInformation, 'linkTwitter'],
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('Twitter'),
      componentProps: {
        placeholder: t('Twitter'),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: [advancedInformation, 'linkTelegram'],
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('Telegram'),
      componentProps: {
        placeholder: t('Telegram username'),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: [advancedInformation, 'provinceIds'],
      colProps: { xs: 24, sm: 24, md: 12 },
      hidden: true,
    }),
    // createSchemaItem({
    // 	Component: Divider,
    // 	colProps: {span: 24},
    // 	componentProps: {
    // 		orientation: 'left',
    // 		plain: true,
    // 		children: t('Settings', {vn: 'Cài đặt'}),
    // 		className: 'm-b-0 m-t-0',
    // 	},
    // }),
    // createSchemaItem({
    // 	Component: HUploadImages,
    // 	name: [advancedInformation, 'coverImage'],
    // 	colProps: {xs: 24, sm: 24, md: 24},
    // 	label: t('Cover Image', {vn: 'Ảnh bìa'}),
    // 	componentProps: {
    // 		style: {width: '100%'},
    // 		multiple: false,
    // 		maxUpload: 1,
    // 		useImageCrop: false,
    // 		onChange: (document) => {
    // 			if (document && document.url) {
    // 				form?.setFieldsValue({'advancedInformation.coverImage': document.url});
    // 			}
    // 		},
    // 	},
    // }),
  ];
};

import {
  HInput,
  HTextArea,
} from '@components/shared/common-form-elements/h-input';
import { HUploadImage } from '@components/shared/common-form-elements/h-upload';
import { HSelect } from '@components/shared/common-form-elements/select';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { useTranslation } from 'react-i18next';
import { getRobotsTypeOptions, RobotsType } from './constants';

export const useSeoDetailSchemaForm = () => {
  const { t } = useTranslation('admin-common');

  return (props: HFormProps): HFormItemProps[] => {
    const { transport } = props;
    const { SEOFieldName } = transport;

    return [
      createSchemaItem({
        Component: HInput,
        name: [SEOFieldName, 'title'],
        colProps: { xs: 24, sm: 24, md: 12, lg: 12 },
        rowProps: { gutter: { xs: 24, md: 16 } },
        label: t('title'),
        componentProps: {
          placeholder: t('seo.enterTheTitle'),
        },
      }),
      createSchemaItem({
        Component: HTextArea,
        name: [SEOFieldName, 'description'],
        colProps: { xs: 24, sm: 24, md: 12, lg: 12 },
        label: t('description'),
        componentProps: {
          placeholder: t('seo.enterTheDescription'),
          rows: 4,
        },
      }),
      createSchemaItem({
        Component: HInput,
        name: [SEOFieldName, 'author'],
        colProps: { xs: 24, sm: 24, md: 12, lg: 12 },
        label: t('author'),
        componentProps: {
          placeholder: t('seo.enterTheAuthor'),
        },
      }),
      createSchemaItem({
        Component: HInput,
        name: [SEOFieldName, 'type'],
        colProps: { xs: 24, sm: 24, md: 12, lg: 12 },
        label: t('type'),
        initialValue: 'article',
        componentProps: {
          placeholder: t('seo.enterTheType'),
        },
      }),
      createSchemaItem({
        Component: HSelect,
        name: [SEOFieldName, 'keywords'],
        colProps: { xs: 24, sm: 24, md: 12, lg: 12 },
        label: t('seo.keywords'),
        componentProps: {
          placeholder: t('seo.enterTheKeywords'),
          mode: 'tags',
          tokenSeparators: [','],
        },
      }),
      createSchemaItem({
        Component: HSelect,
        name: [SEOFieldName, 'robots'],
        colProps: { xs: 24, sm: 24, md: 12, lg: 12 },
        label: t('seo.robots'),
        initialValue: RobotsType.INDEX_FOLLOW,
        componentProps: {
          placeholder: t('seo.enterTheRobots'),
          showSearch: true,
          options: getRobotsTypeOptions(),
        },
      }),
      createSchemaItem({
        Component: HInput,
        name: [SEOFieldName, 'url'],
        colProps: { xs: 24, sm: 24, md: 12, lg: 12 },
        label: t('seo.url'),
        rules: [
          {
            type: 'url',
            message: 'Must be a valid URL',
          },
        ],
        componentProps: {
          placeholder: t('seo.enterTheUrl'),
        },
      }),
      createSchemaItem({
        Component: HUploadImage,
        name: [SEOFieldName, 'image'],
        label: t('seo.image'),
        colProps: { xs: 24, sm: 24, md: 12, lg: 12 },
      }),
    ];
  };
};

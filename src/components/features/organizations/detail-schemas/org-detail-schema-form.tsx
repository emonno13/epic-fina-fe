import { HReactColor } from '@components/shared/common-form-elements/h-color';
import { HUploadImage } from '@components/shared/common-form-elements/h-upload';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Checkbox, Divider, Input } from 'antd';
import { useHTranslation } from '../../../../lib/i18n';
import { ORGANIZATION_TYPES } from '../../../../types/organization';
import {
  createOrganizationSuggestionElement,
  HSelect,
} from '../../../shared/common-form-elements/select';
import {
  emailsDynamicSchemaForm,
  telsDynamicSchemaForm,
} from '../users/detail-schema-form';
import { GroupAddressFormSchema } from '../users/group-address-form-schema';

export const OrgDetailSchemaForm = (props: HFormProps): HFormItemProps[] => {
  const transport = props.transport || {};
  const { isSubOrg } = transport;
  const { hiddenValues = {}, initialValues = {}, form } = props;
  const type = hiddenValues?.type || initialValues.type;

  const isOrganization = type === ORGANIZATION_TYPES.SUB_ORG;
  const schema: any[] = [];
  const { t } = useHTranslation('admin-common');
  if (!isOrganization && !isSubOrg) {
    schema.push(
      createOrganizationSuggestionElement(
        {
          name: 'orgId',
          colProps: { span: 6 },
          label: t('Belong to Organization', { vn: 'Thuộc tổ chức' }),
        },
        { type: ORGANIZATION_TYPES.SUB_ORG },
      ),
    );
  }

  schema.push(
    ...[
      createOrganizationSuggestionElement(
        {
          name: 'parentOrgId',
          colProps: { span: 18 },
          label: t('Parent Organizationa', { vn: 'Tổ chức cấp trên' }),
        },
        { type: hiddenValues.type, toppedOrgId: hiddenValues.parentOrgId },
      ),
      createSchemaItem({
        Component: Input,
        name: 'code',
        isNewRow: true,
        colProps: { span: 6 },
        rowProps: { gutter: { xs: 8, md: 16 } },
        label: t('Organization code', { vn: 'Mã của tổ chức' }),
        rules: [
          {
            required: true,
            message: t('Organization code require', {
              vn: 'Mã tổ chức là bắt buộc',
            }),
          },
        ],
        componentProps: {
          placeholder: t('Enter the Organization code', {
            vn: 'Nhập vào mã của tổ chức',
          }),
          uppercase: true,
          deleteWhiteSpace: true,
        },
      }),
      createSchemaItem({
        Component: Input,
        name: 'name',
        colProps: { span: 6 },
        label: t('Organization name', { vn: 'Tên tổ chức' }),
        rules: [
          {
            required: true,
            message: t('Organization name require', {
              vn: 'Tên tổ chức là bắt buộc',
            }),
          },
        ],
        componentProps: {
          placeholder: t('Enter the Organization name', {
            vn: 'Nhập vào tên tổ chức',
          }),
        },
      }),
      createSchemaItem({
        Component: Input,
        name: 'taxCode',
        colProps: { span: 6 },
        label: t('Tax code', { vn: 'Mã số thuế' }),
        componentProps: {
          placeholder: t('Enter the Tax code', { vn: 'Nhập vào mã số thuế' }),
        },
      }),
      createSchemaItem({
        Component: Input,
        name: 'swiftCode',
        colProps: { span: 6 },
        label: 'Swift code',
        componentProps: {
          placeholder: 'Nhập swift code',
        },
      }),
      createSchemaItem({
        Component: Input,
        name: 'bin',
        colProps: { span: 6 },
        label: 'Mã bin',
        componentProps: {
          placeholder: 'Nhập mã bin',
        },
      }),
      createSchemaItem({
        Component: HUploadImage,
        name: 'avatar',
        rowProps: { gutter: { xs: 8, md: 16 } },
        colProps: { span: 4 },
        label: t('Avatar', { en: 'Avatar', vn: 'Ảnh đại diện' }),
        componentProps: {
          useImageCrop: false,
        },
      }),
      createSchemaItem({
        Component: HUploadImage,
        name: 'image',
        colProps: { span: 4 },
        label: t('Image', { en: 'Image', vn: 'Icon' }),
        componentProps: {
          useImageCrop: false,
        },
      }),
      createSchemaItem({
        Component: HReactColor,
        name: 'backgroundColor',
        colProps: { span: 4 },
        label: t('Background color', { en: 'Background color', vn: 'Màu nền' }),
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
        colProps: { xs: 24, sm: 24, md: 12 },
        rowProps: { gutter: { xs: 24, md: 24 } },
        name: 'market',
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
            form?.setFieldsValue({
              provinceIds: [
                ...new Set([...provinceIds, initialValues?.provinceIds]),
              ],
            });
          },
        },
      }),
      ...telsDynamicSchemaForm(props, false),
      ...emailsDynamicSchemaForm(props, false),
      createSchemaItem({
        Component: Checkbox,
        name: 'isPartner',
        colProps: { span: 2 },
        label: t('Partner', { en: 'Partner', vn: 'Đối tác' }),
        valuePropName: 'checked',
      }),
      ...GroupAddressFormSchema(),

      createSchemaItem({
        Component: Input.TextArea,
        name: 'note',
        colProps: { span: 24 },
        label: t('Note'),
        componentProps: {
          rows: 4,
          placeholder: t('Enter the note', { vn: 'Nhập vào ghi chú' }),
        },
      }),
      createSchemaItem({
        Component: Input.TextArea,
        name: 'description',
        colProps: { span: 24 },
        label: t('Description'),
        componentProps: {
          rows: 4,
          placeholder: t('Enter the description', { vn: 'Nhập vào mô tả' }),
        },
      }),
      createSchemaItem({
        Component: Input,
        name: 'provinceIds',
        colProps: { xs: 24, sm: 24, md: 12 },
        hidden: true,
      }),
    ],
  );

  return schema;
};

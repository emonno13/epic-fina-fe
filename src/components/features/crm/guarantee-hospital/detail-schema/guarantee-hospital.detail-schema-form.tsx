import { HSelect } from '@components/shared/common-form-elements/select';
import { useHTranslation } from '@lib/i18n';
import { useDocumentDetail } from '@schema-form/features/hooks';
import { ORGANIZATION_TYPES, PRODUCT_TYPE } from '@types/organization';
import { useMemo } from 'react';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '../../../../../schema-form/h-types';
import { SCREEN_ADD_GUARANTEE_HOSPITAL } from '../constants';

export const GuaranteeHospitalDetailSchemaForm = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const documentDetail = useDocumentDetail();
  const { transport } = props;
  const {
    setAttacheOrganizationProducts = (value: any) => {},
    setRemovedOrganizationProducts = (value: any) => {},
    type,
  } = transport;

  const currentProducts = useMemo(
    () => documentDetail?.organizationProducts?.map((el) => el?.product) || [],
    [documentDetail.organizationProducts],
  );
  const currentOrganizations = useMemo(
    () =>
      documentDetail?.organizationProducts?.map((el) => el?.organization) || [],
    [documentDetail.organizationProducts],
  );
  const schema: any = [];

  const handleProductsChange = (products) => {
    const attachedOrganizationProducts: any[] = [];
    for (const product of products) {
      const isOrganizationProductExisted = currentProducts.find(
        (el) => el.id === product.id,
      );
      if (!isOrganizationProductExisted) {
        attachedOrganizationProducts.push({
          organizationId: documentDetail.id,
          productId: product.id,
        });
      }
    }
    const productIds = products.map((el: any) => el?.id);
    const uniqProductIds = [...new Set([...productIds])];
    const organizationProductsRemoved = [
      ...currentProducts.filter((el: any) => !uniqProductIds.includes(el?.id)),
    ];
    setRemovedOrganizationProducts(
      organizationProductsRemoved.map((el) => ({
        ...el,
        productId: el.id,
        organizationId: documentDetail.id,
      })),
    );
    setAttacheOrganizationProducts(attachedOrganizationProducts);
  };

  const handleOrganizationsChange = (organizations) => {
    const attachedOrganizationProducts: any[] = [];
    for (const organization of organizations) {
      const isOrganizationProductExisted = currentOrganizations.find(
        (el) => el.id === organization.id,
      );
      if (!isOrganizationProductExisted) {
        attachedOrganizationProducts.push({
          organizationId: organization.id,
          productId: documentDetail.id,
        });
      }
    }
    const organizationIds = organizations.map((el: any) => el?.id);
    const uniqOrganizationIds = [...new Set([...organizationIds])];
    const organizationProductsRemoved = [
      ...currentOrganizations.filter(
        (el: any) => !uniqOrganizationIds.includes(el?.id),
      ),
    ];
    setRemovedOrganizationProducts(
      organizationProductsRemoved.map((el) => ({
        ...el,
        organizationId: el.id,
        productId: documentDetail.id,
      })),
    );
    setAttacheOrganizationProducts(attachedOrganizationProducts);
  };

  if (type === SCREEN_ADD_GUARANTEE_HOSPITAL.ORGANIZATION) {
    schema.push(
      createSchemaItem({
        Component: HSelect,
        name: 'id',
        label: t('Organization'),
        rules: [
          {
            required: true,
            message: t('Organization is required', {
              vn: 'Tổ chức là bắt buộc',
            }),
          },
        ],
        componentProps: {
          disabled: true,
          placeholder: t('Enter organization', { vn: 'Chọn tổ chức' }),
          showSearch: true,
          searchWhenHiddenValueChange: true,
          endpoint: '/organizations/suggestion',
          hiddenValues: {
            status: ORGANIZATION_TYPES.HOSPITAL,
          },
          optionsConverter: (document) => ({
            ...document,
            label: document?.name || '',
          }),
        },
      }),
      createSchemaItem({
        Component: HSelect,
        label: t('Insurance product', { vn: 'Sản phẩm bảo hiểm' }),
        name: 'productIds',
        initialValue: currentProducts?.map((el) => el?.id),
        componentProps: {
          placeholder: t('Enter insurance product', {
            vn: 'Chọn sản phẩm bảo hiểm',
          }),
          showSearch: true,
          mode: 'tags',
          searchWhenHiddenValueChange: true,
          endpoint: '/products/suggestion',
          hiddenValues: {
            type: PRODUCT_TYPE.INSURANCE,
          },
          onChangeSelected: handleProductsChange,
          optionsConverter: (document) => ({
            ...document,
            label: document?.name || '',
          }),
          disabled: type === 'product',
        },
      }),
    );
  }

  if (type === SCREEN_ADD_GUARANTEE_HOSPITAL.PRODUCT) {
    schema.push(
      createSchemaItem({
        Component: HSelect,
        name: 'id',
        label: t('Insurance product', { vn: 'Sản phẩm bảo hiểm' }),
        rules: [
          {
            required: true,
            message: t('Insurance product is required', {
              vn: 'Sản phẩm bảo hiểm là bắt buộc',
            }),
          },
        ],
        componentProps: {
          disabled: true,
          placeholder: t('Enter insurance product', {
            vn: 'Chọn sản phẩm bảo hiểm',
          }),
          showSearch: true,
          searchWhenHiddenValueChange: true,
          endpoint: '/products/suggestion',
          hiddenValues: {
            status: PRODUCT_TYPE.INSURANCE,
          },
          optionsConverter: (document) => ({
            ...document,
            label: document?.name || '',
          }),
        },
      }),
      createSchemaItem({
        Component: HSelect,
        label: t('Organization'),
        name: 'organizationIds',
        initialValue: currentOrganizations?.map((el) => el?.id),
        componentProps: {
          placeholder: t('Enter guarantee documentDetail', {
            vn: 'Chọn bệnh viện bảo lãnh',
          }),
          showSearch: true,
          mode: 'tags',
          searchWhenHiddenValueChange: true,
          endpoint: '/organizations/suggestion',
          hiddenValues: {
            type: ORGANIZATION_TYPES.HOSPITAL,
          },
          onChangeSelected: handleOrganizationsChange,
          optionsConverter: (document) => ({
            ...document,
            label: document?.name || '',
          }),
        },
      }),
    );
  }

  return schema;
};

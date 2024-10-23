import { HSelect } from '@components/shared/common-form-elements/select';
import { SelectUtils } from '@components/shared/common-form-elements/select/Utils';
import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { useCurrentUser } from '@lib/providers/auth';
import { useSearchForm } from '@schema-form/features/hooks';
import { SEARCH_MODES } from '@schema-form/features/search-form/schema';
import { createSchemaItem, HFormItemProps } from '@schema-form/h-types';
import { Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { ORGANIZATION_TYPES, USER_TYPES } from 'types/organization';

export const AdvanceSearch = (props): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const [orgPartner, setOrgPartner] = useState();
  const [orgExecutePartner, setOrgExecutePartner] = useState();
  const currentUser = useCurrentUser();
  const searchForm = useSearchForm();
  const isProfile = props?.isProfile;

  useEffect(() => {
    searchForm?.setFieldsValue({
      executePartnerId: undefined,
      partnerStaffId: undefined,
    });
  }, [orgPartner]);

  useEffect(() => {
    searchForm?.setFieldsValue({
      partnerStaffId: undefined,
    });
  }, [orgExecutePartner]);

  return [
    createSchemaItem({
      Component: HSelect,
      label: t('Product'),
      name: 'productId',
      colProps: { xs: 24, sm: isProfile ? 12 : 24, md: isProfile ? 6 : 24 },
      rowProps: { gutter: { xs: 12, md: 12 } },
      componentProps: {
        modernLabel: true,
        placeholder: '',
        showSearch: true,
        allowClear: true,
        searchWhenHidenValueChange: true,
        endpoint: 'products/suggestion',
        fieldsValues: ['id', 'name', 'slug', 'productDetails'],
        withRelations: [
          {
            relation: 'productDetails',
            scope: {
              fields: {
                id: true,
                name: true,
                slug: true,
                productId: true,
                orgId: true,
              },
              include: [
                {
                  relation: 'org',
                  scope: {
                    fields: { id: true, name: true },
                  },
                },
              ],
            },
          },
        ],
        optionFilterProp: 'children',
        optionsConverter: (document) => {
          document.label = `${document?.name || ''}`;
          return document;
        },
      },
    }),
    SelectUtils.createOrganizationSuggestionElement({
      label: t('Choose the bank'),
      name: 'partnerId',
      colProps: { xs: 24, sm: isProfile ? 12 : 24, md: isProfile ? 6 : 24 },
      componentProps: {
        modernLabel: true,
        placeholder: '',
        mode: 'single',
        endpoint: 'organizations/suggestion',
        hiddenValues: {
          type: ORGANIZATION_TYPES.BANK,
          searchingRule: SEARCH_MODES.MULTIPLE,
          parentOrgId: currentUser?.rootOrgId,
        },
        optionsConverter: (document) => {
          document.label = (
            <Tooltip
              placement="left"
              title={document?.name}
            >{`${document?.name || ''}`}</Tooltip>
          );
          return document;
        },
        searchWhenValueChange: true,
        onChange: setOrgPartner,
      },
    }),
    SelectUtils.createOrganizationSuggestionElement({
      label: t('Execute partner'),
      name: 'executePartnerId',
      colProps: { xs: 24, sm: isProfile ? 12 : 24, md: isProfile ? 6 : 24 },
      // rowProps: {gutter: {xs: 24, md: 24}},
      componentProps: {
        modernLabel: true,
        placeholder: '',
        mode: 'single',
        endpoint: orgPartner ? 'organizations/suggestion' : null,
        hiddenValues: orgPartner
          ? { type: ORGANIZATION_TYPES.BANK, toppedOrgId: orgPartner }
          : {},
        searchWhenHidenValueChange: !!orgPartner,
        optionsConverter: (document) => {
          document.label = `${document?.name || ''}`;
          return document;
        },
        onChange: setOrgExecutePartner,
        disabled: !orgPartner,
      },
    }),
    SelectUtils.createUserSelectionElement({
      label: t('Financial staff'),
      name: 'partnerStaffId',
      colProps: { xs: 24, sm: isProfile ? 12 : 24, md: isProfile ? 6 : 24 },
      // rowProps: {gutter: {xs: 24, md: 24}},
      componentProps: {
        modernLabel: true,
        placeholder: '',
        mode: 'single',
        endpoint: orgExecutePartner ? 'users/suggestion' : null,
        hiddenValues: orgExecutePartner
          ? {
              type: USER_TYPES.teller,
              toppedOrgId: orgExecutePartner,
              searchingRule: SEARCH_MODES.MULTIPLE,
            }
          : {},
        searchWhenHidenValueChange: !!orgExecutePartner,
        optionsConverter: (document) => {
          document.label = ConverterUtils.getFullNameUser(document);
          return document;
        },
        disabled: !orgExecutePartner || !orgPartner,
      },
    }),
  ];
};

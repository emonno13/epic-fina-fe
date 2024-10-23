import { useState } from 'react';

import { HFormProps } from '../../../../../../schema-form/h-types';
import { SelectUtils } from '../../../../../shared/common-form-elements/select/Utils';
import { useSearchForm } from '../../../../../../schema-form/features/hooks';

export const ProductDocumentTemplateSearchFromSchema = (props: HFormProps): any => {
  const [orgId, setOrgId] = useState(props?.initialValues?.orgId);
  const searchForm = useSearchForm();

  return [
    SelectUtils.createOrganizationSuggestionElement({
      label: 'Partner',
      name: 'orgId',
      componentProps: {
        onChangeSelected: (option) => {
          setOrgId(option.id);
        },
      },
    }),
    SelectUtils.createDocumentTemplateSuggestionElement({
      componentProps: {
        hiddenValues: { orgId },
        onChangeSelected: () => {
          searchForm?.submit();
        },
      },
    }),
  ];
};
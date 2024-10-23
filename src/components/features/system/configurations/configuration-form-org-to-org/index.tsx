import { createConfigurationDetailSchema } from '@components/features/system/configurations/detail-schema-form';
import { TableSchema as TableDocumentDetailSchema } from '@components/features/system/configurations/search-result-schema';
import { CONFIGURATION_CODES } from '@components/shared/common/configuration/constant';
import { HFeature, HTable } from '@schema-form/features';
import { HFeatureForm } from '@schema-form/features/forms/h-feature-form';
import { HDocumentModalPanel } from '@schema-form/features/panels';
import { HSearchFormWithCreateButton } from '@schema-form/features/search-form';
import { FormUtils } from '@schema-form/utils/form-utils';
import Form from 'antd/lib/form';
import { useEffect } from 'react';

export const ConfigurationsFormOrgToOrg = ({
  formOrg,
  toOrg,
  featureId = 'configurations-form-org-to-org',
  nodeName = 'configurations',
  documentIdName = 'configurationsFormOrgToOrgId',
  title = 'Create configurations for Organization',
  configurationCode = CONFIGURATION_CODES.PAYMENT_TERM,
}) => {
  const [searchForm] = Form.useForm();
  useEffect(() => {
    searchForm.submit();
  }, [formOrg]);
  const codeOrgBelongto = formOrg?.code
    ? `${configurationCode}_${formOrg?.code}`
    : configurationCode;
  const codeForOrg = toOrg?.code
    ? `${codeOrgBelongto}_${toOrg?.code}`
    : codeOrgBelongto;

  return (
    <>
      <HFeature
        {...{
          featureId,
          nodeName,
          documentIdName,
          searchForm,
          useQueryParams: false,
        }}
      >
        <HSearchFormWithCreateButton
          {...{
            hiddenValues: FormUtils.createSearchHiddenValues({
              orgId: formOrg?.orgId,
              code: { inq: [codeForOrg, codeOrgBelongto] },
            }),
          }}
        />
        <HDocumentModalPanel title={title}>
          <HFeatureForm
            {...{
              schema: createConfigurationDetailSchema(),
              showResetButton: true,
              hideControlButton: true,
              hideSubmitAndContinueButton: true,
              hiddenValues: { code: codeForOrg },
            }}
          />
        </HDocumentModalPanel>
        <HTable schema={TableDocumentDetailSchema} />
      </HFeature>
    </>
  );
};

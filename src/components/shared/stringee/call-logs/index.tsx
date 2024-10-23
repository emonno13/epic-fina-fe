import { CallLogsDetailSchemaForm } from '@components/features/crm/call-logs/detail-schema-form';
import { useSubmitSearchForm } from '@schema-form/features/hooks';
import { useDocumentDetailVisibility } from '@schema-form/features/hooks/document-detail-hooks';
import { useEffect } from 'react';
import { useHTranslation } from '../../../../lib/i18n';
import { HFeature } from '../../../../schema-form/features';
import { HFeatureForm } from '../../../../schema-form/features/forms/h-feature-form';
import { HDocumentModalPanel } from '../../../../schema-form/features/panels';

export const FEATURE_ID_CALL_LOG_POPOVER = 'call-logs-popover';
const CallLogsPopover = () => {
  const { t } = useHTranslation('admin-common');
  if (!global.window) {
    return <></>;
  }
  return (
    <HFeature
      {...{
        documentIdName: 'callLogPopoverId',
        useQueryParams: false,
        featureId: FEATURE_ID_CALL_LOG_POPOVER,
        nodeName: 'call-logs',
      }}
    >
      <HDocumentModalPanel title={'Lịch sử cuộc gọi'}>
        <HFeatureForm
          {...{
            schema: CallLogsDetailSchemaForm,
            hideSubmitAndContinueButton: false,
          }}
        />
      </HDocumentModalPanel>
    </HFeature>
  );
};

export default CallLogsPopover;

export const ListenCallLogPopoverReloadPage = () => {
  const callLogPopoverVisibility = useDocumentDetailVisibility(
    FEATURE_ID_CALL_LOG_POPOVER,
  );
  const searchForm = useSubmitSearchForm();
  useEffect(() => {
    searchForm();
  }, [callLogPopoverVisibility]);
  return <></>;
};

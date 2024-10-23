import React, { useState } from 'react';
import { ExpandableConfig } from 'rc-table/es/interface';
import { useHTranslation } from '../../../../lib/i18n';
import { HFeature, HTable } from '../../../../schema-form/features';
import HSearchForm from '../../../../schema-form/features/search-form';
import { CallLogsTableSchema } from '../call-logs/search-result-table-schema';
import { ListenCallLogPopoverReloadPage } from '../../../shared/stringee/call-logs';
import { CallLogProps, getDefaultExpandableCallLogManagement } from '../call-logs';

// Vi copy nhanh để lên tính năng trong 10' nên đang duplicate code.
const SummaryCallLogsManagement = ({ useQueryParams, documentIdName = 'callLogId' }: CallLogProps) => {
  // if (process.env.NEXT_PUBLIC_USED_FCCS_SDK) return (<CallLogs/>);
  const { t } = useHTranslation('admin-common');
  const defaultExpandable = getDefaultExpandableCallLogManagement(t);
  const [expandable] = useState<ExpandableConfig<any> | undefined>(defaultExpandable);

  return (
    <HFeature
      {...{
        featureId: 'missed-call-logs',
        nodeName: 'call-logs',
      }}>
      <HSearchForm
        withRelations={[
          'user',
          'staff',
          {
            relation: 'callLogs',
            scope: {
              include: [{ relation: 'user' }, { relation: 'staff' }],
            },
          },
          {
            relation: 'queue',
            scope: {
              include: [{ relation: 'greetingFile' }],
            },
          },
        ]}
        hiddenFields={{ status_call_log: 'miss', direction: 'callIn' }}
      />
      <HTable schema={CallLogsTableSchema} expandable={expandable}/>
      <ListenCallLogPopoverReloadPage/>
    </HFeature>
  );
};

export default SummaryCallLogsManagement;

import { TooltipIcon } from '@icons/rsvgs/tooltip-icon';
import { Collapse } from 'antd';
import { useTranslation } from 'next-i18next';
import { HFeature } from '../../../../../../../../schema-form/features';
import HSearchForm from '../../../../../../../../schema-form/features/search-form';
import { LabelItem } from '../../../../../../../shared/common/h-label/h-label-title';
import { StatisticsProgress } from '../../../../deals-component-common/statistics-progress';
import { ProgressViewTable } from './progress-viewer-table';

import '../edit-deal-loan.module.scss';

const { Panel } = Collapse;

export const ProgressView = ({
  objectId,
  objectType,
  isShowProgressView = true,
}) => {
  const { t } = useTranslation('admin-common');
  if (!isShowProgressView) {
    return null;
  }
  return (
    <HFeature
      {...{
        featureId: `deal-progress-${objectId}`,
        nodeName: 'deal-progress',
        documentIdName: 'dealProgressId',
      }}
    >
      <HSearchForm
        {...{
          schema: () => [],
          className: 'display-none',
          isSearchForm: false,
          hiddenFields: { objectId, objectType },
          hiddenValues: {
            filter: {
              order: ['order asc'],
            },
          },
        }}
      />
      <Collapse defaultActiveKey={[]} className={'ui-view-progress'}>
        <Panel
          header={
            <LabelItem
              label={
                <span className="ui-view-progress__label">{t('Task')}</span>
              }
              titleTooltip={t('Task')}
              lastIcon={
                <span>
                  <TooltipIcon />
                </span>
              }
              firstIcon={<></>}
              uppercaseLabel={false}
            />
          }
          key="1"
        >
          <StatisticsProgress />
          <ProgressViewTable />
        </Panel>
      </Collapse>
    </HFeature>
  );
};

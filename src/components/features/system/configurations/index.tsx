import { FC, ReactElement } from 'react';
import { useRouter } from 'next/router';
import { compact } from 'lodash';
import { ConfigurationDetailSchema, ConfigurationQuestionDetailSchema } from './detail-schema-form';
import { TableSchema } from './search-result-schema';
import HSearchForm from '../../../../schema-form/features/search-form';
import { HDocumentDrawerPanel } from '../../../../schema-form/features/panels/drawer';
import { HFeature, HTable } from '../../../../schema-form/features';
import { HFeatureForm } from '../../../../schema-form/features/forms/h-feature-form';

const ConfigurationManagement: FC = (props: any): ReactElement => {
  const isConfig = useComparePathUrl('config-question-groups');

  return (
    <div>
      <HFeature
        {...{
          featureId: 'configuration',
          nodeName: 'configurations',
        }}>
        <HSearchForm {...{
          hiddenValues: {
            filter: {
              where: {
                type: isConfig ? 'question-groups' : undefined,
              },
            },
          },
        }} />
        <HDocumentDrawerPanel>
          <HFeatureForm {...{
            schema: isConfig ? ConfigurationQuestionDetailSchema : ConfigurationDetailSchema ,
            hideSubmitAndContinueButton: true,
          }}/>
        </HDocumentDrawerPanel>
        <HTable schema={TableSchema}/>
      </HFeature>
    </div>
  );
};
export default ConfigurationManagement;

export function useComparePathUrl(url: string) {
  const { asPath } = useRouter();
  const [basePatch] = asPath?.split('?');
  const pathArray = compact(basePatch?.split('/'));
  return pathArray?.includes(url);
}

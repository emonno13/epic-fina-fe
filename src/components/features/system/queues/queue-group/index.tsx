import { QueueGroupTableSchema } from './search-result-table-schema';
import { QueueGroupDetailSchemaForm } from './detail-schema-form';
import { HSearchFormWithCreateButton } from '../../../../../schema-form/features/search-form';
import { HFeature, HTable } from '../../../../../schema-form/features';
import { HDocumentModalPanel } from '../../../../../schema-form/features/panels';
import { HFeatureForm } from '../../../../../schema-form/features/forms/h-feature-form';

const QueueGroupManagement = (props) => {
  const { queueId } = props;

  return (
    <HFeature
      {...{
        featureId: 'queue-group',
        documentIdName: 'queueGroupId',
        documentRelations: ['group'],
      }}>
      <HSearchFormWithCreateButton {...{
        hiddenValues: {
          filter: {
            where: {
              queueId,
            },
          },
        },
        withRelations: ['group'],
      }}/>

      <HDocumentModalPanel>
        <HFeatureForm {...{
          onDataReadyToSubmit: (data) => {
            return {
              ...data,
              queueId,
            };
          },
          schema: QueueGroupDetailSchemaForm,
          hideSubmitAndContinueButton: true,
        }}/>
      </HDocumentModalPanel>

      <HTable schema={QueueGroupTableSchema}/>
    </HFeature>
  );
};

export default QueueGroupManagement;

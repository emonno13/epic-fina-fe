import { HFeature, HTable } from '@schema-form/features';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HFeatureForm } from '../../../schema-form/features/forms/h-feature-form';
import { HDocumentModalPanel } from '../../../schema-form/features/panels';
import { HSearchFormWithCreateButton } from '../../../schema-form/features/search-form';
import { requestStatusModels } from './actions';
import { StatusTemplateDetailSchema } from './detail-schema-form';
import { StatusResultSchema } from './status-result-table-schema';

const StatusTemplate = (props) => {
  const { useQueryParams = true, featureId = 'statuses', models } = props;
  const modelFilters = {
    filter: { where: { model: { inq: models } } },
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestStatusModels(models));
  }, []);

  return (
    <HFeature
      {...{ featureId: featureId, nodeName: 'statuses', useQueryParams }}
    >
      <HSearchFormWithCreateButton
        withRelations={['createdBy', 'parent']}
        hiddenValues={modelFilters}
      />
      <HDocumentModalPanel width={450}>
        <HFeatureForm
          {...{
            schema: StatusTemplateDetailSchema,
            transport: {
              models: models,
            },
          }}
        />
      </HDocumentModalPanel>
      <HTable schema={StatusResultSchema} />
    </HFeature>
  );
};

export default StatusTemplate;

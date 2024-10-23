import { useDocumentDetail } from '@schema-form/features/hooks';
import { HFeature, HTable } from '../../../../../schema-form/features';
import { HFeatureForm } from '../../../../../schema-form/features/forms/h-feature-form';
import { HDocumentModalPanel } from '../../../../../schema-form/features/panels';
import { HSearchFormWithCreateButton } from '../../../../../schema-form/features/search-form';
import { GroupUserDetailSchemaForm } from './detail-schema-form';
import { GroupUserTableSchema } from './search-result-table-schema';

const GroupUserManagement = (props) => {
  const { groupId } = props;
  const groupDocumentDetail = useDocumentDetail();

  return (
    <HFeature
      {...{
        featureId: 'group-user',
        documentIdName: 'groupUserId',
        documentRelations: ['user'],
      }}
    >
      <HSearchFormWithCreateButton
        {...{
          hiddenValues: {
            filter: {
              where: {
                groupId,
              },
            },
          },
          withRelations: [
            {
              relation: 'user',
              scope: {
                include: [{ relation: 'org' }],
              },
            },
          ],
        }}
      />

      <HDocumentModalPanel>
        <HFeatureForm
          {...{
            onDataReadyToSubmit: (data) => {
              return {
                ...data,
                groupId,
              };
            },
            schema: (schemaProps) =>
              GroupUserDetailSchemaForm(schemaProps, groupDocumentDetail),
            hideSubmitAndContinueButton: true,
          }}
        />
      </HDocumentModalPanel>

      <HTable schema={GroupUserTableSchema} />
    </HFeature>
  );
};

export default GroupUserManagement;

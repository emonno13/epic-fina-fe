import { useFeatureId } from '@schema-form/features/hooks';
import { RootStateOrAny, useSelector } from 'react-redux';
import { HTable } from '../../../../../../../../schema-form/features';
import { DetailProgressDealSchema } from './progress.table-schema';

export const ProgressViewTable = () => {
  const featureId: string = useFeatureId();
  const dataSource =
    useSelector((state: RootStateOrAny) => {
      return state?.featureStore[featureId]?.dataSource;
    }) || [];
  return (
    <HTable
      {...{
        showHeader: false,
        pagination: false,
        dataSource: [...(dataSource?.[0]?.items || [])],
        schema: () => DetailProgressDealSchema(dataSource?.[0]),
      }}
    />
  );
};

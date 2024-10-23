import React from 'react';
import { CreateAndEditJob } from './create-and-edit-job';
import { useDocumentDetail } from '../../../../schema-form/features/hooks';

const RecruitJobDetail = React.memo(()=> {
  const document = useDocumentDetail();

  return <CreateAndEditJob {...{ document }}/>;

});
export default RecruitJobDetail;

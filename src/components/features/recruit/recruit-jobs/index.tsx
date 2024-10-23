import React from 'react';
import { RecruitJobSchema } from './recruit-job-schema';
import RecruitJobDetail from './recruit-job-detail';
import { HFeature, HTable } from '../../../../schema-form/features';
import { HSearchFormWithCreateButton } from '../../../../schema-form/features/search-form';

const AdminRecruitJobs: React.FC = () => {

  return (
    <>
      <HFeature {...{
        featureId: 'recruitJob',
        nodeName: 'jobs',
      }}>
        <HSearchFormWithCreateButton />
        <RecruitJobDetail />
        <HTable {...{ schema: RecruitJobSchema }}/>
      </HFeature>
    </>
  );
};
export default AdminRecruitJobs;

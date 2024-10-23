import React from 'react';
import { RecruitCurriculumVitaeSchema } from './recruit-curriculum-vitae-schema';
import { HFeature, HTable } from '../../../../schema-form/features';
import HSearchForm from '../../../../schema-form/features/search-form';

const AdminRecruitCv: React.FC = () => {

  return (
    <HFeature
      {...{
        featureId: 'recruitCv',
        nodeName: 'curriculum-vitaes',
      }}>
      <HSearchForm/>
      <HTable {...{
        schema: RecruitCurriculumVitaeSchema,
      }}/>
    </HFeature>
  );
};
export default AdminRecruitCv;

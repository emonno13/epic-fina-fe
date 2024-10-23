import React from 'react';
import { RecruitContactUsSchema } from './recruit-contact-us-schema';
import { HFeature, HTable } from '../../../../schema-form/features';
import HSearchForm from '../../../../schema-form/features/search-form';

const AdminRecruitContactUs: React.FC = () => {

  return (
    <HFeature
      {...{
        featureId: 'recruitContactUs',
        nodeName: 'contact-us',
      }}>
      <HSearchForm/>
      <HTable {...{
        schema: RecruitContactUsSchema,
      }}/>
    </HFeature>
  );
};
export default AdminRecruitContactUs;

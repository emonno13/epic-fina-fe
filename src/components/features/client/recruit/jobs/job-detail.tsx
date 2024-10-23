import React from 'react';
import JobDetailItem from '../components/jobs/job-detail-item';
import PeopleAlsoView from '../components/jobs/people-also-view';
import SameJob from '../components/jobs/same-job';

import './job-detail.module.scss';

interface Props{
  jobDetail: any
  allJob:  any
}
const JobDetail = React.memo((props: Props)=> {
  const { jobDetail, allJob } = props;
  return (
    <div className="job-detail__container">
      <div className="job-detail__body">
        <JobDetailItem item={jobDetail}/>
        <PeopleAlsoView data={allJob?.data}/>
      </div>
      <SameJob data={allJob?.data} />

    </div>

  );
});
export default JobDetail;

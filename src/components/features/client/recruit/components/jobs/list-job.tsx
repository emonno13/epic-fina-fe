import React from 'react';
import { Col, Row } from 'antd';
import JobItem from './job-item';
interface Props{
  view: 'grid' | 'list'
  jobs: any[]
}
const ListJob = React.memo((props: Props)=> {
  const { view, jobs = [] } = props;
  return (
    <>
      {view === 'grid' ?
        <Row gutter={[16, 16]}>
          {jobs.map((item, index) => (
            <Col key={`${index}-${item?.id}`} {...{ xs: 24, sm: 24, md: 8 }}>
              <JobItem item={item} view={'grid'}/>
            </Col>
          ))}
        </Row>
        :
        <>
          {jobs.map((item, index) => (
            <JobItem item={item} view={'list'} key={`${index}-${item?.id}`}/>
          ))}
        </>}
    </>
  );
});

export default ListJob;

import React from 'react';
import JobItem from './job-item';

interface Props{
  data: any[]
}
const PeopleAlsoView = React.memo(({ data = [] }: Props)=>{
  return (
    <div style={container}>
      <p style={title}>Mọi người cũng xem</p>
      {
        data?.map((item, index) => {
          return	(
            <div style={{ marginBottom:'10px' }} key={index.toString()}>
              <JobItem view="grid" item={item}/>
            </div>
          );
        })
      }
    </div>
  );
});
export default PeopleAlsoView;

const container = {
  background: '#FFFFFF',
  width: '35%',
  padding: '40px 30px',
};

const title = {
  fontFamily: 'SFPD-SemiBold',
  fontWeight: 600,
  fontSize: '18px',
};

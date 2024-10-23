import React from 'react';
import { Col, Row } from 'antd';
import JobItem from './job-item';
import { useHTranslation } from '../../../../../../lib/i18n';
interface SameJobProps {
  data: any[]
}
const SameJob = React.memo(({ data = [] }: SameJobProps)=> {
  const { t } = useHTranslation('recruit');
  return (
    <div style={{ background: '#FFFFFF', padding:'65px 100px' }}>
      <p style={{ fontFamily: 'SFPD-SemiBold', fontSize: '18px' }}>
        {t('same-job',{ en:'Same jobs', vn: 'Công việc tương tự' })}
      </p>
      <Row gutter={[16, 16]}>
        {
          data?.map((item, index) => {
            return	(
              <Col key={`${index}-${item?.id}`} {...{ xs: 24, sm: 24, md: 8 }}>
                <JobItem view="grid" item={item}/>
              </Col>
            );
          })
        }
      </Row>
    </div>
  );

});

export default SameJob;

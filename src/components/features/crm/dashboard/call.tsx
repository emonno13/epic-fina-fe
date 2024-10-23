import { setReportCallIn } from '@components/shared/stringee/actions';
import getReport from '@components/shared/stringee/utils/report';
import { Card, Col, Row, Typography } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const { Title } = Typography;

const Page = () => {
  const dispatch = useDispatch();
  const { reportCallIn } = useSelector((state: any) => state?.stringee);
  useEffect(() => {
    getReport.getReportCallIn().then((res) => {
      dispatch(setReportCallIn(res));
    });
  }, []);
  return (
    <div>
      <Row>
        <Col span={6}>
          <Card title="Tổng cuộc gọi">
            <Title level={2}> {reportCallIn?.all?.total_call}</Title>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Trung bình cuộc gọi">
            <Title level={2}> {reportCallIn?.all?.average_duration}</Title>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Tổng thời gian">
            <Title level={2}> {reportCallIn?.all?.total_duration}</Title>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Tổng cuộc gọi đợi">
            <Title level={2}> {reportCallIn?.all?.total_queue_call}</Title>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <Card title="Tổng thời gian đợi">
            <Title level={2}> {reportCallIn?.all?.total_queue_duration}</Title>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Trung bình hàng đợi">
            <Title level={2}>{reportCallIn?.all?.average_queue_duration}</Title>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Tổng thời gian gọi">
            <Title level={2}> {reportCallIn?.all?.total_answer_call}</Title>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Tổng thời gian trả lời">
            <Title level={2}> {reportCallIn?.all?.total_answer_duration}</Title>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default Page;

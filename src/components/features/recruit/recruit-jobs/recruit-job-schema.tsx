import { Col, Row } from 'antd';
import moment from 'moment';
import { getLabel } from './constant';
import { TableUtils } from '../../../../lib/table-utils';
import { useHTranslation } from '../../../../lib/i18n';
import { ItemViewer } from '../../../shared/common/configuration/item-viewer';

export const RecruitJobSchema = (props) => {
  const { t } = useHTranslation('recruit');

  return ([
    TableUtils.createTableColumnConfig({
      title: t('jobs.jobInformation'),
      dataIndex: 'dealDetail',
      sortable: true,
      key: 'jobInformation',

      render: (_, transactionDetail) => {
        return (
          <>
            <Row>
              <Col span={12}>
                <ItemViewer {...{
                  label: t('jobs.jobTitle'),
                  value: transactionDetail?.jobTitle || '',
                  labelClassName: 'm-b-10',
                }}/>
              </Col>
              <Col span={12}>
                <ItemViewer {...{
                  label: t('jobs.workplace'),
                  value: transactionDetail?.workplace || '',
                  labelClassName: 'm-b-10',
                }}/>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <ItemViewer {...{
                  label: t('jobs.formality'),
                  value: transactionDetail?.formality || '',
                  labelClassName: 'm-b-10',
                }}/>
              </Col>
              <Col span={12}>
                <ItemViewer {...{
                  label: t('jobs.experience'),
                  value: transactionDetail?.experience || '',
                  labelClassName: 'm-b-10',
                }}/>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <ItemViewer {...{
                  label: t('jobs.careerLevel'),
                  value: transactionDetail?.careerLevel || '',
                  labelClassName: 'm-b-10',
                }}/>
              </Col>
              <Col span={12}>

                <ItemViewer {...{
                  label: t('jobs.salary'),
                  value: transactionDetail?.salary || '',
                  labelClassName: 'm-b-10',
                }}/>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <ItemViewer {...{
                  label: t('jobs.career'),
                  value: transactionDetail?.career || '',
                  labelClassName: 'm-b-10',
                }}/>
              </Col>
              <Col span={12}>
                <ItemViewer {...{
                  label: t('jobs.applicationDeadline'),
                  value:moment(transactionDetail?.applicationDeadline).format('DD/MM/YYYY') ?? '',
                  labelClassName: 'm-b-10',
                }}/>
              </Col>

            </Row>
            {
              transactionDetail?.welfare && transactionDetail.welfare.length > 0 &&
							<ItemViewer {...{
							  label: t('jobs.welfare'),
							  value: getLabel(transactionDetail?.welfare),
							  labelClassName: 'm-b-10',
							}}/>
            }
          </>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('contact.createdAt'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, transactionDetail) => {
        return (
          <ItemViewer {...{
            label: '',
            value:moment(transactionDetail?.createdAt).format('DD/MM/YYYY') ?? '',
            labelClassName: 'm-b-10',
          }}/>
        );
      },
    }),

    TableUtils.createEditAndDeleteControlColumn('Action',undefined,'Bạn có chắc muốn xóa công việc này?'),
  ]);
};

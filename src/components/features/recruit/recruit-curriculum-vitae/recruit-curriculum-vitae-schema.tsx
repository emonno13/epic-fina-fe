import { Col, Row } from 'antd';
import moment from 'moment';
import { TableUtils } from '../../../../lib/table-utils';
import { useHTranslation } from '../../../../lib/i18n';
import { ItemViewer } from '../../../shared/common/configuration/item-viewer';
import { endpoints } from '../../../../lib/networks/endpoints';

export const RecruitCurriculumVitaeSchema = (props) => {
  const { t } = useHTranslation('recruit');
  const downloadFile = async (fileName)=> {
    window.open(`${endpoints.endpointWithApiDomain(`/files/${fileName}`)}`, '_blank');
  };
	
  return ([
    TableUtils.createTableColumnConfig({
      title: t('jobs.cvList'),
      dataIndex: 'curriculum-vitaes',
      key: 'curriculum-vitaes',
      render: (_, transactionDetail) => {
        return (
          <>
            <Row>
              <Col span={12}>
                <ItemViewer {...{
                  label: t('jobs.fullName'),
                  value: transactionDetail?.fullName || '',
                  labelClassName: 'm-b-10',
                }}/>
              </Col>
              <Col span={12}>
                <ItemViewer {...{
                  label: t('jobs.email'),
                  value: transactionDetail?.email || '',
                  labelClassName: 'm-b-10',
                }}/>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <ItemViewer {...{
                  label: t('jobs.phone'),
                  value: transactionDetail?.phone || '',
                  labelClassName: 'm-b-10',
                }}/>
              </Col>
              <Col span={12}>
                <div onClick={()=> downloadFile(transactionDetail?.cv?.name)}>
                  <ItemViewer {...{
                    label: t('jobs.cv'),
                    value: transactionDetail?.cv?.name || '',
                    labelClassName: 'm-b-10',
                  }}/>
                </div>
              </Col>
            </Row>
            {!!transactionDetail?.coverLetter &&
						<ItemViewer {...{
						  label: t('jobs.coverLetter'),
						  value:(transactionDetail?.coverLetter) ?? '',
						  labelClassName: 'm-b-10',
						}}/>}
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
    TableUtils.createEditAndDeleteControlColumn('Action',undefined,'Bạn có chắc muốn xóa hồ sơ này?'),

  ]);
};

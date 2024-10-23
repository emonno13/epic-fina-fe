import { Collapse } from 'antd';
import { ArrowDownIconSvg } from 'icons';
// import { MAPPING_REPORT_FUND } from './constans';

import './client-fund-certificate-detail.module.scss';

const { Panel } = Collapse;

const ClientFundReportDetail = (props) => {
  const { bondDetail = {} } = props;

  console.log('bondDetail', bondDetail);
  

  return (
    <div className="bond-detail--company report-fund">
      <Collapse
        expandIcon={() => <ArrowDownIconSvg />}
        expandIconPosition="right"
      >
        <Panel header={'Báo cáo Quỹ'} key="1">
          <div className="report-fund__list">
            {/* {MAPPING_REPORT_FUND[bondDetail?.code]?.map((item: any, index) => {
              return (
                <a
                  key={index}
                  className={'report-fund__list__item'}
                  href={item?.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item?.name}
                </a>
              );
            })} */}

            {bondDetail?.linksReport?.map((item: any, index: number) => {
              return (
                <a
                  key={index}
                  className={'report-fund__list__item'}
                  href={item?.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item?.name}
                </a>
              );
            })}
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default ClientFundReportDetail;

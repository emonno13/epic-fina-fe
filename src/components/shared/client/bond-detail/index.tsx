import { Col, Divider, Row } from 'antd';
import ClientBondDetailItem from './bond-detail-main/bond-detail-main.info';
import ClientBondDetailCompanyItem from './bond-detail-main/bond-detail-main.info-company';
import ClientBondDetailTimeLineItem from './bond-detail-main/bond-detail-main.time-line';
import ClientRequestCounselling, { TYPE_REQUEST_COUNSELLING } from './bond-detail-main/bond-detail-main.request';
import { RelatedBonds } from '../bond-list/related-bonds';

import './bond-detail.module.scss';

const ClientBondDetail = (props) => {
  const { bondDetail } = props;
  const { org = {} } = bondDetail;
  const { backgroundColor = '#009688', name = '', image } = org;

  return (
    <Row gutter={[16, 16]} className={'bond-detail--main'}>
      <Col xs={24} md={15} className={'bond-detail--main--item'}>
        <div className={'bond-detail--main--left'}>
          <div
            className="bond-detail--main--left__header"
            style={{ backgroundColor }}
          >
            <img src={image?.url || undefined} alt={name}/>
            <div className="bond-detail--main--left__header__see-more">
              <span>{name}</span>
            </div>
          </div>

          <div className={'bond-detail--main--left__content'}>
            <ClientBondDetailItem bondDetail={bondDetail}/>
            <Divider className={'bond-detail--main--left__content--divider'} />
            <ClientBondDetailTimeLineItem bondDetail={bondDetail}/>
            <Divider className={'bond-detail--main--left__content--divider'} />
            <ClientBondDetailCompanyItem bondDetail={bondDetail}/>
          </div>
        </div>
        <RelatedBonds bond={bondDetail} />
      </Col>

      <Col xs={24} md={9} className={'bond-detail--main--item'}>
        <ClientRequestCounselling type={TYPE_REQUEST_COUNSELLING.BOND} data={bondDetail}/>
      </Col>
    </Row>

  );
};

export default ClientBondDetail;

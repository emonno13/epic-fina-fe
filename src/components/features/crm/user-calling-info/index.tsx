import { HFeatureForm } from '@schema-form/features/forms/h-feature-form';
import { HDocumentDrawerPanel } from '@schema-form/features/panels';
import { Card, Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { ConverterUtils } from '../../../../lib/converter';
import { endpoints } from '../../../../lib/networks/endpoints';
import { HFeature, HTable } from '../../../../schema-form/features';
import HSearchForm, {
  HSearchFormWithCreateButton,
} from '../../../../schema-form/features/search-form';
import { DisplayableItem } from '../../../shared/common-form-elements/displayable-item';
import { switchViewMode } from '../../../shared/stringee/actions';
import { DEAL_DOCUMENT_ID_NAME } from '../../fina/deals/loans';
import { DealsTableSchema } from '../../fina/deals/loans/deals.table-schema';
import { CallLogsDetailSchemaForm } from '../call-logs/detail-schema-form';
import { CallLogsTableSchema } from '../call-logs/search-result-table-schema';
import SurveyLogTab from './survey-log-tab';
import SurveyTab from './survey-tab';

import './user-calliing-info.module.scss';

const tabList = [
  {
    tab: 'Thông tin khách hàng',
    key: 'userDetail',
  },
  {
    tab: 'Lịch sử cuộc gọi',
    key: 'callLog',
  },
  {
    tab: 'Lịch sử khảo sát',
    key: 'surveyLog',
  },
  {
    tab: 'Khảo sát',
    key: 'survey',
  },
  // {
  // 	tab: 'Another history',
  // 	key: 'history',
  // },
  // {
  // 	tab: 'TTTV',
  // 	key: 'tttv',
  // },
  // {
  // 	tab: 'HSV',
  // 	key: 'hsv',
  // },
];

const UserInfo = ({ user }) => {
  const emailList = user?.emails?.map((item) => item.email);
  const telList = user?.tels?.map((item) => item.tel);
  return (
    <>
      <div className={'displayable-wrapper'} style={{ display: 'flex' }}>
        <DisplayableItem
          label={'Họ và tên'}
          value={ConverterUtils.getFullNameUser(user)}
        />
        <DisplayableItem label={'Email'} value={emailList?.join(', ')} />
        <DisplayableItem label={'Tels'} value={telList?.join(', ')} />
      </div>
      <HFeature
        {...{
          featureId: 'deals',
          nodeName: 'deals',
          documentIdName: DEAL_DOCUMENT_ID_NAME,
          documentRelations: ['product'],
        }}
      >
        <HSearchForm
          endpoint={endpoints.endpointWithApiDomain('/deals')}
          withRelations={['product', 'category']}
          layout="horizontal"
          className="deals-custom hidden"
          hiddenFields={{ userId: user?.id }}
          hideControlButton={true}
        />
        <HTable
          scroll={{ y: 200 }}
          size={'small'}
          pagination={{ position: [] }}
          schema={() => DealsTableSchema({ showShort: true })}
        />
      </HFeature>
    </>
  );
};

const CallLog = ({ user }) => {
  return (
    <HFeature
      {...{
        featureId: 'stringee-logs',
        nodeName: 'stringee-logs',
        documentIdName: 'callLogId',
      }}
    >
      <HSearchFormWithCreateButton
        withRelations={['staff']}
        hiddenFields={{ userId: user?.id }}
        className="deals-custom hidden"
        hideControlButton={true}
      />

      <HDocumentDrawerPanel>
        <HFeatureForm
          {...{
            schema: CallLogsDetailSchemaForm,
            hideSubmitAndContinueButton: true,
          }}
        />
      </HDocumentDrawerPanel>

      <HTable
        scroll={{ y: 200 }}
        size={'small'}
        pagination={{ position: [] }}
        schema={CallLogsTableSchema({ showShort: true })}
      />
    </HFeature>
  );
};
const loadTTTVByPhoneNumber = (phoneNumber: string) => {
  const token = process.env.NEXT_PUBLIC_FINA_CMS_USER_TOKEN ?? '';
  return new Promise((resolve) => {
    if (!phoneNumber) {
      resolve(undefined);
    }

    const headers = {
      'Content-Type': 'application/json',
      authorization: token,
    };
    fetch(`https://cms.fina.com.vn/api/receiveNews?phone=${phoneNumber}`, {
      headers,
    })
      .then((response) => response.json())
      .then((response) => resolve(response));
  });
};

const loadHSVByPhoneNumber = (phoneNumber: string) => {
  const token = process.env.NEXT_PUBLIC_FINA_CMS_USER_TOKEN ?? '';
  return new Promise((resolve) => {
    if (!phoneNumber) {
      resolve(undefined);
    }

    const headers = {
      'Content-Type': 'application/json',
      authorization: token,
    };
    fetch(`https://cms.fina.com.vn/api/loanProfile?query=${phoneNumber}`, {
      headers,
    })
      .then((response) => response.json())
      .then((response) => resolve(response));
  });
};

const showNoteContent = (note: any) => {
  if (!note.content) return '';

  const createBy = note.createdBy
    ? ConverterUtils.getFullNameUser(note.createdBy)
    : 'KH';
  return createBy + ': ' + note.content;
};

const TTTV = ({ user }) => {
  const [tttv, setTTTV] = useState([] as any);
  const phoneNumber = user?.tel;
  let res: any = null;
  useEffect(() => {
    loadTTTVByPhoneNumber(phoneNumber).then((response: any) => {
      res = response?.items ?? [];
      setTTTV(res);
    });
  }, []);

  return (
    <div>
      <Row>
        <Col span={6}>{'Thông tin khách hàng'}</Col>
        <Col span={6}>{'Trạng thái'}</Col>
        <Col span={6}>{'Ngày ghi nhận'}</Col>
        <Col span={6}>{'Ghi chú'}</Col>
      </Row>
      {tttv.map((i, index) => {
        return (
          <Row key={`${i.id}.${index}`}>
            <Col span={6}>{i.customerName}</Col>
            <Col span={6}>{i.status}</Col>
            <Col span={6}>{i.sentDate}</Col>
            <Col span={6}>
              {i.note?.map((n: any, nindex: number) => (
                <Row key={nindex}>{showNoteContent(n)}</Row>
              ))}
            </Col>
          </Row>
        );
      })}
    </div>
  );
};

export const HSV = ({ user }) => {
  const [hsv, setHSV] = useState([] as any);
  const phoneNumber = user?.tel;
  let res: any = null;
  useEffect(() => {
    loadHSVByPhoneNumber(phoneNumber).then((response: any) => {
      res = response?.items ?? [];
      setHSV(res);
    });
  }, []);

  return (
    <div>
      <Row>
        <Col span={3}>{'Mã HSV'}</Col>
        <Col span={9}>{'Thông tin sản phẩm vay'}</Col>
        <Col span={3}>{'Trạng thái'}</Col>
        <Col span={9}>{'Tư vấn viên'}</Col>
      </Row>
      {hsv.map((i, index) => {
        return (
          <Row key={`${i.id}.${index}`}>
            <Col span={3}>{i.code}</Col>
            <Col span={9}>{i.loan?.name}</Col>
            <Col span={3}>{i.status}</Col>
            <Col span={9}>{ConverterUtils.getFullNameUser(i.counselor)}</Col>
          </Row>
        );
      })}
    </div>
  );
};

export const UserCallingDetail = () => {
  const [tab, setTab] = useState('userDetail');
  const stringee = useSelector((state: RootStateOrAny) => state.stringee);
  const { namespace = '', isShortViewMode } = stringee;
  const callDetail = stringee[namespace] || {};

  const dispatch = useDispatch();
  const switchCallViewMode = () => {
    setTab('userDetail');
    dispatch(switchViewMode());
  };

  const contentList = {
    userDetail: <UserInfo user={callDetail?.userInfo} />,
    callLog: <CallLog user={callDetail?.userInfo} />,
    history: <p>history</p>,
    tttv: <TTTV user={callDetail?.userInfo} />,
    hsv: <HSV user={callDetail?.userInfo} />,
    survey: <SurveyTab user={callDetail?.userInfo} />,
    surveyLog: <SurveyLogTab user={callDetail?.userInfo} />,
  };

  if (!callDetail?.isCalling || stringee?.isShortViewMode) {
    return null;
  }
  return (
    <div className="ui-user-calling-detail">
      <Card
        className="ui-card-user-calling-detail"
        style={{ width: '100%' }}
        title={
          <div>
            {`[${namespace} - ${callDetail?.callState?.reason || ''}] ${ConverterUtils.getFullNameUser(callDetail?.userInfo)}`}
          </div>
        }
        extra={
          <a href="#" onClick={switchCallViewMode}>
            Close
          </a>
        }
        tabList={tabList}
        onTabChange={setTab}
      >
        {contentList[tab]}
      </Card>
    </div>
  );
};

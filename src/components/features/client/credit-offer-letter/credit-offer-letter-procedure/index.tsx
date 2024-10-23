import { useClientDocumentDetail } from '@schema-form/client-features/hooks/client-feature-hook';
import { Timeline } from 'antd';
import cls from 'classnames';
import RenderHtml from '../../recruit/components/jobs/render-html';
import CreditOfferLetterBodyContainer from '../credit-offer-letter-body-container';
import CreditOfferLetterContainer from '../credit-offer-letter-container';
import {
  getCreditOfferLetterProcedureGenerateArray,
  WORKING_PROCESS,
} from './constants';

import './credit-offer-letter-procedure.module.scss';

export type CreditOfferLetterProcedureItemProps = {
  step: number | string;
  bodyText?: string;
  textList?: string[];
  beginningText?: string;
  endText?: string;
  beginningBackground?: string;
  endBackground?: string;
};

const CreditOfferLetterProcedureItemTitle = ({
  background = '',
  text = '',
  isEnd = false,
}) => {
  return (
    <div
      {...{
        style: {
          background,
        },
        className: cls('credit-offer-letter-procedure-item-title', {
          'credit-offer-letter-procedure-item-title-end': isEnd,
        }),
      }}
    >
      {text}
    </div>
  );
};

const CreditOfferLetterProcedureItem = (
  props: CreditOfferLetterProcedureItemProps,
) => {
  const {
    step,
    bodyText,
    textList = [],
    beginningText,
    endText,
    beginningBackground,
    endBackground,
  } = props;

  return (
    <div className="credit-offer-letter-procedure-item">
      {beginningText && (
        <CreditOfferLetterProcedureItemTitle
          {...{
            text: beginningText,
            background: beginningBackground,
          }}
        />
      )}
      <div className="credit-offer-letter-procedure-item-step">
        <p>{step}</p>
      </div>
      <div className="credit-offer-letter-procedure-item-content">
        {bodyText && <p>{bodyText}</p>}
        {textList.length > 0 && (
          <ul>
            {textList.map((text, index) => (
              <li key={`credit-offer-letter-text-list-${index}`}>{text}</li>
            ))}
          </ul>
        )}
      </div>
      {endText && (
        <CreditOfferLetterProcedureItemTitle
          {...{
            text: endText,
            background: endBackground,
            isEnd: true,
          }}
        />
      )}
    </div>
  );
};

const CreditOfferLetterProcedure = () => {
  const generateArray = getCreditOfferLetterProcedureGenerateArray();
  const taskData = useClientDocumentDetail();

  const WorkingProcessItem = ({ item }) => {
    return (
      <div className="working-process-item">
        <span className="icon">{item?.icon}</span>
        <div className="content">
          <h3 className="title">{item?.title}</h3>
          <p className="description">{item?.content}</p>
        </div>
      </div>
    );
  };

  return (
    <div id="flow" className="credit-offer-letter-flow">
      <CreditOfferLetterContainer className="small">
        <CreditOfferLetterBodyContainer
          {...{
            title: 'Đề xuất và quy trình:',
            className: 'credit-offer-letter-procedure-header',
          }}
        >
          <div className="credit-offer-letter-procedure-header__preface">
            <RenderHtml
              className="credit-offer-letter-procedure-header__preface__content"
              label=""
              html={taskData?.contentLetter?.proposalAndProcess}
            />
            <p>
              Tuy nhiên để đảm bảo khả năng thành công cao và tránh các sự cố
              không mong muốn trước khi khoản vay của quý khách được giải ngân.
              Chúng tôi đề nghị quý khách làm việc thêm cùng lúc với 1 một số
              ngân hàng khác.
            </p>
            <p>
              Yêu cầu của quý khách sẽ được chuyển đến các ngân hàng trong hệ
              thống và quý khách có thể nhận được thông báo tiếp nhận hồ sơ qua
              hệ thống của chúng tôi.
            </p>
          </div>
          <p className="credit-offer-letter-procedure-header__label">
            Quy trình làm việc:
          </p>

          <div className="working-process">
            <div className="working-process-header">
              <img src={'/assets/images/logo-working-process.png'} />
              <p className="content">Quy trình</p>
              <h3 className="title">Tư vấn hồ sơ vay</h3>
            </div>

            <Timeline>
              {WORKING_PROCESS.map((item) => (
                <Timeline.Item key={item.title}>
                  <WorkingProcessItem item={item} />
                </Timeline.Item>
              ))}
            </Timeline>
          </div>
        </CreditOfferLetterBodyContainer>
      </CreditOfferLetterContainer>
    </div>
  );
};

export default CreditOfferLetterProcedure;

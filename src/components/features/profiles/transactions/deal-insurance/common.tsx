import { AlignLeftOutlined, QuestionCircleTwoTone } from '@ant-design/icons';
import { DEAL_INSURANCE_STATUSES } from '@components/features/cms/register-insurance/constants';
import { Tag, Tooltip } from 'antd';

export const RenderSubStatus = (status, t) => {
  let color;

  switch (status) {
    case DEAL_INSURANCE_STATUSES.PENDING:
      color = 'blue';
      break;

    case DEAL_INSURANCE_STATUSES.WAIT_PROCESSING:
      color = 'cyan';
      break;

    case DEAL_INSURANCE_STATUSES.CANCELLED:
      color = 'red';
      break;

    case DEAL_INSURANCE_STATUSES.LEND_APPROVAL:
      color = 'geekblue';
      break;

    default:
      color = 'orange';
  }
  return (
    <>
      <Tag color={color}>{t(status)}</Tag>
    </>
  );
};

interface Props {
  value?: string;
  label?: string;
  classNameLabel?: string;
  classNameValue?: string;
}

export const RenderInsuranceComponent = ({
  value,
  label,
  classNameLabel,
  classNameValue,
}: Props) => {
  return (
    <div className="component-render-insurance">
      <h1 className={` ${classNameLabel} component-render-insurance-label`}>
        {label || '__'}
      </h1>
      <p className={`${classNameValue} component-render-insurance-value`}>
        {value || '__'}
      </p>
    </div>
  );
};

export const RenderTitleComponent = ({ title }) => {
  return (
    <div className="information-title">
      <div className="mr-10">
        <AlignLeftOutlined />
      </div>
      <div className="mr-10">{title}</div>
      <Tooltip placement="topLeft" title={title}>
        <QuestionCircleTwoTone />
      </Tooltip>
    </div>
  );
};

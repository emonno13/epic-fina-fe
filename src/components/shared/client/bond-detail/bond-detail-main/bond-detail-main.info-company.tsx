import { MAPPING_INFO_FUND } from '@components/features/client/fund-certificate/detail/constans';
import { ArrowDownIconSvg } from '@icons';
import { useHTranslation } from '@lib/i18n';
import { Collapse, Typography } from 'antd';

const { Panel } = Collapse;

import './bond-detal-main.company.module.scss';

const ClientBondDetailCompanyItem = (props) => {
  const { t } = useHTranslation('common');
  const { bondDetail = {} } = props;
  const { description } = bondDetail;

  return (
    <div className="bond-detail--company">
      <Collapse
        expandIcon={() => <ArrowDownIconSvg />}
        expandIconPosition="right"
      >
        <Panel
          header={
            <span>{t('Business information', { vn: 'Thông tin quỹ' })}</span>
          }
          key="1"
        >
          <Typography.Paragraph>
            {MAPPING_INFO_FUND[bondDetail?.info?.typeOfFund]}
          </Typography.Paragraph>
          <Typography.Paragraph>{description}</Typography.Paragraph>
        </Panel>
      </Collapse>
    </div>
  );
};

export default ClientBondDetailCompanyItem;

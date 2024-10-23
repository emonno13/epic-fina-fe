import { ConverterUtils } from '@lib/converter';
import { useClientDocumentDetail } from '@schema-form/client-features/hooks/client-feature-hook';
import { useMemo } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import CreditOfferLetterBodyContainer from '../credit-offer-letter-body-container';

import './credit-offer-letter-teams.module.scss';

const CreditOfferLetterTeamItem = ({ teamData }) => {
  const { avatar, advancedInformation, emails, tels } = teamData;
  const { zalo } = advancedInformation || {};
  const email = useMemo(() => emails?.[0]?.email, [emails]);
  const tel = useMemo(() => tels?.[0]?.tel, [tels]);

  return (
    <div className="credit-offer-letter-team-item">
      <img
        src={avatar?.url || '/assets/images/default_expert_image.png'}
        width="160"
        height="184"
      />
      <p className="credit-offer-letter-team-item-name">
        {ConverterUtils.getFullNameUser(teamData)}
      </p>
      <p className="credit-offer-letter-team-item-position">
        Chuyên viên tư vấn
      </p>
      <div className="credit-offer-letter-team-item-socials">
        {zalo && (
          <a href={zalo} target="_blank" rel="noopener noreferrer">
            <img src="/assets/images/zalo-logo.jpeg" />
          </a>
        )}
        {tel && (
          <a href={`tel:${tel}`}>
            <img src="/assets/images/phone-icon.svg" />
          </a>
        )}
        {email && (
          <a href={`mailto:${email}`}>
            <img src="/assets/images/email-icon.svg" />
          </a>
        )}
      </div>
    </div>
  );
};

const CreditOfferLetterTeams = () => {
  const taskData = useClientDocumentDetail();

  const teams = useMemo(() => [taskData?.assignee || {}], [taskData]);

  return (
    <CreditOfferLetterBodyContainer title="Đội ngũ của chúng tôi">
      <Scrollbars
        {...{
          autoHeight: true,
          autoHeightMax: 500,
        }}
      >
        <div className="credit-offer-letter-teams">
          {teams.map((team, index) => (
            <CreditOfferLetterTeamItem
              key={`credit-offering-letter-team-item-${index}`}
              teamData={team}
            />
          ))}
        </div>
      </Scrollbars>
    </CreditOfferLetterBodyContainer>
  );
};

export default CreditOfferLetterTeams;

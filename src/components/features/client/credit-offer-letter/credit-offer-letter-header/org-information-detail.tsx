import { endpoints } from '@lib/networks/endpoints';
import { FormUtils } from '@schema-form/utils/form-utils';
import { useEffect, useState } from 'react';
import { ORIGIN_ORG_CODE } from './constants';

const OrgInformationDetail = (props: { orgCode?: string }) => {
  const { orgCode } = props;
  const [org, setOrg] = useState<any>();
  useEffect(() => {
    FormUtils.submitForm(
      {},
      {
        endpoint: endpoints.generateNodeEndpoint(
          'organizations/public/suggestion',
        ),
        hiddenValues: {
          filter: {
            where: {
              code: orgCode || ORIGIN_ORG_CODE,
            },
          },
        },
        onGotSuccess: (orgs) => setOrg(orgs.length && orgs[0]),
      },
    );
  }, []);

  return (
    <div className="org-info-detail">
      <div className="info-item">
        <img src="/assets/images/icons/ic_letter-template-call.svg" alt="" />
        <p className="info-item__content">
          {(org?.tels && org.tels[0]?.tel) || ''}
        </p>
      </div>
      <div className="info-item">
        <img src="/assets/images/icons/ic_letter-template-mail.svg" alt="" />
        <p className="info-item__content">
          {(org?.emails && org.emails[0]?.email) || ''}
        </p>
      </div>
      <div className="info-item">
        <img
          src="/assets/images/icons/ic_letter-template-location.svg"
          alt=""
        />
        <p className="info-item__content">{org?.address || ''}</p>
      </div>
    </div>
  );
};

export default OrgInformationDetail;

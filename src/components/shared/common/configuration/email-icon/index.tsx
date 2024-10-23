import { EmailOutlinedIconSvg } from '@icons';
import { useGenerateConcealContent } from '@lib/converter';

import '../../../../features/fina/deals/deals-component-common/deals.module.scss';

export const EmailWithIcon = ({
  email = '',
  icon = <EmailOutlinedIconSvg className={'icon-email'} />,
}) => {
  const generateConcealContent = useGenerateConcealContent();

  if (!email) {
    return null;
  }

  return (
    <>
      <div className={'email-icon-custom'}>
        <a href={`mailto:${email}`}>{icon}</a>
        <span>{generateConcealContent(email)}</span>
      </div>
      <style jsx>
        {`
          .email-icon-custom {
            display: flex;
            align-items: center;
            text-decoration: underline;
          }
          a {
            margin-right: 5px;
          }
        `}
      </style>
    </>
  );
};

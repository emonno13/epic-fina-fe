import { ZaloIcon } from '@icons';

import '../../../../features/fina/deals/deals-component-common/deals.module.scss';

export const IconZalo = ({ zaloUrl = '' }) => {
  return (
    <>
      <div className={'wrapper-icon-email'}>
        <a
          href={zaloUrl || 'https://chat.zalo.me/'}
          target={'_blank'}
          rel="noreferrer"
        >
          <ZaloIcon />
        </a>
      </div>
      <style jsx>{`
        .wrapper-icon-email {
          display: flex;
          margin-bottom: 8px;
        }
        .wrapper-icon-email a {
          display: flex;
        }

        .icon-email {
          margin-left: 8px;
          background: #0a3eca;
          border-radius: 50%;
          width: 26px;
          height: 26px;
          transition: all 0.1s linear;
          color: #ffffff;
          display: flex;
          align-items: center;
          cursor: pointer;
          justify-content: center;
        }
      `}</style>
    </>
  );
};

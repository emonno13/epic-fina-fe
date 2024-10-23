import { useHTranslation } from '@lib/i18n';
import { Divider } from 'antd';
import { getFooterInfo } from '../constants';

const ClientFooterInfo = () => {
  const { t } = useHTranslation('admin-common');
  const footerInfo = getFooterInfo(t);
  return (
    <div className="ui-lightly-client-footer__info">
      {footerInfo.map(({ title }, index) => (
        <div
          key={`footer-info-item-${index}`}
          className="ui-lightly-client-footer__info__item"
        >
          <span>{title}</span>
          {index !== footerInfo.length - 1 && (
            <Divider
              type="vertical"
              className="ui-lightly-client-footer__info__item__divider"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ClientFooterInfo;

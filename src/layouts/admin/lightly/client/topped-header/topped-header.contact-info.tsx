import { toppedHeaderContactInfo } from './constants';

const ClientToppedHeaderContactInfo = () => {
  return (
    <div className="client-topped-header-contact-info">
      {toppedHeaderContactInfo.map(({ icon, text, href, iconClassName }, index) => (
        <div key={`client-topped-header-contact-info-${index}`} className="client-topped-header-contact-info__item">
          <div className={`client-topped-header-contact-info__item__icon ${iconClassName}`}>{icon}</div>
          {href ? <a className="client-topped-header-contact-info__item__txt" href={href} target="_blank" rel="noopener noreferrer">
            {text}
          </a> : <span className="client-topped-header-contact-info__item__txt">{text}</span>}
        </div>
      ))}
    </div>
  );
};

export default ClientToppedHeaderContactInfo;
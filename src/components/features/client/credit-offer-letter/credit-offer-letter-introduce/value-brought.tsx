import './credit-offer-letter-introduce.module.scss';

export const ValueBrought = (props: { icon?: string, title?: string, content?: string }) => {
  const { icon, title, content } = props;
  return (
    <div className="credit-offer-letter-produce__value-brought">
      <div className="credit-offer-letter-produce__value-brought__icon">
        <img src={icon} alt="icon" />
      </div>
      <div className="credit-offer-letter-produce__value-brought__body">
        <p className="credit-offer-letter-produce__value-brought__body__title">{title}</p>
        <p className="credit-offer-letter-produce__value-brought__body__content">{content}</p>
      </div>
    </div>
  );
};

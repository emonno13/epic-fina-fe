import { useHTranslation } from '@lib/i18n';
import { AlmaConditionData } from '../constants';

const AlmaConditionContent = () => {
  const { t } = useHTranslation('common');
  const data = AlmaConditionData(t);
  return (
    <div className="alma-condition-content">
      <div className="alma-condition-content__list">
        {data.map((text, index) => (
          <p
            key={`alma-condition-${index}`}
            className="alma-condition-content__list-item"
          >
            - {text}
          </p>
        ))}
      </div>
      <div className="alma-condition-content__image">
        <img src="/assets/images/alma-condition-image.webp" />
      </div>
    </div>
  );
};

export default AlmaConditionContent;

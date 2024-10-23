import { useHTranslation } from '@lib/i18n';
import AlmaConditionContent from './condition.content';

const AlmaCondition = () => {
  const { t } = useHTranslation('common');
  return (
    <div className="alma-condition" id="general-condition">
      <div className="alma-container">
        <h1 className="alma-condition__title">
          {t('GENERAL CONDITIONS', { vn: 'ĐIỀU KIỆN ÁP DỤNG CHUNG' })}
        </h1>
        <h1 className="alma-condition__title">
          {t('FOR 2 SPECIAL PROGRAMS', { vn: ' CHO 2 CHƯƠNG TRÌNH ƯU ĐÃI' })}
        </h1>
        <AlmaConditionContent />
      </div>
    </div>
  );
};

export default AlmaCondition;

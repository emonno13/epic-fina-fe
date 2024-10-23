import { useHTranslation } from '@lib/i18n';
import { getContentMissionAndVisionData } from '../../constants';
import VisionAndMissionItem from './vision-and-mission-item';

import './vision-and-mission.module.scss';

const VisionAndMissionFina = () => {
  const { t } = useHTranslation('common');
  const data = getContentMissionAndVisionData(t);

  return (
    <div className="vision-and-mission">
      <VisionAndMissionItem content={data[0]} />
      <div className="vision-and-mission__separate" />
      <VisionAndMissionItem content={data[1]} />
    </div>
  );
};

export default VisionAndMissionFina;

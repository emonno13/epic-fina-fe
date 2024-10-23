import './vision-and-mission.module.scss';

const VisionAndMissionItem = ({ content }) => {
  const { title, des, Icon } = content;
  return (
    <div className="vision-and-mission__item">`
      <div><Icon /></div>

      <div className="vision-and-mission__item__title">{title}</div>
      <div className="vision-and-mission__item__break"/>

      <div className="vision-and-mission__item__des">{des}</div>
    </div>
  );
};

export default VisionAndMissionItem;

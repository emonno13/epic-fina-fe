import './module.displayable-item.scss';

export const DisplayableItem = ({ label, value }) => (
  <div className="displayable-item-wrapper">
    <p className="displayable-item-label"><b>{label}: </b></p>
    {value}
  </div>
);
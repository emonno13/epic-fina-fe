const ClientHeaderMenuMobileButton = ({ visible, onClick }) => {
  return (
    <div className="ui-top-menu-mobile-handle-menu-button" onClick={onClick}>
      <div
        className={`ui-top-menu-mobile-handle-menu-button__button ${
          visible && 'ui-top-menu-mobile-handle-menu-button__button-open'
        }`}
      >
        <div className="ui-top-menu-mobile-handle-menu-button__button__row" />
      </div>
    </div>
  );
};

export default ClientHeaderMenuMobileButton;

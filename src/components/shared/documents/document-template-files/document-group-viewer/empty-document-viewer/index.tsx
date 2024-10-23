export const EmptyDocumentViewer = ({ document }) => {
  return (
    <div className="ui-img-preview__cover-photo ui-img-preview__cover-photo-empty">
      <img src={document?.url || '/assets/images/default-thumbnail.jpeg'}/>
    </div>
  );
};
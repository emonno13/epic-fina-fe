import './document-viewer.module.scss';

export const DocumentNameViewer = ({ documentTemplateDetail }) => {
  if (!documentTemplateDetail) {
    return null;
  }

  const requireClass = documentTemplateDetail?.isRequired ? 'document-name--required' : '';

  return (
    <div className={'document-name'}>
      {documentTemplateDetail?.isRequired && (<span className={`${requireClass}`}>*</span>)}
      {documentTemplateDetail?.document?.name}
    </div>
  );
};
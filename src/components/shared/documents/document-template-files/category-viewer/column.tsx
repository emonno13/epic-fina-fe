export const Column = ({ children, grid }) => {
  return (
    <div className={'wrap-document-group'} style={{
      margin: `0 ${grid * 2}px`,
      maxWidth: 650,
    }}>
      {children}
    </div>
  );
};
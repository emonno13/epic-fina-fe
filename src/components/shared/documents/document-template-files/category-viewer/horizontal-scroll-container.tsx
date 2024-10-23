export const HorizontalScrollContainer = ({ children, grid }) => {
  return (
    <div style={{
      display: 'flex',
      padding: `${grid}px`,
      overflow: 'auto',
      flexWrap: 'wrap',
    }}>
      {children}
    </div>
  );
};
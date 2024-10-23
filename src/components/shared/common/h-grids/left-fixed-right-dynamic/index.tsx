export interface LeftFixedRightDynamicColumnProps {
  leftChildren?: any,
  nextToLeftChildren?: any,
  rightChildren?: any,
  className?: any,
  spacing?: any,
  children?: any,
  leftClassName?: any,
  nextToLeftClassName?: any,
  rightClassName?: any,
}

export const LeftFixedRightDynamicColumn = ({
  leftChildren,
  spacing = 20,
  rightChildren,
  children,
  className = '',
  leftClassName = '',
  nextToLeftClassName = '',
  nextToLeftChildren,
  rightClassName = '',
}: LeftFixedRightDynamicColumnProps) => {
  return (
    <div className={`flex w-full ${className}`}>
      <div className={`flex-none left-column text-left ${leftClassName}`}>
        {leftChildren}
      </div>
      {!!nextToLeftChildren && (
        <div className={`flex-none left-column text-left ${nextToLeftClassName}`}>
          {nextToLeftChildren}
        </div>
      )}
      <div className={`flex-grow text-left ${rightClassName}`}>
        {rightChildren}
      </div>
      {children}
      <style jsx>{`
        .left-column {
          margin-right: ${spacing}px;
        }
      `}</style>
    </div>
  );
};
import { Droppable } from 'react-beautiful-dnd';

export const DroppablePanel = ({ droppableId, style = {}, className = '', styleContent = {}, renderContent = ((provided, snapshot) => null), ...props }) => {
  return (
    <div
      style={{
        border: '1px solid lightgrey',
        ...style,
      }}
      className={`${className}`}
    >
      <Droppable
        droppableId={droppableId}
        direction="horizontal"
      >
        {(provided, snapshot) => (
          <div
            style={{
              backgroundColor: snapshot.isDraggingOver ? '#e6f4ff' : '',
              display: 'flex',
              padding: 8,
              position: 'relative',
              ...styleContent,
            }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {renderContent(provided, snapshot) || props.children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
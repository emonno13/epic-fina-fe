import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { getItemStyle, getAnswerListStyle } from './utils';
import { DragIndicator } from '../../../icons';

const Answers = (props) => {
  const { question, questionNum } = props;
  return (
    <Droppable droppableId={`droppable${question.id}`} type={'QUESTION'}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getAnswerListStyle(snapshot.isDraggingOver)}
        >
          {question.answers.map((answer, index) => {
            return (
              <Draggable
                key={`${questionNum}${index}`}
                draggableId={`${questionNum}${index}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style,
                    )}
                  >
                    <span {...provided.dragHandleProps}>
                      <DragIndicator/>
                    </span>
                    {answer}
                  </div>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Answers;

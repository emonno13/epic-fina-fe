import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Reorder, getItemStyle, getQuestionListStyle } from './utils';
import Answers from './answer';
import { DragIndicator } from '../../../icons';

// fake data generator
const getQuestions = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `question-${k}`,
    content: `question ${k}`,
    answers: ['answer-1', 'answer-2', 'answer-3'],
  }));

const Questions = () => {
  const [questions, setQuestions] = useState<any>(getQuestions(3));

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      //console.log("no-change");
      return;
    }

    if (result.type === 'QUESTIONS') {
      const reorderedQuestions = Reorder(
        questions,
        result.source.index,
        result.destination.index,
      );
      setQuestions(reorderedQuestions);
    } else {
      const answers = Reorder(
        questions[parseInt(result.type, 10)].answers,
        result.source.index,
        result.destination.index,
      );
      const reorderedQuestions = JSON.parse(JSON.stringify(questions));
      questions[result.type].answers = answers;
      setQuestions(reorderedQuestions);
    }
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      // onDragUpdate={this.onDragUpdate}
    >
      <Droppable droppableId="droppable" type="QUESTIONS">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getQuestionListStyle(snapshot.isDraggingOver)}
          >
            {questions.map((question, index) => (
              <Draggable
                key={question.id}
                draggableId={question.id}
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
                    {question.content}
                    <span {...provided.dragHandleProps}>
                      <DragIndicator/>
                    </span>
                    <Answers questionNum={index} question={question} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Questions;

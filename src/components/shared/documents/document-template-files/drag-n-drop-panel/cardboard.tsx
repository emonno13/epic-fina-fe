import React from 'react';
import { DroppablePanel } from './droppable-panel';
import { FileViewer } from '../document-viewer/file-viewer';
import { DraggablePanel } from './index';

const Cardboard = (props) => {
  const { cardboard, removeCard, styleContent = {} } = props;
  const droppableId = JSON.stringify({ document: cardboard , type: 'DOCUMENT_GROUP' });

  return (
    <DroppablePanel
      droppableId={droppableId}
      styleContent={styleContent}
    >
      {props?.cardboard?.cards?.map((card, index) => {
        const fileDocument = card;
        const id = JSON.stringify({
          fileDocument,
          index,
          type: 'detail',
        });
        return (
          <DraggablePanel key={id} draggableId={id} index={index}>
            {card?.cards?.length ?
              <Cardboard
                cardboard={card}
                removeCard={removeCard}
              />
              :
              <FileViewer className="view" fileDocument={fileDocument}  />}
          </DraggablePanel>
        );
      })}
    </DroppablePanel>
  );
};

export default Cardboard;

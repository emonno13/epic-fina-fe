import React from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';

const Fade: any = dynamic(
  () => import('react-reveal/Fade'),
);

export const QuickAddAction = ({ showQuickAdd, onAddNewItem }) => {
  if (!showQuickAdd) {
    return null;
  }
  return (
    <div className={'add-lecture'} onClick={onAddNewItem}>
      <Fade left>
        <div className={'arrow_box flex justify-center justify-items-center'}>
          <PlusCircleOutlined/>
        </div>
      </Fade>
    </div>
  );
};
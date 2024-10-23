import React, { useState } from 'react';
import { SketchPicker } from 'react-color';

import './h-color.module.scss';

export const HReactColor = (props: SketchPicker) => {
  const [state, setState] = useState({
    displayColorPicker: false,
  });

  const handleClick = () => {
    setState({
      ...state,
      displayColorPicker: !state.displayColorPicker,
    });
  };

  const handleChange = (color) => {
    props.onChange(color.hex);
  };

  const handleClose = () => {
    setState({
      ...state,
      displayColorPicker: false,
    });
  };

  return (
    <div>
      <div className="swatch" onClick={handleClick}>
        <div className="color" style={{ background: props.value || '#328bf5' }}/>
      </div>
      {state.displayColorPicker ?
        <div className="popover">
          <div className="cover" onClick={handleClose}/>
          <SketchPicker color={props.value} onChange={handleChange}/>
        </div> : null}
    </div>
  );
};
/*
 * Copyright (c) 2021, vntopmas <vntopmas@gmail.com>
 *
 * License: MIT
 */

import React from 'react';

import { insertDataBlock } from 'megadraft';
import Icon from './icons';
import constants from './constants';

export const Button = ({ onChange, editorState, className }) => {

  const onClick = (e) => {
    const data = {
      type: constants.PLUGIN_TYPE,
      caption: 'Initial plugin text',
    };

    onChange(insertDataBlock(editorState, data));
  };

  return (
    <button
      className={className}
      type="button"
      onClick={onClick}
      title={constants.PLUGIN_NAME}
    >
      <Icon className="sidemenu__button__icon"/>
    </button>
  );
};

export default Button;

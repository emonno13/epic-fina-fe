/*
 * Copyright (c) 2021, vntopmas <vntopmas@gmail.com>
 *
 * License: MIT
 */

import React from 'react';

import { MegadraftPlugin, MegadraftIcons } from 'megadraft';

const { BlockContent, BlockData, BlockInput, CommonBlock } = MegadraftPlugin;

export const Block = (props: any) => {
  const { container, data } = props;

  const _handleEdit = () => {
    alert(JSON.stringify(data, null, 4));
  };

  const _handleCaptionChange = (event) => {
    container.updateData({ caption: event.target.value });
  };

  const actions = [
    { key: 'edit', icon: MegadraftIcons.EditIcon, action: _handleEdit },
    {
      key: 'delete',
      icon: MegadraftIcons.DeleteIcon,
      action: container.remove,
    },
  ];

  return (
    <CommonBlock {...props} actions={actions}>
      <BlockContent>
        <pre>{data.caption || '- NO TEXT -'}</pre>
      </BlockContent>

      <BlockData>
        <BlockInput
          placeholder="Caption"
          value={data.caption}
          onChange={_handleCaptionChange}
        />
      </BlockData>
    </CommonBlock>
  );
};

export default Block;

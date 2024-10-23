import React from 'react';
import { Button } from 'antd';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

storiesOf('DynamicField', module)
  .add('Dynamic Fields', () => <Button  onClick={action('click')} >Dynamic Fields</Button>);

export default {
  title: 'Dynamic Fields',
  component: Button,
};
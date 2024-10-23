import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';


export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button  {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  type: 'primary',
  children: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Button',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  children: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  children: 'Button',
};

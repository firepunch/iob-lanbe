import type { Meta, StoryObj } from '@storybook/react'

import Button from '../src/components/Button'

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
}

export default meta
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    primary: true,
    children: 'Button',
  },
}

export const Full: Story = {
  args: {
    size: 'full',
    children: 'Button',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    children: 'Button',
  },
}

import type { Meta, StoryObj } from '@storybook/react';
import { ChessBoard } from './ChessBoard';
import '../../../styles/index.css';

const meta = {
  title: 'Core/ChessBoard',
  component: ChessBoard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { },
} satisfies Meta<typeof ChessBoard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initial: Story = {
  args: {
    FEN: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    onChange: () => {},
    color: 'white',
  },
};

export const OnlyRook: Story = {
    args: {
      FEN: '4r3/8/8/8/8/8/8/4R3 b - - 0 1',
      onChange: () => {},
      color: 'white',
    },
  };
  

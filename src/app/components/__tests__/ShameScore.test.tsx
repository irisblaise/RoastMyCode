import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ShameScore from '../ShameScore';

describe('ShameScore', () => {
  it('displays correct color for low score (0-3)', () => {
    const score = 2;

    render(<ShameScore score={score} />);
    const thermometer = screen.getByTestId('thermometer');

    expect(thermometer).toHaveClass('from-emerald-400/80');
  });

  it('displays correct color for medium score (4-6)', () => {
    const score = 5;

    render(<ShameScore score={score} />);
    const thermometer = screen.getByTestId('thermometer');

    expect(thermometer).toHaveClass('from-yellow-400/80');
  });

  it('displays correct color for high score (7-10)', () => {
    const score = 8;

    render(<ShameScore score={score} />);
    const thermometer = screen.getByTestId('thermometer');

    expect(thermometer).toHaveClass('from-red-400/80');
  });

  it('displays appropriate message based on score', () => {
    const score = 2;
    const expectedMessage = '✨ Code Ninja! ✨';

    render(<ShameScore score={score} />);
    const message = screen.getByTestId('message');

    expect(message).toHaveTextContent(expectedMessage);
  });

  it('displays appropriate message based on score', () => {
    const score = 5;
    const expectedMessage = '🤔 Needs Some Love...';

    render(<ShameScore score={score} />);
    const message = screen.getByTestId('message');

    expect(message).toHaveTextContent(expectedMessage);
  });

  it('displays appropriate message based on score', () => {
    const score = 9;
    const expectedMessage = '🔥 Code Emergency! 🚨';

    render(<ShameScore score={score} />);
    const message = screen.getByTestId('message');

    expect(message).toHaveTextContent(expectedMessage);
  });

  it('renders thermometer with correct height based on score', () => {
    const score = 5;

    render(<ShameScore score={score} />);
    const thermometer = screen.getByTestId('thermometer');

    expect(thermometer).toBeInTheDocument();
    expect(thermometer.style.height).toBe('50%');
  });

  it('normalizes scores to be between 0 and 10', () => {
    const score = -1;

    render(<ShameScore score={score} />);
    const normalizedScore = screen.getByText('0.0');

    expect(normalizedScore).toBeInTheDocument();
  });

  it('normalizes scores to be between 0 and 10', () => {
    const score = 15;

    render(<ShameScore score={score} />);
    const normalizedScore = screen.getByText('10.0');

    expect(normalizedScore).toBeInTheDocument();
  });
});

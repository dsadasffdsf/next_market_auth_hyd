import React from 'react';
import { render, screen } from '@testing-library/react';

const TestComponent = () => {
  return <div role="alert">Success!</div>;
};

describe('Jest DOM matchers', () => {
  it('should check if the alert is in the document', () => {
    render(<TestComponent />);

    // Используем matcher from jest-dom
    expect(screen.getByRole('alert')).toBeInTheDocument(); // Проверка, что элемент присутствует в документе
  });

  it('should check if the alert is visible', () => {
    render(<TestComponent />);

    // Используем matcher from jest-dom
    expect(screen.getByRole('alert')).toBeVisible(); // Проверка, что элемент виден
  });
});

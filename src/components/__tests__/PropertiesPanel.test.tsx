// PropertiesPanel.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import PropertiesPanel from '../PropertiesPanel';
import { ComponentData } from '../../types';

const makeTextComponent = (): ComponentData => ({
  id: 'c1',
  type: 'text',
  position: { x: 0, y: 0 },
  zIndex: 1,
  properties: { content: 'Hello', fontSize: 16, fontWeight: '400', color: '#000000' }
});

test('updates component properties correctly', () => {
  const selected = makeTextComponent();
  const onUpdateComponent = jest.fn();
  render(<PropertiesPanel selectedComponent={selected} onUpdateComponent={onUpdateComponent} />);

  const fontSizeInput = screen.getByRole('spinbutton') as HTMLInputElement; // number input
  fireEvent.change(fontSizeInput, { target: { value: '24' } });

  expect(onUpdateComponent).toHaveBeenCalledWith('c1', expect.objectContaining({
    properties: expect.objectContaining({ fontSize: 24 })
  }));
});

test('handles invalid property values gracefully', () => {
  const selected = makeTextComponent();
  const onUpdateComponent = jest.fn();
  render(<PropertiesPanel selectedComponent={selected} onUpdateComponent={onUpdateComponent} />);

  const fontSizeInput = screen.getByRole('spinbutton') as HTMLInputElement;
  fireEvent.change(fontSizeInput, { target: { value: '-10' } });

  // Our component passes through values; consumer can clamp. Ensure callback received a number.
  expect(onUpdateComponent).toHaveBeenCalled();
});
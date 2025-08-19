// Canvas.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Canvas from '../Canvas';
import { ComponentData } from '../../types';

const noop = () => {};

test('renders provided components on the canvas', () => {
  const components: ComponentData[] = [
    { id: '1', type: 'text', position: { x: 10, y: 20 }, zIndex: 1, properties: { content: 'Sample', fontSize: 16, fontWeight: '400', color: '#000' } }
  ];
  render(
    <Canvas
      components={components}
      selectedComponent={null}
      onSelectComponent={noop}
      onUpdateComponent={noop as any}
      onDeleteComponent={noop}
      onAddComponentAt={noop as any}
      isDragging={false}
      setIsDragging={noop as any}
      canUndo={false}
      canRedo={false}
      onUndo={noop}
      onRedo={noop}
    />
  );

  expect(screen.getByText('Sample')).toBeInTheDocument();
});

test('undo button is disabled when cannot undo', () => {
  const components: ComponentData[] = [];
  render(
    <Canvas
      components={components}
      selectedComponent={null}
      onSelectComponent={noop}
      onUpdateComponent={noop as any}
      onDeleteComponent={noop}
      onAddComponentAt={noop as any}
      isDragging={false}
      setIsDragging={noop as any}
      canUndo={false}
      canRedo={false}
      onUndo={noop}
      onRedo={noop}
    />
  );
  expect(screen.getByTestId('undo-button')).toBeDisabled();
});
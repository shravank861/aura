import { render, screen } from '@testing-library/react';
import ComponentPalette from '../ComponentPalette';

test('renders core blocks in palette', () => {
  const onAdd = jest.fn();
  render(<ComponentPalette onAddComponent={onAdd} />);

  expect(screen.getByText('Text')).toBeInTheDocument();
  expect(screen.getByText('Text Area')).toBeInTheDocument();
  expect(screen.getAllByText('Image').length).toBeGreaterThan(0);
  expect(screen.getAllByText('Button').length).toBeGreaterThan(0);
});
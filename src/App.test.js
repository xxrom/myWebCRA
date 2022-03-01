import {render, screen} from '@testing-library/react';
import App from './App';

const name = 'Chernyshov Nikita';

test(`render full page with text ${name}`, () => {
  render(<App />);
  const names = screen.getAllByText(name);
  expect(names.length).toBe(2);
});

//import {render, screen} from '@testing-library/react';
import { describe, it, expect } from 'vitest'
import { render, screen } from './utils/testUtils'

// eslint-disable-next-line no-unused-vars
import App from './App';

const name = 'Chernyshov Nikita';

describe('App', ()=> {
  it(`render full page with text ${name}`, () => {
    render(<App />);

    const names = screen.getAllByText(name);

    expect(names.length).toBe(2);
  });

  it('render img', () => {
    render(<App />);

    // find img by aria-label='me'
    const img = screen.getByRole('img', {name: 'me'});

    expect(img).toBeInTheDocument();
  });
});

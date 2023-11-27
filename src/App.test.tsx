import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
//import { render, screen } from './utils/testUtils';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';

const name = 'Chernyshov Nikita';

describe('App', () => {
  it(`render full page with text ${name}`, () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const names = screen.getAllByText(name);

    expect(names.length).toBe(2);
  });
});

/*
  it('render img', () => {
    render(<App />);

    // find img by aria-label='me'
    const img = screen.getByRole('img', { name: 'me' });

    expect(img).toBeInTheDocument();
  });
  */
//});

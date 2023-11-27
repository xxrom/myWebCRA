import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
//import { render, screen } from './utils/testUtils';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';

const name = 'Chernyshov Nikita';

const defaultComponent = (
  <Provider store={store}>
    <App />
  </Provider>
);

describe('App', () => {
  it(`render full page with text ${name}`, () => {
    render(defaultComponent);

    const names = screen.getAllByText(name);

    expect(names.length).toBe(2);
  });

  it('Check data-component-index=0', () => {
    render(defaultComponent);

    const component = document.querySelector('[data-component-index="0"]');
    // Assertions to check if the element exists
    expect(component).toBeInTheDocument();
  });
});

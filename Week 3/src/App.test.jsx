import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from './App.jsx';

describe('App', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    cleanup();
    window.localStorage.clear();
  });

  test('renders the EZ Tech cart interface', () => {
    const html = renderToString(React.createElement(App));

    expect(html).toContain('EZ Tech Cart');
    expect(html).toContain('Subscription Plans');
    expect(html).toContain('EZ Tech Accessories');
  });

  test('shows a warning label when adding more than one subscription', async () => {
    const user = userEvent.setup();

    render(<App />);

    const addButtons = screen.getAllByRole('button', { name: 'Add to Cart' });
    await user.click(addButtons[0]);
    await user.click(addButtons[1]);

    expect(screen.getByText('Subscription Limit Warning')).toBeTruthy();
    expect(
      screen.getByText(/Only one subscription can be in your cart at a time/i),
    ).toBeTruthy();
  });

  test('stores cart items in local storage and restores them after reload', async () => {
    const user = userEvent.setup();

    const { unmount } = render(<App />);

    const addButtons = screen.getAllByRole('button', { name: 'Add to Cart' });
    await user.click(addButtons[4]);
    await user.click(addButtons[4]);

    const storedCart = JSON.parse(window.localStorage.getItem('eztech-cart'));
    expect(storedCart).toEqual([
      expect.objectContaining({
        service: 'EZ Tech T-Shirt',
        quantity: 2,
      }),
    ]);

    unmount();
    render(<App />);

    const navigation = screen.getByRole('navigation', {
      name: 'Main navigation',
    });
    await user.click(within(navigation).getByRole('button', { name: /cart/i }));

    const cartItem = screen.getByText('EZ Tech T-Shirt').closest('article');
    expect(within(cartItem).getByText('2')).toBeTruthy();
    expect(within(cartItem).getByText('$51.98')).toBeTruthy();
  });
});

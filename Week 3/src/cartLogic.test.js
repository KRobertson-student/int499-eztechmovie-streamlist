import { describe, expect, test } from 'vitest';
import {
  addItemToCart,
  calculateCartTotal,
  getCartItemCount,
  removeItemFromCart,
  updateCartQuantity,
} from './cartLogic.js';

const basicSubscription = {
  id: 1,
  category: 'subscription',
  service: 'Basic Subscription',
  price: 4.99,
};

const premiumSubscription = {
  id: 3,
  category: 'subscription',
  service: 'Premium Subscription',
  price: 12.99,
};

const shirt = {
  id: 5,
  category: 'accessory',
  service: 'EZ Tech T-Shirt',
  price: 25.99,
};

describe('cart logic', () => {
  test('adds one subscription and blocks another subscription with a warning', () => {
    const firstResult = addItemToCart([], basicSubscription);
    const secondResult = addItemToCart(firstResult.cart, premiumSubscription);

    expect(firstResult.cart).toEqual([{ ...basicSubscription, quantity: 1 }]);
    expect(firstResult.message).toBe('');
    expect(secondResult.cart).toEqual(firstResult.cart);
    expect(secondResult.message).toContain('one subscription');
  });

  test('increments accessory quantity when the same accessory is added more than once', () => {
    const firstResult = addItemToCart([], shirt);
    const secondResult = addItemToCart(firstResult.cart, shirt);

    expect(secondResult.cart).toEqual([{ ...shirt, quantity: 2 }]);
    expect(secondResult.message).toBe('');
  });

  test('updates quantities, removes items, counts items, and calculates totals', () => {
    const cart = [
      { ...basicSubscription, quantity: 1 },
      { ...shirt, quantity: 2 },
    ];

    const updatedCart = updateCartQuantity(cart, shirt.id, 3);
    const removedCart = removeItemFromCart(updatedCart, basicSubscription.id);

    expect(updatedCart.find((item) => item.id === shirt.id).quantity).toBe(3);
    expect(removedCart).toEqual([{ ...shirt, quantity: 3 }]);
    expect(getCartItemCount(updatedCart)).toBe(4);
    expect(calculateCartTotal(updatedCart)).toBe(82.96);
  });
});

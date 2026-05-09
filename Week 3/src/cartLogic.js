export const subscriptionWarning =
  'Only one subscription can be in your cart at a time. Remove the current subscription before adding another.';

export function addItemToCart(cart, product) {
  const hasSubscription = cart.some((item) => item.category === 'subscription');

  if (product.category === 'subscription' && hasSubscription) {
    return {
      cart,
      message: subscriptionWarning,
    };
  }

  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    return {
      cart: cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
      message: '',
    };
  }

  return {
    cart: [...cart, { ...product, quantity: 1 }],
    message: '',
  };
}

export function removeItemFromCart(cart, productId) {
  return cart.filter((item) => item.id !== productId);
}

export function updateCartQuantity(cart, productId, quantity) {
  if (quantity <= 0) {
    return removeItemFromCart(cart, productId);
  }

  return cart.map((item) =>
    item.id === productId ? { ...item, quantity } : item,
  );
}

export function getCartItemCount(cart) {
  return cart.reduce((count, item) => count + item.quantity, 0);
}

export function calculateCartTotal(cart) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return Number(total.toFixed(2));
}

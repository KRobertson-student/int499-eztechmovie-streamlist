import React, { useEffect, useMemo, useState } from 'react';
import products from './data.js';
import {
  addItemToCart,
  calculateCartTotal,
  getCartItemCount,
  removeItemFromCart,
  updateCartQuantity,
} from './cartLogic.js';

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const CART_STORAGE_KEY = 'eztech-cart';

function loadStoredCart() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
    const parsedCart = storedCart ? JSON.parse(storedCart) : [];

    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch {
    return [];
  }
}

function saveStoredCart(cart) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // Ignore storage failures so cart interactions still work in the page.
  }
}

function App() {
  const [activeSection, setActiveSection] = useState('subscriptions');
  const [cart, setCart] = useState(loadStoredCart);
  const [notice, setNotice] = useState('');

  const subscriptions = useMemo(
    () => products.filter((product) => product.category === 'subscription'),
    [],
  );
  const accessories = useMemo(
    () => products.filter((product) => product.category === 'accessory'),
    [],
  );
  const itemCount = getCartItemCount(cart);
  const cartTotal = calculateCartTotal(cart);
  const isSubscriptionWarning = notice.includes('one subscription');

  useEffect(() => {
    saveStoredCart(cart);
  }, [cart]);

  const handleAddItem = (product) => {
    const result = addItemToCart(cart, product);

    setCart(result.cart);
    setNotice(result.message || `${product.service} added to your cart.`);
  };

  const handleRemoveItem = (productId) => {
    setCart((currentCart) => removeItemFromCart(currentCart, productId));
    setNotice('Item removed from your cart.');
  };

  const handleQuantityChange = (productId, quantity) => {
    setCart((currentCart) => updateCartQuantity(currentCart, productId, quantity));
    setNotice('');
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <nav className="navbar" aria-label="Main navigation">
          <div className="brand">
            <span className="brand__eyebrow">Week 3 Assignment</span>
            <h1>EZ Tech Cart</h1>
          </div>

          <div className="nav-actions">
            <button
              className={`nav-button ${
                activeSection === 'subscriptions' ? 'nav-button--active' : ''
              }`}
              type="button"
              onClick={() => setActiveSection('subscriptions')}
            >
              Subscriptions
            </button>
            <button
              className={`nav-button ${
                activeSection === 'cart' ? 'nav-button--active' : ''
              }`}
              type="button"
              onClick={() => setActiveSection('cart')}
            >
              Cart
              <span className="cart-pill">{itemCount}</span>
            </button>
          </div>
        </nav>
      </header>

      <main className="page-shell">
        <section className="hero-section">
          <div>
            <p className="eyebrow">Subscription and accessory checkout</p>
            <h2>Build a cart for EZ Tech services.</h2>
          </div>
          <p>
            Choose one subscription, add EZ Tech accessories, adjust quantities,
            and review the cart total before checkout.
          </p>
        </section>

        {notice && !isSubscriptionWarning ? (
          <p className="notice" role="status">
            {notice}
          </p>
        ) : null}

        {activeSection === 'subscriptions' ? (
          <section className="catalog-layout">
            <ProductSection
              title="Subscription Plans"
              description="Only one subscription may be added to the cart at a time."
              products={subscriptions}
              onAddItem={handleAddItem}
              warningMessage={isSubscriptionWarning ? notice : ''}
            />

            <ProductSection
              title="EZ Tech Accessories"
              description="Accessories can be added multiple times."
              products={accessories}
              onAddItem={handleAddItem}
            />
          </section>
        ) : (
          <Cart
            cart={cart}
            cartTotal={cartTotal}
            onQuantityChange={handleQuantityChange}
            onRemoveItem={handleRemoveItem}
          />
        )}
      </main>
    </div>
  );
}

function ProductSection({
  title,
  description,
  products,
  onAddItem,
  warningMessage = '',
}) {
  return (
    <section className="product-section">
      <div className="section-heading">
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>

      {warningMessage ? (
        <div className="warning-label" role="alert">
          <strong>Subscription Limit Warning</strong>
          <span>{warningMessage}</span>
        </div>
      ) : null}

      <div className="product-grid">
        {products.map((product) => (
          <article className="product-card" key={product.id}>
            <div className="product-card__image-wrap">
              <img src={product.img} alt="" className="product-card__image" />
            </div>
            <div className="product-card__body">
              <span className="category-label">{product.category}</span>
              <h4>{product.service}</h4>
              <p>{product.serviceInfo}</p>
              <div className="product-card__footer">
                <strong>{money.format(product.price)}</strong>
                <button
                  className="button button--primary"
                  type="button"
                  onClick={() => onAddItem(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Cart({ cart, cartTotal, onQuantityChange, onRemoveItem }) {
  if (cart.length === 0) {
    return (
      <section className="cart-panel cart-panel--empty">
        <h3>Your Cart</h3>
        <p>Your cart is empty. Add a subscription or accessory to get started.</p>
      </section>
    );
  }

  return (
    <section className="cart-panel">
      <div className="cart-heading">
        <div>
          <h3>Your Cart</h3>
          <p>Review items, adjust quantities, or remove products as needed.</p>
        </div>
        <strong>{money.format(cartTotal)}</strong>
      </div>

      <div className="cart-items">
        {cart.map((item) => (
          <article className="cart-item" key={item.id}>
            <img src={item.img} alt="" className="cart-item__image" />
            <div className="cart-item__details">
              <span className="category-label">{item.category}</span>
              <h4>{item.service}</h4>
              <p>{money.format(item.price)} each</p>
            </div>

            <div className="quantity-control" aria-label={`${item.service} quantity`}>
              <button
                type="button"
                onClick={() => onQuantityChange(item.id, item.quantity - 1)}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                type="button"
                onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                disabled={item.category === 'subscription'}
              >
                +
              </button>
            </div>

            <strong className="line-total">
              {money.format(item.price * item.quantity)}
            </strong>

            <button
              className="button button--danger"
              type="button"
              onClick={() => onRemoveItem(item.id)}
            >
              Remove
            </button>
          </article>
        ))}
      </div>

      <footer className="cart-summary">
        <span>Total</span>
        <strong>{money.format(cartTotal)}</strong>
      </footer>
    </section>
  );
}

export default App;

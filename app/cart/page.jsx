'use client';

import { useCart } from '@/components/CartContext';
import Link from 'next/link';

export default function Cart() {
  const { cart, updateQty, totalPrice, clearCart } = useCart();

  return (
    <div style={{ padding: '12px' }}>
      <h3 style={{ marginBottom: '10px' }}>Your Cart</h3>

      {cart.length === 0 ? (
        <p style={{ fontSize: '12px', color: '#777' }}>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div>
                <div style={{ fontSize: '12px', fontWeight: '600' }}>
                  {item.name}
                </div>
                <div style={{ fontSize: '11px', color: '#666' }}>
                  ₹{item.price.toLocaleString('en-IN')}
                </div>
              </div>
              <div className="cart-qty">
                <button onClick={() => updateQty(item.id, -1)}>−</button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item.id, 1)}>＋</button>
              </div>
            </div>
          ))}

          <div style={{ marginTop: '10px', fontWeight: 'bold' }}>
            Total: ₹{totalPrice.toLocaleString('en-IN')}
          </div>

          <Link href="/checkout" style={{ textDecoration: 'none' }}>
            <div
              className="btn-primary"
              style={{ marginTop: '10px', textAlign: 'center' }}
            >
              Checkout
            </div>
          </Link>

          <button
            onClick={clearCart}
            className="btn-outline"
            style={{ marginTop: '8px' }}
          >
            Clear cart
          </button>
        </>
      )}
    </div>
  );
}

'use client';

import { useCart } from '@/components/CartContext';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [name, setName] = useState('');
  const [addr, setAddr] = useState('');
  const [err, setErr] = useState('');

  if (!cart.length) {
    return (
      <div style={{ padding: '12px' }}>
        <p>Cart is empty.</p>
        <p className="switch-text">
          <Link href="/cart">← Back to cart</Link>
        </p>
      </div>
    );
  }

  const pay = () => {
    if (!name || !addr) {
      setErr('Please fill name & address');
      return;
    }
    clearCart();
    router.push('/');
  };

  return (
    <div style={{ padding: '12px' }}>
      <h3 style={{ marginBottom: '10px' }}>Checkout</h3>

      <input
        className="search-box"
        placeholder="Full name"
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        className="search-box"
        style={{ height: '80px' }}
        placeholder="Address"
        onChange={(e) => setAddr(e.target.value)}
      />

      {err && (
        <p style={{ color: 'red', fontSize: '12px', marginBottom: '8px' }}>
          {err}
        </p>
      )}

      <p style={{ marginBottom: '10px' }}>
        Total:{' '}
        <strong>₹{totalPrice.toLocaleString('en-IN')}</strong>
      </p>

      <Button text="Pay (Demo)" onClick={pay} />

      <p className="switch-text" style={{ marginTop: '10px' }}>
        <Link href="/cart">← Back to cart</Link>
      </p>
    </div>
  );
}

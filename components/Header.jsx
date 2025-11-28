'use client';

import Link from 'next/link';
import { useCart } from './CartContext';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { totalItems } = useCart();
  const [email, setEmail] = useState(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setEmail(data.user.email);
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setEmail(null);
    router.push('/login');
  };

  const username = email ? email.split('@')[0] : null;

  return (
    <header>
      <Link href="/" className="logo">
        watchly
      </Link>

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {username && (
          <>
            <span className="user-badge">{username}</span>
            <button
              onClick={handleLogout}
              style={{
                border: 'none',
                background: 'transparent',
                fontSize: '11px',
                color: '#2563eb',
                cursor: 'pointer',
              }}
            >
              Logout
            </button>
          </>
        )}

        {!username && (
          <Link
            href="/login"
            style={{ fontSize: '11px', color: '#2563eb', marginRight: '4px' }}
          >
            Login
          </Link>
        )}

        <Link href="/cart" className="cart-btn">
          🛒 Cart
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </Link>
      </div>
    </header>
  );
}

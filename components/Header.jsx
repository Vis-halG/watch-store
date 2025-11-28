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

  // Load user
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setEmail(data.user.email);
    });
  }, []);

  // Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setEmail(null);
    router.push('/login');
  };

  // username before @
  const username = email ? email.split('@')[0] : null;

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        background: 'rgba(67, 86, 99, 0.55)',
        borderBottom: '1px solid rgba(255,248,212,0.2)',
        padding: '14px 18px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {/* LOGO */}
      <Link
        href="/"
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: '#FFF8D4',
          textDecoration: 'none',
          letterSpacing: '.6px',
        }}
      >
        watchly
      </Link>

      {/* RIGHT SIDE */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        {/* SHOW USERNAME WHEN LOGGED IN */}
        {username && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span
              style={{
                background: 'rgba(255,248,212,0.18)',
                padding: '4px 10px',
                fontSize: 11,
                borderRadius: 999,
                color: '#FFF8D4',
                border: '1px solid rgba(255,248,212,0.3)',
              }}
            >
              {username}
            </span>

            <button
              onClick={handleLogout}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#A3B087',
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              Logout
            </button>
          </div>
        )}

        {/* IF NOT LOGGED IN, SHOW LOGIN */}
        {!username && (
          <Link
            href="/login"
            style={{
              fontSize: 12,
              color: '#A3B087',
              textDecoration: 'none',
            }}
          >
            Login
          </Link>
        )}

        {/* CART BUTTON */}
        <Link
          href="/cart"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(255,248,212,0.15)',
            padding: '6px 12px',
            borderRadius: 999,
            textDecoration: 'none',
            color: '#FFF8D4',
            border: '1px solid rgba(255,248,212,0.25)',
            fontSize: 12,
          }}
        >
          🛒 Cart
          {totalItems > 0 && (
            <span
              style={{
                background: '#A3B087',
                color: '#313647',
                padding: '2px 7px',
                fontSize: 10,
                borderRadius: 999,
                fontWeight: 700,
              }}
            >
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}

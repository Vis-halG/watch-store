'use client';

import { useState } from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const router = useRouter();

  const signup = async () => {
    if (!email || !password) {
      setErr('Email & password required');
      return;
    }
    if (password.length < 6) {
      setErr('Password must be 6+ chars');
      return;
    }
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setErr(error.message);
      return;
    }
    router.push('/login');
  };

  return (
    <div className="auth-card">
      <h1>Create account ✨</h1>
      <p className="auth-sub">Register to save your cart.</p>

      <Input
        type="email"
        placeholder="you@example.com"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Minimum 6 characters"
        onChange={(e) => setPassword(e.target.value)}
      />

      {err && (
        <p style={{ color: 'red', fontSize: '12px', marginBottom: '8px' }}>
          {err}
        </p>
      )}

      <Button text="Create account" onClick={signup} />

      <p className="switch-text">
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </div>
  );
}

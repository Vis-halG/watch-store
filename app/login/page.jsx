'use client';

import { useState } from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setErr('Enter email & password');
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setErr(error.message);
      return;
    }
    router.push('/');
  };

  const guest = () => router.push('/');

  return (
    <div className="auth-card">
      <h1>Welcome back 👋</h1>
      <p className="auth-sub">Login to continue shopping.</p>

      <Input
        type="email"
        placeholder="you@example.com"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="••••••••"
        onChange={(e) => setPassword(e.target.value)}
      />

      {err && (
        <p style={{ color: 'red', fontSize: '12px', marginBottom: '8px' }}>
          {err}
        </p>
      )}

      <Button text="Login" onClick={handleLogin} />
      <Button text="Continue as guest" outline onClick={guest} />

      <p className="switch-text">
        New here? <Link href="/register">Create account</Link>
      </p>
    </div>
  );
}

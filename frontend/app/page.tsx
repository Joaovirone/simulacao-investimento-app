"use client";

import { LoginText } from '@/components/auth/LoginText';
import { LoginForm } from '@/components/auth/LoginForm';
import { useLogin } from '@/hooks/useLogin';
import { AppBackground } from '@/components/layout/AppBackground';

export default function Login() {
  const { email, password, isLoading, setEmail, setPassword, handleLogin } = useLogin();

  return (
    <AppBackground variant="auth-login">
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 relative z-10">
        <LoginText />
        <LoginForm
          email={email}
          password={password}
          isLoading={isLoading}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onSubmit={handleLogin}
        />
      </div>
    </AppBackground>
  );
}

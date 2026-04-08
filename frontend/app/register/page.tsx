"use client";

import { RegisterText } from '@/components/auth/RegisterText';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { useRegister } from '@/hooks/useRegister';
import { AppBackground } from '@/components/layout/AppBackground';

export default function Register() {
  const {
    name,
    email,
    password,
    isLoading,
    perks,
    setName,
    setEmail,
    setPassword,
    handleRegister,
  } = useRegister();

  return (
    <AppBackground variant="auth-register">
      <div className="w-full max-w-md relative z-10">
        <RegisterText />
        <RegisterForm
          name={name}
          email={email}
          password={password}
          isLoading={isLoading}
          perks={perks}
          onNameChange={setName}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onSubmit={handleRegister}
        />
      </div>
    </AppBackground>
  );
}

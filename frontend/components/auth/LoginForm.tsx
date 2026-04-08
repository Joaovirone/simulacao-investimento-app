import Link from 'next/link';
import type { FormEvent } from 'react';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import { AuthInput } from '@/components/auth/AuthInput';
import { BrandLogo } from '@/components/ui/BrandLogo';

interface LoginFormProps {
  email: string;
  password: string;
  isLoading: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
}

export function LoginForm({
  email,
  password,
  isLoading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: LoginFormProps) {
  return (
    <div className="glass-card rounded-2xl lg:rounded-l-none lg:rounded-r-2xl p-8 md:p-10 flex flex-col justify-center fade-in-up">
      <div className="flex items-center gap-3 mb-8 lg:hidden">
        <BrandLogo size="sm" />
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1" style={{fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)'}}>
          Acessar conta
        </h1>
        <p className="text-sm" style={{color: 'var(--text-secondary)'}}>
          Entre para começar a simular seus investimentos
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        <AuthInput
          label="E-mail"
          type="email"
          value={email}
          placeholder="seu@email.com"
          icon={Mail}
          onChange={onEmailChange}
        />

        <AuthInput
          label="Senha"
          type="password"
          value={password}
          placeholder="••••••••"
          icon={Lock}
          onChange={onPasswordChange}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full py-3.5 rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
        >
          <span>{isLoading ? 'Verificando...' : 'Entrar na plataforma'}</span>
          {!isLoading && <ArrowRight className="w-4 h-4 relative z-10" />}
        </button>
      </form>

      <div className="divider my-6" />

      <p className="text-center text-sm" style={{color: 'var(--text-secondary)'}}>
        Ainda não tem conta?{' '}
        <Link href="/register" className="font-semibold transition-colors hover:opacity-80" style={{color: '#60a5fa'}}>
          Criar conta grátis
        </Link>
      </p>
    </div>
  );
}

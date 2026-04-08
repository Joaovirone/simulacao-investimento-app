import Link from 'next/link';
import type { FormEvent } from 'react';
import { Lock, Mail, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import { AuthInput } from '@/components/auth/AuthInput';

interface RegisterFormProps {
  name: string;
  email: string;
  password: string;
  isLoading: boolean;
  perks: string[];
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
}

export function RegisterForm({
  name,
  email,
  password,
  isLoading,
  perks,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: RegisterFormProps) {
  return (
    <>
      <div className="glass-card rounded-2xl p-8 fade-in-up fade-in-up-delay-1">
        <form onSubmit={onSubmit} className="space-y-5">
          <AuthInput
            label="Nome completo"
            type="text"
            value={name}
            placeholder="João da Silva"
            icon={User}
            onChange={onNameChange}
          />

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
            placeholder="Mínimo 6 caracteres"
            icon={Lock}
            onChange={onPasswordChange}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full py-3.5 rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
          >
            <span>{isLoading ? 'Criando conta...' : 'Criar conta gratuita'}</span>
            {!isLoading && <ArrowRight className="w-4 h-4 relative z-10" />}
          </button>
        </form>

        <div className="mt-6 pt-6" style={{borderTop: '1px solid var(--border)'}}>
          <p className="text-xs mb-3 uppercase tracking-widest" style={{color: 'var(--text-muted)'}}>Você terá acesso a:</p>
          <div className="space-y-2">
            {perks.map((perk) => (
              <div key={perk} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{color: '#34d399'}} />
                <span className="text-xs" style={{color: 'var(--text-secondary)'}}>{perk}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-center text-sm mt-6 fade-in-up fade-in-up-delay-2" style={{color: 'var(--text-secondary)'}}>
        Já tem uma conta?{' '}
        <Link href="/" className="font-semibold transition-colors hover:opacity-80" style={{color: '#60a5fa'}}>
          Fazer login
        </Link>
      </p>
    </>
  );
}

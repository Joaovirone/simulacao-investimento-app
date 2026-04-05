// frontend/src/app/register/page.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/services/api';
import { toast } from 'sonner';
import { LineChart, Lock, Mail, User } from 'lucide-react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Chama o nosso backend na rota de criar usuário
      await api.post('/register', { name, email, password });
      
      toast.success('Conta criada com sucesso!', {
        description: 'Você já pode fazer o login com seus dados.',
      });

      // Se deu certo, manda o usuário de volta para a tela de Login
      router.push('/');
    } catch (error: any) {
      console.error(error);
      toast.error('Erro ao criar conta', {
        description: error.response?.data?.error || 'Verifique os dados informados.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 font-sans text-slate-800">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-600 p-3 rounded-xl mb-4 shadow-md">
            <LineChart className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Criar Conta</h1>
          <p className="text-slate-500 text-sm mt-1">Junte-se ao InvestSim</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Nome completo</label>
            <div className="relative">
              <User className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="João da Silva" 
                className="w-full border border-slate-300 rounded-lg py-2.5 pl-10 pr-3 text-sm focus:ring-2 focus:ring-blue-600 outline-none transition"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">E-mail</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com" 
                className="w-full border border-slate-300 rounded-lg py-2.5 pl-10 pr-3 text-sm focus:ring-2 focus:ring-blue-600 outline-none transition"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Senha</label>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full border border-slate-300 rounded-lg py-2.5 pl-10 pr-3 text-sm focus:ring-2 focus:ring-blue-600 outline-none transition"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-slate-900 text-white font-semibold py-3 rounded-lg hover:bg-slate-800 transition disabled:opacity-50 mt-4"
          >
            {isLoading ? 'Criando...' : 'Cadastrar'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Já tem uma conta?{' '}
          <Link href="/" className="text-blue-600 font-medium hover:underline">
            Faça login
          </Link>
        </div>
      </div>
    </div>
  );
}
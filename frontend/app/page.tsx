"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';
import { toast } from 'sonner';
import { LineChart, Lock, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Chama a rota de login do backend
      const response = await api.post('/login', { email, password });
      
      const { token, user } = response.data;

      // 2. Salva o Token e os dados do usuário no LocalStorage do navegador
      localStorage.setItem('@InvestSim:token', token);
      localStorage.setItem('@InvestSim:user', JSON.stringify(user));

      toast.success('Login realizado com sucesso!', {
        description: `Bem-vindo de volta, ${user.name}!`,
      });

      // 3. Redireciona para o Dashboard
      router.push('/dashboard');

    } catch (error: any) {
      console.error(error);
      toast.error('Erro ao acessar', {
        description: error.response?.data?.error || 'Verifique suas credenciais.',
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
          <h1 className="text-2xl font-bold text-slate-900">InvestSim</h1>
          <p className="text-slate-500 text-sm mt-1">Acesse sua conta para simular</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
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
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 mt-4"
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

          {/* Substitua a div antiga por esta: */}
          <div className="mt-6 text-center text-sm text-slate-500">
            Ainda não tem conta?{' '}
            <Link href="/register" className="text-blue-600 font-medium hover:underline">
              Crie uma agora
            </Link>
          </div>
      </div>
    </div>
  );
}
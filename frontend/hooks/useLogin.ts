import { useState } from 'react';
import type { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '@/services/api';

export function useLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post('/login', { email, password });
      const { token, user } = response.data;

      localStorage.setItem('@InvestSim:token', token);
      localStorage.setItem('@InvestSim:user', JSON.stringify(user));

      toast.success('Bem-vindo de volta!', {
        description: `Olá, ${user.name}. Sua sessão foi iniciada.`,
      });

      router.push('/dashboard');
    } catch (error: any) {
      console.error(error);
      toast.error('Acesso negado', {
        description: error.response?.data?.error || 'Verifique suas credenciais.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    password,
    isLoading,
    setEmail,
    setPassword,
    handleLogin,
  };
}

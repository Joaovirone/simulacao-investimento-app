import { useState } from 'react';
import type { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '@/services/api';

export function useRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const perks = [
    'Simule investimentos ilimitados',
    'Gráficos de crescimento patrimonial',
    'Cálculo preciso de juros compostos',
    'Totalmente gratuito',
  ];

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await api.post('/register', { name, email, password });

      toast.success('Conta criada com sucesso!', {
        description: 'Você já pode fazer o login com seus dados.',
      });

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

  return {
    name,
    email,
    password,
    isLoading,
    perks,
    setName,
    setEmail,
    setPassword,
    handleRegister,
  };
}

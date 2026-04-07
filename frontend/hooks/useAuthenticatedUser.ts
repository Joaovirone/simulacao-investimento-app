import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useAuthenticatedUser(redirectTo = '/') {
  const router = useRouter();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('@InvestSim:token');
    const user = localStorage.getItem('@InvestSim:user');

    if (!token || !user) {
      router.push(redirectTo);
      return;
    }

    setUserName(JSON.parse(user).name);
  }, [redirectTo, router]);

  const logout = () => {
    localStorage.removeItem('@InvestSim:token');
    localStorage.removeItem('@InvestSim:user');
    router.push(redirectTo);
  };

  return { userName, logout };
}

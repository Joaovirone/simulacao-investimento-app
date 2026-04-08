import { useState } from 'react';
import type { FormEvent } from 'react';
import { toast } from 'sonner';
import { api } from '@/services/api';
import type { NumericOrEmpty, SimulationResult } from '@/types/simulation';

export function useDashboardSimulation() {
  const [investName, setInvestName] = useState('Reserva de Emergência');
  const [initialValue, setInitialValue] = useState<NumericOrEmpty>('');
  const [monthlyContribution, setMonthlyContribution] = useState<NumericOrEmpty>('');
  const [annualRate, setAnnualRate] = useState<NumericOrEmpty>('');
  const [termMonths, setTermMonths] = useState<NumericOrEmpty>('');
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const resetSimulation = () => {
    setResult(null);
    toast.info('Simulação limpa. Pronto para novo cálculo.');
  };

  const calculateSimulation = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post('/simulations', {
        investName,
        investType: 'Geral',
        initialValue: Number(initialValue),
        monthlyContribution: Number(monthlyContribution),
        annualRate: Number(annualRate),
        rateType: 'Prefixado',
        termMonths: Number(termMonths),
      });

      setResult({
        totalInvested: response.data.totalInvested,
        estimatedReturn: response.data.estimatedReturn,
        estimatedProfit: response.data.estimatedProfit,
        projectionHistory: response.data.projectionHistory,
      });

      toast.success('Simulação concluída!', {
        description: 'Resultados calculados com sucesso.',
      });
    } catch {
      toast.error('Erro ao calcular', {
        description: 'Sua sessão pode ter expirado. Tente logar novamente.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const profitPercent = result
    ? ((result.estimatedProfit / result.totalInvested) * 100).toFixed(1)
    : null;

  return {
    investName,
    initialValue,
    monthlyContribution,
    annualRate,
    termMonths,
    result,
    isLoading,
    profitPercent,
    setInvestName,
    setInitialValue,
    setMonthlyContribution,
    setAnnualRate,
    setTermMonths,
    calculateSimulation,
    resetSimulation,
  };
}

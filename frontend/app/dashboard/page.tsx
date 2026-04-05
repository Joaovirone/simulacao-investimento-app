"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';
import { toast } from 'sonner';
import { LineChart, DollarSign, TrendingUp, LogOut, RotateCcw } from 'lucide-react';
import { SimulationCharts } from './charts';

interface SimulationResult {
  totalInvested: number;
  estimatedReturn: number;
  estimatedProfit: number;
  projectionHistory: { month: number; balance: number }[];
}

export default function Dashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  
  // Estados do Form
  const [investName, setInvestName] = useState('Reserva de Emergência');
  const [initialValue, setInitialValue] = useState<number | ''>('');
  const [monthlyContribution, setMonthlyContribution] = useState<number | ''>('');
  const [annualRate, setAnnualRate] = useState<number | ''>('');
  const [termMonths, setTermMonths] = useState<number | ''>('');

  // Estados de Resultado
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Verifica Autenticação ao carregar
  useEffect(() => {
    const token = localStorage.getItem('@InvestSim:token');
    const user = localStorage.getItem('@InvestSim:user');
    
    if (!token || !user) {
      router.push('/');
      return;
    }
    setUserName(JSON.parse(user).name);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('@InvestSim:token');
    localStorage.removeItem('@InvestSim:user');
    router.push('/');
  };

  const handleReset = () => {
    setResult(null);
    toast.info('Dashboard resetado para nova simulação.');
  };

  const handleCalculate = async (e: React.FormEvent) => {
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
        termMonths: Number(termMonths)
      });

      setResult({
        totalInvested: response.data.totalInvested,
        estimatedReturn: response.data.estimatedReturn,
        estimatedProfit: response.data.estimatedProfit,
        projectionHistory: response.data.projectionHistory,
      });

      toast.success('Simulação concluída!', { description: 'Gráficos gerados com sucesso.' });
    } catch (error) {
      toast.error('Erro ao calcular', { description: 'Sua sessão pode ter expirado. Tente logar novamente.' });
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* CABEÇALHO */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2.5 rounded-xl shadow-sm">
              <LineChart className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">InvestSim</h1>
              <p className="text-sm text-slate-500">Olá, {userName}</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button onClick={handleReset} className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm">
              <RotateCcw className="w-4 h-4" /> Resetar
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-800 px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm">
              <LogOut className="w-4 h-4" /> Sair
            </button>
          </div>
        </header>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
            <div className="flex justify-between items-center text-slate-500 mb-2">
              <span className="text-sm font-medium">Total Investido</span>
              <DollarSign className="w-4 h-4" />
            </div>
            <span className="text-3xl font-bold text-slate-800">{result ? formatCurrency(result.totalInvested) : 'R$ 0,00'}</span>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm flex flex-col justify-center">
            <div className="flex justify-between items-center text-blue-600 mb-2">
              <span className="text-sm font-medium">Retorno Bruto Estimado</span>
              <TrendingUp className="w-4 h-4" />
            </div>
            <span className="text-3xl font-bold text-blue-700">{result ? formatCurrency(result.estimatedReturn) : 'R$ 0,00'}</span>
          </div>

          <div className="bg-green-50 p-6 rounded-xl border border-green-100 shadow-sm flex flex-col justify-center">
            <div className="flex justify-between items-center text-green-700 mb-2">
              <span className="text-sm font-medium">Lucro em Juros</span>
              <TrendingUp className="w-4 h-4" />
            </div>
            <span className="text-3xl font-bold text-green-800">{result ? formatCurrency(result.estimatedProfit) : 'R$ 0,00'}</span>
          </div>
        </div>

        {/* FORMULÁRIO */}
        <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-slate-800">Parâmetros da Simulação</h2>
          <form onSubmit={handleCalculate} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-medium text-slate-500">Nome do Objetivo</label>
              <input type="text" value={investName} onChange={(e) => setInvestName(e.target.value)} className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-600" required />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500">Valor Inicial (R$)</label>
              <input type="number" value={initialValue} onChange={(e) => setInitialValue(Number(e.target.value))} className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-600" required />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500">Aporte Mensal (R$)</label>
              <input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value))} className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-600" required />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500">Taxa Anual (%)</label>
              <input type="number" step="0.01" value={annualRate} onChange={(e) => setAnnualRate(Number(e.target.value))} className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-600" required />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500">Prazo (Meses)</label>
              <input type="number" value={termMonths} onChange={(e) => setTermMonths(Number(e.target.value))} className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-600" required />
            </div>
            
            {/* Botão ocupar as colunas restantes se necessário, mas aqui vamos forçar em 1 coluna ou largura total no mobile */}
            <button type="submit" disabled={isLoading} className="md:col-span-5 w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition shadow-md disabled:opacity-50 mt-2">
              {isLoading ? 'Calculando a mágica...' : 'Executar Simulação'}
            </button>
          </form>
        </div>

        {/* RENDERIZAÇÃO DOS GRÁFICOS */}
        {result && (
          <SimulationCharts 
            history={result.projectionHistory} 
            totalInvested={result.totalInvested}
            totalProfit={result.estimatedProfit}
          />
        )}

      </div>
    </div>
  );
}
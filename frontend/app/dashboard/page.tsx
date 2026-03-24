"use client"; // Obrigatório no Next.js para usar useState e onClick

import { useState } from 'react';
import { api } from '@/services/api'; // Ajuste o caminho de importação se necessário
import { LineChart, DollarSign, TrendingUp, Trash2 } from 'lucide-react';

// 1. O "Contrato" do que vamos receber da API
interface SimulationResult {
  totalInvested: number;
  estimatedReturn: number;
  estimatedProfit: number;
}

export default function Dashboard() {
  // 2. Estados do Formulário (O que o usuário digita)
  const [investName, setInvestName] = useState('Meu Investimento');
  const [investType, setInvestType] = useState('CDB');
  const [initialValue, setInitialValue] = useState<number | ''>('');
  const [monthlyContribution, setMonthlyContribution] = useState<number | ''>('');
  const [annualRate, setAnnualRate] = useState<number | ''>('');
  const [rateType, setRateType] = useState('Dinâmico');
  const [termMonths, setTermMonths] = useState<number | ''>('');

  // 3. Estado do Resultado (O que vem do Backend para os KPIs)
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 4. A Função que faz a mágica acontecer
  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita que a página recarregue ao enviar o form
    setIsLoading(true);

    try {
      // Chama o nosso backend enviando os dados do estado
      const response = await api.post('/simulations', {
        investName,
        investType,
        initialValue: Number(initialValue),
        monthlyContribution: Number(monthlyContribution),
        annualRate: Number(annualRate),
        rateType,
        termMonths: Number(termMonths)
      });

      // Atualiza os cards de KPI com a resposta do backend
      setResult({
        totalInvested: response.data.totalInvested,
        estimatedReturn: response.data.estimatedReturn,
        estimatedProfit: response.data.estimatedProfit,
      });

      alert('Simulação salva com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Erro ao calcular simulação. Verifique o console.');
    } finally {
      setIsLoading(false);
    }
  };

  // Função para formatar dinheiro (R$)
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 flex justify-center font-sans text-slate-800">
      <div className="w-full max-w-5xl space-y-6">
        
        <header className="flex items-center gap-2 mb-8">
          <div className="bg-blue-600 p-2 rounded-lg">
            <LineChart className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">InvestSim</h1>
        </header>

        <h2 className="text-xl font-semibold">Meu Dashboard</h2>
        
        {/* CARDS DE KPI DINÂMICOS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center text-slate-500 mb-2">
              <span className="text-sm font-medium">Total Investido</span>
              <DollarSign className="w-4 h-4" />
            </div>
            <span className="text-2xl font-bold">
              {result ? formatCurrency(result.totalInvested) : 'R$ 0,00'}
            </span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm">
            <div className="flex justify-between items-center text-blue-600 mb-2">
              <span className="text-sm font-medium">Retorno Estimado</span>
              <TrendingUp className="w-4 h-4" />
            </div>
            <span className="text-2xl font-bold text-blue-700">
              {result ? formatCurrency(result.estimatedReturn) : 'R$ 0,00'}
            </span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm">
            <div className="flex justify-between items-center text-blue-600 mb-2">
              <span className="text-sm font-medium">Lucro Estimado</span>
              <TrendingUp className="w-4 h-4" />
            </div>
            <span className="text-2xl font-bold text-blue-700">
              {result ? formatCurrency(result.estimatedProfit) : 'R$ 0,00'}
            </span>
          </div>
        </div>

        {/* FORMULÁRIO INTERATIVO */}
        <form onSubmit={handleCalculate} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <p className="text-sm text-slate-500 mb-4">Simule seus investimentos</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Nome do Investimento */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Nome da Simulação</label>
              <input 
                type="text" 
                value={investName}
                onChange={(e) => setInvestName(e.target.value)}
                placeholder="Ex: Reserva de Emergência" 
                className="w-full border border-slate-300 rounded-md p-2 text-sm" 
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Valor Inicial (R$)</label>
              <input 
                type="number" 
                value={initialValue}
                onChange={(e) => setInitialValue(Number(e.target.value))}
                placeholder="1000" 
                className="w-full border border-slate-300 rounded-md p-2 text-sm" 
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Aporte Mensal (R$)</label>
              <input 
                type="number" 
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                placeholder="200" 
                className="w-full border border-slate-300 rounded-md p-2 text-sm" 
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="space-y-1">
              <label className="text-sm font-medium">Taxa Anual (%)</label>
              <input 
                type="number" 
                step="0.01"
                value={annualRate}
                onChange={(e) => setAnnualRate(Number(e.target.value))}
                placeholder="12.5" 
                className="w-full border border-slate-300 rounded-md p-2 text-sm" 
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Período (meses)</label>
              <input 
                type="number" 
                value={termMonths}
                onChange={(e) => setTermMonths(Number(e.target.value))}
                placeholder="12" 
                className="w-full border border-slate-300 rounded-md p-2 text-sm" 
                required
              />
            </div>
            <div className="space-y-1 flex items-end">
               <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-blue-600 text-white hover:bg-blue-700 font-medium py-2 rounded-md transition disabled:opacity-50"
              >
                {isLoading ? 'Calculando...' : 'Calcular Retorno'}
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}
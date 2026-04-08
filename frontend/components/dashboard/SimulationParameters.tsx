import { Sparkles, Target, DollarSign, Percent, CalendarDays, Wallet } from 'lucide-react';
import type { FormEvent } from 'react';
import { SimulationField } from '@/components/dashboard/SimulationField';
import type { NumericOrEmpty } from '@/types/simulation';

interface SimulationParametersProps {
  investName: string;
  initialValue: NumericOrEmpty;
  monthlyContribution: NumericOrEmpty;
  annualRate: NumericOrEmpty;
  termMonths: NumericOrEmpty;
  isLoading: boolean;
  onInvestNameChange: (value: string) => void;
  onInitialValueChange: (value: NumericOrEmpty) => void;
  onMonthlyContributionChange: (value: NumericOrEmpty) => void;
  onAnnualRateChange: (value: NumericOrEmpty) => void;
  onTermMonthsChange: (value: NumericOrEmpty) => void;
  onSubmit: (e: FormEvent) => void;
}

export function SimulationParameters({
  investName,
  initialValue,
  monthlyContribution,
  annualRate,
  termMonths,
  isLoading,
  onInvestNameChange,
  onInitialValueChange,
  onMonthlyContributionChange,
  onAnnualRateChange,
  onTermMonthsChange,
  onSubmit,
}: SimulationParametersProps) {
  const fields = [
    { label: 'Valor Inicial', placeholder: '5.000', value: initialValue, setter: onInitialValueChange, icon: DollarSign, prefix: 'R$' },
    { label: 'Aporte Mensal', placeholder: '500', value: monthlyContribution, setter: onMonthlyContributionChange, icon: Wallet, prefix: 'R$' },
    { label: 'Taxa Anual', placeholder: '12', value: annualRate, setter: onAnnualRateChange, icon: Percent, prefix: '%' },
    { label: 'Prazo', placeholder: '24', value: termMonths, setter: onTermMonthsChange, icon: CalendarDays, prefix: 'meses' },
  ];

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 fade-in-up fade-in-up-delay-2">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.25)'}}>
          <Target className="w-3.5 h-3.5" style={{color: '#60a5fa'}} />
        </div>
        <h2 className="text-base font-bold" style={{fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)'}}>
          Parâmetros da Simulação
        </h2>
      </div>

      <form onSubmit={onSubmit}>
        <div className="mb-4 space-y-2">
          <label className="text-xs font-medium uppercase tracking-widest" style={{color: 'var(--text-muted)'}}>
            Nome do objetivo
          </label>
          <div className="relative">
            <Target className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" style={{color: 'var(--text-muted)'}} />
            <input
              type="text"
              value={investName}
              onChange={(e) => onInvestNameChange(e.target.value)}
              className="dark-input w-full rounded-xl py-3 pl-10 pr-4 text-sm"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
          {fields.map(({ label, placeholder, value, setter, icon: Icon, prefix }) => (
            <SimulationField
              key={label}
              label={label}
              placeholder={placeholder}
              value={value}
              prefix={prefix}
              icon={Icon}
              step={label === 'Taxa Anual' ? '0.01' : '1'}
              onChange={setter}
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full py-4 rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <span>{isLoading ? 'Calculando...' : 'Executar Simulação'}</span>
          {!isLoading && <Sparkles className="w-4 h-4 relative z-10" />}
        </button>
      </form>
    </div>
  );
}

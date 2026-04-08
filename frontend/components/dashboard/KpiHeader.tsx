import { DollarSign, Sparkles, ArrowUpRight } from 'lucide-react';
import type { SimulationResult } from '@/types/simulation';

interface KpiHeaderProps {
  result: SimulationResult | null;
  profitPercent: string | null;
  formatCurrency: (value: number) => string;
}

export function KpiHeader({ result, profitPercent, formatCurrency }: KpiHeaderProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 fade-in-up fade-in-up-delay-1">
      <div className="kpi-card glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="badge badge-blue">Investido</div>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)'}}>
            <DollarSign className="w-4 h-4" style={{color: '#60a5fa'}} />
          </div>
        </div>
        <div className="stat-value">
          <p className="text-2xl font-bold mb-1" style={{fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)'}}>
            {result ? formatCurrency(result.totalInvested) : 'R$ —'}
          </p>
          <p className="text-xs" style={{color: 'var(--text-muted)'}}>Capital aportado total</p>
        </div>
      </div>

      <div className="kpi-card glass-card rounded-2xl p-6" style={{border: '1px solid rgba(6,182,212,0.2)', background: 'rgba(6,182,212,0.04)'}}>
        <div className="flex items-center justify-between mb-4">
          <div className="badge" style={{background: 'rgba(6,182,212,0.15)', color: '#22d3ee', border: '1px solid rgba(6,182,212,0.25)'}}>
            Retorno Bruto
          </div>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)'}}>
            <ArrowUpRight className="w-4 h-4" style={{color: '#22d3ee'}} />
          </div>
        </div>
        <div className="stat-value">
          <p className="text-2xl font-bold mb-1" style={{fontFamily: 'Syne, sans-serif', color: '#22d3ee'}}>
            {result ? formatCurrency(result.estimatedReturn) : 'R$ —'}
          </p>
          <p className="text-xs" style={{color: 'var(--text-muted)'}}>Valor final estimado</p>
        </div>
      </div>

      <div className="kpi-card glass-card rounded-2xl p-6" style={{border: '1px solid rgba(16,185,129,0.2)', background: 'rgba(16,185,129,0.04)'}}>
        <div className="flex items-center justify-between mb-4">
          <div className="badge badge-green">Lucro Juros</div>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)'}}>
            <Sparkles className="w-4 h-4" style={{color: '#34d399'}} />
          </div>
        </div>
        <div className="stat-value">
          <p className="text-2xl font-bold mb-1" style={{fontFamily: 'Syne, sans-serif', color: '#34d399'}}>
            {result ? formatCurrency(result.estimatedProfit) : 'R$ —'}
          </p>
          <p className="text-xs" style={{color: 'var(--text-muted)'}}>
            {profitPercent ? `+${profitPercent}% sobre o capital` : 'Rendimento dos juros compostos'}
          </p>
        </div>
      </div>
    </div>
  );
}

'use client';

import { EvolutionChart } from '@/components/dashboard/EvolutionChart';
import { CompositionChart } from '@/components/dashboard/CompositionChart';
import type { HistoryEntry } from '@/types/simulation';
import { formatCurrencyBRL } from '@/utils/currency';

interface ChartsProps {
  history: HistoryEntry[];
  totalInvested: number;
  totalProfit: number;
}

const COLORS = ['#3b82f6', '#10b981'];

export function SimulationCharts({ history, totalInvested, totalProfit }: ChartsProps) {
  const allocationData = [
    { name: 'Capital Investido', value: totalInvested },
    { name: 'Juros Ganhos', value: totalProfit },
  ];

  const lastBalance = history[history.length - 1]?.balance ?? 0;
  const profitPercent = ((totalProfit / totalInvested) * 100).toFixed(1);

  return (
    <div className="space-y-4">
      
      {/* Result summary bar */}
      <div className="glass-card rounded-2xl p-5 flex flex-wrap items-center gap-6" 
           style={{background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.15)'}}>
        <div>
          <p className="text-xs uppercase tracking-widest mb-1" style={{color: '#34d399', fontFamily: 'Syne, sans-serif'}}>
            Patrimônio Final
          </p>
          <p className="text-2xl font-bold" style={{fontFamily: 'Syne, sans-serif', color: '#f1f5f9'}}>
            {formatCurrencyBRL(lastBalance)}
          </p>
        </div>
        <div className="w-px h-10 hidden md:block" style={{background: 'rgba(255,255,255,0.08)'}} />
        <div>
          <p className="text-xs uppercase tracking-widest mb-1" style={{color: 'var(--text-muted)', fontFamily: 'Syne, sans-serif'}}>
            Rentabilidade Total
          </p>
          <p className="text-2xl font-bold" style={{fontFamily: 'Syne, sans-serif', color: '#34d399'}}>
            +{profitPercent}%
          </p>
        </div>
        <div className="w-px h-10 hidden md:block" style={{background: 'rgba(255,255,255,0.08)'}} />
        <div>
          <p className="text-xs uppercase tracking-widest mb-1" style={{color: 'var(--text-muted)', fontFamily: 'Syne, sans-serif'}}>
            Lucro em Juros
          </p>
          <p className="text-2xl font-bold" style={{fontFamily: 'Syne, sans-serif', color: '#34d399'}}>
            {formatCurrencyBRL(totalProfit)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <EvolutionChart history={history} />
        <CompositionChart allocationData={allocationData} colors={COLORS} />
      </div>
    </div>
  );
}

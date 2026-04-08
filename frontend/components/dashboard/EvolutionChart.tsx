import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { HistoryEntry } from '@/types/simulation';
import { formatCurrencyBRL } from '@/utils/currency';

interface EvolutionChartProps {
  history: HistoryEntry[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const value = formatCurrencyBRL(payload[0].value);
    return (
      <div style={{
        background: '#1e293b',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px',
        padding: '10px 14px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <p style={{color: '#64748b', fontSize: '11px', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.08em'}}>
          Mês {label}
        </p>
        <p style={{color: '#f1f5f9', fontWeight: '600', fontSize: '14px'}}>{value}</p>
      </div>
    );
  }
  return null;
};

export function EvolutionChart({ history }: EvolutionChartProps) {
  return (
    <div className="lg:col-span-2 glass-card rounded-2xl p-6" style={{height: '380px', display: 'flex', flexDirection: 'column'}}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-bold" style={{fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)'}}>
            Evolução do Patrimônio
          </h3>
          <p className="text-xs mt-0.5" style={{color: 'var(--text-muted)'}}>Crescimento com juros compostos ao longo dos meses</p>
        </div>
        <div className="badge badge-green">Juros Compostos</div>
      </div>

      <div style={{flex: 1, minHeight: 0}}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={history} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.04)" />
            <XAxis
              dataKey="month"
              tick={{ fill: '#475569', fontSize: 11, fontFamily: "'DM Sans', sans-serif" }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tickFormatter={(val) => `R$${val >= 1000 ? (val / 1000).toFixed(0) + 'k' : val}`}
              tick={{ fill: '#475569', fontSize: 11, fontFamily: "'DM Sans', sans-serif" }}
              tickLine={false}
              axisLine={false}
              width={60}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="url(#lineGradient)"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, fill: '#06b6d4', stroke: '#0d1321', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

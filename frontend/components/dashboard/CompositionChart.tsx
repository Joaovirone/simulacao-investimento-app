import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { formatCurrencyBRL } from '@/utils/currency';

interface AllocationEntry {
  name: string;
  value: number;
}

interface CompositionChartProps {
  allocationData: AllocationEntry[];
  colors: string[];
}

const PieTooltip = ({ active, payload }: any) => {
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
        <p style={{color: payload[0].payload.fill, fontSize: '11px', marginBottom: '4px', fontWeight: '600'}}>
          {payload[0].name}
        </p>
        <p style={{color: '#f1f5f9', fontWeight: '600', fontSize: '14px'}}>{value}</p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: any) => (
  <div style={{display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '12px'}}>
    {payload?.map((entry: any, index: number) => (
      <div key={index} style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
        <div
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: entry.color,
            flexShrink: 0,
            boxShadow: `0 0 6px ${entry.color}`,
          }}
        />
        <span style={{fontSize: '12px', color: '#94a3b8', fontFamily: "'DM Sans', sans-serif"}}>{entry.value}</span>
      </div>
    ))}
  </div>
);

export function CompositionChart({ allocationData, colors }: CompositionChartProps) {
  return (
    <div className="glass-card rounded-2xl p-6" style={{height: '380px', display: 'flex', flexDirection: 'column'}}>
      <div className="mb-5">
        <h3 className="text-base font-bold" style={{fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)'}}>
          Composição Final
        </h3>
        <p className="text-xs mt-0.5" style={{color: 'var(--text-muted)'}}>Capital vs rendimento</p>
      </div>

      <div style={{flex: 1, minHeight: 0}}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <Pie
              data={allocationData}
              cx="50%"
              cy="43%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
              strokeWidth={0}
            >
              {allocationData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} filter="url(#glow)" />
              ))}
            </Pie>
            <Tooltip content={<PieTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

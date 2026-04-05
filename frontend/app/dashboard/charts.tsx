// frontend/src/app/dashboard/charts.tsx
'use client';

import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

interface HistoryEntry {
  month: number;
  balance: number;
}

interface ChartsProps {
  history: HistoryEntry[];
  totalInvested: number;
  totalProfit: number;
}

const COLORS = ['#2563eb', '#10b981']; // Azul (Investido) e Verde (Lucro)

export function SimulationCharts({ history, totalInvested, totalProfit }: ChartsProps) {
  const allocationData = [
    { name: 'Total Investido (Seu Bolso)', value: totalInvested },
    { name: 'Juros Ganhos (Lucro)', value: totalProfit },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
      
      {/* GRÁFICO DE EVOLUÇÃO (Ocupa 2 colunas) */}
      <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-96 flex flex-col">
        <h3 className="font-semibold text-lg text-slate-800 mb-4">Evolução do Patrimônio (Juros Compostos)</h3>
        <div className="flex-1 w-full h-full min-h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history} margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} />
              <YAxis 
                tickFormatter={(val) => `R$ ${val >= 1000 ? (val/1000).toFixed(0) + 'k' : val}`} 
                tick={{fill: '#64748b', fontSize: 12}} 
                tickLine={false} 
                axisLine={false}
              />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), 'Saldo']}
                labelFormatter={(label) => `Mês ${label}`}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Line 
                type="monotone" 
                dataKey="balance" 
                stroke="#2563eb" 
                strokeWidth={3} 
                dot={false}
                activeDot={{ r: 6, fill: '#2563eb', stroke: '#fff', strokeWidth: 2 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* GRÁFICO DE PIZZA (Ocupa 1 coluna) */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-96 flex flex-col items-center">
        <h3 className="font-semibold text-lg text-slate-800 mb-4 w-full text-left">Composição Final</h3>
        <div className="flex-1 w-full h-full min-h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={allocationData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {allocationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
"use client";

import { SimulationCharts } from './charts';
import { KpiHeader } from '@/components/dashboard/KpiHeader';
import { SimulationParameters } from '@/components/dashboard/SimulationParameters';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { useDashboardSimulation } from '@/hooks/useDashboardSimulation';
import { formatCurrencyBRL } from '@/utils/currency';
import { AppBackground } from '@/components/layout/AppBackground';
import { useAuthenticatedUser } from '@/hooks/useAuthenticatedUser';

export default function Dashboard() {
  const { userName, logout } = useAuthenticatedUser('/');
  const {
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
  } = useDashboardSimulation();

  return (
    <AppBackground variant="dashboard">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-10 space-y-6 relative z-10">

        <DashboardHeader
          userName={userName}
          hasResult={Boolean(result)}
          onReset={resetSimulation}
          onLogout={logout}
        />

        <KpiHeader result={result} profitPercent={profitPercent} formatCurrency={formatCurrencyBRL} />

        <SimulationParameters
          investName={investName}
          initialValue={initialValue}
          monthlyContribution={monthlyContribution}
          annualRate={annualRate}
          termMonths={termMonths}
          isLoading={isLoading}
          onInvestNameChange={setInvestName}
          onInitialValueChange={setInitialValue}
          onMonthlyContributionChange={setMonthlyContribution}
          onAnnualRateChange={setAnnualRate}
          onTermMonthsChange={setTermMonths}
          onSubmit={calculateSimulation}
        />

        {/* CHARTS */}
        {result && (
          <div className="fade-in-up">
            <SimulationCharts
              history={result.projectionHistory}
              totalInvested={result.totalInvested}
              totalProfit={result.estimatedProfit}
            />
          </div>
        )}

        {/* Footer */}
        <footer className="text-center pb-4">
          <p className="text-xs" style={{color: 'var(--text-muted)'}}>
            InvestSim — Simulações ilustrativas. Não constitui recomendação de investimento.
          </p>
        </footer>

      </div>
    </AppBackground>
  );
}

import { LogOut, RotateCcw } from 'lucide-react';
import { BrandLogo } from '@/components/ui/BrandLogo';

interface DashboardHeaderProps {
  userName: string;
  hasResult: boolean;
  onReset: () => void;
  onLogout: () => void;
}

export function DashboardHeader({ userName, hasResult, onReset, onLogout }: DashboardHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 fade-in-up">
      <div className="flex items-center gap-4">
        <BrandLogo showText={false} />
        <div>
          <h1 className="text-xl font-bold" style={{fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)'}}>
            InvestSim
          </h1>
          <p className="text-xs" style={{color: 'var(--text-muted)'}}>
            Olá, <span style={{color: 'var(--text-secondary)'}}>{userName}</span>
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        {hasResult && (
          <button onClick={onReset} className="btn-secondary flex items-center gap-2 px-4 py-2 rounded-xl text-xs">
            <RotateCcw className="w-3.5 h-3.5" />
            Nova simulação
          </button>
        )}
        <button onClick={onLogout} className="btn-secondary flex items-center gap-2 px-4 py-2 rounded-xl text-xs">
          <LogOut className="w-3.5 h-3.5" />
          Sair
        </button>
      </div>
    </header>
  );
}

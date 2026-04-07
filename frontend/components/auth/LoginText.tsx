import { BarChart3, Zap, Shield } from 'lucide-react';
import { BrandLogo } from '@/components/ui/BrandLogo';

const features = [
  { icon: BarChart3, text: 'Gráficos de evolução patrimonial' },
  { icon: Zap, text: 'Cálculo instantâneo de juros compostos' },
  { icon: Shield, text: 'Dados seguros e privados' },
];

export function LoginText() {
  return (
    <div className="login-brand-panel hidden lg:flex flex-col justify-between p-12 rounded-l-2xl relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 right-0 h-px" style={{background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.5), transparent)'}} />
      </div>

      <div className="fade-in-up">
        <BrandLogo textClassName="text-[var(--text-primary)]" />
      </div>

      <div className="space-y-6 fade-in-up fade-in-up-delay-1">
        <div className="badge badge-blue mb-4">Simulador Financeiro</div>
        <h2 className="text-4xl font-bold leading-tight" style={{fontFamily: 'Syne, sans-serif'}}>
          Visualize o futuro do{' '}
          <span className="gradient-text">seu patrimônio</span>
        </h2>
        <p className="text-base leading-relaxed" style={{color: 'var(--text-secondary)'}}>
          Simule investimentos com juros compostos, acompanhe a evolução em gráficos interativos e tome decisões financeiras com clareza.
        </p>

        <div className="space-y-3 pt-2">
          {features.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.2)'}}>
                <Icon className="w-3.5 h-3.5" style={{color: '#60a5fa'}} />
              </div>
              <span className="text-sm" style={{color: 'var(--text-secondary)'}}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="fade-in-up fade-in-up-delay-2 glass-card rounded-xl p-4" style={{background: 'rgba(255,255,255,0.03)'}}>
        <p className="text-xs mb-1" style={{color: 'var(--text-muted)', fontFamily: 'Syne, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase'}}>Exemplo de simulação</p>
        <p className="text-sm" style={{color: 'var(--text-secondary)'}}>R$ 500/mês × 24 meses × 12% a.a.</p>
        <p className="text-2xl font-bold gradient-text mt-1" style={{fontFamily: 'Syne, sans-serif'}}>R$ 13.486,28</p>
        <p className="text-xs mt-1" style={{color: 'var(--text-muted)'}}>+R$ 1.486 em juros</p>
      </div>
    </div>
  );
}

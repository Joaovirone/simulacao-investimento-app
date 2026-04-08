import { BrandLogo } from '@/components/ui/BrandLogo';

export function RegisterText() {
  return (
    <div className="text-center mb-8 fade-in-up">
      <div className="flex justify-center mb-5">
        <BrandLogo size="lg" showText={false} />
      </div>
      <div className="badge badge-blue mb-3" style={{display: 'inline-block'}}>Acesso Gratuito</div>
      <h1 className="text-3xl font-bold mb-2" style={{fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)'}}>
        Crie sua conta
      </h1>
      <p className="text-sm" style={{color: 'var(--text-secondary)'}}>
        Comece a simular seus investimentos em segundos
      </p>
    </div>
  );
}

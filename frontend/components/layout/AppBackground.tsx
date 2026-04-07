import type { ReactNode } from 'react';

type BackgroundVariant = 'auth-login' | 'auth-register' | 'dashboard';

interface AppBackgroundProps {
  variant: BackgroundVariant;
  children: ReactNode;
}

export function AppBackground({ variant, children }: AppBackgroundProps) {
  const isDashboard = variant === 'dashboard';

  return (
    <div className={`min-h-screen bg-grid relative ${isDashboard ? '' : 'flex items-center justify-center p-4 overflow-hidden'}`} style={{ background: 'var(--bg-primary)' }}>
      {isDashboard ? (
        <>
          <div className="fixed top-0 left-0 right-0 h-px pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.5), rgba(6,182,212,0.5), transparent)' }} />
          <div className="orb orb-blue fixed -top-60 left-1/4 pointer-events-none" style={{ opacity: 0.2 }} />
          <div className="orb orb-cyan fixed bottom-0 right-0 pointer-events-none" style={{ opacity: 0.15 }} />
        </>
      ) : (
        <>
          {variant === 'auth-login' && (
            <>
              <div className="orb orb-blue absolute -top-40 -left-20 pointer-events-none" />
              <div className="orb orb-cyan absolute bottom-0 right-0 pointer-events-none" />
              <div className="orb orb-violet absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            </>
          )}
          {variant === 'auth-register' && (
            <>
              <div className="orb orb-violet absolute -top-20 right-10 pointer-events-none" />
              <div className="orb orb-blue absolute bottom-10 -left-20 pointer-events-none" />
              <div className="orb orb-cyan absolute top-1/3 right-1/4 pointer-events-none" style={{ opacity: 0.2 }} />
            </>
          )}
        </>
      )}
      {children}
    </div>
  );
}

import { TrendingUp } from 'lucide-react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  textClassName?: string;
  iconContainerClassName?: string;
  iconClassName?: string;
  showText?: boolean;
}

const sizes = {
  sm: {
    container: 'w-9 h-9 rounded-xl',
    icon: 'w-4 h-4',
    text: 'text-xl',
  },
  md: {
    container: 'w-10 h-10 rounded-xl',
    icon: 'w-5 h-5',
    text: 'text-xl',
  },
  lg: {
    container: 'w-12 h-12 rounded-2xl',
    icon: 'w-6 h-6',
    text: 'text-2xl',
  },
};

export function BrandLogo({
  size = 'md',
  textClassName = '',
  iconContainerClassName = '',
  iconClassName = 'text-white',
  showText = true,
}: BrandLogoProps) {
  const config = sizes[size];

  return (
    <div className="flex items-center gap-3">
      <div
        className={`logo-glow ${config.container} flex items-center justify-center ${iconContainerClassName}`.trim()}
        style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)' }}
      >
        <TrendingUp className={`${config.icon} ${iconClassName}`.trim()} />
      </div>
      {showText && (
        <span
          className={`${config.text} font-bold ${textClassName}`.trim()}
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          InvestSim
        </span>
      )}
    </div>
  );
}

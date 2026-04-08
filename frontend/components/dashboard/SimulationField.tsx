import type { LucideIcon } from 'lucide-react';
import type { NumericOrEmpty } from '@/types/simulation';

interface SimulationFieldProps {
  label: string;
  placeholder: string;
  value: NumericOrEmpty;
  prefix: string;
  icon: LucideIcon;
  step?: string;
  onChange: (value: NumericOrEmpty) => void;
}

export function SimulationField({
  label,
  placeholder,
  value,
  prefix,
  icon: Icon,
  step,
  onChange,
}: SimulationFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium uppercase tracking-widest" style={{color: 'var(--text-muted)'}}>
        {label}
      </label>
      <div className="relative">
        <Icon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" style={{color: 'var(--text-muted)'}} />
        <input
          type="number"
          step={step ?? '1'}
          value={value}
          onChange={(e) => onChange(Number(e.target.value) as NumericOrEmpty)}
          placeholder={placeholder}
          className="dark-input w-full rounded-xl py-3 pl-10 pr-4 text-sm"
          required
        />
      </div>
      <p className="text-xs pl-1" style={{color: 'var(--text-muted)'}}>{prefix}</p>
    </div>
  );
}

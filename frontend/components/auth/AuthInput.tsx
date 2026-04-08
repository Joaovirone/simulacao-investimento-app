import type { LucideIcon } from 'lucide-react';

interface AuthInputProps {
  label: string;
  type: 'text' | 'email' | 'password' | 'number';
  value: string | number;
  placeholder: string;
  icon: LucideIcon;
  onChange: (value: string) => void;
  step?: string;
}

export function AuthInput({
  label,
  type,
  value,
  placeholder,
  icon: Icon,
  onChange,
  step,
}: AuthInputProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium uppercase tracking-widest" style={{color: 'var(--text-muted)'}}>
        {label}
      </label>
      <div className="relative">
        <Icon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" style={{color: 'var(--text-muted)'}} />
        <input
          type={type}
          value={value}
          step={step}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="dark-input w-full rounded-xl py-3 pl-10 pr-4 text-sm"
          required
        />
      </div>
    </div>
  );
}

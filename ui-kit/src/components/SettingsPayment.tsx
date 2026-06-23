// Reproduced from Figma node 293:45 (_Custom / Settings / Payment) visible in
// Example section 288:1901 (file uo2jhkx6oBwYpiFJxWnLJf).
// Node 293:45 is a MUI-based mockup — this component replicates its visual
// structure using the project's own design tokens instead of MUI variables:
//   --text/primary           → --color-neutrals-content
//   --text/secondary         → --color-neutrals-content-subdued
//   --_components/.../border → --color-neutrals-border
//   --background/paper-0     → --color-neutrals-bg-canvas
//   --borderradius (4 px)    → --radius-sm

import { CreditCard01 } from '../icons/components/finance/CreditCard01';

// ─── Outlined input (MUI TextField visual replica) ─────────────────────────────

interface OutlinedInputProps {
  label: string;
  value?: string;
  startIcon?: React.ReactNode;
  className?: string;
}

function OutlinedInput({ label, value = '', startIcon, className }: OutlinedInputProps) {
  return (
    <div className={['relative', className].filter(Boolean).join(' ')}>
      <div className="border border-[var(--color-neutrals-border)] rounded-[var(--radius-sm)] px-3 w-full">
        <div className="flex items-center gap-2 py-4 min-h-6 overflow-hidden">
          {startIcon && (
            <div className="shrink-0 text-[var(--color-neutrals-content-subdued)]">
              {startIcon}
            </div>
          )}
          <span className="flex-1 font-normal text-base leading-6 tracking-[var(--letter-spacing-body)] text-[var(--color-neutrals-content)] whitespace-nowrap overflow-hidden text-ellipsis">
            {value || '​'}
          </span>
        </div>
      </div>
      {/* Floating label — absolutely positioned above border */}
      <div className="absolute left-3 top-0 -translate-y-1/2 bg-[var(--color-neutrals-bg-canvas)] px-1 flex items-center pointer-events-none">
        <span className="text-xs font-normal leading-3 tracking-[var(--letter-spacing-body)] text-[var(--color-neutrals-content-subdued)] whitespace-nowrap">
          {label}
        </span>
      </div>
    </div>
  );
}

// ─── SettingsPayment ───────────────────────────────────────────────────────────

export function SettingsPayment() {
  return (
    <div className="flex flex-col w-full gap-6 pt-1">
      <h3 className="text-xl font-medium leading-8 tracking-[var(--letter-spacing-body)] text-[var(--color-neutrals-content)] m-0">
        Payment Method
      </h3>

      <OutlinedInput
        label="Card number"
        value="4242 **** **** **** ****"
        startIcon={<CreditCard01 width={24} height={24} aria-hidden />}
      />

      <OutlinedInput label="Cardholder name" value="John Doe" />

      <div className="flex gap-4">
        <OutlinedInput label="Expiration date" value="MM / YY" className="flex-1" />
        <OutlinedInput label="CVC / CVC2" className="flex-1" />
      </div>
    </div>
  );
}

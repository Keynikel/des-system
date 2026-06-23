// Storybook stories for Checkbox — CSF3 (Storybook 7+).
// Source of truth: Figma 377:2609.

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import type { CheckedState, CheckboxForceState } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// ── AllStates ──────────────────────────────────────────────────────────────────
// 3 variants × 4 states grid.

const VARIANTS: CheckedState[]      = ['unchecked', 'checked', 'indeterminate'];
const STATES: (CheckboxForceState | 'default')[] = ['default', 'hover', 'pressed', 'disabled'];

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'inline-grid', gridTemplateColumns: '5rem repeat(3, 1fr)', gap: '16px 24px', alignItems: 'center' }}>
      {/* Header row */}
      <div />
      {VARIANTS.map(v => (
        <span key={v} style={{ fontSize: 12, color: '#60646c', fontFamily: 'monospace' }}>{v}</span>
      ))}
      {/* State rows */}
      {STATES.map(state => [
        <span key={`lbl-${state}`} style={{ fontSize: 12, color: '#8b8d98', fontFamily: 'monospace' }}>{state}</span>,
        ...VARIANTS.map(v => (
          <Checkbox
            key={`${state}-${v}`}
            checked={v}
            forceState={state === 'default' ? undefined : state}
          />
        )),
      ])}
    </div>
  ),
};

// ── WithLabel ──────────────────────────────────────────────────────────────────

export const WithLabel: Story = {
  args: {
    checked: 'unchecked',
    label: 'Accept terms and conditions',
  },
};

// ── WithSubtitle ───────────────────────────────────────────────────────────────

export const WithSubtitle: Story = {
  args: {
    checked: 'checked',
    label: 'Send me product updates',
    subtitle: 'We'll send occasional emails about new features and improvements.',
  },
};

// ── LabelOnly ─────────────────────────────────────────────────────────────────

export const LabelOnly: Story = {
  args: {
    checked: 'unchecked',
    label: 'Remember me',
  },
};

// ── Controlled ────────────────────────────────────────────────────────────────
// Click to cycle: unchecked → checked → indeterminate → unchecked.

const CYCLE: CheckedState[] = ['unchecked', 'checked', 'indeterminate'];

function ControlledDemo() {
  const [state, setState] = useState<CheckedState>('unchecked');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <Checkbox
        checked={state}
        label={`State: ${state} — click to cycle`}
        onChange={() => setState(prev => CYCLE[(CYCLE.indexOf(prev) + 1) % 3])}
      />
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledDemo />,
};

// ── Disabled ──────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      {VARIANTS.map(v => (
        <Checkbox key={v} checked={v} label={v} forceState="disabled" />
      ))}
    </div>
  ),
};

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    checked:    'unchecked',
    label:      'Checkbox label',
    subtitle:   '',
    forceState: undefined,
  },
  argTypes: {
    checked:    { control: 'select', options: VARIANTS },
    forceState: { control: 'select', options: ['', 'hover', 'pressed', 'disabled'] },
  },
};

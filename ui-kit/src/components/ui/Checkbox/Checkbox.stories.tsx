// Source of truth: Figma uo2jhkx6oBwYpiFJxWnLJf — node 377:756 (Checkbox component set)

import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
  argTypes: {
    forceState: {
      control: { type: 'select' },
      options: ['default', 'hover', 'focus', 'disabled'],
    },
  },
  args: {
    label: 'Label',
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// ── Individual variant stories ─────────────────────────────────────────────────

export const Default: Story = {
  args: { label: undefined },
};

export const WithLabel: Story = {
  args: { label: 'Accept terms' },
};

export const Checked: Story = {
  args: { checked: true, onChange: () => {} },
};

export const Indeterminate: Story = {
  args: { indeterminate: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  args: { disabled: true, checked: true, onChange: () => {} },
};

export const DisabledIndeterminate: Story = {
  args: { disabled: true, indeterminate: true },
};

export const HoverState: Story = {
  args: { forceState: 'hover' },
};

export const FocusState: Story = {
  args: { forceState: 'focus' },
};

// ── AllStates: full grid of variant × state ────────────────────────────────────
// Matches the 3×4 matrix in the Figma spec (Unchecked / Checked / Indeterminate × Default / Hover / Pressed-as-hover / Disabled).

const VARIANTS = [
  { label: 'Unchecked', props: {} },
  { label: 'Checked',   props: { checked: true as const, onChange: () => {} } },
  { label: 'Indeterminate', props: { indeterminate: true as const } },
] as const;

const STATES: Array<{
  label: string;
  forceState?: 'hover' | 'focus' | 'disabled';
}> = [
  { label: 'Default' },
  { label: 'Hover',    forceState: 'hover' },
  { label: 'Focus',    forceState: 'focus' },
  { label: 'Disabled', forceState: 'disabled' },
];

export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: 'inline-grid',
        gridTemplateColumns: `8rem repeat(${VARIANTS.length}, 1fr)`,
        gap: 'var(--spacing-4)',
        alignItems: 'center',
      }}
    >
      {/* Column headers */}
      <div />
      {VARIANTS.map(v => (
        <p
          key={v.label}
          style={{
            margin: 0,
            fontSize: '11px',
            fontFamily: 'monospace',
            color: 'var(--color-neutrals-content-subdued)',
            textAlign: 'center',
          }}
        >
          {v.label}
        </p>
      ))}

      {/* Rows */}
      {STATES.map(state => [
        <p
          key={`lbl-${state.label}`}
          style={{
            margin: 0,
            fontSize: '11px',
            fontFamily: 'monospace',
            color: 'var(--color-neutrals-content-noninteractive)',
          }}
        >
          {state.label}
        </p>,
        ...VARIANTS.map(v => (
          <div key={`${state.label}-${v.label}`} style={{ display: 'flex', justifyContent: 'center' }}>
            <Checkbox
              {...v.props}
              forceState={state.forceState}
              label="Label"
            />
          </div>
        )),
      ])}
    </div>
  ),
};

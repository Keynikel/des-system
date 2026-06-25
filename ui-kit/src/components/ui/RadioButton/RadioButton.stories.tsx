// Source of truth: Figma uo2jhkx6oBwYpiFJxWnLJf — node 381:943 (↳ Radio button page)

import type { Meta, StoryObj } from '@storybook/react';
import { RadioButton } from './RadioButton';

const meta: Meta<typeof RadioButton> = {
  title: 'Components/RadioButton',
  component: RadioButton,
  parameters: { layout: 'centered' },
  argTypes: {
    forceState: {
      control: { type: 'select' },
      options: ['default', 'hover', 'focus', 'disabled'],
    },
  },
  args: {
    label: 'Label',
    value: 'option',
  },
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

// ── Individual variant stories ─────────────────────────────────────────────────

export const Default: Story = {};

export const WithDescription: Story = {
  args: { description: 'Subtitle text' },
};

export const Checked: Story = {
  args: { checked: true, onChange: () => {} },
};

export const CheckedWithDescription: Story = {
  args: { checked: true, onChange: () => {}, description: 'Subtitle text' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  args: { disabled: true, checked: true, onChange: () => {} },
};

export const HoverState: Story = {
  args: { forceState: 'hover' },
};

export const FocusState: Story = {
  args: { forceState: 'focus' },
};

// ── AllStates: full grid of variant × state ────────────────────────────────────

const VARIANTS = [
  { label: 'Unchecked', props: {} },
  { label: 'Checked',   props: { checked: true as const, onChange: () => {} } },
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
            <RadioButton
              {...v.props}
              forceState={state.forceState}
              label="Label"
              value="option"
            />
          </div>
        )),
      ])}
    </div>
  ),
};

// ── RadioGroup: shows mutual exclusion in an uncontrolled group ────────────────

export const RadioGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
      <RadioButton name="plan" value="starter" label="Starter" description="Up to 5 users" defaultChecked />
      <RadioButton name="plan" value="pro"     label="Pro"     description="Up to 25 users" />
      <RadioButton name="plan" value="enterprise" label="Enterprise" description="Unlimited users" />
    </div>
  ),
};

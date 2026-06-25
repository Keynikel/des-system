// Source of truth: Figma uo2jhkx6oBwYpiFJxWnLJf — node 417:11499 (Text field)

import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { SearchMd } from '../../../icons/components/general/SearchMd';
import { InfoCircle } from '../../../icons/components/general/InfoCircle';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: () => <Input placeholder="Enter text…" />,
};

export const WithLabel: Story = {
  render: () => <Input label="Email address" placeholder="you@example.com" />,
};

export const WithHelperText: Story = {
  render: () => (
    <Input
      label="Email address"
      placeholder="you@example.com"
      helperText="We'll never share your email."
    />
  ),
};

export const Required: Story = {
  render: () => (
    <Input
      label="Email address"
      placeholder="you@example.com"
      required
    />
  ),
};

export const Optional: Story = {
  render: () => (
    <Input
      label="Middle name"
      placeholder="Enter middle name"
      optional
    />
  ),
};

export const Filled: Story = {
  render: () => (
    <Input
      label="Email address"
      defaultValue="user@example.com"
    />
  ),
};

export const WithLeadingIcon: Story = {
  render: () => (
    <Input
      label="Search"
      placeholder="Search…"
      leadingIcon={<SearchMd className="size-5" />}
    />
  ),
};

export const WithTrailingIcon: Story = {
  render: () => (
    <Input
      label="Field with info"
      placeholder="Enter value"
      trailingIcon={<InfoCircle className="size-4" />}
    />
  ),
};

export const ErrorState: Story = {
  render: () => (
    <Input
      label="Password"
      type="password"
      placeholder="Enter password"
      error="Password must be at least 8 characters."
    />
  ),
};

export const ErrorWithHelper: Story = {
  render: () => (
    <Input
      label="Username"
      placeholder="Enter username"
      helperText="Must be 3–20 characters."
      error="Username is already taken."
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <Input
      label="Read-only field"
      placeholder="Cannot edit"
      disabled
    />
  ),
};

export const DisabledFilled: Story = {
  render: () => (
    <Input
      label="Read-only field"
      defaultValue="Cannot edit"
      disabled
    />
  ),
};

export const HoverState: Story = {
  render: () => (
    <Input
      label="Hover state"
      placeholder="Enter text…"
      forceState="hover"
    />
  ),
};

export const FocusState: Story = {
  render: () => (
    <Input
      label="Focus state"
      placeholder="Enter text…"
      forceState="focus"
    />
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[320px]">
      {(
        [
          { label: 'Default',  forceState: undefined,    placeholder: 'Enter text…' },
          { label: 'Hover',    forceState: 'hover',      placeholder: 'Enter text…' },
          { label: 'Focus',    forceState: 'focus',      placeholder: 'Enter text…' },
          { label: 'Error',    forceState: undefined,    error: 'This field is required.' },
          { label: 'Disabled', forceState: 'disabled',   placeholder: 'Enter text…' },
        ] as const
      ).map(({ label, forceState, placeholder, error }) => (
        <div key={label} className="flex flex-col gap-1">
          <span className="text-xs font-mono text-gray-400">{label}</span>
          <Input
            label="Conditions"
            required
            placeholder={placeholder}
            forceState={forceState}
            error={error}
            helperText={!error ? 'This is a hint text to help user' : undefined}
          />
        </div>
      ))}
    </div>
  ),
};

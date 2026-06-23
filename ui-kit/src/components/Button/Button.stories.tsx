// Storybook stories for Button — CSF3 (Storybook 7+).
// Source of truth: Figma 373:5136.

import type { Meta, StoryObj } from '@storybook/react';
import { Plus } from '../../icons/components/general/Plus';
import { Trash01 } from '../../icons/components/general/Trash01';
import { Edit01 } from '../../icons/components/general/Edit01';
import { Button } from './Button';
import type { ButtonHierarchy } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: { layout: 'centered' },
  args: { children: 'Label' },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ── AllHierarchies ─────────────────────────────────────────────────────────────
// Shows all four hierarchy values side-by-side at the default (md) size.

const HIERARCHIES: ButtonHierarchy[] = ['primary', 'secondary', 'text', 'text-primary'];

export const AllHierarchies: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      {HIERARCHIES.map((h) => (
        <Button key={h} hierarchy={h}>{h}</Button>
      ))}
    </div>
  ),
};

// ── Destructive ────────────────────────────────────────────────────────────────

export const Destructive: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      {HIERARCHIES.map((h) => (
        <Button key={h} hierarchy={h} destructive>{h}</Button>
      ))}
    </div>
  ),
};

// ── States ─────────────────────────────────────────────────────────────────────
// Shows default, hover, disabled, and loading states for primary.

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button hierarchy="primary">Default</Button>
      <Button hierarchy="primary" forceState="hover">Hover</Button>
      <Button hierarchy="primary" forceState="disabled">Disabled</Button>
      <Button hierarchy="primary" forceState="loading">Loading</Button>
    </div>
  ),
};

// ── SmallSize ──────────────────────────────────────────────────────────────────

export const SmallSize: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      {HIERARCHIES.map((h) => (
        <Button key={h} hierarchy={h} size="sm">{h}</Button>
      ))}
    </div>
  ),
};

// ── IconVariants ───────────────────────────────────────────────────────────────
// Leading icon, trailing icon, both, and icon-only.

export const IconVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button iconLeading={<Plus />}>Leading</Button>
      <Button iconTrailing={<Edit01 />}>Trailing</Button>
      <Button iconLeading={<Plus />} iconTrailing={<Edit01 />}>Both</Button>
      <Button iconOnly iconLeading={<Plus />} aria-label="Add" />
      <Button iconOnly iconLeading={<Trash01 />} hierarchy="secondary" aria-label="Delete" />
    </div>
  ),
};

// ── Badge ──────────────────────────────────────────────────────────────────────
// Badge dot appears only on text and text-primary hierarchies.

export const Badge: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button hierarchy="text" badge>Text</Button>
      <Button hierarchy="text-primary" badge>Text Primary</Button>
      <Button hierarchy="text" badge iconLeading={<Plus />}>With Icon</Button>
    </div>
  ),
};

// ── Playground ─────────────────────────────────────────────────────────────────
// Fully controlled via Storybook controls panel.

export const Playground: Story = {
  args: {
    hierarchy:   'primary',
    size:        'md',
    destructive: false,
    loading:     false,
    iconOnly:    false,
    badge:       false,
    children:    'Button',
  },
  argTypes: {
    hierarchy:  { control: 'select', options: HIERARCHIES },
    size:       { control: 'select', options: ['sm', 'md'] },
    forceState: { control: 'select', options: ['', 'hover', 'disabled', 'loading'] },
  },
};

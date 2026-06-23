// Storybook stories for Skeleton — CSF3 (Storybook 7+).
// Source of truth: Figma uo2jhkx6oBwYpiFJxWnLJf node 382:2542.
//
// Accessibility note: wrap real usage in:
//   <div role="status" aria-label="Loading…">
//     <Skeleton ... />
//   </div>
// The Skeleton itself is aria-hidden="true" — it is purely visual.

import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: { layout: 'centered' },
  argTypes: {
    width:      { control: 'text' },
    height:     { control: 'text' },
    radius:     { control: 'text' },
    forceState: { control: { type: 'radio' }, options: ['shimmer', 'static'] },
  },
  args: {
    width:      '250px',
    height:     'var(--spacing-4)',
    radius:     'var(--radius-sm)',
    forceState: 'shimmer',
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

// ── Default ────────────────────────────────────────────────────────────────────
// Single block with default props; controls are live.

export const Default: Story = {};

// ── Static ─────────────────────────────────────────────────────────────────────
// Animation frozen — use for snapshot tests so frames are deterministic.

export const Static: Story = {
  args: { forceState: 'static' },
};

// ── CardPlaceholder ────────────────────────────────────────────────────────────
// Avatar circle + two text lines + a button bar — typical card loading state.

export const CardPlaceholder: Story = {
  render: () => (
    <div
      role="status"
      aria-label="Loading…"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-4)',
        width: '320px',
        padding: 'var(--spacing-5)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-neutrals-border)',
        background: 'var(--color-neutrals-bg-canvas)',
      }}
    >
      {/* Avatar + name/subtitle row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
        {/* Circle — Figma Shape=Circle: 48×48, --radius-full */}
        <Skeleton
          width="var(--spacing-12)"
          height="var(--spacing-12)"
          radius="var(--radius-full)"
        />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
          {/* Name line */}
          <Skeleton width="60%" height="var(--spacing-4)" />
          {/* Subtitle line */}
          <Skeleton width="40%" height="var(--spacing-3)" />
        </div>
      </div>

      {/* Body text lines */}
      <Skeleton width="100%" height="var(--spacing-4)" />
      <Skeleton width="85%"  height="var(--spacing-4)" />
      <Skeleton width="70%"  height="var(--spacing-4)" />

      {/* Button bar */}
      <div style={{ display: 'flex', gap: 'var(--spacing-2)', marginTop: 'var(--spacing-2)' }}>
        <Skeleton width="var(--spacing-20)" height="var(--spacing-8)" radius="var(--radius-md)" />
        <Skeleton width="var(--spacing-20)" height="var(--spacing-8)" radius="var(--radius-md)" />
      </div>
    </div>
  ),
};

// ── TablePlaceholder ───────────────────────────────────────────────────────────
// Three skeleton rows inside a table-like grid.

export const TablePlaceholder: Story = {
  render: () => (
    <div
      role="status"
      aria-label="Loading…"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-1)',
        width: '560px',
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: 'var(--spacing-3)',
          padding: 'var(--spacing-2) var(--spacing-3)',
          borderBottom: '1px solid var(--color-neutrals-border)',
        }}
      >
        {[80, 50, 50, 50].map((w, i) => (
          <Skeleton key={i} width={`${w}%`} height="var(--spacing-3)" forceState="static" />
        ))}
      </div>

      {/* Data rows */}
      {[0, 1, 2].map(row => (
        <div
          key={row}
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: 'var(--spacing-3)',
            padding: 'var(--spacing-3)',
            borderBottom: '1px solid var(--color-neutrals-border)',
            background: row % 2 === 0 ? 'var(--color-neutrals-bg)' : 'var(--color-neutrals-bg-canvas)',
          }}
        >
          {[90, 60, 70, 40].map((w, col) => (
            <Skeleton key={col} width={`${w}%`} height="var(--spacing-4)" />
          ))}
        </div>
      ))}
    </div>
  ),
};

// Storybook stories for ButtonGroup — CSF3 (Storybook 7+).
// Source of truth: Figma uo2jhkx6oBwYpiFJxWnLJf node 387:696
// (page was empty at inspection — component not yet in Figma).

import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup } from './ButtonGroup';
import { Button } from '../../Button/Button';
import { ArrowLeft } from '../../../icons/components/arrows/ArrowLeft';
import { ArrowRight } from '../../../icons/components/arrows/ArrowRight';
import { DotsHorizontal } from '../../../icons/components/general/DotsHorizontal';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  parameters: { layout: 'centered' },
  argTypes: {
    size:        { control: { type: 'radio' }, options: ['sm', 'md'] },
    orientation: { control: { type: 'radio' }, options: ['horizontal', 'vertical'] },
    asRow:       { control: 'boolean' },
  },
  args: {
    size:        'md',
    orientation: 'horizontal',
    asRow:       false,
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

// ── SingleGroup ────────────────────────────────────────────────────────────────
// Two secondary buttons side-by-side — shared 1 px border between them,
// outer corners keep --radius-md.

export const SingleGroup: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button hierarchy="secondary">Archive</Button>
      <Button hierarchy="secondary">Report</Button>
    </ButtonGroup>
  ),
};

// ── WithIconButton ─────────────────────────────────────────────────────────────
// Text button paired with an icon-only button — common "action + more" pattern.

export const WithIconButton: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button hierarchy="secondary">Snooze</Button>
      <Button hierarchy="secondary" iconOnly iconLeading={<DotsHorizontal />} aria-label="More options" />
    </ButtonGroup>
  ),
};

// ── WithDropdown ──────────────────────────────────────────────────────────────
// Icon-only button acting as a dropdown trigger inside a group.
// NOTE: Replace the placeholder <div> with a real DropdownMenu trigger once
// the DropdownMenu component exists — ButtonGroup will style it identically
// since the CSS targets any direct child element, not just <button>.

export const WithDropdown: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button hierarchy="secondary">Snooze</Button>
      {/* Placeholder for DropdownMenuTrigger rendered as Button */}
      <div style={{ display: 'contents' }}>
        <Button hierarchy="secondary" iconOnly iconLeading={<DotsHorizontal />} aria-label="More options" />
      </div>
    </ButtonGroup>
  ),
};

// ── NestedGroups ──────────────────────────────────────────────────────────────
// Acceptance test — outer row wrapper + three inner sub-groups.
// Matches the reference pattern from the prompt:
//   [← →]  [Archive | Report]  [Snooze | ⋯]

export const NestedGroups: Story = {
  render: () => (
    <ButtonGroup asRow>
      {/* Navigation sub-group */}
      <ButtonGroup>
        <Button hierarchy="secondary" iconOnly iconLeading={<ArrowLeft />} aria-label="Go back" />
        <Button hierarchy="secondary" iconOnly iconLeading={<ArrowRight />} aria-label="Go forward" />
      </ButtonGroup>

      {/* Action sub-group */}
      <ButtonGroup>
        <Button hierarchy="secondary">Archive</Button>
        <Button hierarchy="secondary">Report</Button>
      </ButtonGroup>

      {/* Overflow sub-group */}
      <ButtonGroup>
        <Button hierarchy="secondary">Snooze</Button>
        <Button hierarchy="secondary" iconOnly iconLeading={<DotsHorizontal />} aria-label="More options" />
      </ButtonGroup>
    </ButtonGroup>
  ),
};

// ── Vertical ──────────────────────────────────────────────────────────────────
// orientation="vertical" — shared top/bottom borders, outer corners rounded.

export const Vertical: Story = {
  render: (args) => (
    <ButtonGroup {...args} orientation="vertical">
      <Button hierarchy="secondary">First</Button>
      <Button hierarchy="secondary">Second</Button>
      <Button hierarchy="secondary">Third</Button>
    </ButtonGroup>
  ),
};

// ── AllSizes ──────────────────────────────────────────────────────────────────
// sm and md side-by-side for size comparison.

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', alignItems: 'flex-start' }}>
      {(['sm', 'md'] as const).map(size => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
          <span style={{ width: '2rem', fontSize: '12px', fontFamily: 'monospace', color: 'var(--color-neutrals-content-subdued)' }}>{size}</span>
          <ButtonGroup size={size}>
            <Button hierarchy="secondary">Archive</Button>
            <Button hierarchy="secondary">Report</Button>
            <Button hierarchy="secondary" iconOnly iconLeading={<DotsHorizontal />} aria-label="More" />
          </ButtonGroup>
        </div>
      ))}
    </div>
  ),
};

// Source of truth: Figma uo2jhkx6oBwYpiFJxWnLJf — node 413:1320
// Component symbols: Card=408:18, _CardHeader=408:8, _CardFooter=408:15

import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';
import { Button } from '../../Button/Button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: { layout: 'centered' },
  decorators: [Story => <div style={{ width: 360 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Card>;

// ── Default — all three zones with placeholder text ───────────────────────────

export const Default: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description text.</CardDescription>
      </CardHeader>
      <CardContent>
        <p
          style={{
            margin: 0,
            fontSize: 'var(--font-size-body)',
            lineHeight: 'var(--line-height-body)',
            color: 'var(--color-neutrals-content-subdued)',
          }}
        >
          Card body content goes here.
        </p>
      </CardContent>
      <CardFooter>
        <span
          style={{
            fontSize: 'var(--font-size-body)',
            color: 'var(--color-neutrals-content-subdued)',
          }}
        >
          Footer label
        </span>
        <Button hierarchy="secondary" size="sm">Action</Button>
      </CardFooter>
    </Card>
  ),
};

// ── HeaderOnly — card with header, no content or footer ───────────────────────

export const HeaderOnly: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description text.</CardDescription>
      </CardHeader>
    </Card>
  ),
};

// ── NoDescription — CardHeader with title only ────────────────────────────────

export const NoDescription: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <p
          style={{
            margin: 0,
            fontSize: 'var(--font-size-body)',
            lineHeight: 'var(--line-height-body)',
            color: 'var(--color-neutrals-content-subdued)',
          }}
        >
          Content without a description above.
        </p>
      </CardContent>
    </Card>
  ),
};

// ── NoFooter — card without CardFooter ────────────────────────────────────────

export const NoFooter: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description text.</CardDescription>
      </CardHeader>
      <CardContent>
        <p
          style={{
            margin: 0,
            paddingBottom: 12,
            fontSize: 'var(--font-size-body)',
            lineHeight: 'var(--line-height-body)',
            color: 'var(--color-neutrals-content-subdued)',
          }}
        >
          This card has no footer. The content owns its bottom spacing.
        </p>
      </CardContent>
    </Card>
  ),
};

// ── LongContent — multiline description + body text to test overflow ──────────

export const LongContent: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Long Content Example</CardTitle>
        <CardDescription>
          This description is intentionally longer to verify that it wraps gracefully within the
          card width without breaking the layout or overflowing into adjacent zones.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p
          style={{
            margin: 0,
            fontSize: 'var(--font-size-body)',
            lineHeight: 'var(--line-height-body)',
            color: 'var(--color-neutrals-content-subdued)',
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </CardContent>
      <CardFooter>
        <span
          style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-neutrals-content-noninteractive)' }}
        >
          Last updated today
        </span>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button hierarchy="secondary" size="sm">Cancel</Button>
          <Button hierarchy="primary" size="sm">Save</Button>
        </div>
      </CardFooter>
    </Card>
  ),
};

// ── Composed — realistic "Account Settings" pattern ───────────────────────────

export const Composed: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Manage your account preferences and notifications.</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingBottom: 4 }}>
          {[
            'Email notifications',
            'Push notifications',
            'Weekly digest',
          ].map(item => (
            <div
              key={item}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '6px 0',
                borderBottom: '1px solid var(--color-neutrals-border)',
              }}
            >
              <span
                style={{
                  fontSize: 'var(--font-size-body)',
                  color: 'var(--color-neutrals-content)',
                  lineHeight: 'var(--line-height-body)',
                }}
              >
                {item}
              </span>
              <span
                style={{
                  fontSize: 'var(--font-size-caption)',
                  color: 'var(--color-neutrals-content-noninteractive)',
                }}
              >
                On
              </span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button hierarchy="secondary" size="sm">Reset</Button>
        <Button hierarchy="primary" size="sm">Save changes</Button>
      </CardFooter>
    </Card>
  ),
};

// ── AllVariants — composition patterns (no structural Figma variants exist) ───

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 360 }}>
      {/* Header + Content + Footer */}
      <Card>
        <CardHeader>
          <CardTitle>Full card</CardTitle>
          <CardDescription>Header + Content + Footer</CardDescription>
        </CardHeader>
        <CardContent>
          <p style={{ margin: 0, paddingBottom: 4, fontSize: 'var(--font-size-body)', color: 'var(--color-neutrals-content-subdued)' }}>
            Content
          </p>
        </CardContent>
        <CardFooter>
          <span style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-neutrals-content-noninteractive)' }}>Label</span>
          <Button hierarchy="secondary" size="sm">Action</Button>
        </CardFooter>
      </Card>

      {/* Header + Footer (no content) */}
      <Card>
        <CardHeader>
          <CardTitle>Header + Footer</CardTitle>
          <CardDescription>No content zone</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button hierarchy="primary" size="sm">Primary</Button>
        </CardFooter>
      </Card>

      {/* Title only */}
      <Card>
        <CardHeader>
          <CardTitle as="h4">Title only</CardTitle>
        </CardHeader>
        <CardContent>
          <p style={{ margin: 0, paddingBottom: 12, fontSize: 'var(--font-size-body)', color: 'var(--color-neutrals-content-subdued)' }}>
            No description, no footer
          </p>
        </CardContent>
      </Card>
    </div>
  ),
  decorators: [Story => <div style={{ width: 360 }}><Story /></div>],
};

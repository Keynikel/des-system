// Source of truth: Figma uo2jhkx6oBwYpiFJxWnLJf — node 417:5907

import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';
import type { TagColor } from './Tag';
import { Tag01 } from '../../../icons/components/finance/Tag01';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  render: () => <Tag label="Design systems" />,
};

export const Highlighted: Story = {
  render: () => <Tag label="Design systems" type="highlighted" />,
};

export const Outlined: Story = {
  render: () => <Tag label="Design systems" type="outlined" />,
};

export const WithIcon: Story = {
  render: () => (
    <Tag label="Design systems" icon={<Tag01 className="size-4" />} />
  ),
};

export const Removable: Story = {
  render: () => (
    <Tag label="Design systems" removable onRemove={() => {}} />
  ),
};

export const HighlightedWithIcon: Story = {
  render: () => (
    <Tag label="Design systems" type="highlighted" icon={<Tag01 className="size-4" />} />
  ),
};

export const RemovableHighlighted: Story = {
  render: () => (
    <Tag label="Design systems" type="highlighted" removable onRemove={() => {}} />
  ),
};

export const Disabled: Story = {
  render: () => <Tag label="Design systems" disabled />,
};

export const DisabledHighlighted: Story = {
  render: () => <Tag label="Design systems" type="highlighted" disabled />,
};

export const HoverState: Story = {
  render: () => <Tag label="Design systems" forceState="hover" />,
};

export const FocusState: Story = {
  render: () => <Tag label="Design systems" forceState="focus" />,
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Tag label="Small" size="sm" />
      <Tag label="Default" size="md" />
    </div>
  ),
};

export const AllColors: Story = {
  render: () => {
    const colors: TagColor[] = ['default', 'primary', 'error', 'warning', 'success'];
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          {colors.map(c => <Tag key={c} label={c} type="filled" color={c} />)}
        </div>
        <div className="flex items-center gap-2">
          {colors.map(c => <Tag key={c} label={c} type="outlined" color={c} />)}
        </div>
        <div className="flex items-center gap-2">
          {colors.map(c => <Tag key={c} label={c} type="highlighted" color={c} />)}
        </div>
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Tag label="Filled" type="filled" />
        <Tag label="Outlined" type="outlined" />
        <Tag label="Highlighted" type="highlighted" />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Tag label="With icon" type="filled" icon={<Tag01 className="size-4" />} />
        <Tag label="Removable" type="filled" removable onRemove={() => {}} />
        <Tag label="Both" type="filled" icon={<Tag01 className="size-4" />} removable onRemove={() => {}} />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Tag label="Disabled" type="filled" disabled />
        <Tag label="Disabled outlined" type="outlined" disabled />
        <Tag label="Disabled + icon" type="filled" icon={<Tag01 className="size-4" />} disabled />
      </div>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['filled', 'outlined', 'highlighted'] as const).map(type => (
        <div key={type} className="flex items-center gap-2">
          <span className="w-24 text-sm text-gray-500 shrink-0">{type}</span>
          <Tag label="Default" type={type} />
          <Tag label="With icon" type={type} icon={<Tag01 className="size-4" />} />
          <Tag label="Removable" type={type} removable onRemove={() => {}} />
          <Tag label="Disabled" type={type} disabled />
        </div>
      ))}
    </div>
  ),
};

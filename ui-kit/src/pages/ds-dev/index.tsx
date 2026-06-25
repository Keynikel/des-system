import { useState, useRef } from 'react';
import { colorTokens } from '../../tokens/colors';
import { textStyles } from '../../tokens/typography';
import { Icon } from '../../components/Icon';
import type { IconName } from '../../components/Icon';
import { AccordionItem, AccordionGroup } from '../../components/Accordion';
import { Avatar } from '../../components/Avatar';
import type { AvatarSize, AvatarType } from '../../components/Avatar';
import { Badge } from '../../components/Badge';
import type { BadgeColor, BadgeSize } from '../../components/Badge';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import type { BreadcrumbItem } from '../../components/Breadcrumbs';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import type { LoadingColor, LoadingSize } from '../../components/LoadingIndicator';
import { Button } from '../../components/Button';
import type { ButtonHierarchy } from '../../components/Button';
import { Skeleton } from '../../components/ui/Skeleton/Skeleton';
import { ButtonGroup } from '../../components/ui/ButtonGroup/ButtonGroup';
import { Checkbox } from '../../components/ui/Checkbox/Checkbox';
import { RadioButton } from '../../components/ui/RadioButton/RadioButton';
import { Switch } from '../../components/ui/Switch/Switch';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card/Card';
import { Input, Textarea } from '../../components/ui/Input/Input';
import { Tag } from '../../components/ui/Tag/Tag';
import type { TagColor } from '../../components/ui/Tag/Tag';
import { Tag01 } from '../../icons/components/finance/Tag01';
import { SearchMd } from '../../icons/components/general/SearchMd';
import { InfoCircle } from '../../icons/components/general/InfoCircle';
import { ChevronDown } from '../../icons/components/arrows/ChevronDown';
import { Home01 } from '../../icons/components/general/Home01';
import { Plus } from '../../icons/components/general/Plus';
import { Edit01 } from '../../icons/components/general/Edit01';
import { Trash01 } from '../../icons/components/general/Trash01';
import { DotsHorizontal } from '../../icons/components/general/DotsHorizontal';
import { ArrowLeft } from '../../icons/components/arrows/ArrowLeft';
import { ArrowRight } from '../../icons/components/arrows/ArrowRight';
import * as Icons from '../../icons/components/index';


const toKebab = (s: string) =>
  s.replace(/([A-Z])/g, (_, c, i) => (i ? '-' : '') + c.toLowerCase())
   .replace(/([a-z])(\d)/g, '$1-$2');

const ALL_ICONS = (Object.keys(Icons) as IconName[]).map(key => ({
  name: key,
  displayName: toKebab(key),
}));
const ICON_COUNT = ALL_ICONS.length;

// ── Navigation ────────────────────────────────────────────────────────────────

const NAV_SECTIONS = [
  {
    label: 'Getting Started',
    items: [
      { id: 'colors-tokens', label: 'Colors — Tokens' },
      { id: 'typography',    label: 'Typography'       },
      { id: 'icons',         label: 'Icons'            },
    ],
  },
  {
    label: 'Components',
    items: [
      { id: 'accordion',   label: 'Accordion'   },
      { id: 'avatar',      label: 'Avatar'      },
      { id: 'badge',       label: 'Badge'       },
      { id: 'button',            label: 'Button'            },
      { id: 'button-group',      label: 'Button Group'      },
      { id: 'breadcrumbs',       label: 'Breadcrumbs'       },
      { id: 'card',              label: 'Card'              },
      { id: 'checkbox',          label: 'Checkbox'          },
      { id: 'input',             label: 'Input'             },
      { id: 'tag',               label: 'Tag'               },
      { id: 'radio-button',      label: 'Radio Button'      },
      { id: 'switch',            label: 'Switch'             },
      { id: 'loading-indicator', label: 'Loading Indicator'  },
      { id: 'skeleton',          label: 'Skeleton'           },
    ],
  },
] as const;

type SectionId = (typeof NAV_SECTIONS)[number]['items'][number]['id'];

const ALL_ITEMS = NAV_SECTIONS.flatMap(s => [...s.items]);


const TOKEN_CATEGORIES = ['neutrals', 'primary', 'critical', 'warning', 'success'] as const;

// ── Layout primitives ─────────────────────────────────────────────────────────

function PageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-8">
      <h1 className="text-[28px] font-bold tracking-tight leading-tight text-[var(--color-neutrals-content)]">
        {title}
      </h1>
      {description && (
        <p className="mt-2 text-sm leading-[var(--line-height-body)] text-[var(--color-neutrals-content-subdued)] max-w-2xl">
          {description}
        </p>
      )}
      <hr className="mt-6 border-[var(--color-neutrals-border)]" />
    </div>
  );
}

function SubSection({ id, title, description, children }: {
  id: string;
  title: string;
  description?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className="mt-10 scroll-mt-4">
      <h3 className="text-base font-semibold text-[var(--color-neutrals-content)] mb-1">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-[var(--color-neutrals-content-subdued)] mb-4 leading-relaxed">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

function PreviewBox({ children, centered = false, className = '' }: {
  children: React.ReactNode;
  centered?: boolean;
  className?: string;
}) {
  return (
    <div className={[
      'rounded-[var(--radius-lg)] border border-[var(--color-neutrals-border)] bg-[var(--color-neutrals-bg-canvas)] overflow-hidden',
      centered ? 'flex items-center justify-center min-h-[160px] p-10' : 'p-8',
      className,
    ].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="text-xs font-mono bg-[var(--color-neutrals-bg-hover)] border border-[var(--color-neutrals-border)] px-1.5 py-0.5 rounded-[var(--radius-xs)] text-[var(--color-neutrals-content)]">
      {children}
    </code>
  );
}

// ── Section: Colors — Tokens ──────────────────────────────────────────────────

function TokensSection() {
  return (
    <>
      <PageHeader
        title="Colors — Tokens"
        description="Semantic color tokens organized by role. Each token resolves to a CSS custom property and maps to a specific visual purpose in the design system."
      />

      {TOKEN_CATEGORIES.map(cat => (
        <div key={cat} id={`otp-${cat}`} className="mb-10 scroll-mt-4">
          <h3 className="text-sm font-semibold capitalize text-[var(--color-neutrals-content)] mb-3">
            {cat}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {Object.entries(colorTokens[cat]).map(([token, hex]) => (
              <div
                key={token}
                className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] border border-[var(--color-neutrals-border)] bg-[var(--color-neutrals-bg)]"
              >
                <div
                  className="w-8 h-8 rounded-[var(--radius-sm)] shrink-0 border border-[var(--color-neutrals-border)]"
                  style={{ background: hex }}
                />
                <div className="min-w-0">
                  <p className="text-xs font-medium truncate text-[var(--color-neutrals-content)]">{token}</p>
                  <p className="text-[10px] font-mono text-[var(--color-neutrals-content-subdued)]">{hex}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

// ── Section: Typography ───────────────────────────────────────────────────────

function TypographySection() {
  return (
    <>
      <PageHeader
        title="Typography"
        description="The type scale used across the design system. All sizes use the Roboto typeface with semantic line-height and letter-spacing tokens."
      />
      <div className="space-y-2">
        {(Object.entries(textStyles) as [string, typeof textStyles[keyof typeof textStyles]][]).map(([name, style]) => (
          <div
            key={name}
            className="flex items-center gap-6 px-4 py-4 rounded-[var(--radius-md)] border border-[var(--color-neutrals-border)] bg-[var(--color-neutrals-bg)]"
          >
            <div className="w-32 shrink-0 space-y-0.5">
              <p className="text-xs font-mono font-medium text-[var(--color-neutrals-content-subdued)]">{name}</p>
              <p className="text-[10px] font-mono text-[var(--color-neutrals-content-noninteractive)]">
                {style.fontSize} · {style.lineHeight} · w{style.fontWeight}
              </p>
            </div>
            <p
              className="text-[var(--color-neutrals-content)]"
              style={{
                fontFamily:    style.fontFamily,
                fontSize:      style.fontSize,
                lineHeight:    style.lineHeight,
                fontWeight:    style.fontWeight,
                letterSpacing: style.letterSpacing,
              }}
            >
              The quick brown fox jumps over the lazy dog
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

// ── Section: Icons ────────────────────────────────────────────────────────────

function IconsSection() {
  const [query, setQuery] = useState('');
  const q = query.toLowerCase();
  const visible = q ? ALL_ICONS.filter(ic => ic.displayName.includes(q)) : ALL_ICONS;

  return (
    <>
      <PageHeader
        title="Icons"
        description={`${ICON_COUNT} icons compiled from SVG to TSX via SVGR. All icons use currentColor stroke and accept any SVGProps.`}
      />
      <div className="mb-4 flex items-center gap-3">
        <input
          type="search"
          placeholder="Search icons…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-64 px-3 py-1.5 text-sm rounded-[var(--radius-md)] border border-[var(--color-neutrals-border)] bg-[var(--color-neutrals-bg)] outline-none focus:border-[var(--color-primary-border)] text-[var(--color-neutrals-content)] placeholder:text-[var(--color-neutrals-content-noninteractive)]"
        />
        <span className="text-xs text-[var(--color-neutrals-content-subdued)]">
          {q ? `${visible.length} of ${ICON_COUNT}` : `${ICON_COUNT} icons`}
        </span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-2">
        {visible.map(ic => (
          <div
            key={ic.name}
            className="flex flex-col items-center gap-1.5 p-2 rounded-[var(--radius-md)] border border-[var(--color-neutrals-border)] hover:border-[var(--color-primary-border)] hover:bg-[var(--color-primary-bg-muted)] transition-colors cursor-default"
            title={ic.displayName}
          >
            <Icon name={ic.name} size={20} color="var(--color-neutrals-content)" />
            <span className="text-[9px] text-center leading-tight text-[var(--color-neutrals-content-subdued)] break-all">
              {ic.displayName}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

// ── Section: Accordion ────────────────────────────────────────────────────────


function AccordionSection() {
  return (
    <>
      <PageHeader
        title="Accordion"
        description="A vertically stacked set of interactive headings that each reveal a section of content. Supports single-open and multi-open modes, disabled items, and animated height transitions."
      />

      <SubSection
        id="otp-acc-wide"
        title="Wide group"
        description="Single-open group with form fields. First item expanded by default."
      >
        <PreviewBox>
          <AccordionGroup>
            <AccordionItem title="Personal information" defaultExpanded>
              <div className="flex flex-col gap-4">
                <Input label="Full name" placeholder="Jane Smith" />
                <Input
                  label="Email address"
                  type="email"
                  placeholder="jane@example.com"
                  helperText="Used for account notifications."
                />
              </div>
            </AccordionItem>
            <AccordionItem title="Account details">
              <div className="flex flex-col gap-4">
                <Input
                  label="Username"
                  placeholder="janesmith"
                  helperText="Must be 3–20 characters, letters and numbers only."
                />
                <Input label="Password" type="password" placeholder="••••••••" />
              </div>
            </AccordionItem>
            <AccordionItem title="Additional notes">
              <div className="flex flex-col gap-4">
                <Input label="Website" placeholder="yoursite.com" />
                <Input
                  label="Message"
                  placeholder="Anything else we should know?"
                  helperText="Optional."
                />
              </div>
            </AccordionItem>
          </AccordionGroup>
        </PreviewBox>
      </SubSection>

      <SubSection
        id="otp-acc-faq"
        title="600 px wide group"
        description="Same three panels constrained to 600 px."
      >
        <PreviewBox>
          <AccordionGroup className="max-w-[600px]">
            <AccordionItem title="Personal information" defaultExpanded>
              <div className="flex flex-col gap-4">
                <Input label="Full name" placeholder="Jane Smith" />
                <Input
                  label="Email address"
                  type="email"
                  placeholder="jane@example.com"
                  helperText="Used for account notifications."
                />
              </div>
            </AccordionItem>
            <AccordionItem title="Account details">
              <div className="flex flex-col gap-4">
                <Input
                  label="Username"
                  placeholder="janesmith"
                  helperText="Must be 3–20 characters, letters and numbers only."
                />
                <Input label="Password" type="password" placeholder="••••••••" />
              </div>
            </AccordionItem>
            <AccordionItem title="Additional notes">
              <div className="flex flex-col gap-4">
                <Input label="Website" placeholder="yoursite.com" />
                <Input
                  label="Message"
                  placeholder="Anything else we should know?"
                  helperText="Optional."
                />
              </div>
            </AccordionItem>
          </AccordionGroup>
        </PreviewBox>
      </SubSection>

      <SubSection
        id="otp-acc-multiple"
        title="Multiple"
        description={<>Set <InlineCode>multiple</InlineCode> to allow more than one item to be open simultaneously.</>}
      >
        <PreviewBox>
          <AccordionGroup multiple className="max-w-[600px]">
            <AccordionItem title="Personal information" defaultExpanded>
              <div className="flex flex-col gap-4">
                <Input label="Full name" placeholder="Jane Smith" />
                <Input
                  label="Email address"
                  type="email"
                  placeholder="jane@example.com"
                  helperText="Used for account notifications."
                />
              </div>
            </AccordionItem>
            <AccordionItem title="Account details" defaultExpanded>
              <div className="flex flex-col gap-4">
                <Input
                  label="Username"
                  placeholder="janesmith"
                  helperText="Must be 3–20 characters, letters and numbers only."
                />
                <Input label="Password" type="password" placeholder="••••••••" />
              </div>
            </AccordionItem>
            <AccordionItem title="Additional notes">
              <div className="flex flex-col gap-4">
                <Input label="Website" placeholder="yoursite.com" />
                <Input
                  label="Message"
                  placeholder="Anything else we should know?"
                  helperText="Optional."
                />
              </div>
            </AccordionItem>
          </AccordionGroup>
        </PreviewBox>
      </SubSection>

      <SubSection
        id="otp-acc-disabled"
        title="Disabled"
        description={<>Set <InlineCode>disabled</InlineCode> on an item to prevent interaction. The trigger is unfocusable and styled with the non-interactive content token.</>}
      >
        <PreviewBox>
          <div className="max-w-[600px]">
            <AccordionItem title="This item is disabled" disabled>
              This content is never shown.
            </AccordionItem>
          </div>
        </PreviewBox>
      </SubSection>
    </>
  );
}

// ── Section: Avatar ───────────────────────────────────────────────────────────

const AVATAR_SIZES: AvatarSize[] = ['xs', 'sm', 'md', 'lg'];
const AVATAR_TYPES: AvatarType[] = ['placeholder', 'text', 'image'];

function AvatarSection() {
  return (
    <>
      <PageHeader
        title="Avatar"
        description="A circular element representing a user. Supports image, text initials, and placeholder variants across four sizes. Falls back gracefully when an image fails to load."
      />

      <SubSection id="otp-av-matrix" title="Size × Type matrix">
        <PreviewBox>
          <div className="inline-grid grid-cols-[3rem_1fr_1fr_1fr] gap-x-12 gap-y-6 items-center">
            {/* Header row */}
            <div />
            {AVATAR_TYPES.map(t => (
              <p key={t} className="text-xs font-medium capitalize text-[var(--color-neutrals-content-subdued)]">
                {t}
              </p>
            ))}
            {/* Size rows */}
            {AVATAR_SIZES.flatMap(size => [
              <p key={`lbl-${size}`} className="text-xs font-mono text-[var(--color-neutrals-content-noninteractive)]">
                {size}
              </p>,
              <Avatar key={`${size}-placeholder`} size={size} type="placeholder" />,
              <Avatar key={`${size}-text`}        size={size} type="text"        name="Jane Doe" />,
              <Avatar key={`${size}-image`}       size={size} type="image"       src="https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=150&h=150&fit=crop&crop=faces&q=80" alt="Jane Doe" />,
            ])}
          </div>
        </PreviewBox>
      </SubSection>

      <SubSection
        id="otp-av-fallback"
        title="Image fallback"
        description={<>When an image fails to load, the avatar falls back to text initials if <InlineCode>name</InlineCode> or <InlineCode>initials</InlineCode> is provided, or the placeholder icon otherwise.</>}
      >
        <PreviewBox centered>
          <div className="flex items-end gap-10">
            <div className="flex flex-col items-center gap-3">
              <Avatar size="lg" type="image" src="/nonexistent.jpg" name="Jane Doe" />
              <p className="text-xs text-[var(--color-neutrals-content-subdued)] text-center">
                broken src + name<br />
                <span className="text-[var(--color-neutrals-content-noninteractive)]">→ text initials</span>
              </p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Avatar size="lg" type="image" src="/nonexistent.jpg" />
              <p className="text-xs text-[var(--color-neutrals-content-subdued)] text-center">
                broken src, no name<br />
                <span className="text-[var(--color-neutrals-content-noninteractive)]">→ placeholder</span>
              </p>
            </div>
          </div>
        </PreviewBox>
      </SubSection>
    </>
  );
}

// ── Section: Badge ────────────────────────────────────────────────────────────
// Full matrix: numeric (default + muted) × 5 colors, dot (md + lg) × 5 colors.
// Source of truth: Figma component set 293:1279 (file uo2jhkx6oBwYpiFJxWnLJf).

const BADGE_COLORS: BadgeColor[] = ['default', 'primary', 'error', 'warning', 'success'];
const BADGE_DOT_SIZES: BadgeSize[] = ['md', 'lg'];

function BadgeSection() {
  return (
    <>
      <PageHeader
        title="Badge"
        description="A small label used to draw attention to a count, status, or notification. Available in numeric and dot views across five semantic colors."
      />

      <SubSection id="otp-badge-numeric" title="Numeric">
        <PreviewBox>
          <div className="inline-grid grid-cols-[6rem_repeat(5,1fr)] gap-x-6 gap-y-5 items-center">
            {/* Column headers */}
            <div />
            {BADGE_COLORS.map(c => (
              <p key={c} className="text-xs font-medium capitalize text-[var(--color-neutrals-content-subdued)]">{c}</p>
            ))}
            {/* Default row */}
            <p className="text-xs font-mono text-[var(--color-neutrals-content-noninteractive)]">default</p>
            {BADGE_COLORS.map(c => (
              <Badge key={c} view="numeric" color={c} type="default" content={1} />
            ))}
            {/* Muted row */}
            <p className="text-xs font-mono text-[var(--color-neutrals-content-noninteractive)]">muted</p>
            {BADGE_COLORS.map(c => (
              <Badge key={c} view="numeric" color={c} type="muted" content={1} />
            ))}
          </div>
        </PreviewBox>
      </SubSection>

      <SubSection id="otp-badge-dot" title="Dot">
        <PreviewBox>
          <div className="inline-grid grid-cols-[6rem_repeat(5,1fr)] gap-x-6 gap-y-5 items-center">
            {/* Column headers */}
            <div />
            {BADGE_COLORS.map(c => (
              <p key={c} className="text-xs font-medium capitalize text-[var(--color-neutrals-content-subdued)]">{c}</p>
            ))}
            {/* Size rows */}
            {BADGE_DOT_SIZES.map(sz => (
              [
                <p key={`lbl-${sz}`} className="text-xs font-mono text-[var(--color-neutrals-content-noninteractive)]">{sz}</p>,
                ...BADGE_COLORS.map(c => (
                  <Badge key={`${sz}-${c}`} view="dot" color={c} size={sz} />
                )),
              ]
            ))}
          </div>
        </PreviewBox>
      </SubSection>
    </>
  );
}

// ── Section: Breadcrumbs ──────────────────────────────────────────────────────
// Source of truth: Figma 293:1319. Three pieces: BreadcrumbLink, BreadcrumbSeparator, Breadcrumbs.

const DEMO_ITEMS: BreadcrumbItem[] = [
  { label: 'Home',        href: '#' },
  { label: 'Campaigns',   href: '#' },
  { label: 'Q4 Planning', href: '#' },
  { label: 'EMEA Region', href: '#' },
  { label: 'Budgets' },
];

const DEMO_ITEMS_ICON: BreadcrumbItem[] = [
  { label: 'Home', href: '#', icon: <Home01 width={16} height={16} /> },
  { label: 'Campaigns',   href: '#' },
  { label: 'Q4 Planning', href: '#' },
  { label: 'Budgets' },
];

function BreadcrumbsSection() {
  return (
    <>
      <PageHeader
        title="Breadcrumbs"
        description={'A navigation trail showing the path to the current page. Supports slash and chevron separators, optional leading icons, and a collapsible (cutted) mode that hides middle items behind a "…" button.'}
      />

      <SubSection
        id="otp-bc-slash"
        title="Slash separator"
        description={<>Default <InlineCode>separator="/"</InlineCode> — body-weight text links with hover underline; last item is current (non-interactive).</>}
      >
        <PreviewBox centered>
          <Breadcrumbs items={DEMO_ITEMS} separator="/" />
        </PreviewBox>
      </SubSection>

      <SubSection
        id="otp-bc-chevron"
        title="Chevron separator"
        description={<>Set <InlineCode>separator="&gt;"</InlineCode> to use a ChevronRight icon between items.</>}
      >
        <PreviewBox centered>
          <Breadcrumbs items={DEMO_ITEMS} separator=">" />
        </PreviewBox>
      </SubSection>

      <SubSection
        id="otp-bc-icon"
        title="Leading icon"
        description={<>Pass an <InlineCode>icon</InlineCode> on any item to prepend a 16 px icon before the label. Figma: node 293:1418.</>}
      >
        <PreviewBox centered>
          <Breadcrumbs items={DEMO_ITEMS_ICON} separator="/" />
        </PreviewBox>
      </SubSection>

      <SubSection
        id="otp-bc-collapsed"
        title="Collapsed (cutted)"
        description={<>Set <InlineCode>collapsible</InlineCode> to collapse middle items behind a "…" button. Clicking it expands to the full trail. Corresponds to Figma variant <InlineCode>Cutted breadcrumbs=True</InlineCode>.</>}
      >
        <PreviewBox centered>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-xs text-[var(--color-neutrals-content-noninteractive)] font-mono">collapsed (initial)</p>
              <Breadcrumbs key="collapsed" items={DEMO_ITEMS} separator="/" collapsible />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs text-[var(--color-neutrals-content-noninteractive)] font-mono">expanded (after click)</p>
              <Breadcrumbs key="expanded" items={DEMO_ITEMS} separator="/" />
            </div>
          </div>
        </PreviewBox>
        <p className="mt-3 text-xs text-[var(--color-critical-content)]">
          ⚠ Update this example once the Menu component is added — the "…" cut node should open a dropdown menu listing the hidden items instead of inline-expanding the trail.
        </p>
      </SubSection>
    </>
  );
}

// ── Section: Loading Indicator ────────────────────────────────────────────────
// Full matrix: 4 colors × 4 sizes.
// Source of truth: Figma component set 368:2806 (file uo2jhkx6oBwYpiFJxWnLJf).

const LOADING_COLORS: LoadingColor[] = ['primary', 'warning', 'critical', 'neutral'];
const LOADING_SIZES:  LoadingSize[]  = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl'];

function LoadingSection() {
  return (
    <>
      <PageHeader
        title="Loading Indicator"
        description="Animated spinner for indicating an in-progress state. Inline SVG arc with stroke driven by the color token — no baked assets. Respects prefers-reduced-motion by slowing the spin."
      />

      <SubSection
        id="otp-loading-matrix"
        title="Color × Size"
      >
        <PreviewBox>
          <div className="inline-grid grid-cols-[7rem_repeat(6,1fr)] gap-x-10 gap-y-6 items-center">
            {/* Column headers */}
            <div />
            {LOADING_SIZES.map(s => (
              <p key={s} className="text-xs font-mono text-[var(--color-neutrals-content-noninteractive)] text-center">{s}</p>
            ))}
            {/* Color rows */}
            {LOADING_COLORS.flatMap(color => [
              <p key={`lbl-${color}`} className="text-xs font-mono text-[var(--color-neutrals-content-subdued)]">{color}</p>,
              ...LOADING_SIZES.map(s => (
                <div key={`${color}-${s}`} className="flex justify-center">
                  <LoadingIndicator color={color} size={s} />
                </div>
              )),
            ])}
          </div>
        </PreviewBox>
      </SubSection>
    </>
  );
}

// ── Section: Button ───────────────────────────────────────────────────────────
// Source of truth: Figma 373:5136 (Buttons/Button).

const BUTTON_HIERARCHIES: ButtonHierarchy[] = ['primary', 'secondary', 'text', 'text-primary'];

function ButtonSection() {
  return (
    <>
      <PageHeader
        title="Button"
        description="The primary action element. Supports four hierarchy levels, two sizes, destructive treatment, icon slots, icon-only mode, loading state, and a badge dot indicator."
      />

      <SubSection id="otp-btn-hierarchy" title="Hierarchy">
        <PreviewBox centered>
          <div className="flex flex-wrap gap-3 items-center justify-center">
            {BUTTON_HIERARCHIES.map(h => (
              <Button key={h} hierarchy={h}>{h}</Button>
            ))}
          </div>
        </PreviewBox>
      </SubSection>

      <SubSection
        id="otp-btn-size"
        title="Size"
        description={<>Two height tiers: <InlineCode>sm</InlineCode> = 32 px, <InlineCode>md</InlineCode> = 40 px (default). Padding and gap are identical; only height changes.</>}
      >
        <PreviewBox centered>
          <div className="flex flex-col gap-5 items-center">
            {(['sm', 'md'] as const).map(size => (
              <div key={size} className="flex flex-wrap gap-3 items-center justify-center">
                {BUTTON_HIERARCHIES.map(h => (
                  <Button key={h} hierarchy={h} size={size}>{h}</Button>
                ))}
                <span className="text-xs font-mono text-[var(--color-neutrals-content-noninteractive)] ml-2">{size}</span>
              </div>
            ))}
          </div>
        </PreviewBox>
      </SubSection>

      <SubSection
        id="otp-btn-states"
        title="States"
        description={<>Use <InlineCode>forceState</InlineCode> to pin a visual state for QA or Storybook without interaction. <InlineCode>loading</InlineCode> disables the button and shows a spinner + "Submitting…".</>}
      >
        <PreviewBox>
          <div className="inline-grid grid-cols-[7rem_repeat(4,1fr)] gap-x-6 gap-y-5 items-center">
            <div />
            {BUTTON_HIERARCHIES.map(h => (
              <p key={h} className="text-xs font-mono text-[var(--color-neutrals-content-subdued)]">{h}</p>
            ))}
            {(['default', 'hover', 'disabled', 'loading'] as const).map(state => [
              <p key={`lbl-${state}`} className="text-xs font-mono text-[var(--color-neutrals-content-noninteractive)]">{state}</p>,
              ...BUTTON_HIERARCHIES.map(h => (
                <Button
                  key={h}
                  hierarchy={h}
                  forceState={state === 'default' ? undefined : state}
                >
                  Label
                </Button>
              )),
            ])}
          </div>
        </PreviewBox>
      </SubSection>

      <SubSection
        id="otp-btn-destructive"
        title="Destructive"
        description={<>Add <InlineCode>destructive</InlineCode> to apply critical color treatment. Primary and secondary switch to the critical background; text hierarchies switch text color only.</>}
      >
        <PreviewBox centered>
          <div className="flex flex-wrap gap-3 items-center justify-center">
            {BUTTON_HIERARCHIES.map(h => (
              <Button key={h} hierarchy={h} destructive>{h}</Button>
            ))}
          </div>
        </PreviewBox>
      </SubSection>

      <SubSection
        id="otp-btn-icons"
        title="Icon slots"
        description={<><InlineCode>iconLeading</InlineCode> and <InlineCode>iconTrailing</InlineCode> accept any ReactNode. Icons are 16 × 16 px, opacity 90%, rendered in an overflow-clipped slot.</>}
      >
        <PreviewBox centered>
          <div className="flex flex-wrap gap-3 items-center justify-center">
            <Button iconLeading={<Plus />}>Leading</Button>
            <Button iconTrailing={<Edit01 />}>Trailing</Button>
            <Button iconLeading={<Plus />} iconTrailing={<Edit01 />}>Both</Button>
            <Button hierarchy="secondary" iconLeading={<Plus />}>Leading</Button>
            <Button hierarchy="text" iconLeading={<Plus />}>Leading</Button>
            <Button hierarchy="text-primary" iconLeading={<Edit01 />}>Trailing</Button>
          </div>
        </PreviewBox>
      </SubSection>

      <SubSection
        id="otp-btn-icon-only"
        title="Icon only"
        description={<>Set <InlineCode>iconOnly</InlineCode> to render a square button with no label. Always pass <InlineCode>aria-label</InlineCode> for accessibility.</>}
      >
        <PreviewBox centered>
          <div className="flex flex-wrap gap-3 items-center justify-center">
            {BUTTON_HIERARCHIES.map(h => (
              <Button key={h} hierarchy={h} iconOnly iconLeading={h === 'text' || h === 'text-primary' ? <Edit01 /> : <Plus />} aria-label={h} />
            ))}
            <Button hierarchy="secondary" iconOnly size="sm" iconLeading={<Trash01 />} aria-label="Delete" />
          </div>
        </PreviewBox>
      </SubSection>

      <SubSection
        id="otp-btn-badge"
        title="Badge dot"
        description={<>The <InlineCode>badge</InlineCode> prop renders an 8 × 8 px primary-colored dot at the top-right corner. Only visible on <InlineCode>text</InlineCode> and <InlineCode>text-primary</InlineCode> hierarchies.</>}
      >
        <PreviewBox centered>
          <div className="flex flex-wrap gap-3 items-center justify-center">
            <Button hierarchy="text" badge>Notifications</Button>
            <Button hierarchy="text-primary" badge>Updates</Button>
            <Button hierarchy="text" badge iconLeading={<Plus />}>With icon</Button>
          </div>
        </PreviewBox>
      </SubSection>
    </>
  );
}

// ── Section: Button Group ─────────────────────────────────────────────────────
// Source of truth: Figma uo2jhkx6oBwYpiFJxWnLJf node 387:696
// (page was empty at inspection — component follows DS border-collapsing conventions)

function ButtonGroupSection() {
  return (
    <>
      <PageHeader
        title="Button Group"
        description="Joins two or more buttons into a single connected control. Adjacent borders collapse to a single 1 px line; only the outer corners keep their radius. Supports horizontal (default) and vertical orientations, and can be nested inside an asRow wrapper to space multiple sub-groups."
      />

      <SubSection
        id="otp-bg-horizontal"
        title="Horizontal"
        description="Default orientation. Shared 1 px border between items; outer corners retain --radius-md."
      >
        <PreviewBox centered>
          <ButtonGroup>
            <Button hierarchy="secondary">Archive</Button>
            <Button hierarchy="secondary">Report</Button>
          </ButtonGroup>
        </PreviewBox>
      </SubSection>

      <SubSection
        id="otp-bg-icon"
        title="With icon-only button"
        description={<>Common "action + overflow" pattern — a text button paired with an icon-only trigger. Always pass <InlineCode>aria-label</InlineCode> on icon-only buttons.</>}
      >
        <PreviewBox centered>
          <ButtonGroup>
            <Button hierarchy="secondary">Snooze</Button>
            <Button hierarchy="secondary" iconOnly iconLeading={<DotsHorizontal />} aria-label="More options" />
          </ButtonGroup>
        </PreviewBox>
      </SubSection>

      <SubSection
        id="otp-bg-vertical"
        title="Vertical"
        description={<>Set <InlineCode>orientation="vertical"</InlineCode> to stack buttons. Top/bottom borders collapse; outer corners are retained.</>}
      >
        <PreviewBox centered>
          <ButtonGroup orientation="vertical">
            <Button hierarchy="secondary">First</Button>
            <Button hierarchy="secondary">Second</Button>
            <Button hierarchy="secondary">Third</Button>
          </ButtonGroup>
        </PreviewBox>
      </SubSection>

      <SubSection
        id="otp-bg-nested"
        title="Nested groups (asRow)"
        description={<>Wrap multiple sub-groups in <InlineCode>{'<ButtonGroup asRow>'}</InlineCode> to space them with --spacing-2 (8 px) while each sub-group still collapses its own borders.</>}
      >
        <PreviewBox centered>
          <ButtonGroup asRow>
            <ButtonGroup>
              <Button hierarchy="secondary" iconOnly iconLeading={<ArrowLeft />} aria-label="Go back" />
              <Button hierarchy="secondary" iconOnly iconLeading={<ArrowRight />} aria-label="Go forward" />
            </ButtonGroup>
            <ButtonGroup>
              <Button hierarchy="secondary">Archive</Button>
              <Button hierarchy="secondary">Report</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button hierarchy="secondary">Snooze</Button>
              <Button hierarchy="secondary" iconOnly iconLeading={<DotsHorizontal />} aria-label="More options" />
            </ButtonGroup>
          </ButtonGroup>
        </PreviewBox>
      </SubSection>

      <SubSection
        id="otp-bg-sizes"
        title="Sizes"
        description={<>The <InlineCode>size</InlineCode> prop is propagated via context to all child Buttons — no need to set it on each Button individually.</>}
      >
        <PreviewBox>
          <div className="flex flex-col gap-5 items-start">
            {(['sm', 'md'] as const).map(size => (
              <div key={size} className="flex items-center gap-4">
                <span className="w-6 text-xs font-mono text-[var(--color-neutrals-content-noninteractive)]">{size}</span>
                <ButtonGroup size={size}>
                  <Button hierarchy="secondary">Archive</Button>
                  <Button hierarchy="secondary">Report</Button>
                  <Button hierarchy="secondary" iconOnly iconLeading={<DotsHorizontal />} aria-label="More" />
                </ButtonGroup>
              </div>
            ))}
          </div>
        </PreviewBox>
      </SubSection>
    </>
  );
}

// ── Section: Card ─────────────────────────────────────────────────────────────
// Source of truth: Figma uo2jhkx6oBwYpiFJxWnLJf node 413:1320

function CardSection() {
  return (
    <>
      <PageHeader
        title="Card"
        description="A composable surface container. Mix and match CardHeader, CardTitle, CardDescription, CardContent, and CardFooter — include only what the pattern needs. No slots are required."
      />

      {/* ── Composition ─────────────────────────────────────────────────── */}
      <SubSection
        id="otp-card-composition"
        title="Composition variants"
        description="Include only the zones the pattern needs. All combinations are valid."
      >
        <PreviewBox>
          <div className="grid grid-cols-2 gap-4">
            {/* Full */}
            <div>
              <p className="mb-2 text-xs font-mono text-[var(--color-neutrals-content-noninteractive)]">Header + Content + Footer</p>
              <Card>
                <CardHeader>
                  <CardTitle>Title</CardTitle>
                  <CardDescription>Description text</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-[length:var(--font-size-body)] leading-[var(--line-height-body)] text-[var(--color-neutrals-content-subdued)] py-2">
                    Body content
                  </p>
                </CardContent>
                <CardFooter>
                  <span className="text-[length:var(--font-size-caption)] text-[var(--color-neutrals-content-noninteractive)]">Label</span>
                  <Button hierarchy="primary" size="sm">Action</Button>
                </CardFooter>
              </Card>
            </div>

            {/* No footer */}
            <div>
              <p className="mb-2 text-xs font-mono text-[var(--color-neutrals-content-noninteractive)]">Header + Content</p>
              <Card>
                <CardHeader>
                  <CardTitle>Title</CardTitle>
                  <CardDescription>Description text</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2 py-2">
                    <Checkbox label="Option A" defaultChecked />
                    <Checkbox label="Option B" />
                    <Checkbox label="Option C" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Header only */}
            <div>
              <p className="mb-2 text-xs font-mono text-[var(--color-neutrals-content-noninteractive)]">Header only</p>
              <Card>
                <CardHeader>
                  <CardTitle>Title</CardTitle>
                  <CardDescription>Description text</CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* No description */}
            <div>
              <p className="mb-2 text-xs font-mono text-[var(--color-neutrals-content-noninteractive)]">No description</p>
              <Card>
                <CardHeader>
                  <CardTitle>Title only</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[length:var(--font-size-body)] leading-[var(--line-height-body)] text-[var(--color-neutrals-content-subdued)] py-2">
                    Body content
                  </p>
                </CardContent>
                <CardFooter>
                  <Button hierarchy="secondary" size="sm">Action</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </PreviewBox>
      </SubSection>

      {/* ── Examples ─────────────────────────────────────────────────────── */}
      <SubSection
        id="otp-card-examples"
        title="Examples"
        description="Common patterns composed from Card sub-components and other DS primitives."
      >
        <PreviewBox>
          <div className="flex gap-6 items-start">

            {/* Card 1 — image + header + footer */}
            <Card className="w-[360px] shrink-0">
              <div className="w-full aspect-[2/1] bg-[var(--color-neutrals-bg-muted-active)]" />
              <CardHeader>
                <CardTitle>Design systems meetup</CardTitle>
                <CardDescription>
                  A practical talk on component APIs, accessibility, and shipping faster.
                </CardDescription>
              </CardHeader>
              <CardFooter className="border-t border-[var(--color-neutrals-border)] ![padding-top:var(--spacing-md)]">
                <Button hierarchy="primary" size="md" className="w-full">View details</Button>
              </CardFooter>
            </Card>

            {/* Card 2 — header + content only */}
            <Card className="grow">
              <CardHeader>
                <CardTitle>Small Card</CardTitle>
              </CardHeader>
              <CardContent className="py-5">
                <p className="text-[length:var(--font-size-body)] leading-[var(--line-height-body)] tracking-[var(--letter-spacing-body)] text-[var(--color-neutrals-content)]">
                  The card component supports a size prop that can be set to &quot;sm&quot; for a more compact appearance.
                </p>
              </CardContent>
            </Card>

          </div>
        </PreviewBox>
      </SubSection>
    </>
  );
}

// ── Section: Checkbox ─────────────────────────────────────────────────────────
// Source of truth: Figma uo2jhkx6oBwYpiFJxWnLJf node 377:756.

function CheckboxSection() {
  return (
    <>
      <PageHeader
        title="Checkbox"
        description="A binary (or indeterminate) selection control. Uses a native sr-only input for full keyboard and screen-reader support with a custom visual box driven by peer-checked, peer-focus-visible, and peer-disabled CSS modifiers."
      />

      <SubSection
        id="otp-cb-variants"
        title="Variants"
        description="Three visual states: unchecked, checked, and indeterminate. Indeterminate takes visual priority over checked."
      >
        <PreviewBox centered>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <Checkbox />
              <span className="text-xs font-mono text-[var(--color-neutrals-content-noninteractive)]">unchecked</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Checkbox checked onChange={() => {}} />
              <span className="text-xs font-mono text-[var(--color-neutrals-content-noninteractive)]">checked</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Checkbox indeterminate />
              <span className="text-xs font-mono text-[var(--color-neutrals-content-noninteractive)]">indeterminate</span>
            </div>
          </div>
        </PreviewBox>
      </SubSection>

      <SubSection
        id="otp-cb-label"
        title="With label"
        description={<>Pass any <InlineCode>ReactNode</InlineCode> to <InlineCode>label</InlineCode>. The label wraps the input so clicking anywhere on the row toggles the checkbox.</>}
      >
        <PreviewBox centered>
          <div className="flex flex-col gap-3">
            <Checkbox label="Accept terms and conditions" />
            <Checkbox label="Subscribe to newsletter" defaultChecked />
            <Checkbox label="Select all" indeterminate />
          </div>
        </PreviewBox>
      </SubSection>

      <SubSection
        id="otp-cb-states"
        title="States"
        description={<>Use <InlineCode>forceState</InlineCode> to pin a visual state for QA without real interaction. All three variants × four states are shown below.</>}
      >
        <PreviewBox>
          <div
            className="inline-grid gap-x-10 gap-y-5 items-center"
            style={{ gridTemplateColumns: '7rem repeat(3, 1fr)' }}
          >
            {/* Column headers */}
            <div />
            {(['unchecked', 'checked', 'indeterminate'] as const).map(v => (
              <p key={v} className="text-xs font-mono text-[var(--color-neutrals-content-subdued)]">{v}</p>
            ))}
            {/* Rows */}
            {([
              { state: undefined,      label: 'default'       },
              { state: 'hover',        label: 'hover'         },
              { state: 'focus',        label: 'focus'         },
              { state: 'disabled',     label: 'disabled'      },
            ] as const).map(({ state, label: stateLabel }) => [
              <p key={`lbl-${stateLabel}`} className="text-xs font-mono text-[var(--color-neutrals-content-noninteractive)]">
                {stateLabel}
              </p>,
              <Checkbox key={`unchecked-${stateLabel}`}  forceState={state} />,
              <Checkbox key={`checked-${stateLabel}`}    forceState={state} checked onChange={() => {}} />,
              <Checkbox key={`indet-${stateLabel}`}      forceState={state} indeterminate />,
            ])}
          </div>
        </PreviewBox>
      </SubSection>

      <SubSection
        id="otp-cb-disabled"
        title="Disabled"
        description="Disabled checkboxes use the noninteractive background, border, and text tokens. The input is unfocusable and aria-disabled is set."
      >
        <PreviewBox centered>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <Checkbox disabled />
              <span className="text-xs font-mono text-[var(--color-neutrals-content-noninteractive)]">unchecked</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Checkbox disabled checked onChange={() => {}} />
              <span className="text-xs font-mono text-[var(--color-neutrals-content-noninteractive)]">checked</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Checkbox disabled indeterminate />
              <span className="text-xs font-mono text-[var(--color-neutrals-content-noninteractive)]">indeterminate</span>
            </div>
          </div>
        </PreviewBox>
      </SubSection>
    </>
  );
}

// ── Section: Skeleton ─────────────────────────────────────────────────────────
// Source of truth: Figma uo2jhkx6oBwYpiFJxWnLJf node 382:2542.

function SkeletonSection() {
  return (
    <>
      <PageHeader
        title="Skeleton"
        description="A shimmer placeholder shown while content loads. Compose blocks at any width, height, and radius to match the shape of the real content."
      />

      <SubSection id="otp-sk-shapes" title="Shapes">
        <PreviewBox centered>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <Skeleton width="var(--spacing-12)" height="var(--spacing-12)" radius="var(--radius-full)" />
              <span className="text-xs font-mono text-[var(--color-neutrals-content-noninteractive)]">circle</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Skeleton width="200px" height="var(--spacing-4)" />
              <span className="text-xs font-mono text-[var(--color-neutrals-content-noninteractive)]">line</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Skeleton width="120px" height="var(--spacing-8)" radius="var(--radius-md)" />
              <span className="text-xs font-mono text-[var(--color-neutrals-content-noninteractive)]">button</span>
            </div>
          </div>
        </PreviewBox>
      </SubSection>

      <SubSection
        id="otp-sk-states"
        title="States"
        description={<><InlineCode>forceState="static"</InlineCode> freezes the animation — useful for snapshot tests.</>}
      >
        <PreviewBox>
          <div className="inline-grid grid-cols-[6rem_1fr] gap-x-8 gap-y-5 items-center">
            <p className="text-xs font-mono text-[var(--color-neutrals-content-noninteractive)]">shimmer</p>
            <Skeleton width="240px" height="var(--spacing-4)" forceState="shimmer" />
            <p className="text-xs font-mono text-[var(--color-neutrals-content-noninteractive)]">static</p>
            <Skeleton width="240px" height="var(--spacing-4)" forceState="static" />
          </div>
        </PreviewBox>
      </SubSection>

      <SubSection
        id="otp-sk-card"
        title="Card placeholder"
        description="Avatar circle + name/subtitle lines + body text + button bar — a typical card loading state."
      >
        <PreviewBox centered>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
              <Skeleton width="var(--spacing-12)" height="var(--spacing-12)" radius="var(--radius-full)" />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
                <Skeleton width="60%" height="var(--spacing-4)" />
                <Skeleton width="40%" height="var(--spacing-3)" />
              </div>
            </div>
            <Skeleton width="100%" height="var(--spacing-4)" />
            <Skeleton width="85%"  height="var(--spacing-4)" />
            <Skeleton width="70%"  height="var(--spacing-4)" />
            <div style={{ display: 'flex', gap: 'var(--spacing-2)', marginTop: 'var(--spacing-2)' }}>
              <Skeleton width="var(--spacing-20)" height="var(--spacing-8)" radius="var(--radius-md)" />
              <Skeleton width="var(--spacing-20)" height="var(--spacing-8)" radius="var(--radius-md)" />
            </div>
          </div>
        </PreviewBox>
      </SubSection>

      <SubSection
        id="otp-sk-table"
        title="Table placeholder"
        description="Three rows of skeleton cells in a grid — matches a data table loading state."
      >
        <PreviewBox>
          <div role="status" aria-label="Loading…" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)', width: '100%' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 'var(--spacing-3)', padding: 'var(--spacing-2) var(--spacing-3)', borderBottom: '1px solid var(--color-neutrals-border)' }}>
              {[80, 50, 50, 50].map((w, i) => (
                <Skeleton key={i} width={`${w}%`} height="var(--spacing-3)" forceState="static" />
              ))}
            </div>
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
        </PreviewBox>
      </SubSection>
    </>
  );
}

// ── Section: Input ────────────────────────────────────────────────────────────
// Source of truth: Figma uo2jhkx6oBwYpiFJxWnLJf node 417:11499 (Text field component set)

function InputSection() {
  return (
    <>
      <PageHeader
        title="Input"
        description="Form input primitives: text, textarea, date picker, and dropdown. All share the same token-bound styling and accessibility pattern."
      />

      {/* ── Text ──────────────────────────────────────────────────────────── */}
      <SubSection
        id="otp-input-text"
        title="Text"
        description="Single-line text field. Supports label, helper text, required/optional indicators, leading and trailing icon slots, and error state."
      >
        <PreviewBox>
          <div className="flex flex-col gap-4 w-[320px]">
            <Input
              label="Conditions"
              required
              placeholder="Add conditions"
              helperText="This is a hint text to help user"
            />
            <Input
              label="Search"
              placeholder="Search…"
              leadingIcon={<SearchMd className="size-5" />}
            />
            <Input
              label="Email address"
              defaultValue="user@example.com"
              trailingIcon={<InfoCircle className="size-4" />}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter password"
              error="Password must be at least 8 characters."
            />
            <Input label="Disabled" placeholder="Cannot edit" disabled />
          </div>
        </PreviewBox>
      </SubSection>

      {/* ── Textarea ──────────────────────────────────────────────────────── */}
      <SubSection
        id="otp-input-textarea"
        title="Textarea"
        description="Multi-line text input. Same token binding as text; no icon slots. Vertically resizable by default."
      >
        <PreviewBox>
          <div className="flex flex-col gap-4 w-[320px]">
            <Textarea
              label="Message"
              required
              placeholder="Write your message here…"
              helperText="Up to 500 characters."
            />
            <Textarea
              label="Notes"
              optional
              placeholder="Any additional notes"
              rows={3}
            />
            <Textarea
              label="Feedback"
              placeholder="Enter feedback"
              error="Feedback is required."
            />
            <Textarea
              label="Read-only"
              defaultValue="This field cannot be edited."
              disabled
            />
          </div>
        </PreviewBox>
      </SubSection>

      {/* ── Date picker ───────────────────────────────────────────────────── */}
      <SubSection
        id="otp-input-date"
        title="Date picker"
        description={<>Native <InlineCode>{'<input type="date">'}</InlineCode> using the same Input component. Browser-rendered date picker; appearance follows the OS/browser chrome.</>}
      >
        <PreviewBox>
          <div className="flex flex-col gap-4 w-[320px]">
            <Input
              label="Start date"
              type="date"
              required
            />
            <Input
              label="End date"
              type="date"
              optional
              helperText="Leave blank for open-ended."
            />
            <Input
              label="Deadline"
              type="date"
              error="Please select a valid date."
            />
            <Input
              label="Locked date"
              type="date"
              defaultValue="2026-01-01"
              disabled
            />
          </div>
        </PreviewBox>
      </SubSection>

      {/* ── Dropdown ──────────────────────────────────────────────────────── */}
      <SubSection
        id="otp-input-dropdown"
        title="Dropdown"
        description={<>Native <InlineCode>{'<select>'}</InlineCode> styled to match the Input visual. A dedicated Dropdown component with search and multi-select is coming in a future release.</>}
      >
        <PreviewBox>
          <div className="flex flex-col gap-4 w-[320px]">
            {/* Reusable inline select wrapper matching Input styling */}
            {([
              { label: 'Country', required: true, helperText: undefined, error: undefined, disabled: false },
              { label: 'Role',    required: false, helperText: 'Determines your access level.', error: undefined, disabled: false },
              { label: 'Status',  required: false, helperText: undefined, error: 'Please select a status.', disabled: false },
              { label: 'Type',    required: false, helperText: undefined, error: undefined, disabled: true },
            ] as const).map(({ label, required, helperText, error, disabled }) => {
              const isError = !!error;
              const borderCls = disabled
                ? 'border-[var(--color-neutrals-border-noninteractive)]'
                : isError
                  ? 'border-[var(--color-critical-border)]'
                  : 'border-[var(--color-neutrals-border)] hover:border-[var(--color-neutrals-border-hover)] focus-within:border-[var(--color-primary-border)]';
              return (
                <div key={label} className="flex flex-col gap-1">
                  <div className="flex gap-0.5 items-start">
                    <label className="text-[length:var(--font-size-body)] leading-[var(--line-height-body)] text-[var(--color-neutrals-content)]">
                      {label}
                    </label>
                    {required && (
                      <span aria-hidden="true" className="text-[var(--color-critical-content)] text-[length:var(--font-size-body)] leading-[var(--line-height-body)] font-medium">*</span>
                    )}
                  </div>
                  <div className={[
                    'flex items-center gap-2 px-3 py-2 border border-solid rounded-[var(--radius-sm)] transition-colors',
                    disabled ? 'bg-[var(--color-neutrals-bg-noninteractive)]' : 'bg-[var(--color-neutrals-bg-canvas)]',
                    borderCls,
                  ].join(' ')}>
                    <select
                      disabled={disabled}
                      aria-invalid={isError || undefined}
                      className={[
                        'flex-1 bg-transparent outline-none border-none appearance-none',
                        'text-[length:var(--font-size-body)] leading-[var(--line-height-body)] font-normal',
                        disabled
                          ? 'cursor-not-allowed text-[var(--color-neutrals-content-noninteractive)]'
                          : 'text-[var(--color-neutrals-content)]',
                      ].join(' ')}
                    >
                      <option value="">Select an option</option>
                      <option value="a">Option A</option>
                      <option value="b">Option B</option>
                      <option value="c">Option C</option>
                    </select>
                    <ChevronDown className="size-4 shrink-0 text-[var(--color-neutrals-content-noninteractive)] pointer-events-none" />
                  </div>
                  {error ? (
                    <p role="alert" className="text-[length:var(--font-size-caption)] leading-[var(--line-height-caption)] font-normal text-[var(--color-critical-content)]">{error}</p>
                  ) : helperText ? (
                    <p className="text-[length:var(--font-size-caption)] leading-[var(--line-height-caption)] font-normal text-[var(--color-neutrals-content-subdued)]">{helperText}</p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </PreviewBox>
      </SubSection>
    </>
  );
}


// ── Section: Tag ──────────────────────────────────────────────────────────────
// Source of truth: Figma uo2jhkx6oBwYpiFJxWnLJf node 417:5907 (Chip component set)

function TagSection() {
  const colors: TagColor[] = ['default', 'primary', 'error', 'warning', 'success'];
  return (
    <>
      <PageHeader
        title="Tag"
        description="A compact label element. Available in three visual types — filled, outlined, and highlighted — across five semantic colors. Supports a leading icon slot and an independent removable close button."
      />

      {/* ── Type ────────────────────────────────────────────────────────────── */}
      <SubSection
        id="otp-tag-type"
        title="Type"
        description="Filled uses a muted background. Outlined uses a white background with a border. Highlighted is the same as Filled but with semibold text."
      >
        <PreviewBox>
          <div className="flex flex-wrap items-center gap-3">
            <Tag label="Filled" type="filled" />
            <Tag label="Outlined" type="outlined" />
            <Tag label="Highlighted" type="highlighted" />
          </div>
        </PreviewBox>
      </SubSection>

      {/* ── Color ───────────────────────────────────────────────────────────── */}
      <SubSection
        id="otp-tag-color"
        title="Color"
        description="Five semantic colors available across all types."
      >
        <PreviewBox>
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {colors.map(c => <Tag key={c} label={c} type="filled" color={c} />)}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {colors.map(c => <Tag key={c} label={c} type="outlined" color={c} />)}
            </div>
          </div>
        </PreviewBox>
      </SubSection>

      {/* ── Size ────────────────────────────────────────────────────────────── */}
      <SubSection
        id="otp-tag-size"
        title="Size"
        description="Small (24 px) and Default (32 px)."
      >
        <PreviewBox>
          <div className="flex items-center gap-3">
            <Tag label="Small" size="sm" />
            <Tag label="Default" size="md" />
          </div>
        </PreviewBox>
      </SubSection>

      {/* ── Leading & tailoring ─────────────────────────────────────────────── */}
      <SubSection
        id="otp-tag-slots"
        title="Icon and removable"
        description="Pass any React node as icon for a 16 px leading slot. removable adds an independent close button."
      >
        <PreviewBox>
          <div className="flex flex-wrap items-center gap-3">
            <Tag label="No slots" />
            <Tag label="With icon" icon={<Tag01 className="size-4" />} />
            <Tag label="Removable" removable onRemove={() => {}} />
            <Tag label="Both" icon={<Tag01 className="size-4" />} removable onRemove={() => {}} />
          </div>
        </PreviewBox>
      </SubSection>

      {/* ── States ──────────────────────────────────────────────────────────── */}
      <SubSection
        id="otp-tag-states"
        title="States"
        description="Default and disabled. Hover and focus are CSS-driven."
      >
        <PreviewBox>
          <div className="flex flex-wrap items-center gap-3">
            <Tag label="Default" />
            <Tag label="Disabled" disabled />
            <Tag label="Disabled + icon" icon={<Tag01 className="size-4" />} disabled />
            <Tag label="Disabled removable" removable disabled />
          </div>
        </PreviewBox>
      </SubSection>
    </>
  );
}

// ── Section: Radio Button ─────────────────────────────────────────────────────
// Source of truth: Figma uo2jhkx6oBwYpiFJxWnLJf node 381:943 (↳ Radio button page)

function RadioButtonSection() {
  return (
    <>
      <PageHeader
        title="Radio Button"
        description="A single-selection control within a group. Uses a native sr-only input for full keyboard and screen-reader support with a custom circular indicator driven by peer-checked, peer-focus-visible, and peer-disabled CSS modifiers."
      />

      <SubSection
        id="otp-rb-variants"
        title="Variants"
        description="Unchecked and checked states. The inner dot appears when the input is selected."
      >
        <PreviewBox centered>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <RadioButton value="a" />
              <span className="text-xs font-mono text-[var(--color-neutrals-content-noninteractive)]">unchecked</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <RadioButton value="b" checked onChange={() => {}} />
              <span className="text-xs font-mono text-[var(--color-neutrals-content-noninteractive)]">checked</span>
            </div>
          </div>
        </PreviewBox>
      </SubSection>

      <SubSection
        id="otp-rb-label"
        title="With label and description"
        description={<>Pass <InlineCode>label</InlineCode> for the primary text and <InlineCode>description</InlineCode> for the subtitle line indented under the label.</>}
      >
        <PreviewBox centered>
          <div className="flex flex-col gap-3">
            <RadioButton name="plan-label" value="starter" label="Starter" description="Up to 5 users" defaultChecked />
            <RadioButton name="plan-label" value="pro"     label="Pro"     description="Up to 25 users" />
            <RadioButton name="plan-label" value="ent"     label="Enterprise" description="Unlimited users" />
          </div>
        </PreviewBox>
      </SubSection>

      <SubSection
        id="otp-rb-states"
        title="States"
        description={<>Use <InlineCode>forceState</InlineCode> to pin a visual state for QA without real interaction.</>}
      >
        <PreviewBox>
          <div
            className="inline-grid gap-x-10 gap-y-5 items-center"
            style={{ gridTemplateColumns: '7rem repeat(2, 1fr)' }}
          >
            {/* Column headers */}
            <div />
            {(['unchecked', 'checked'] as const).map(v => (
              <p key={v} className="text-xs font-mono text-[var(--color-neutrals-content-subdued)]">{v}</p>
            ))}
            {/* Rows */}
            {([
              { state: undefined,  label: 'default'  },
              { state: 'hover',    label: 'hover'    },
              { state: 'focus',    label: 'focus'    },
              { state: 'disabled', label: 'disabled' },
            ] as const).map(({ state, label: stateLabel }) => [
              <p key={`lbl-${stateLabel}`} className="text-xs font-mono text-[var(--color-neutrals-content-noninteractive)]">
                {stateLabel}
              </p>,
              <RadioButton key={`unchecked-${stateLabel}`} value="a" forceState={state} label="Label" />,
              <RadioButton key={`checked-${stateLabel}`}   value="b" forceState={state} label="Label" checked onChange={() => {}} />,
            ])}
          </div>
        </PreviewBox>
      </SubSection>

      <SubSection
        id="otp-rb-group"
        title="Radio Group"
        description="Radios within the same name attribute are mutually exclusive — selecting one deselects the others natively."
      >
        <PreviewBox centered>
          <div className="flex flex-col gap-3">
            <RadioButton name="plan-group" value="starter"    label="Starter"    description="Up to 5 users" defaultChecked />
            <RadioButton name="plan-group" value="pro"        label="Pro"        description="Up to 25 users" />
            <RadioButton name="plan-group" value="enterprise" label="Enterprise" description="Unlimited users" />
            <RadioButton name="plan-group" value="custom"     label="Custom"     description="Talk to sales" disabled />
          </div>
        </PreviewBox>
      </SubSection>
    </>
  );
}

// ── Section: Switch ───────────────────────────────────────────────────────────
// Source of truth: Figma uo2jhkx6oBwYpiFJxWnLJf — node 440:13 (Switch component set)

function SwitchSection() {
  return (
    <>
      <PageHeader
        title="Switch"
        description="A toggle control for binary on/off state. Uses a native sr-only input with role=switch for full keyboard and screen-reader support. The track and thumb visuals are driven by peer-checked and peer-disabled CSS modifiers."
      />

      <SubSection
        id="otp-sw-variants"
        title="Variants"
        description="Unchecked and checked. The thumb slides right when the switch is on."
      >
        <PreviewBox centered>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <Switch />
              <span className="text-xs font-mono text-[var(--color-neutrals-content-noninteractive)]">unchecked</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Switch checked onChange={() => {}} />
              <span className="text-xs font-mono text-[var(--color-neutrals-content-noninteractive)]">checked</span>
            </div>
          </div>
        </PreviewBox>
      </SubSection>

      <SubSection
        id="otp-sw-label"
        title="With label"
        description={<>Pass any <InlineCode>ReactNode</InlineCode> to <InlineCode>label</InlineCode>. Clicking anywhere on the row toggles the switch.</>}
      >
        <PreviewBox centered>
          <div className="flex flex-col gap-3">
            <Switch label="Enable notifications" defaultChecked />
            <Switch label="Dark mode" />
            <Switch label="Auto-save" defaultChecked />
          </div>
        </PreviewBox>
      </SubSection>

      <SubSection
        id="otp-sw-states"
        title="States"
        description={<>Use <InlineCode>forceState</InlineCode> to pin a visual state for QA without real interaction. Both variants × four states are shown below.</>}
      >
        <PreviewBox>
          <div
            className="inline-grid gap-x-10 gap-y-5 items-center"
            style={{ gridTemplateColumns: '7rem repeat(2, 1fr)' }}
          >
            <div />
            {(['unchecked', 'checked'] as const).map(v => (
              <p key={v} className="text-xs font-mono text-[var(--color-neutrals-content-subdued)]">{v}</p>
            ))}
            {([
              { state: undefined,   label: 'default'  },
              { state: 'hover',     label: 'hover'    },
              { state: 'focus',     label: 'focus'    },
              { state: 'disabled',  label: 'disabled' },
            ] as const).map(({ state, label: stateLabel }) => [
              <p key={`lbl-${stateLabel}`} className="text-xs font-mono text-[var(--color-neutrals-content-noninteractive)]">
                {stateLabel}
              </p>,
              <Switch key={`unchecked-${stateLabel}`} forceState={state} />,
              <Switch key={`checked-${stateLabel}`}   forceState={state} checked onChange={() => {}} />,
            ])}
          </div>
        </PreviewBox>
      </SubSection>

      <SubSection
        id="otp-sw-disabled"
        title="Disabled"
        description="Disabled switches use the noninteractive background token and 0.4 opacity on the whole control. The input is unfocusable and aria-disabled is set."
      >
        <PreviewBox centered>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <Switch disabled />
              <span className="text-xs font-mono text-[var(--color-neutrals-content-noninteractive)]">unchecked</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Switch disabled checked onChange={() => {}} />
              <span className="text-xs font-mono text-[var(--color-neutrals-content-noninteractive)]">checked</span>
            </div>
          </div>
        </PreviewBox>
      </SubSection>
    </>
  );
}

// ── Content router ────────────────────────────────────────────────────────────

function SectionContent({ id }: { id: SectionId }) {
  switch (id) {
    case 'colors-tokens':     return <TokensSection />;
    case 'typography':        return <TypographySection />;
    case 'icons':             return <IconsSection />;
    case 'accordion':         return <AccordionSection />;
    case 'avatar':            return <AvatarSection />;
    case 'badge':             return <BadgeSection />;
    case 'button':            return <ButtonSection />;
    case 'button-group':      return <ButtonGroupSection />;
    case 'breadcrumbs':       return <BreadcrumbsSection />;
    case 'card':              return <CardSection />;
    case 'checkbox':          return <CheckboxSection />;
    case 'input':             return <InputSection />;
    case 'tag':               return <TagSection />;
    case 'radio-button':      return <RadioButtonSection />;
    case 'switch':            return <SwitchSection />;
    case 'loading-indicator': return <LoadingSection />;
    case 'skeleton':          return <SkeletonSection />;
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DsDevPage() {
  const [activeId, setActiveId] = useState<SectionId>('colors-tokens');
  const mainRef = useRef<HTMLDivElement>(null);

  const activeIndex  = ALL_ITEMS.findIndex(i => i.id === activeId);
  const activeLabel  = ALL_ITEMS[activeIndex]?.label ?? '';
  const activeGroup  = NAV_SECTIONS.find(s => s.items.some(i => i.id === activeId))?.label ?? '';
  const prevItem     = ALL_ITEMS[activeIndex - 1];
  const nextItem     = ALL_ITEMS[activeIndex + 1];

  function navigateTo(id: SectionId) {
    setActiveId(id);
    mainRef.current?.scrollTo({ top: 0 });
  }

  const prevNextNav = (
    <div className="flex items-center justify-between">
      {prevItem ? (
        <button
          onClick={() => navigateTo(prevItem.id as SectionId)}
          className="group flex flex-col items-start text-sm"
        >
          <span className="text-xs text-[var(--color-neutrals-content-noninteractive)] mb-0.5">Previous</span>
          <span className="text-[var(--color-neutrals-content-subdued)] group-hover:text-[var(--color-neutrals-content)] transition-colors">
            ← {prevItem.label}
          </span>
        </button>
      ) : <div />}
      {nextItem && (
        <button
          onClick={() => navigateTo(nextItem.id as SectionId)}
          className="group flex flex-col items-end text-sm"
        >
          <span className="text-xs text-[var(--color-neutrals-content-noninteractive)] mb-0.5">Next</span>
          <span className="text-[var(--color-neutrals-content-subdued)] group-hover:text-[var(--color-neutrals-content)] transition-colors">
            {nextItem.label} →
          </span>
        </button>
      )}
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-neutrals-bg-canvas)]">

      {/* ── Top bar ───────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-20 h-14 flex items-center gap-2 px-6 border-b border-[var(--color-neutrals-border)] bg-[var(--color-neutrals-bg)]">
        <span className="text-sm font-semibold text-[var(--color-neutrals-content)]">
          Design System
        </span>
        {activeGroup && (
          <>
            <span className="text-[var(--color-neutrals-content-noninteractive)]">/</span>
            <span className="text-sm text-[var(--color-neutrals-content-subdued)]">{activeGroup}</span>
            <span className="text-[var(--color-neutrals-content-noninteractive)]">/</span>
            <span className="text-sm text-[var(--color-neutrals-content)]">{activeLabel}</span>
          </>
        )}
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* ── Left sidebar ──────────────────────────────────────────────── */}
        <nav className="sticky top-14 self-start w-56 shrink-0 h-[calc(100vh-3.5rem)] overflow-y-auto border-r border-[var(--color-neutrals-border)] bg-[var(--color-neutrals-bg)] py-6 px-3">
          {NAV_SECTIONS.map(group => (
            <div key={group.label} className="mb-6">
              <p className="px-3 mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-[var(--color-neutrals-content-noninteractive)]">
                {group.label}
              </p>
              <ul className="space-y-0.5">
                {group.items.map(item => (
                  <li key={item.id}>
                    <button
                      onClick={() => navigateTo(item.id as SectionId)}
                      className={[
                        'w-full text-left px-3 py-1.5 rounded-[var(--radius-sm)] text-sm transition-colors',
                        activeId === item.id
                          ? 'bg-[var(--color-neutrals-bg-hover)] text-[var(--color-neutrals-content)] font-medium'
                          : 'text-[var(--color-neutrals-content-subdued)] hover:text-[var(--color-neutrals-content)] hover:bg-[var(--color-neutrals-bg-hover)]',
                      ].join(' ')}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* ── Main content ──────────────────────────────────────────────── */}
        <main
          ref={mainRef}
          className="flex-1 min-w-0 h-[calc(100vh-3.5rem)] overflow-y-auto px-10 py-8"
        >
          <div className="max-w-3xl">
            <SectionContent id={activeId} />
            <div className="mt-16 pt-6 border-t border-[var(--color-neutrals-border)]">
              {prevNextNav}
            </div>
          </div>
        </main>


      </div>
    </div>
  );
}

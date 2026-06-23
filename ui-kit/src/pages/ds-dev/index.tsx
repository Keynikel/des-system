import { useState, useRef } from 'react';
import { colorTokens } from '../../tokens/colors';
import { textStyles } from '../../tokens/typography';
import { Icon } from '../../components/Icon';
import type { IconName } from '../../components/Icon';
import { AccordionItem, AccordionGroup } from '../../components/Accordion';
import { SettingsPayment } from '../../components/SettingsPayment';
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
import { Home01 } from '../../icons/components/general/Home01';
import { Plus } from '../../icons/components/general/Plus';
import { Edit01 } from '../../icons/components/general/Edit01';
import { Trash01 } from '../../icons/components/general/Trash01';
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
      { id: 'breadcrumbs',       label: 'Breadcrumbs'       },
      { id: 'loading-indicator', label: 'Loading Indicator'  },
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

const bodyText = 'text-sm font-normal leading-[var(--line-height-body)] tracking-[var(--letter-spacing-body)] text-[var(--color-neutrals-content)]';

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
        description="Single-open group with rich content. First item expanded by default."
      >
        <PreviewBox>
          <AccordionGroup>
            <AccordionItem title="How does billing work?" defaultExpanded>
              <SettingsPayment />
            </AccordionItem>
            <AccordionItem title="Is my data secure?">
              <p className={bodyText}>
                We use AES-256 encryption at rest and TLS 1.3 in transit. Data is stored in
                SOC 2 Type II certified infrastructure with role-based access controls and 2FA.
              </p>
            </AccordionItem>
            <AccordionItem title="What integrations do you support?">
              <p className={bodyText}>
                We integrate with Slack, GitHub, Jira, Salesforce, and 50+ tools via native
                connectors, REST API, and webhooks.
              </p>
            </AccordionItem>
          </AccordionGroup>
        </PreviewBox>
      </SubSection>

      <SubSection
        id="otp-acc-faq"
        title="FAQ group"
        description="600 px wide single-open group with text content."
      >
        <PreviewBox>
          <AccordionGroup className="max-w-[600px]">
            <AccordionItem title="How does billing work?" defaultExpanded>
              <p className={bodyText}>
                Monthly and annual plans available. Billing is charged at the start of each cycle;
                cancel anytime. All plans include backups, 24/7 support, and unlimited team members.
              </p>
            </AccordionItem>
            <AccordionItem title="Is my data secure?">
              <p className={bodyText}>
                AES-256 at rest, TLS 1.3 in transit, stored in SOC 2 Type II certified infrastructure
                with role-based access and 2FA.
              </p>
            </AccordionItem>
            <AccordionItem title="What integrations do you support?">
              <p className={bodyText}>
                Slack, GitHub, Jira, Salesforce, and 50+ more via native connectors, REST API, and webhooks.
              </p>
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
            <AccordionItem title="How does billing work?" defaultExpanded>
              <p className={bodyText}>Monthly and annual plans. Cancel anytime.</p>
            </AccordionItem>
            <AccordionItem title="Is my data secure?" defaultExpanded>
              <p className={bodyText}>AES-256 encryption, SOC 2 Type II certified infrastructure.</p>
            </AccordionItem>
            <AccordionItem title="What integrations do you support?">
              <p className={bodyText}>Slack, GitHub, Jira, and 50+ more.</p>
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
    case 'breadcrumbs':       return <BreadcrumbsSection />;
    case 'loading-indicator': return <LoadingSection />;
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

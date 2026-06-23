// Source of truth: Figma component set 293:942, node 293:304 (file uo2jhkx6oBwYpiFJxWnLJf).
// 4 sizes × 3 types = 12 variants.
//
// Figma spacing token → app token mapping (resolved px values):
//   xs  = spacing-3xl (Figma 24px) → --spacing-lg   (= --spacing-6  = 24px)
//   sm  = spacing-4xl (Figma 32px) → --spacing-xl   (= --spacing-8  = 32px)
//   md  = spacing-5xl (Figma 40px) → --spacing-10   (primitive      = 40px)
//   lg  = spacing-6xl (Figma 48px) → --spacing-2xl  (= --spacing-12 = 48px)

import { useState } from 'react';
import { User01 } from '../icons/components/users/User01';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg';
export type AvatarType = 'image' | 'placeholder' | 'text';

export interface AvatarProps {
  size?: AvatarSize;
  type?: AvatarType;
  src?: string;
  alt?: string;
  /** Explicit initials string (e.g. "JD"). Takes precedence over `name`. */
  initials?: string;
  /** Full name — used to derive two-letter initials when `initials` is omitted. */
  name?: string;
  className?: string;
}

// Avatar square dimensions bound to spacing tokens (see header mapping).
const SIZE_CLASS: Record<AvatarSize, string> = {
  xs: 'size-[var(--spacing-lg)]',   // 24px
  sm: 'size-[var(--spacing-xl)]',   // 32px
  md: 'size-[var(--spacing-10)]',   // 40px
  lg: 'size-[var(--spacing-2xl)]',  // 48px
};

function deriveInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function Avatar({
  size = 'md',
  type,
  src,
  alt = '',
  initials,
  name,
  className = '',
}: AvatarProps) {
  const [imgError, setImgError] = useState(false);

  // Infer type from provided props when not explicit.
  const resolvedType: AvatarType =
    type ?? (src ? 'image' : initials || name ? 'text' : 'placeholder');

  // Image error → fall back to text (if initials/name available) or placeholder.
  const effectiveType: AvatarType =
    resolvedType === 'image' && imgError
      ? initials || name ? 'text' : 'placeholder'
      : resolvedType;

  const derivedInitials = initials ?? (name ? deriveInitials(name) : '');

  // Structural classes shared by all variants: size, shape, clip.
  // overflow-clip matches Figma (node 293:1125); relative for absolute-positioned img child.
  const shell = [
    'shrink-0 relative overflow-clip rounded-[var(--radius-full)] border border-[var(--color-neutrals-border)]',
    SIZE_CLASS[size],
    className,
  ].filter(Boolean).join(' ');

  // placeholder/text add flex centering on top of shell.
  const base = ['inline-flex items-center justify-center', shell].join(' ');

  if (effectiveType === 'image') {
    return (
      <div className={shell}>
        <img
          src={src}
          alt={alt}
          onError={() => setImgError(true)}
          // max-w-none overrides Tailwind's img { max-width: 100% } so the fill is never constrained.
          // rounded-full + overflow-clip on container both clip to circle (Figma does both).
          className="absolute inset-0 size-full object-cover max-w-none rounded-[var(--radius-full)] pointer-events-none"
        />
      </div>
    );
  }

  if (effectiveType === 'text') {
    // xs: Caption (12/20, 0.2px)   sm/md/lg: body (14/22, 0.1px)
    const textClass = size === 'xs'
      ? 'text-xs leading-[var(--line-height-caption)] tracking-[var(--letter-spacing-caption)]'
      : 'text-sm leading-[var(--line-height-body)] tracking-[var(--letter-spacing-body)]';

    return (
      <div className={[base, 'bg-[var(--color-neutrals-bg)]'].join(' ')}>
        <span className={['font-normal text-[var(--color-neutrals-content-subdued)]', textClass].join(' ')}>
          {derivedInitials}
        </span>
      </div>
    );
  }

  // placeholder — centered User01 icon; 16px at xs, 21.33px at sm/md/lg (Figma spec).
  const iconPx = size === 'xs' ? 16 : 21.33;
  return (
    <div className={[base, 'bg-[var(--color-neutrals-bg)]'].join(' ')}>
      <User01
        width={iconPx}
        height={iconPx}
        aria-hidden
        className="text-[var(--color-neutrals-content-subdued)]"
      />
    </div>
  );
}

import { Link } from 'react-router-dom';
import { Icon } from '../../components/Icon';

export default function LandingPage() {
  return (
    <div style={{ background: 'var(--color-neutrals-bg-canvas)', color: 'var(--color-neutrals-content)', minHeight: '100vh' }}>
      <Hero />
    </div>
  );
}

function Hero() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: 'var(--spacing-24) var(--spacing-6) var(--spacing-20)' }}>
      {/* Decorative background shapes — sizes are compositional, not semantic */}
      <Shape
        size="30rem"
        color="var(--color-primary-bg-muted)"
        style={{ top: '-10rem', right: '-7.5rem', borderRadius: '40% 60% 55% 45%', opacity: 0.6 }}
      />
      <Shape
        size="15rem"
        color="var(--color-palette-blue-4)"
        style={{ bottom: '-3.75rem', left: '-5rem', borderRadius: '60% 40% 45% 55%', opacity: 0.4 }}
      />
      <Shape
        size="6.25rem"
        color="var(--color-palette-blue-6)"
        style={{ top: 'var(--spacing-16)', right: '30%', borderRadius: '50%', opacity: 0.3 }}
      />

      {/* Content */}
      <div style={{ position: 'relative', maxWidth: '40rem', margin: '0 auto', textAlign: 'center' }}>
        {/* Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--spacing-2)',
            padding: 'var(--spacing-1) var(--spacing-3)',
            borderRadius: 'var(--radius-full)',
            background: 'var(--color-primary-bg-muted)',
            border: '1px solid var(--color-primary-border)',
            marginBottom: 'var(--spacing-7)',
          }}
        >
          <Icon name="LayersThree01" size={14} color="var(--color-primary-content)" />
          <span
            style={{
              fontSize: 'var(--font-size-caption-medium)',
              fontWeight: 'var(--font-weight-caption-medium)',
              color: 'var(--color-primary-content)',
              letterSpacing: 'var(--letter-spacing-caption-medium)',
            }}
          >
            Design system
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: 'clamp(var(--font-size-display-sm), 5vw, var(--font-size-display))',
            fontWeight: 'var(--font-weight-display)',
            lineHeight: 'var(--line-height-display)',
            letterSpacing: 'var(--letter-spacing-display)',
            color: 'var(--color-neutrals-content)',
            margin: '0 0 var(--spacing-5)',
          }}
        >
          Build interfaces
          <br />
          <span style={{ color: 'var(--color-primary-content)' }}>without friction</span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 'var(--font-size-h4)',
            lineHeight: 'var(--line-height-body)',
            color: 'var(--color-neutrals-content-subdued)',
            maxWidth: '27.5rem',
            margin: '0 auto var(--spacing-10)',
          }}
        >
          A cohesive set of tokens, icons, and components so your team ships
          consistent, polished products faster.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 'var(--spacing-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
<Link
            to="/ds-dev"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--spacing-2)',
              padding: 'var(--spacing-2) var(--spacing-5)',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: 'var(--color-primary-bg)',
              color: 'var(--color-palette-white)',
              fontSize: 'var(--font-size-h4)',
              fontWeight: 'var(--font-weight-h4)',
              textDecoration: 'none',
            }}
          >
            Component library
            <Icon name="ArrowRight" size={16} color="var(--color-palette-white)" />
          </Link>

          <Link
            to="/release-notes"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--spacing-2)',
              padding: 'var(--spacing-2) var(--spacing-5)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-neutrals-border)',
              background: 'transparent',
              color: 'var(--color-neutrals-content)',
              fontSize: 'var(--font-size-h4)',
              fontWeight: 'var(--font-weight-h4)',
              textDecoration: 'none',
            }}
          >
            <Icon name="BookOpen01" size={16} color="var(--color-neutrals-content-subdued)" />
            Release notes
          </Link>
        </div>

      </div>
    </section>
  );
}

function Shape({ size, color, style }: { size: string; color: string; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        position: 'absolute',
        width: size,
        height: size,
        background: color,
        ...style,
      }}
    />
  );
}

import * as Icons from '../icons/components'

export type IconName = keyof typeof Icons

export const Icon = ({ name, size = 20, color = 'currentColor', className }: {
  name: IconName; size?: number; color?: string; className?: string
}) => {
  const Svg = Icons[name] as React.FC<React.SVGProps<SVGSVGElement>>
  if (!Svg) return null
  return <Svg width={size} height={size} style={{ color }} className={className} />
}

import type { CSSProperties } from 'react'

import { SPRITE_PAGES, type SignSprite } from '@/data/signs'

type RoadSignProps = {
  sprite?: SignSprite
  /**
   * Target size for the longest edge; component keeps aspect ratio based on sprite width/height.
   */
  size?: number
  ariaLabel?: string
  className?: string
}

const RoadSign = ({ sprite, size = 120, ariaLabel, className }: RoadSignProps) => {
  if (!sprite) {
    return (
      <div
        aria-label={ariaLabel ?? 'Unknown sign'}
        className={`flex h-full w-full items-center justify-center text-xs text-slate-400 ${className ?? ''}`}
      >
        Unknown sign
      </div>
    )
  }

  const pageSource = SPRITE_PAGES[sprite.page]
  if (!pageSource) {
    return (
      <div
        aria-label={ariaLabel ?? 'Missing sprite source'}
        className={`flex h-full w-full items-center justify-center text-xs text-slate-400 ${className ?? ''}`}
      >
        Missing sprite
      </div>
    )
  }

  const targetEdge = size ?? Math.max(sprite.width, sprite.height)
  const scale = targetEdge / Math.max(sprite.width, sprite.height)

  const style: CSSProperties = {
    width: sprite.width * scale,
    height: sprite.height * scale,
    backgroundImage: `url(${pageSource.src})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: `${pageSource.width * scale}px ${pageSource.height * scale}px`,
    backgroundPosition: `-${sprite.x * scale}px -${sprite.y * scale}px`,
  }

  return <div style={style} className={className} role="img" aria-label={ariaLabel} />
}

export default RoadSign

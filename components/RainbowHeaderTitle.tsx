'use client'

import { useSplittingOnLoad } from '@/hooks'

function RainbowHeaderTitle() {
  useSplittingOnLoad('rainbow')
  return (
    <h1
      data-splitting
      className="rainbow animated title theme-pixel-princess:hidden"
    >
      meagan waller
    </h1>
  )
}

export default RainbowHeaderTitle

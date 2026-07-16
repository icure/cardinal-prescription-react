import React, { useEffect, useRef } from 'react'

interface InfiniteScrollProps {
  threshold?: number
  loadMore: () => void
}

export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ threshold = 0, loadMore }) => {
  const infiniteScrollRef = useRef<HTMLDivElement>(null)
  const isLoadMore = useRef(false)

  useEffect(() => {
    const element = infiniteScrollRef.current?.parentElement
    if (!element) return

    const onScroll = (e: Event) => {
      const target = e.target as HTMLElement
      const offset = target.scrollHeight - target.clientHeight - target.scrollTop
      if (offset <= threshold) {
        if (!isLoadMore.current) {
          loadMore()
        }
        isLoadMore.current = true
      } else {
        isLoadMore.current = false
      }
    }

    element.addEventListener('scroll', onScroll)
    element.addEventListener('resize', onScroll)
    return () => {
      element.removeEventListener('scroll', onScroll)
      element.removeEventListener('resize', onScroll)
    }
  }, [threshold, loadMore])

  return <div ref={infiniteScrollRef} style={{ width: 0 }} />
}

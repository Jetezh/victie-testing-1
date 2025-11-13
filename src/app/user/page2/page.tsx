import React from 'react'
import PageTransition from '@/components/PageTransition'
import TestInfiniteScrollPage from '@/app/test-infinite-scroll/page'

function PageTwo() {
  return (
    <PageTransition>
      <div>
        <TestInfiniteScrollPage />
      </div>
    </PageTransition>
  )
}

export default PageTwo
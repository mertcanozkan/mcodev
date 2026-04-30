'use client'

import { Suspense, lazy, Component } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

class SplineErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Spline scene failed:', error?.message || error)
    }
  }

  render() {
    if (this.state.hasError) return this.props.fallback ?? null
    return this.props.children
  }
}

export function SplineScene({ scene, className }) {
  return (
    <SplineErrorBoundary fallback={null}>
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <span className="loader" />
          </div>
        }
      >
        <Spline
          scene={scene}
          className={className}
          onError={(err) => {
            if (process.env.NODE_ENV !== 'production') {
              console.warn('Spline onError:', err?.message || err)
            }
          }}
        />
      </Suspense>
    </SplineErrorBoundary>
  )
}

import React from "react"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  componentDidCatch(error, errorInfo) {
    this.props.onError(error, errorInfo)
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    }
  }

  render() {
    if (this.state.hasError) {
      return <this.props.componentDisplayedOnError error={this.state.error} />
    }
    return <>{this.props.children}</>
  }
}

export const catchError = (LowerLevelComponent, componentDisplayedOnError, onError = () => {}) => (
  props,
) => {
  return (
    <ErrorBoundary componentDisplayedOnError={componentDisplayedOnError} onError={onError}>
      <LowerLevelComponent {...props} />
    </ErrorBoundary>
  )
}

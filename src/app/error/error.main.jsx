import React from "react"

export const catchError = (LowerLevelComponent) => {
  class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        hasError: false,
        error: null,
      }
    }

    static getDerivedStateFromError(error) {
      return {
        hasError: true,
        error,
      }
    }

    render() {
      if (this.state.hasError) {
        return <LowerLevelComponent {...this.props} error={this.state.error} />
      }
      return <LowerLevelComponent {...this.props} />
    }
  }

  return ErrorBoundary
}

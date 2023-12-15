// React Imports
import React, { Component } from 'react'

// Sub Component Import
import FallbackUI from './components/FallbackUI'

// ** axios import
import axios from 'axios'

class ErrorBoundary extends Component {

  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.setState({ error, errorInfo })
    this.logErrorToBackendService(error, errorInfo)
  }

  logErrorToBackendService = async (error, errorInfo) => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}')
      const companyID = userData?.CompanyId
      const errorMessage = error ? error.toString() : ''
      const errorDetails = errorInfo ? errorInfo.componentStack : ''
      await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/Frontend_error_log`, { CompanyId: companyID, Error: errorMessage, Info: errorDetails })
    } catch (error) {
      console.log("An error occured in error logger service, Error: ", error.message)
    }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <FallbackUI {...{ error: this.state.error, errorInfo: this.state.errorInfo }} />
    }

    return this.props.children
  }

}

export default ErrorBoundary
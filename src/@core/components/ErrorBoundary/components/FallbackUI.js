// React Imports
import React from 'react'

// ** Reactstrap Imports
import { Alert } from 'reactstrap'
import { AlertCircle } from 'react-feather'

const FallbackUI = ({ error, errorInfo }) => {
  return (
    <Alert color='danger'>
      <h4 className='alert-heading'>
        <AlertCircle size={16} />
        <span className='ms-1'>Oops! something went wrong</span>
      </h4>
      <div className='alert-body'>
        <span>We cannot load this page, please try to refresh the page or contact support.</span>
        <details style={{ whiteSpace: 'pre-wrap' }}>
          <summary>{error && error.toString()}</summary>
          <p>{errorInfo && errorInfo.componentStack}</p>
        </details>
      </div>
    </Alert >
  )
}

export default FallbackUI
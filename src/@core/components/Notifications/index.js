// ** React Imports
import React, { Fragment } from 'react'

// ** Custom Component Imports
import Avatar from '@components/avatar'

// ** Third Party Library Imports
import Proptypes from 'prop-types'
import { toast, Slide } from 'react-toastify'

// ** Icons Import
import { Check, X, Info } from 'react-feather'

const ToastUI = ({ title, message, type }) => {
  let color = ''
  let icon = <></>
  let styles = {}
  switch (type) {
    case "success":
      color = 'success'
      icon = <Check size={12} />
      styles = { color: '#28c76f' }
      break
    case "error":
      color = 'danger'
      icon = <X size={12} />
      styles = { color: '#ea5455' }
      break
    case "warning":
      color = 'warning'
      icon = <Info size={12} />
      styles = { color: '#F0AD4E' }
      break
    default:
  }
  return (
    <Fragment>
      <div className='toastify-header'>
        <div className='title-wrapper'>
          <Avatar size='sm' color={color} icon={icon} />
          <h6 className='toast-title' style={styles}>{title}</h6>
        </div>
      </div>
      <div className='toastify-body'>
        <span aria-label='toast-text'>
          {message}
        </span>
      </div>
    </Fragment>
  )
}

ToastUI.propTypes = {
  type: Proptypes.string.isRequired,
  title: Proptypes.string.isRequired,
  message: Proptypes.string.isRequired
}

// ** Display notifications
export const showNotifications = ({ type, title, message }) => {
  toast(<ToastUI type={type} title={title} message={message} />,
    { icon: false, transition: Slide, hideProgressBar: true, autoClose: 5000 })
}
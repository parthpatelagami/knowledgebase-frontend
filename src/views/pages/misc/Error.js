// ** React Imports
import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Button } from 'reactstrap'

// ** Styles
import '@styles/base/pages/page-misc.scss'

// ** Logo
import Logo_intalk from '@src/assets/images/pages/logo_intalk.svg'
import Error_light from '@src/assets/images/pages/error.svg'

const Error = () => {
  return (
    <div className='misc-wrapper'>
      <a className='brand-logo' href='/'>
        <img src={Logo_intalk} alt='Login Cover' style={{ height: "28px" }} />
        <h2 className='brand-text text-dark ms-1'>intalk.io</h2>
      </a>
      <div className='misc-inner p-2 p-sm-3'>
        <div className='w-100 text-center'>
          <h2 className='mb-1'>Page Not Found 🕵🏻‍♀️</h2>
          <p className='mb-2'>Oops! 😖 The requested URL was not found on this server.</p>
          <Button tag={Link} to='/' color='primary' className='btn-sm-block mb-2'>
            Back to home
          </Button>
          <img className='img-fluid' src={Error_light} alt='Not authorized page' />
        </div>
      </div>
    </div>
  )
}
export default Error

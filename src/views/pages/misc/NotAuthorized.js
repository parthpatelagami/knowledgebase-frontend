// ** React Imports
import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Button } from 'reactstrap'

// ** Logo
import Logo_intalk from '@src/assets/images/pages/logo_intalk.svg'
import Error_light from '@src/assets/images/pages/error.svg'

// ** Styles
import '@styles/base/pages/page-misc.scss'

const NotAuthorized = () => {
  return (
    <div className='misc-wrapper'>
      <Link className='brand-logo' to='/'>
        <img src={Logo_intalk} alt='Login Cover' style={{ height: "28px" }} />
        <h2 className='brand-text text-dark ms-1'>intalk.io</h2>
      </Link>
      <div className='misc-inner p-2 p-sm-3'>
        <div className='w-100 text-center'>
          <h2 className='mb-1'>You are not authorized! 🔐</h2>
          <p className='mb-2'>
            You don't have the permission to access this page !
          </p>
          <Button tag={Link} to='/' color='primary' className='btn-sm-block mb-1'>
            Back to Home
          </Button>
          <img className='img-fluid' src={Error_light} alt='Not authorized page' />
        </div>
      </div>
    </div>
  )
}
export default NotAuthorized

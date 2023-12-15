// ** Reactstrap Imports
import { Button, Form, Input, Row, Col } from 'reactstrap'

// ** Logo
import Logo_intalk from '@src/assets/images/pages/logo_intalk.svg'
import Error_light from '@src/assets/images/pages/error.svg'

// ** Styles
import '@styles/base/pages/page-misc.scss'

const ComingSoon = () => {

  return (
    <div className='misc-wrapper'>
      <a className='brand-logo' href='/'>
        <img src={Logo_intalk} alt='Login Cover' style={{ height: "28px" }} />
        <h2 className='brand-text text-dark ms-1'>intalk.io</h2>
      </a>
      <div className='misc-inner p-2 p-sm-3'>
        <div className='w-100 text-center'>
          <h2 className='mb-1'>We are launching soon 🚀</h2>
          <p className='mb-3'>We're creating something awesome. Please subscribe to get notified when it's ready!</p>
          <Form
            tag={Row}
            onSubmit={e => e.preventDefault()}
            className='row-cols-md-auto justify-content-center align-items-center m-0 mb-2 gx-3'
          >
            <Col sm='12' className='m-0 mb-1'>
              <Input placeholder='john@example.com' />
            </Col>
            <Col sm='12' className='d-md-block d-grid ps-md-0 ps-auto'>
              <Button className='mb-1 btn-sm-block' color='primary'>
                Notify
              </Button>
            </Col>
          </Form>
          <img className='img-fluid' src={Error_light} alt='Coming soon page' />
        </div>
      </div>
    </div>
  )
}
export default ComingSoon

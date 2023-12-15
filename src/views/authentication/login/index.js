// ** React Imports
import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

// ** Reactstrap Imports
import { Row, Col, CardText, CardTitle, Form } from 'reactstrap'

// ** Logo
import Logo_intalk from '@src/assets/images/pages/logo_intalk.svg'

// ** Styles
import '@styles/react/pages/page-authentication.scss'

// ** Third party components
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import jwt_decode from "jwt-decode"
import { getHomeRouteForLoggedInUser } from '@utils'
import { AbilityContext } from '@src/utility/context/Can'

// ** Redux
import { handleLogin } from '../../../redux/authentication'

const Login = () => {

  const dispatch = useDispatch()
  const history = useHistory()
  const ability = useContext(AbilityContext)

  const clientId = process.env.GOOGLE_CLIENT_ID || "546915466820-uboj7f85i1024b14tluft1nstre1cfa2.apps.googleusercontent.com"

  const handleLoginOnSuccess = async (response) => {

    try {
      var decoded = jwt_decode(response.credential)
      const response_data = await dispatch(handleLogin(decoded)).unwrap()
      ability.update(response_data.ability)
      history.push(getHomeRouteForLoggedInUser(response_data.role))
    } catch (error) {
      console.log("Error ", error)
    }
  }

  const handleLoginOnError = (error) => {
    console.log("Login Error ", error)
  }

  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='4' sm='12' style={{ backgroundColor: 'lightgray' }} >
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'  >
            <img src={Logo_intalk} alt='Login Cover' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='8' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='6' md='6' lg='6'>
            <CardTitle tag='h2' className='fw-bold mb-1'>
              Welcome To Agami-Tech!
            </CardTitle>
            <CardText className='mb-2'>Please sign-in with your google account.</CardText>
            <Form className='auth-login-form mt-2'>
              <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                  onSuccess={(credential) => handleLoginOnSuccess(credential)}
                  onError={handleLoginOnError}
                />
              </GoogleOAuthProvider>
            </Form>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login
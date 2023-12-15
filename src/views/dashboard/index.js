import React, { useEffect } from 'react'
import { Row, Col } from 'reactstrap'

// ** Custom Components
import TaskData from './components/TaskData'

import { useDispatch, useSelector } from 'react-redux'

import {
  fetchDashboardHeaderData,
} from './store/action'

const Dashboard = () => {

  // ** Hooks
  const {
    dashboardHeaderData,
  } = useSelector((state) => state.dashboard)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchDashboardHeaderData())
  }, [])

  return (
    <Row className='match-height'>
      <Col xl='6' lg='6' md='12' xs='12'>
        <TaskData
          data={dashboardHeaderData}
          cols={{ xl: '4', lg: '6', md: '4', xs: '6' }}
        />
      </Col>
    </Row>
  )
}

export default Dashboard

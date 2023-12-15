// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { handleLogout } from '@store/authentication'

// ** Third Party Components
import { CreditCard, Power } from 'react-feather'

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'

const UserDropdown = () => {

  // ** Hooks
  const { userData } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        {/* <div className='user-nav d-sm-flex d-none'> */}
        <div className='user-nav d-flex'>
          <span className='user-name fw-bold'>{userData?.firstName} {userData?.lastName}</span>
          <span className='user-status'>{userData?.role}</span>
        </div>
        <Avatar img={userData?.profile} imgHeight='50' imgWidth='50' status='online' />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to='/login' onClick={() => dispatch(handleLogout())}>
          <Power size={14} className='me-75' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
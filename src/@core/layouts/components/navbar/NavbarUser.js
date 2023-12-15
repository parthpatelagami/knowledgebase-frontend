// ** Dropdowns Imports
// import IntlDropdown from './IntlDropdown'
// import CartDropdown from './CartDropdown'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import UserDropdown from './UserDropdown'
// import NavbarSearch from './NavbarSearch'
// import NotificationDropdown from './NotificationDropdown'

// ** Third Party Components
import { Sun, Moon, ToggleLeft, Clock } from 'react-feather'

// ** Reactstrap Imports
import { NavItem, NavLink } from 'reactstrap'
import UserActivity from './UserActivity'

const NavbarUser = (props) => {

  // ** Props
  const { skin, setSkin } = props
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className='ficon' onClick={() => setSkin('light')} />
    } else {
      return <Moon className='ficon' onClick={() => setSkin('dark')} />
    }
  }

  // Custom function to format date as "27th Sept 2023"
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(date).toLocaleDateString(undefined, options)
  }

  // Custom function to format time as "hh:mm:ss"
  const formatTime = (date) => {
    const timeString = new Date(date).toLocaleTimeString()
    const [hours, minutes, seconds] = timeString.split(':')

    // Style for the seconds portion
    const secondsStyle = { color: 'red' }

    return (
      <span>
        {hours}:{minutes}:
        <span style={secondsStyle}>{seconds}</span>
      </span>
    )
  }

  // State to store live seconds
  const [liveSeconds, setLiveSeconds] = useState(formatTime(new Date()))

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLiveSeconds(formatTime(new Date()))
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  // Get the current date and time
  const currentDate = new Date()

  return (
    <ul className='nav navbar-nav align-items-center ms-auto'>
      {/* <IntlDropdown /> */}

      {/* <div className="fw-bold" onClick={toggleModal} style={{ cursor: 'pointer' }}>
        <span>{formatDate(currentDate)}&nbsp;&nbsp;
          {liveSeconds}&nbsp;&nbsp;
        </span>
      </div> */}
      {/* <UserActivity isModalOpen={isModalOpen} toggleModal={toggleModal} /> */}

      <NavItem className='d-none d-lg-block'>
        <NavLink className='nav-link-style'>
          {/* <ThemeToggler /> */}
        </NavLink>
      </NavItem>

      {/* <NavbarSearch /> */}
      {/* <CartDropdown /> */}
      {/* <NotificationDropdown /> */}
      <UserDropdown />
    </ul>
  )
}
export default NavbarUser

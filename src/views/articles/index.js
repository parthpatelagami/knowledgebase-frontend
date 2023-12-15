import React from 'react'

// ** Styles
import '@styles/react/apps/app-users.scss'

// ** Custom Components
import UserTable from '../users/components/UserTable'

const UsersList = () => {
  return (
    <div className='app-user-list'>
      <UserTable />
    </div>
  )
}

export default UsersList
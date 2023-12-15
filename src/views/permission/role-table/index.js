import React from 'react'

// ** Styles
import '@styles/react/apps/app-users.scss'

// ** Custom Components
import RoleTable from '../role-table/components/RoleTable'

const UsersList = () => {
  return (
    <div className='app-user-list'>
      <RoleTable />
    </div>
  )
}

export default UsersList
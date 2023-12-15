import React from 'react'

// ** Styles
import '@styles/react/apps/app-users.scss'

// ** Custom Components
import TeamTable from '../team/components/TeamTable'

const TeamList = () => {
  return (
    <div className='app-user-list'>
      <TeamTable />
    </div>
  )
}

export default TeamList

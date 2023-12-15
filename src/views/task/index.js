import React from 'react'

// ** Styles
import '@styles/react/apps/app-users.scss'

// ** Custom Components
import TaskTable from '../task/components/TaskTable'

const TaskList = () => {
  return (
    <div className='app-user-list'>
      <TaskTable />
    </div>
  )
}

export default TaskList
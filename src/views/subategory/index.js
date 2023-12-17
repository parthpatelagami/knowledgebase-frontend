import React from 'react'

// ** Styles
import '@styles/react/apps/app-users.scss'

// ** Custom Components
import SubCategoryTable from '../subategory/components/SubCategoryTable'

const SubCategoryList = () => {
  return (
    <div className='app-user-list'>
      <SubCategoryTable />
    </div>
  )
}

export default SubCategoryList
// ** React Imports
import React, { useContext } from 'react'

// ** Context
import { AbilityContext } from '@src/utility/context/Can'

// ** Icons Imports
import { Edit, Trash } from 'react-feather'

// Action Render Component Import
import RenderActions from '../RenderActions'

// ** Action Component Imports 
import EditForm from './components/EditForm'
import DeleteForm from './components/DeleteForm'

const Actions = ({ rowInfo }) => {

    // ** Hooks
    const ability = useContext(AbilityContext)

    const actions = [
        {
            name: 'Edit Task',
            Icon: Edit,
            Component: EditForm,
            visible: ability.can("edit", 'Task')
        },
        {
            name: 'Delete Task',
            Icon: Trash,
            Component: DeleteForm,
            visible: ability.can("edit", 'Task')
        }
    ]

    return (
        <RenderActions {...{ rowInfo, actions }} />
    )
}

export default Actions
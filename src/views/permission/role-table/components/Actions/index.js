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
            name: 'Edit Role',
            Icon: Edit,
            Component: EditForm,
            visible: ability.can("edit", 'Users')
        },
        {
            name: 'Delete Role',
            Icon: Trash,
            Component: DeleteForm,
            visible: ability.can("edit", 'Users')
        }
    ]

    return (
        <RenderActions {...{ rowInfo, actions }} />
    )
}

export default Actions
// React Imports
import React, { useState } from 'react'

// ** Reactstrap Component Imports
import { Modal, ModalHeader, ModalBody } from 'reactstrap'

// ** Sub Component Import
import AddEditRole from '../../AddEditRole'

const EditForm = ({ componentIndex, selectedAction, rowInfo, setFormAction, }) => {

    // ** State
    const [showAddRoleModal, setShowAddRoleModal] = useState(false)

    // ** Toggle Modal
    const toggleAddRoleModal = () => {
        setShowAddRoleModal(!showAddRoleModal)
    }

    return (
        <Modal scrollable className={'modal-dialog-centered modal-lg'}
            isOpen={componentIndex === selectedAction}
            toggleAddRoleModal={toggleAddRoleModal}
            backdrop="static">
            <ModalHeader onClick={() => setFormAction(null)}>Edit Role</ModalHeader>
            <ModalBody>
                <AddEditRole
                    type='edit-role'
                    setShowAddRoleModal={setShowAddRoleModal}
                    rowInfo={rowInfo}
                    setFormAction={setFormAction}
                    toggleAddRoleModal={toggleAddRoleModal}
                />
            </ModalBody>
        </Modal>
    )
}
export default EditForm

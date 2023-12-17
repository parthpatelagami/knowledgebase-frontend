// React Imports
import React, { useState } from 'react'

// ** Reactstrap Component Imports
import { Modal, ModalHeader, ModalBody } from 'reactstrap'

// ** Sub Component Import
import AddEditSubCategory from '../../AddEditSubCategory'

const EditForm = ({ componentIndex, selectedAction, rowInfo, setFormAction, }) => {

    // ** State
    const [showAddUserModal, setShowAddUserModal] = useState(false)

    // ** Toggle Modal
    const toggleAddUserModal = () => {
        setShowAddUserModal(!showAddUserModal)
    }

    return (
        <Modal scrollable className={'modal-dialog-centered modal-lg'}
            isOpen={componentIndex === selectedAction}
            toggleAddUserModal={toggleAddUserModal}
            backdrop="static">
            <ModalHeader onClick={() => setFormAction(null)}>Edit User</ModalHeader>
            <ModalBody>
                <AddEditSubCategory
                    type='edit-subcategory'
                    setShowAddUserModal={setShowAddUserModal}
                    rowInfo={rowInfo}
                    setFormAction={setFormAction}
                />
            </ModalBody>
        </Modal >
    )
}
export default EditForm

// React Imports
import React, { useState } from 'react'

// ** Reactstrap Component Imports
import { Modal, ModalHeader, ModalBody } from 'reactstrap'

// ** Sub Component Import
import AddEditTeam from '../../AddEditTeam'

const EditForm = ({ componentIndex, selectedAction, rowInfo, setFormAction, }) => {

    // ** State
    const [showAddTeamModal, setShowAddTeamModal] = useState(false);

    // ** Toggle Modal
    const toggleAddTeamModal = () => {
        setShowAddTeamModal(!showAddTeamModal);
    };

    return (
        <Modal scrollable className={'modal-dialog-centered modal-lg'}
            isOpen={componentIndex === selectedAction}
            toggleAddTeamModal={toggleAddTeamModal}
            backdrop="static">
            <ModalHeader onClick={() => setFormAction(null)}>Edit Team</ModalHeader>
            <ModalBody>
                <AddEditTeam
                    type='edit-team'
                    setShowAddTeamModal={setShowAddTeamModal}
                    rowInfo={rowInfo}
                    setFormAction={setFormAction}
                />
            </ModalBody>
        </Modal >
    )
}
export default EditForm

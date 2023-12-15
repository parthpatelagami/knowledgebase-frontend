import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

const TotalMember = ({ selectedRow, isOpen, toggleTotalMemberModal }) => {
    // Check if selectedRow is null or undefined
    if (!selectedRow) {
        return (
            <Modal isOpen={isOpen} toggle={toggleTotalMemberModal} className='modal-dialog-centered'>
                <ModalHeader toggle={toggleTotalMemberModal}>Total Members</ModalHeader>
                <ModalBody>
                    <p>No data available.</p>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' onClick={toggleTotalMemberModal}>
                        Ok
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }

    const managers = selectedRow?.managers ?? [];
    const members = selectedRow?.members ?? [];

    return (
        <Modal isOpen={isOpen} toggle={toggleTotalMemberModal} className='modal-dialog-centered'>
            <ModalHeader toggle={toggleTotalMemberModal}>Total Members</ModalHeader>
            <ModalBody>
                <h4>Managers</h4>
                <Table>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {managers.map((manager) => (
                            <tr key={manager.user_id}>
                                <td>{manager.user_id}</td>
                                <td>{manager.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <h4>Members</h4>
                <Table>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map((member) => (
                            <tr key={member.user_id}>
                                <td>{member.user_id}</td>
                                <td>{member.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </ModalBody>
            <ModalFooter>
                <Button color='primary' onClick={toggleTotalMemberModal}>
                    Ok
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default TotalMember;

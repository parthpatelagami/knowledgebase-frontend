
// ** React Imports
import React from 'react'

// ** Icon Imports
import { HelpCircle } from 'react-feather'

// ** Reactstrap Imports
import { Button, UncontrolledTooltip } from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const Help = () => {

    const handleInfo = () => {
        return MySwal.fire({
            title: 'Info!',
            text: "Double click on any record in the table, the modal will open and the details of the team members will be visible.",
            icon: 'info',
            customClass: {
                confirmButton: 'btn btn-primary'
            },
            buttonsStyling: false
        })
    }

    return (
        <>
            <Button.Ripple
                color='info'
                id='interaction-table-help-btn'
                className='btn-icon me-1'
                outline
                onClick={() => handleInfo()}
            >
                <HelpCircle size={16} />
            </Button.Ripple>
            <UncontrolledTooltip placement='top' target='interaction-table-help-btn'>
                Help
            </UncontrolledTooltip>
        </>
    )
}

export default Help
// React Imports
import React, { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'

// ** Actions
import { suspendUser, getAllArticles } from '../../../store/action'

// ** Sweet Alert Import
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const SuspendForm = ({ rowInfo, componentIndex, selectedAction, setFormAction }) => {

    // ** Hooks
    const dispatch = useDispatch()

    useEffect(() => {
        if (rowInfo.isSuspended === 'N') {
            if (selectedAction === componentIndex) {
                MySwal.fire({
                    title: 'Are you sure?',
                    text: `This user will be suspended!`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, Suspend it!',
                    customClass: {
                        confirmButton: 'btn btn-primary',
                        cancelButton: 'btn btn-outline-danger ms-1'
                    },
                    buttonsStyling: false,
                    showLoaderOnConfirm: true,
                    allowOutsideClick: false,
                    async preConfirm() {
                        try {
                            await dispatch(suspendUser(rowInfo)).unwrap()
                            setFormAction(null)
                            dispatch(getAllArticles())
                            return true
                        } catch (error) {
                            setFormAction(null)
                            MySwal.showValidationMessage(`Oops! We cannot suspend this user, please try again or contact support.`)
                        }
                    }
                }).then(function (result) {
                    if (result.value) {
                        MySwal.fire({
                            icon: 'success',
                            title: 'Suspended!',
                            text: `User has been suspended.`,
                            customClass: {
                                confirmButton: 'btn btn-success'
                            },
                            allowOutsideClick: false
                        })
                    } else if (result.dismiss === MySwal.DismissReason.cancel) {
                        setFormAction(null)
                    }
                })
            }
        } else {
            if (selectedAction === componentIndex) {
                MySwal.fire({
                    title: 'Are you sure?',
                    text: `Now the user will release.!`,
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, Release it!',
                    customClass: {
                        confirmButton: 'btn btn-primary',
                        cancelButton: 'btn btn-outline-danger ms-1'
                    },
                    buttonsStyling: false,
                    showLoaderOnConfirm: true,
                    allowOutsideClick: false,
                    async preConfirm() {
                        try {
                            await dispatch(suspendUser(rowInfo)).unwrap()
                            setFormAction(null)
                            dispatch(getAllArticles())
                            return true
                        } catch (error) {
                            setFormAction(null)
                            MySwal.showValidationMessage(`Oops! We cannot release this user, please try again or contact support.`)
                        }
                    }
                }).then(function (result) {
                    if (result.value) {
                        MySwal.fire({
                            icon: 'success',
                            title: 'Released!',
                            text: `User has been released.`,
                            customClass: {
                                confirmButton: 'btn btn-success'
                            },
                            allowOutsideClick: false
                        })
                    } else if (result.dismiss === MySwal.DismissReason.cancel) {
                        setFormAction(null)
                    }
                })
            }
        }

    }, [selectedAction])

    return (
        <Fragment>
        </Fragment>
    )
}

export default SuspendForm
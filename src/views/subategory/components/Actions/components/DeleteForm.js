// React Imports
import React, { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'

// ** Actions
import { deleteSubCategory, getAllSubCategory } from '../../../store/action'

// ** Sweet Alert Import
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const DeleteForm = ({ rowInfo, componentIndex, selectedAction, setFormAction }) => {

    // ** Hooks
    const dispatch = useDispatch()

    useEffect(() => {
        if (selectedAction === componentIndex) {
            MySwal.fire({
                title: 'Are you sure?',
                text: `You won't be able to revert this subcategory!`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                customClass: {
                    confirmButton: 'btn btn-primary',
                    cancelButton: 'btn btn-outline-danger ms-1'
                },
                buttonsStyling: false,
                showLoaderOnConfirm: true,
                allowOutsideClick: false,
                async preConfirm() {
                    try {
                        await dispatch(deleteSubCategory(rowInfo)).unwrap()
                        setFormAction(null)
                        dispatch(getAllSubCategory())
                        return true
                    } catch (error) {
                        setFormAction(null)
                        MySwal.showValidationMessage(`Oops! We cannot delete this subcategory, please try again or contact support.`)
                    }
                }
            }).then(function (result) {
                if (result.value) {
                    MySwal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: `SubCategory has been deleted.`,
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
    }, [selectedAction])

    return (
        <Fragment>
        </Fragment>
    )
}

export default DeleteForm
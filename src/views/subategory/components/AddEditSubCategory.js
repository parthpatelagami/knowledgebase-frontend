import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// ** Reactstrap Imports
import { Row, Col, Form, Button, Input, Label, FormFeedback, Spinner } from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import withReactContent from 'sweetalert2-react-content'
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

// ** Custom Componenets
import InputPasswordToggle from '@components/input-password-toggle'
import ErrorBoundary from '@components/ErrorBoundary'
import { showNotifications } from '@components/Notifications'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

// ** Actions
// import { createNewUser, editUser, getAllUsers } from '../store/action'
import { getAllCategory } from '../../../redux/action'
import { createNewSubCategory, getAllSubCategory, editSubCategory } from '../store/action'

const MySwal = withReactContent(Swal)

const AddEditSubCategory = ({ type, setShowAddUserModal, rowInfo, setFormAction, toggleAddUserModal }) => {

    // ** Set Schema
    const AddEditUserSchema = yup.object().shape({
        category: yup.string().required("Category is required."),
        subCategory: yup.string().required("SubCategory is required."),
        description: yup.string().required("Description is required"),
    }).required()

    // ** Hook
    const { reset, control, handleSubmit, formState: { errors }, setError } = useForm({
        defaultValues: {
            subCategory: '',
            category: '',
            description: '',
            status: '',
        },
        mode: "onChange",
        resolver: yupResolver(AddEditUserSchema)
    })

    // ** Hooks & States
    const dispatch = useDispatch()
    const [isFormSubmitting, setFormSubmitting] = useState(false)
    const [roles, setRoles] = useState([])

    useEffect(() => {
        async function fetchRoles() {
            try {
                const response = await dispatch(getAllCategory()).unwrap()
                console.log(response)

                const rolesOptions = response.map(r => ({ value: r.category_id, label: r.name }))
                setRoles(rolesOptions)
            } catch (error) {
                showNotifications({
                    type: 'error',
                    title: 'Oops! Something went wrong!',
                    message: `We cannot fetch roles data, please try again or contact support.`
                })
            }
        }
        fetchRoles()
    }, [])

    useEffect(() => {
        if (type === 'edit-subcategory') {
            reset({
                subCategory: rowInfo.subcategory_name,
                category: rowInfo.category_id,
                description: rowInfo.description,
                status: rowInfo.status.toString(),
            })
        }
    }, [type])

    console.log(rowInfo)

    const onSubmit = async (event) => {
        try {
            switch (type) {
                case "add-subcategory":
                    dispatch(createNewSubCategory({ event, isSwitchOn })).unwrap()
                    MySwal.fire({
                        title: `Successfully Created!`,
                        text: 'User has been added successfully.!',
                        icon: 'success',
                        customClass: {
                            confirmButton: 'btn btn-primary'
                        },
                        buttonsStyling: false
                    })
                    setFormSubmitting(false)
                    setFormAction(null)
                    dispatch(getAllSubCategory())
                    break
                case "edit-subcategory":
                    const subcategory_id = rowInfo.subcategory_id
                    await dispatch(editSubCategory({ event, subcategory_id })).unwrap()
                    MySwal.fire({
                        title: `Successfully Updated!`,
                        text: 'SubCategory has been updated successfully.!',
                        icon: 'success',
                        customClass: {
                            confirmButton: 'btn btn-primary'
                        },
                        buttonsStyling: false
                    })
                    setFormSubmitting(false)
                    setFormAction(null)
                    dispatch(getAllSubCategory())
                    break
                default:
            }
            toggleAddUserModal()
            setFormSubmitting(false)
            reset({
                subCategory: '',
                category: '',
                description: '',
                status: ''
            })
        } catch (error) {
            console.log("ERROR", error)
        }
    }

    const [isSwitchOn, setSwitchOn] = useState(false)

    const handleSwitchChange = () => {
        setSwitchOn(!isSwitchOn)
    }

    return (
        <ErrorBoundary>
            <Fragment>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row className='gy-1 pt-75'>
                        <Col md={6} xs={12}>
                            <Label className="form-label" htmlFor="subCategory">
                                Sub Category<span style={{ color: "red" }}> * </span>
                            </Label>
                            <Controller
                                control={control}
                                id='subCategory'
                                name='subCategory'
                                render={({ field }) => (
                                    <Input
                                        id="subCategory"
                                        placeholder="Enter First Name"
                                        className={errors.subCategory ? 'is-invalid' : ''}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.subCategory && (
                                <FormFeedback>{errors.subCategory.message}</FormFeedback>
                            )}
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className="form-label" htmlFor="category">
                                Category<span style={{ color: "red" }}> * </span>
                            </Label>
                            <Controller
                                control={control}
                                name="category"
                                render={({ field: { onChange, value, ref } }) => (
                                    <Select
                                        isClearable
                                        inputId="category"
                                        className={`react-select ${errors.category ? `is-invalid` : ``}`}
                                        inputRef={ref}
                                        theme={selectThemeColors}
                                        placeholder="Select category"
                                        options={roles}
                                        classNamePrefix="select"
                                        value={roles.find(c => c.value === value) || ""}
                                        onChange={val => {
                                            const value = val ? val.value : ''
                                            onChange(value)
                                        }}
                                        isOptionDisabled={(option) => option.isdisabled}
                                    />
                                )}
                            />
                            {errors.category && (
                                <FormFeedback>{errors.category.message}</FormFeedback>
                            )}
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className="form-label" htmlFor="Description">
                                Description<span style={{ color: "red" }}> * </span>
                            </Label>
                            <Controller
                                control={control}
                                id='description'
                                name='description'
                                render={({ field }) => (
                                    <textarea
                                        id="description"
                                        className={errors.description ? 'form-control is-invalid' : 'form-control'}
                                        {...field}
                                    />)}
                            />
                            {errors.description && (
                                <FormFeedback>{errors.description.message}</FormFeedback>
                            )}
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className="form-label" htmlFor="Status">
                                Status<span style={{ color: "red" }}> * </span>
                            </Label>
                            <div className='d-flex mt-2 mb-5 pb-50'>
                                <h6 className='me-50 mb-0'>Deactivate</h6>
                                <div className='form-switch'>
                                    <Input id='plan-switch' type='switch' checked={isSwitchOn} onChange={handleSwitchChange} />
                                </div>
                                <h6 className='ms-50 mb-0'>Activate</h6>
                            </div>
                        </Col>
                        <Col xs={12} className='text-center mt-2 pt-50'>
                            {!isFormSubmitting ? <Button
                                className='me-1'
                                type='submit'
                                color='primary'
                            >
                                Submit
                            </Button> : <Button
                                color='primary'
                                disabled
                                className='me-1'
                            >
                                <Spinner size='sm' />
                                <span className='ms-50'>Submitted...</span>
                            </Button>}
                            <Button
                                type='button'
                                color='warning'
                                outline
                                onClick={() => {
                                    setShowAddUserModal(false)
                                    setFormAction(null)
                                }}
                            >
                                Close
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Fragment>
        </ErrorBoundary>
    )
}

export default AddEditSubCategory
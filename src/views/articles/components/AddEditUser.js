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
import { createNewUser, editUser, getAllUsers } from '../store/action'
import { checkEmailID, getAllRoles } from '../../../redux/action'

const MySwal = withReactContent(Swal)

const AddEditUser = ({ type, setShowAddUserModal, rowInfo, setFormAction, toggleAddUserModal }) => {

    // ** Set Schema
    const AddEditUserSchema = yup.object().shape({
        firstName: yup.string().required("FirstName is required.").min(4, "FirstName should be atleast 4 characters."),
        lastName: yup.string().required("LastName is required.").min(4, "LastName should be atleast 4 characters."),
        emailId: yup.string().required('Email-ID is required').
            min(3, "Email-ID should be atleast 3 characters.").
            email('Email-ID is invalid')
            .test('is-agami-tech-email', 'Only "agami-tech.com" email addresses are allowed.', (value) => {
                if (!value) return true
                return value.endsWith('agami-tech.com')
            }),
        password: yup.string().required("Password is required").min(5, "Password length should be atleast 5 characters.").max(12, "Password cannot exceed more than 12 characters"),
        confirmPassword: yup.string().required("Confirm Password is required").min(5, "Comfirm Password length should be atleast 5 characters.")
            .max(12, "Comfirm Password cannot exceed more than 12 characters").oneOf([yup.ref('password')], 'Password does not match'),
        // team: yup.string().required("Team is required."),
        role: yup.string().required("Role is required.")
    }).required()

    // ** Hook
    const { reset, control, handleSubmit, formState: { errors }, setError } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            emailId: '',
            password: '',
            confirmPassword: '',
            // team: '',
            role: ''
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
                const response = await dispatch(getAllRoles()).unwrap()
                const { role } = response
                const rolesOptions = role.map(r => ({ value: r.role_id, label: r.role_name }))
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
        if (type === 'edit-user') {
            reset({
                firstName: rowInfo.firstName,
                lastName: rowInfo.lastName,
                emailId: rowInfo.email,
                role: rowInfo.role_id
            })
        }
    }, [type])

    const onSubmit = async (event) => {
        try {
            switch (type) {
                case "add-user":
                    const response = await dispatch(checkEmailID(event.emailId)).unwrap()
                    if (response.message === "Email Already Exists.") {
                        setError('emailId', {
                            type: 'duplicate',
                            message: 'Email ID already exists'
                        })
                        setFormSubmitting(false)
                        return
                    }
                    dispatch(createNewUser(event)).unwrap()
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
                    dispatch(getAllUsers())
                    break
                case "edit-user":
                    const user_id = rowInfo.user_id
                    await dispatch(editUser({ event, user_id })).unwrap()
                    MySwal.fire({
                        title: `Successfully Updated!`,
                        text: 'User has been updated successfully.!',
                        icon: 'success',
                        customClass: {
                            confirmButton: 'btn btn-primary'
                        },
                        buttonsStyling: false
                    })
                    setFormSubmitting(false)
                    setFormAction(null)
                    dispatch(getAllUsers())
                    break
                default:
            }
            toggleAddUserModal()
            setFormSubmitting(false)
            reset({
                firstName: '',
                lastName: '',
                emailId: '',
                password: '',
                confirmPassword: '',
                role: ''
            })
        } catch (error) {
            console.log("ERROR", error)
        }
    }

    return (
        <ErrorBoundary>
            <Fragment>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row className='gy-1 pt-75'>
                        <Col md={6} xs={12}>
                            <Label className="form-label" htmlFor="FirstName">
                                First Name<span style={{ color: "red" }}> * </span>
                            </Label>
                            <Controller
                                control={control}
                                id='firstName'
                                name='firstName'
                                render={({ field }) => (
                                    <Input
                                        id="firstName"
                                        placeholder="Enter First Name"
                                        className={errors.firstName ? 'is-invalid' : ''}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.firstName && (
                                <FormFeedback>{errors.firstName.message}</FormFeedback>
                            )}
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className="form-label" htmlFor="LastName">
                                Last Name<span style={{ color: "red" }}> * </span>
                            </Label>
                            <Controller
                                control={control}
                                id='lastName'
                                name='lastName'
                                render={({ field }) => (
                                    <Input
                                        id="lastname"
                                        placeholder="Enter Last Name"
                                        className={errors.lastName ? 'is-invalid' : ''}
                                        {...field}
                                    />)}
                            />
                            {errors.lastName && (
                                <FormFeedback>{errors.lastName.message}</FormFeedback>
                            )}
                        </Col>
                        <Col xs={12}>
                            <Label className="form-label" htmlFor='emailId'>
                                Email ID<span style={{ color: "red" }}> * </span>
                            </Label>
                            <Controller
                                id='emailId'
                                name='emailId'
                                control={control}
                                rules={{ required: 'Email ID is required' }}
                                render={({ field }) => (
                                    <Input
                                        id='emailId'
                                        placeholder='Enter Email ID'
                                        className={type !== 'edit-user' && errors.emailId ? 'is-invalid' : ''}
                                        {...field}
                                        readOnly={type === 'edit-user'}
                                    />
                                )}
                            />
                            {/* IF FIELD IS EMPTY */}
                            {errors.emailId && type !== 'edit-user' && (
                                <FormFeedback>{errors.emailId.message}</FormFeedback>
                            )}
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className="form-label" htmlFor="Password">
                                Password<span style={{ color: "red" }}> * </span>
                            </Label>
                            <Controller
                                control={control}
                                id='password'
                                name='password'
                                render={({ field }) => (
                                    <InputPasswordToggle
                                        className='input-group-merge'
                                        invalid={errors.password && true}
                                        placeholder="Enter Password"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.password && (
                                <FormFeedback>{errors.password.message}</FormFeedback>
                            )}
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className="form-label" htmlFor="Comfirm-Password">
                                Confirm Password<span style={{ color: "red" }}> * </span>
                            </Label>
                            <Controller
                                control={control}
                                id='confirmPassword'
                                name='confirmPassword'
                                render={({ field }) => (
                                    <InputPasswordToggle
                                        className='input-group-merge'
                                        invalid={errors.confirmPassword && true}
                                        placeholder="Enter Confirm Password"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.confirmPassword && (
                                <FormFeedback>{errors.confirmPassword.message}</FormFeedback>
                            )}
                        </Col>
                        {/* <Col md={6} xs={12}>
                            <Label className="form-label" htmlFor="Team">
                                Team<span style={{ color: "red" }}> * </span>
                            </Label>
                            <Controller
                                control={control}
                                name="team"
                                render={({ field: { onChange, value, ref } }) => (
                                    <Select
                                        isClearable
                                        inputId="team"
                                        className={`react-select ${errors.team ? `is-invalid` : ``}`}
                                        inputRef={ref}
                                        theme={selectThemeColors}
                                        placeholder="Select Team"
                                        options={teamOptions}
                                        classNamePrefix="select"
                                        value={teamOptions.find(c => c.value === value) || ""}
                                        onChange={val => {
                                            const value = val ? val.value : ''
                                            onChange(value)
                                        }}
                                        isOptionDisabled={(option) => option.isdisabled}
                                    />
                                )}
                            />
                            {errors.team && (
                                <FormFeedback>{errors.team.message}</FormFeedback>
                            )}
                        </Col> */}
                        <Col md={6} xs={12}>
                            <Label className="form-label" htmlFor="Role">
                                Role<span style={{ color: "red" }}> * </span>
                            </Label>
                            <Controller
                                control={control}
                                name="role"
                                render={({ field: { onChange, value, ref } }) => (
                                    <Select
                                        isClearable
                                        inputId="role"
                                        className={`react-select ${errors.role ? `is-invalid` : ``}`}
                                        inputRef={ref}
                                        theme={selectThemeColors}
                                        placeholder="Select Role"
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
                            {errors.role && (
                                <FormFeedback>{errors.role.message}</FormFeedback>
                            )}
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

export default AddEditUser
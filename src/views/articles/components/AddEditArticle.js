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
import { createNewArticle, editUser, getAllArticles } from '../store/action'
import { checkEmailID, getAllRoles } from '../../../redux/action'
import SwitchBasic from '../../../@core/components/switch/SwitchBasic'
import EditorUncontrolled from '../../../@core/components/draftWysiwyg/EditorUncontrolled'
import FileUploaderMultiple from '../../../@core/components/fileuploader'

const MySwal = withReactContent(Swal)

const AddEditUser = ({ type, setShowAddUserModal, rowInfo, setFormAction, toggleAddUserModal }) => {

    // ** Set Schema
    const AddEditUserSchema = yup.object().shape({
        articleName: yup.string().required("Article Name is required.").min(4, "Article Name should be atleast 4 characters."),
        role: yup.string().required("Category is required."),
        subCategory: yup.string().required("Sub Category is required."),
        articleDescription: yup.string().required("Article description is required.").min(4, "Article description should be atleast 4 characters."),
    }).required()

    // ** Hook
    const { reset, control, handleSubmit, formState: { errors }, setError } = useForm({
        defaultValues: {
            articleName: '',
            Category: '',
            role: '',
            subCategory: '',
            articleDescription: '',
        },
        mode: "onChange",
        resolver: yupResolver(AddEditUserSchema)
    })

    // ** Hooks & States
    const dispatch = useDispatch()
    const [isFormSubmitting, setFormSubmitting] = useState(false)
    const [categorys, setCategory] = useState([])
    const [subCategorys, setSubCategory] = useState([])

    useEffect(() => {
        async function fetchCategory() {
            try {
                const response = await dispatch(getAllRoles()).unwrap()
                const { role } = response
                const categoryOptions = role.map(r => ({ value: r.role_id, label: r.role_name }))
                setCategory(categoryOptions)
            } catch (error) {
                showNotifications({
                    type: 'error',
                    title: 'Oops! Something went wrong!',
                    message: `We cannot fetch role data, please try again or contact support.`
                })
            }
        }
        async function fetchSubCategory() {
            try {
                const response = await dispatch(getAllRoles()).unwrap()
                const { role } = response
                const subCategoryOptions = role.map(r => ({ value: r.role_id, label: r.role_name }))
                setSubCategory(subCategoryOptions)
            } catch (error) {
                showNotifications({
                    type: 'error',
                    title: 'Oops! Something went wrong!',
                    message: `We cannot fetch role data, please try again or contact support.`
                })
            }
        }
        fetchCategory()
        fetchSubCategory()
    }, [])

    useEffect(() => {
        if (type === 'edit-user') {
            reset({
                articleName: rowInfo.Name,
                Category: rowInfo.Category_id,
                role: rowInfo.role,
                emailId: rowInfo.email,
                role: rowInfo.role_id
            })
        }
    }, [type])

    const onSubmit = async (event) => {
        try {
            switch (type) {
                case "add-article":
                    // const response = await dispatch(checkEmailID(event.emailId)).unwrap()
                    // if (response.message === "Email Already Exists.") {
                    //     setError('emailId', {
                    //         type: 'duplicate',
                    //         message: 'Email ID already exists'
                    //     })
                    //     setFormSubmitting(false)
                    //     return
                    // }
                    dispatch(createNewArticle(event)).unwrap()
                    MySwal.fire({
                        title: `Successfully Created!`,
                        text: 'Article has been added successfully.!',
                        icon: 'success',
                        customClass: {
                            confirmButton: 'btn btn-primary'
                        },
                        buttonsStyling: false
                    })
                    setFormSubmitting(false)
                    setFormAction(null)
                    dispatch(getAllArticles())
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
                    dispatch(getAllArticles())
                    break
                default:
            }
            toggleAddUserModal()
            setFormSubmitting(false)
            reset({
                articleName: '',
                role: '',
                emailId: '',
                password: '',
                confirmPassword: '',
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
                        <Col md={12} xs={12}>
                            <Label className="form-label" htmlFor="ArticleName">
                                Article Name<span style={{ color: "red" }}> * </span>
                            </Label>
                            <Controller
                                control={control}
                                id='articleName'
                                name='articleName'
                                render={({ field }) => (
                                    <Input
                                        id="articleName"
                                        placeholder="Enter Article Name"
                                        className={errors.articleName ? 'is-invalid' : ''}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.articleName && (
                                <FormFeedback>{errors.articleName.message}</FormFeedback>
                            )}
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className="form-label" htmlFor="Category">
                                Category<span style={{ color: "red" }}> * </span>
                            </Label>
                            <Controller
                                control={control}
                                name="Category"
                                render={({ field: { onChange, value, ref } }) => (
                                    <Select
                                        isClearable
                                        inputId="role"
                                        className={`react-select ${errors.role ? `is-invalid` : ``}`}
                                        inputRef={ref}
                                        theme={selectThemeColors}
                                        placeholder="Select Category"
                                        options={categorys}
                                        classNamePrefix="select"
                                        value={categorys.find(c => c.value === value) || ""}
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
                        <Col md={6} xs={12}>
                            <Label className="form-label" htmlFor="SubCategory">
                                Sub-Category<span style={{ color: "red" }}> * </span>
                            </Label>
                            <Controller
                                control={control}
                                name="subcategory"
                                render={({ field: { onChange, value, ref } }) => (
                                    <Select
                                        isClearable
                                        inputId="role"
                                        className={`react-select ${errors.role ? `is-invalid` : ``}`}
                                        inputRef={ref}
                                        theme={selectThemeColors}
                                        placeholder="Select Sub-Category"
                                        options={subCategorys}
                                        classNamePrefix="select"
                                        value={subCategorys.find(c => c.value === value) || ""}
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
                        <Col md={12} xs={12}>
                            <Label className="form-label" htmlFor="Role">
                                Status<span style={{ color: "red" }}> * </span>
                            </Label>
                            <Controller
                                control={control}
                                name="status"
                                render={({ field: { onChange, value, ref } }) => (
                                    <SwitchBasic
                                        isClearable
                                        inputId="status"
                                        inputRef={ref}
                                        theme={selectThemeColors}
                                        placeholder="Status"
                                        options={categorys}
                                        classNamePrefix="switch"
                                        value={categorys.find(c => c.value === value) || ""}
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
                        <Col md={12} xs={12}>
                            <Label className="form-label" htmlFor="Role">
                                Article Description<span style={{ color: "red" }}> * </span>
                            </Label>
                            {/* <Controller
                                control={control}
                                name="status"
                                render={({ field: { onChange, value, ref } }) => (
                                    <SwitchBasic
                                        isClearable
                                        inputId="status"
                                        inputRef={ref}
                                        theme={selectThemeColors}
                                        placeholder="Status"
                                        options={roles}
                                        classNamePrefix="switch"
                                        value={roles.find(c => c.value === value) || ""}
                                        onChange={val => {
                                            const value = val ? val.value : ''
                                            onChange(value)
                                        }}
                                        isOptionDisabled={(option) => option.isdisabled}
                                    />
                                )}
                            /> */}
                            <EditorUncontrolled />
                            {errors.role && (
                                <FormFeedback>{errors.role.message}</FormFeedback>
                            )}
                        </Col>
                        <Col md={12} xs={12}>
                            <Label className="form-label" htmlFor="Role">
                                File Upload<span style={{ color: "red" }}> * </span>
                            </Label>
                            {/* <Controller
                                control={control}
                                name="status"
                                render={({ field: { onChange, value, ref } }) => (
                                    <SwitchBasic
                                        isClearable
                                        inputId="status"
                                        inputRef={ref}
                                        theme={selectThemeColors}
                                        placeholder="Status"
                                        options={roles}
                                        classNamePrefix="switch"
                                        value={roles.find(c => c.value === value) || ""}
                                        onChange={val => {
                                            const value = val ? val.value : ''
                                            onChange(value)
                                        }}
                                        isOptionDisabled={(option) => option.isdisabled}
                                    />
                                )}
                            /> */}
                            <FileUploaderMultiple />
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
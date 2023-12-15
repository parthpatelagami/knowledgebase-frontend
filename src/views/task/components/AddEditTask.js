import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// ** Reactstrap Imports
import { Row, Col, Form, Button, Input, Label, FormFeedback, Spinner, ListGroup, ListGroupItem } from 'reactstrap'
import { DownloadCloud, File, X } from 'react-feather'

// ** Third Party Components
import Swal from 'sweetalert2'
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import withReactContent from 'sweetalert2-react-content'
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import Flatpickr from 'react-flatpickr'
import { useDropzone } from "react-dropzone"
import moment from "moment"

// ** Custom Componenets
import ErrorBoundary from '@components/ErrorBoundary'
import { showNotifications } from '@components/Notifications'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'

// ** Actions
import { getAllUsers } from '../../../redux/action'
import { createNewTask, getAllTaskList, updateTask } from '../store/action'

const MySwal = withReactContent(Swal)

const AddEditTask = ({ type, setShowAddUserModal, rowInfo, setFormAction, toggleAddUserModal }) => {

    // ** Set Schema
    const AddEditTaskSchema = yup.object().shape({
        title: yup.string().required("Title is required.").min(4, "Title should be atleast 4 characters."),
        description: yup.string().required("Description is required"),
        due_date: yup.array().required("Due-Date is required.").nullable(),
        assignee: yup.string().required("Assignee is required."),
        priority: yup.string().required("Priority is required."),
        status: yup.string().required("Status is required.")

    }).required()

    // ** Hook
    const { reset, control, handleSubmit, formState: { errors }, setError } = useForm({
        defaultValues: {
            title: '',
            description: '',
            due_date: '',
            assignee: '',
            priority: '',
            status: '',
            file: ''
        },
        mode: "onChange",
        resolver: yupResolver(AddEditTaskSchema)
    })

    // ** Hooks & States
    const dispatch = useDispatch()
    const [isFormSubmitting, setFormSubmitting] = useState(false)
    const [selectedAssignee, setSelectedAssignee] = useState([])
    const [files, setFiles] = useState([])

    const priorityOptions = [
        { value: '', label: "Select Priority" },
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
    ]

    const statusOptions = [
        { value: '', label: "Select Status" },
        { value: 'pending', label: 'Pending' },
        { value: 'completed', label: 'Completed' }
    ]

    // ** Setting the functionality of files
    const { getRootProps, getInputProps } = useDropzone({
        multiple: false,
        onDrop: (acceptedFiles, rejectedFiles) => {
            if (rejectedFiles.length) {
                showNotifications({
                    type: "error",
                    title: "File Type",
                    message: "You can only upload Files!."
                })
            } else {
                setFiles([
                    ...files,
                    ...acceptedFiles.map((file) => Object.assign(file))
                ])
            }
        }
    })

    const handleRemoveFile = (file) => {
        const uploadedFiles = files
        const filtered = uploadedFiles.filter((i) => i.name !== file.name)
        setFiles([...filtered])
    }

    const renderFileSize = (size) => {
        if (Math.round(size / 100) / 10 > 1000) {
            return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
        } else {
            return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
        }
    }

    const fileList = files.map((file, index) => (
        <ListGroupItem
            key={`${file.name}-${index}`}
            className="d-flex align-items-center justify-content-between"
        >
            <div className="file-details d-flex">
                <div className="mx-1">
                    <File />
                </div>
                <div className="mx-3">
                    <p className="file-name mb-0">{file.name}</p>
                </div>
                <div className="mx-3">
                    <p className="file-size mb-0">{renderFileSize(file.size)}</p>
                </div>
            </div>
            <Button
                color="danger"
                outline
                size="sm"
                className="btn-icon"
                onClick={() => handleRemoveFile(file)}
            >
                <X size={12} />
            </Button>
        </ListGroupItem>
    ))

    // FETCH USER EMPLOYEE
    useEffect(() => {
        async function fetchAllAssignee() {
            try {
                const response = await dispatch(getAllUsers()).unwrap()
                const { Employees } = response
                const assigneeOptions = Employees.map(r => ({
                    value: r.user_id,
                    label: `${r.fullName} (${r.roleName})`
                }))
                setSelectedAssignee(assigneeOptions)
            } catch (error) {
                console.error("Error fetching employees:", error)
                showNotifications({
                    type: 'error',
                    title: 'Oops! Something went wrong!',
                    message: `We cannot fetch assignee data, please try again or contact support.`
                })
            }
        }
        fetchAllAssignee()
    }, [])

    useEffect(() => {
        if (type === 'edit-task') {
            const dueDates = JSON.parse(rowInfo.due_date)
            const startDate = moment(dueDates[0]).format('YYYY-MM-DD')
            const endDate = moment(dueDates[1]).format('YYYY-MM-DD')
            const date = startDate + " to " + endDate
            console.log(date)

            reset({
                title: rowInfo.title,
                description: rowInfo.description,
                due_date: date,
                assignee: rowInfo.task_user_id,
                priority: rowInfo.priority,
                status: rowInfo.status,
                file: rowInfo.file
            })

            const flatpickrElement = document.getElementById('due_date')
            if (flatpickrElement) {
                const flatpickrInstance = flatpickrElement._flatpickr
                if (flatpickrInstance) {
                    // Ensure the Flatpickr instance is available
                    flatpickrInstance.open() // Focus or open the Flatpickr calendar
                } else {
                    console.error("Flatpickr instance not found.")
                }
            } else {
                console.error("Element with id 'due_date' not found.")
            }


        }
    }, [type])

    const onSubmit = async (event) => {
        try {
            console.log("SUBMIT DATA ", event)
            setFormSubmitting(true)
            switch (type) {
                case "add-task":
                    const submitResult = await dispatch(createNewTask(event)).unwrap()
                    if (submitResult.message === "Task has been created.") {
                        MySwal.fire({
                            title: `Successfully Created!`,
                            text: 'Task has been added successfully.!',
                            icon: 'success',
                            customClass: {
                                confirmButton: 'btn btn-primary'
                            },
                            buttonsStyling: false
                        })
                    } else {
                        showNotifications({
                            type: 'error',
                            title: 'Oops! Something went wrong!',
                            message: `We cannot submit your data, please try again or contact support.`
                        })
                    }
                    setFormSubmitting(false)
                    setFormAction(null)
                    dispatch(getAllTaskList())
                    break
                case "edit-task":
                    const task_id = rowInfo.task_id
                    const updatedResult = await dispatch(updateTask({ event, task_id })).unwrap()
                    if (updatedResult.message === "Task has been updated.") {
                        MySwal.fire({
                            title: `Successfully Updated!`,
                            text: 'Task has been updated successfully.!',
                            icon: 'success',
                            customClass: {
                                confirmButton: 'btn btn-primary'
                            },
                            buttonsStyling: false
                        })
                    } else {
                        showNotifications({
                            type: 'error',
                            title: 'Oops! Something went wrong!',
                            message: `We cannot update your data, please try again or contact support.`
                        })
                    }
                    setFormSubmitting(false)
                    setFormAction(null)
                    dispatch(getAllTaskList())
                    break
                default:
                    break
            }
            reset({
                title: '',
                description: '',
                due_date: '',
                assignee: '',
                priority: '',
                status: '',
                file: ''
            })
            toggleAddUserModal()
            setFormSubmitting(false)
        } catch (error) {
            showNotifications({
                type: 'error',
                title: 'Oops! Something went wrong!',
                message: `We cannot register you, please try again or contact support.`
            })
            setFormSubmitting(false)
        }
    }

    const handleReset = () => {
        reset(
            {
                title: '',
                description: '',
                due_date: '',
                assignee: '',
                priority: '',
                status: '',
                file: ''
            }
        )
    }

    return (
        <ErrorBoundary>
            <Fragment>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row className='gy-1 pt-75'>
                        <Col md={6} xs={12}>
                            <Label className="form-label" htmlFor="Title">
                                Title<span style={{ color: "red" }}> * </span>
                            </Label>
                            <Controller
                                control={control}
                                id='title'
                                name='title'
                                render={({ field }) => (
                                    <Input
                                        id="title"
                                        placeholder="Enter Title"
                                        className={errors.title ? 'is-invalid' : ''}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.title && (
                                <FormFeedback>{errors.title.message}</FormFeedback>
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
                            <Label className="form-label" htmlFor="Due Date">
                                Due Date<span style={{ color: "red" }}> * </span>
                            </Label>
                            <Controller
                                control={control}
                                name="due_date"
                                render={({ field }) => (
                                    <Flatpickr
                                        id="due_date"
                                        placeholder="YYYY-MM-DD"
                                        className={`form-control ${errors.due_date ? 'is-invalid' : ''}`}
                                        options={{
                                            mode: 'range',
                                            dateFormat: "Y-m-d"
                                        }}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.due_date && (
                                <FormFeedback>{errors.due_date.message}</FormFeedback>
                            )}
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className="form-label" htmlFor="Assignee">
                                Assignee<span style={{ color: "red" }}> * </span>
                            </Label>
                            <Controller
                                control={control}
                                name="assignee"
                                render={({ field: { onChange, value, ref } }) => (
                                    <Select
                                        isClearable
                                        inputId="assignee"
                                        className={`react-select ${errors.assignee ? `is-invalid` : ``}`}
                                        inputRef={ref}
                                        theme={selectThemeColors}
                                        placeholder="Select Assignee Name"
                                        options={selectedAssignee}
                                        classNamePrefix="select"
                                        value={selectedAssignee.find(c => c.value === value) || ""}
                                        onChange={val => {
                                            const value = val ? val.value : ''
                                            onChange(value)
                                        }}
                                        isOptionDisabled={(option) => option.isdisabled}
                                    />
                                )}
                            />
                            {errors.assignee && (
                                <FormFeedback>{errors.assignee.message}</FormFeedback>
                            )}
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className="form-label" htmlFor="Priority">
                                Priority<span style={{ color: "red" }}> * </span>
                            </Label>
                            <Controller
                                control={control}
                                name="priority"
                                render={({ field: { onChange, value, ref } }) => (
                                    <Select
                                        isClearable
                                        inputId="priority"
                                        className={`react-select ${errors.priority ? `is-invalid` : ``}`}
                                        inputRef={ref}
                                        theme={selectThemeColors}
                                        placeholder="Select Priority"
                                        options={priorityOptions}
                                        classNamePrefix="select"
                                        value={priorityOptions.find(c => c.value === value) || ""}
                                        onChange={val => {
                                            const value = val ? val.value : ''
                                            onChange(value)
                                        }}
                                        isOptionDisabled={(option) => option.isdisabled}
                                    />
                                )}
                            />
                            {errors.priority && (
                                <FormFeedback>{errors.priority.message}</FormFeedback>
                            )}
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className="form-label" htmlFor="Status">
                                Status<span style={{ color: "red" }}> * </span>
                            </Label>
                            <Controller
                                control={control}
                                name="status"
                                render={({ field: { onChange, value, ref } }) => (
                                    <Select
                                        isClearable
                                        inputId="status"
                                        className={`react-select ${errors.status ? `is-invalid` : ``}`}
                                        inputRef={ref}
                                        theme={selectThemeColors}
                                        placeholder="Select Status"
                                        options={statusOptions}
                                        classNamePrefix="select"
                                        value={statusOptions.find(c => c.value === value) || ""}
                                        onChange={val => {
                                            const value = val ? val.value : ''
                                            onChange(value)
                                        }}
                                        isOptionDisabled={(option) => option.isdisabled}
                                    />
                                )}
                            />
                            {errors.status && (
                                <FormFeedback>{errors.status.message}</FormFeedback>
                            )}
                        </Col>
                        <Col md={12} xs={12}>
                            <Label className="form-label" htmlFor="attachFile">
                                Attach File (If required..)
                            </Label>
                            <Controller
                                name="file"
                                control={control}
                                render={({ field: { onChange } }) => (
                                    <div {...getRootProps({ className: 'dropzone' })}>
                                        <input
                                            id="file"
                                            className={errors.file ? 'is-invalid' : ''}
                                            {...getInputProps({ onChange: (event) => { onChange(event.target.files) } })}
                                        />
                                        <div
                                            className="d-flex align-items-center justify-content flex-column"
                                            style={{ backgroundColor: "#eaeaea", padding: "15px", borderRadius: "10px", border: "1px solid" }}
                                        >
                                            <DownloadCloud size={50} />
                                            <h5>Drop Files here or click to upload</h5>
                                            <p className="text-secondary">
                                                Drop files here or click{" "}
                                                <a href="/" onClick={(e) => e.preventDefault()}>
                                                    browse
                                                </a>{" "}
                                                through your computer.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            />
                            {files && (
                                <Fragment>
                                    <ListGroup className="my-2">{fileList}</ListGroup>
                                </Fragment>
                            )}
                        </Col>
                        <Col xs={12} className='text-center mt-2 pt-50'>
                            {
                                type === "edit-task" ? (
                                    !isFormSubmitting ? (
                                        <Button
                                            className='me-1'
                                            type='submit'
                                            color='primary'
                                        >
                                            Update
                                        </Button>
                                    ) : (
                                        <Button
                                            color='primary'
                                            disabled
                                            className='me-1'
                                        >
                                            <Spinner size='sm' />
                                            <span className='ms-50'>Updated...</span>
                                        </Button>
                                    )
                                ) : (
                                    !isFormSubmitting ? (
                                        <Button
                                            className='me-1'
                                            type='submit'
                                            color='primary'
                                        >
                                            Submit
                                        </Button>
                                    ) : (
                                        <Button
                                            color='primary'
                                            disabled
                                            className='me-1'
                                        >
                                            <Spinner size='sm' />
                                            <span className='ms-50'>Submitted...</span>
                                        </Button>
                                    )
                                )

                            }

                            <Button
                                type='reset'
                                className='me-1'
                                color='secondary'
                                outline
                                onClick={() => {
                                    handleReset()
                                }}
                            >
                                Reset
                            </Button>
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

export default AddEditTask
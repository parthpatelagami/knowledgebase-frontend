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
import makeAnimated from 'react-select/animated'

// ** Custom Componenets
import ErrorBoundary from '@components/ErrorBoundary'
import { showNotifications } from '@components/Notifications'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

// ** Actions
import { createNewTeam, editTeam, getAllTeam } from '../store/action'
import { getUserByEmployeeId, getUserByManagerId } from '../../../redux/action'

const MySwal = withReactContent(Swal)

const AddEditTeam = ({ type, setShowAddTeamModal, rowInfo, setFormAction, toggleAddTeamModal }) => {

    // ** Set Schema
    const AddEditTeamSchema = yup.object().shape({
        team_name: yup.string().required('Team Name is required.').min(2, 'Team Name should be at least 2 characters.'),
        team_members: yup.array().of(yup.object().shape({ value: yup.string() })).min(1, 'At least one Team Member is required.'),
        team_managers: yup.array().of(yup.object().shape({ value: yup.string() })).min(1, 'At least one Team Manager is required.'),
    }).required()

    // ** Hook
    const { reset, control, handleSubmit, formState: { errors }, setError } = useForm({
        defaultValues: {
            team_name: '',
            team_members: [],
            team_managers: []
        },
        mode: "onChange",
        resolver: yupResolver(AddEditTeamSchema)
    })

    // ** Hooks & States
    const dispatch = useDispatch()
    const [isFormSubmitting, setFormSubmitting] = useState(false)
    const [employees, setEmployees] = useState([])
    const [managers, setManagers] = useState([])
    const animatedComponents = makeAnimated()
    const { teamDataTable } = useSelector((state) => state.team)
    const teamData = teamDataTable.filter(item => item !== null)

    // FETCH USER EMPLOYEE
    useEffect(() => {
        async function fetchEmployee() {
            try {
                const response = await dispatch(getUserByEmployeeId()).unwrap()
                const { Employees } = response
                const employeeOptions = Employees.map(r => ({ value: r.user_id, label: r.fullName }))
                setEmployees(employeeOptions)
            } catch (error) {
                console.error("Error fetching employees:", error)
                showNotifications({
                    type: 'error',
                    title: 'Oops! Something went wrong!',
                    message: `We cannot fetch employee data, please try again or contact support.`
                })
            }
        }
        fetchEmployee()
    }, [])

    // FETCH USER MANAGER
    useEffect(() => {
        async function fetchManager() {
            try {
                const response = await dispatch(getUserByManagerId()).unwrap()
                const { Manager } = response
                const managerOptions = Manager.map(r => ({ value: r.user_id, label: r.fullName }))
                setManagers(managerOptions)
            } catch (error) {
                console.error("Error fetching managers:", error)
                showNotifications({
                    type: 'error',
                    title: 'Oops! Something went wrong!',
                    message: `We cannot fetch manager data, please try again or contact support.`
                })
            }
        }
        fetchManager()
    }, [])

    useEffect(() => {
        if (type === 'edit-team') {
            reset({
                team_name: rowInfo.team_name,
                team_members: rowInfo.members.map(member => ({ value: member.user_id, label: member.name })),
                team_managers: rowInfo.managers.map(manager => ({ value: manager.user_id, label: manager.name }))
            })
        }
    }, [type, rowInfo])

    const onSubmit = async (event) => {
        try {
            const { team_name } = event
            const selectedTeam = teamData.map((team) => team.team_name)
            if (type === "add-team" && selectedTeam.includes(team_name.trim())) {
                setError('team_name', { type: 'duplicate', message: 'Team name already exists.!' })
                return
            }
            const formData = {
                ...event,
                team_members: event.team_members.map((item) => item.value),
                team_managers: event.team_managers.map((item) => item.value),
            }
            switch (type) {
                case "add-team":
                    dispatch(createNewTeam(formData)).unwrap()
                    MySwal.fire({
                        title: `Successfully Created!`,
                        text: 'Team has been created successfully.!',
                        icon: 'success',
                        customClass: {
                            confirmButton: 'btn btn-primary'
                        },
                        buttonsStyling: false
                    })
                    setTimeout(() => {
                        dispatch(getAllTeam())
                    }, 200)
                    break
                case "edit-team":
                    const team_id = rowInfo.team_id
                    await dispatch(editTeam({ formData, team_id })).unwrap()
                    MySwal.fire({
                        title: `Successfully Updated!`,
                        text: 'Team has been updated successfully.!',
                        icon: 'success',
                        customClass: {
                            confirmButton: 'btn btn-primary'
                        },
                        buttonsStyling: false
                    })
                    setFormSubmitting(false)
                    dispatch(getAllTeam())
                    setFormAction(null)
                    break
                default:
                    break
            }
            toggleAddTeamModal()
            reset({
                team_name: '',
                team_members: [],
                team_managers: []
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
                            <Label className="form-label" htmlFor="Team Name">
                                Team Name<span style={{ color: "red" }}> * </span>
                            </Label>
                            <Controller
                                control={control}
                                id='team_name'
                                name='team_name'
                                render={({ field }) => (
                                    <Input
                                        id="team_name"
                                        placeholder="Enter Team Name"
                                        className={errors.team_name ? 'is-invalid' : ''}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.team_name && (
                                <FormFeedback>{errors.team_name.message}</FormFeedback>
                            )}
                        </Col>

                        <Col md={6} xs={12}>
                            <Label className="form-label" htmlFor="Team Members">
                                Team Members
                            </Label>
                            <Controller
                                control={control}
                                name="team_members"
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        isClearable={false}
                                        inputId="team_members"
                                        className={`react-select ${errors.team_members ? `is-invalid` : ``}`}
                                        theme={selectThemeColors}
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        isMulti={true}
                                        options={employees}
                                        classNamePrefix='select'
                                        value={value.map(item => ({ value: item.value, label: item.label }))}
                                        onChange={val => {
                                            const selectedValues = val || []
                                            onChange(selectedValues)
                                        }}
                                    />
                                )}
                            />
                            {errors.team_members && (
                                <FormFeedback>{errors.team_members.message}</FormFeedback>
                            )}
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className="form-label" htmlFor="Team Managers">
                                Team Managers
                            </Label>
                            <Controller
                                control={control}
                                name="team_managers"
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        isClearable={false}
                                        inputId="team_managers"
                                        className={`react-select ${errors.team_managers ? `is-invalid` : ``}`}
                                        theme={selectThemeColors}
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        isMulti={true}
                                        options={managers}
                                        classNamePrefix='select'
                                        value={value}
                                        onChange={val => {
                                            const selectedValues = val || []
                                            onChange(selectedValues)
                                        }}
                                    />
                                )}
                            />
                            {errors.team_managers && (
                                <FormFeedback>{errors.team_managers.message}</FormFeedback>
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
                                    setShowAddTeamModal(false)
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

export default AddEditTeam

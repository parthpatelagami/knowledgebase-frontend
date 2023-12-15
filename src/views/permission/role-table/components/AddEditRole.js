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
import ErrorBoundary from '@components/ErrorBoundary'
import { showNotifications } from '@components/Notifications'
import { PERMISSION } from '@constants'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

// ** Actions
import { createNewRole, editRole } from '../store/action'
import { getAllRoles } from '../../../../redux/action'

const MySwal = withReactContent(Swal)

const AddEditRole = ({ type, setShowAddRoleModal, rowInfo, setFormAction, toggleAddRoleModal }) => {
  // ** Hooks & States
  const dispatch = useDispatch()
  const [isFormSubmitting, setFormSubmitting] = useState(false)
  const { roleDataTable } = useSelector((state) => state.permissions)
  const page = roleDataTable.map(role => role.permission)

  const dynamicPages = new Set()

  page.forEach(jsonString => {
    const jsonArray = JSON.parse(jsonString)
    jsonArray.forEach(item => {
      dynamicPages.add(item.page)
    })
  })

  const uniquePageArray = Array.from(dynamicPages)


  // Set up the validation schema
  const validationSchema = {
    newRole: yup.string().required('Role Name is required')
  }

  uniquePageArray.forEach((value) => {
    validationSchema[value] = yup.string().required(`${value} is required`)
  })

  // Create the Yup schema
  const AddEditRoleSchema = yup.object().shape(validationSchema)

  const defaultValues = {
    oldRole: '',
    newRole: '',
    ...Object.fromEntries(uniquePageArray.map((value) => [value, ''])),
  }

  // ** Hooks
  const { control, handleSubmit, formState: { errors }, setError, reset } = useForm({
    defaultValues,
    resolver: yupResolver(AddEditRoleSchema)
  })

  useEffect(() => {
    if (type === 'edit-role') {
      let permissionsData
      try {
        permissionsData = JSON.parse(rowInfo.permission)
      } catch (error) {
        console.error('Error parsing permissions data:', error)
        return
      }

      const permissionsMap = {}

      permissionsData.forEach(permissionObj => {
        const { page, permission } = permissionObj

        permissionsMap[page] = permission
      })

      const defaultValues = {
        newRole: rowInfo.role_name,
      }

      uniquePageArray.forEach(value => {
        defaultValues[value] = permissionsMap[value]
      })

      reset(defaultValues)
    }
  }, [type, rowInfo])

  const onSubmit = async (event) => {
    try {
      const { newRole } = event
      const selectedRole = roleDataTable.map((role) => role.role_name)
      if (type === "add-role" && selectedRole.includes(newRole.trim())) {
        setError('newRole', { type: 'duplicate', message: 'Role name already exists.!' })
        return
      }
      switch (type) {
        case "add-role":
          await dispatch(createNewRole(event)).unwrap()
          MySwal.fire({
            title: `Successfully Created!`,
            text: 'Role has been created successfully.!',
            icon: 'success',
            customClass: {
              confirmButton: 'btn btn-primary'
            },
            buttonsStyling: false
          })
          dispatch(getAllRoles())
          break
        case "edit-role":
          const role_id = rowInfo.role_id
          await dispatch(editRole({ event, role_id })).unwrap()
          MySwal.fire({
            title: `Successfully Updated!`,
            text: 'Role has been updated successfully.!',
            icon: 'success',
            customClass: {
              confirmButton: 'btn btn-primary'
            },
            buttonsStyling: false
          })
          setFormAction(null)
          dispatch(getAllRoles())
          setFormSubmitting(false)
          break
        default:
          break
      }
      toggleAddRoleModal()
      reset({ defaultValues })
    } catch (error) {
      console.log("ERROR", error)
    }
  }

  return (
    <ErrorBoundary>
      <Fragment>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md='6' className='mb-1'>
              <Label htmlFor='Role Name'>
                Role Name <span className='text-danger'>*</span>
              </Label>
              <Controller
                name='newRole'
                control={control}
                render={({ field }) => (
                  <Input
                    type='text'
                    id='newRole'
                    placeholder='Enter Role Name'
                    className={errors.newRole ? 'is-invalid' : ''}
                    {...field}
                    readOnly={type === 'edit-role'}
                  />
                )}
              />
              {errors.newRole && <FormFeedback>{errors.newRole.message}</FormFeedback>}
            </Col>
            {uniquePageArray.map((value, index) => {
              const fieldError = errors[value]
              return (
                <Col md='6' className='mb-1' key={index} >
                  <Label htmlFor={value}>
                    {value} <span className='text-danger'>*</span>
                  </Label>
                  <Controller
                    name={value}
                    control={control}
                    render={({ field: { onChange, value, ref } }) => (
                      <>
                        <Select
                          inputId={value}
                          placeholder='Select Permission'
                          theme={selectThemeColors}
                          className={`react-select ${fieldError ? 'is-invalid' : ''}`}
                          classNamePrefix='select'
                          menuPortalTarget={document.body}
                          styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                          options={PERMISSION}
                          inputRef={ref}
                          value={PERMISSION.find(c => c.value === value)}
                          onChange={val => {
                            const selectedValue = val ? val.value : ''
                            onChange(selectedValue)
                          }}
                        />
                        {fieldError && (
                          <FormFeedback>{fieldError.message}</FormFeedback>
                        )}
                      </>
                    )}
                  />
                </Col>
              )
            })}
          </Row>
          <Row>
            <Col xs={12} className='text-center mt-2 pt-50'>
              {!isFormSubmitting ? (
                <Button className='me-1' type='submit' color='primary'>
                  Submit
                </Button>
              ) : (
                <Button color='primary' disabled className='me-1'>
                  <Spinner size='sm' />
                  <span className='ms-50'>Submitted...</span>
                </Button>
              )}
              <Button
                type='button'
                color='warning'
                outline
                onClick={() => {
                  setShowAddRoleModal(false)
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

export default AddEditRole
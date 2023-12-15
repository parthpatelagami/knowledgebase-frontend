import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, ModalBody, ModalHeader, Table } from 'reactstrap'

// ** Custom Components
import { showNotifications } from '@components/Notifications'

// ** ACTIONS
import { checkInUser, checkOutUser, getUserStatus } from '../../../../redux/action'
import { LogIn, LogOut } from 'react-feather'

// ** Third Party Components
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const UserActivity = ({ isModalOpen, toggleModal }) => {

    const dispatch = useDispatch()
    const { userData } = useSelector((state) => state.auth)

    const [loginTime, setLoginTime] = useState("")
    const [logoutTime, setLogoutTime] = useState("")
    const [greeting, setGreeting] = useState("")
    const [emoji, setEmoji] = useState('')

    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, '0')
    const day = String(currentDate.getDate()).padStart(2, '0')
    const formattedDate = `${year}-${month}-${day}`

    const getCheckInOutUserStatus = async () => {
        try {
            const response = await dispatch(getUserStatus(userData)).unwrap()
            console.log("USER STATUS RESPONSE ::: ", response)

            const lastUserStatus = response.userStatus.length - 1
            const responseLoginTime = response.userStatus[lastUserStatus].login_time
            const responseLogoutTime = response.userStatus[lastUserStatus].logout_time

            if (response.message === 'User Status send Successfully') {
                setLoginTime(responseLoginTime)
                setLogoutTime(responseLogoutTime)

                if (formattedDate !== response.userStatus[lastUserStatus].login_time.split(' ')[0]) {
                    if (response.userStatus[lastUserStatus].logout_time === "") {
                        MySwal.fire({
                            title: `Missed Checkout!`,
                            text: "Last day you haven't checkout!",
                            icon: 'warning',
                            customClass: {
                                confirmButton: 'btn btn-primary'
                            },
                            buttonsStyling: false
                        })
                    } else {
                        return ''
                    }
                }
            } else {
                showNotifications({
                    type: 'error',
                    title: 'Oops! Something went wrong!',
                    message: `Please try to contact support team.`
                })
            }
        } catch (error) {
            console.log("ERROR", error)
        }
    }

    useEffect(() => {
        getCheckInOutUserStatus()

        // Determine the time of day and set the greeting message
        const currentHour = new Date().getHours()
        if (currentHour >= 5 && currentHour < 12) {
            setGreeting('Good morning')
            setEmoji('🌤️')
        } else if (currentHour >= 12 && currentHour < 16) {
            setGreeting('Good afternoon')
            setEmoji('🌞')
        } else if (currentHour >= 16 && currentHour < 22) {
            setGreeting('Good evening')
            setEmoji('🌥️')
        } else {
            setGreeting('Good night')
            setEmoji('🌙')
        }
    }, [])

    const handleCheckIn = async () => {
        try {
            if (formattedDate !== loginTime.split(' ')[0]) {
                if (logoutTime === "") {
                    console.log("logout ", logoutTime)
                    const response = await dispatch(checkInUser(userData)).unwrap()
                    if (response.message === 'User Check In successfully') {
                        getCheckInOutUserStatus()
                        showNotifications({
                            type: 'success',
                            title: 'Successfully!',
                            message: `You have been check-in successfully.`
                        })
                    } else {
                        showNotifications({
                            type: 'error',
                            title: 'Oops! Something went wrong!',
                            message: `Please try to contact support team.`
                        })
                    }
                } else {
                    const response = await dispatch(checkInUser(userData)).unwrap()
                    if (response.message === 'User Check In successfully') {
                        getCheckInOutUserStatus()
                        showNotifications({
                            type: 'success',
                            title: 'Successfully!',
                            message: `You have been check-in successfully.`
                        })
                    } else {
                        showNotifications({
                            type: 'error',
                            title: 'Oops! Something went wrong!',
                            message: `Please try to contact support team.`
                        })
                    }
                }

            } else {
                showNotifications({
                    type: 'error',
                    title: 'Already Checked-In',
                    message: `You have already checked-in for today.`
                })
            }
        } catch (error) {
            console.log("ERROR", error)
        }
    }

    const handleCheckOut = async () => {
        try {
            if (formattedDate !== logoutTime.split(' ')[0]) {
                const response = await dispatch(checkOutUser(userData)).unwrap()
                if (response.message === 'User Check Out successfully') {
                    getCheckInOutUserStatus()
                    showNotifications({
                        type: 'success',
                        title: 'Successfully!',
                        message: `You have been check-out successfully.`
                    })
                } else {
                    showNotifications({
                        type: 'error',
                        title: 'Oops! Something went wrong!',
                        message: `Please try to contact support team.`
                    })
                }
                dispatch(getUserStatus(userData))
            } else {
                showNotifications({
                    type: 'error',
                    title: 'Already Checked-Out',
                    message: `You have already checked-out for today.`
                })
            }
        } catch (error) {
            console.log("ERROR", error)
        }
    }

    const calculateTotalHours = (loginTime, logoutTime) => {
        if (loginTime && logoutTime) {
            const loginTimestamp = new Date(loginTime).getTime()
            const logoutTimestamp = new Date(logoutTime).getTime()

            const timeDifference = logoutTimestamp - loginTimestamp
            const hours = Math.floor(timeDifference / (1000 * 60 * 60))
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))

            return `${hours} hours ${minutes} minutes`
        } else {
            return 'N/A'
        }
    }

    // Extracting the date from loginTime
    const dateObject = new Date(loginTime)
    const loginTimeYear = dateObject.getFullYear()
    const loginTimeMonth = dateObject.getMonth() + 1
    const loginTimeDay = dateObject.getDate()
    const loginTimeFormattedDate = `${loginTimeYear}-${loginTimeMonth < 10 ? '0' : ''}${loginTimeMonth}-${loginTimeDay < 10 ? '0' : ''}${loginTimeDay}`

    return (
        <Fragment>
            <Modal isOpen={isModalOpen} toggle={toggleModal} className='modal-dialog-centered'>
                <ModalHeader toggle={toggleModal}>Swipes</ModalHeader>
                <ModalBody>
                    <div>
                        {
                            !loginTime || (formattedDate !== loginTimeFormattedDate) ? (
                                <Button type='button' color='primary' outline onClick={handleCheckIn}>
                                    Log In
                                    <span className='ms-1'><LogIn /></span>
                                </Button>
                            ) : (
                                <Button type='button' color='primary' outline onClick={handleCheckOut} >
                                    Log Out
                                    <span className='ms-1'><LogOut /></span>
                                </Button>
                            )
                        }
                        <span className="ms-5" style={{ fontSize: "17px", fontFamily: "sans-serif", fontWeight: "bold" }}>Hey, {greeting}! {emoji}</span>
                    </div>
                    <hr />
                    <Table>
                        <thead>
                            <tr>
                                <th>Check In</th>
                                <th>Check Out</th>
                                <th>Total hours</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{loginTime || 'N/A'}</td>
                                <td>{logoutTime || 'N/A'}</td>
                                <td>{calculateTotalHours(loginTime, logoutTime)}</td>
                            </tr>
                        </tbody>
                    </Table>
                </ModalBody>
            </Modal>
        </Fragment>
    )
}

export default UserActivity
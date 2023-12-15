import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

// ** Third Party Components
import { Badge, Card, CardBody, CardHeader, CardText, CardTitle, Col, Label, Row, Spinner } from 'reactstrap'
import moment from "moment"
import Flatpickr from 'react-flatpickr';
import Select from 'react-select'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'

// ** Actions
import { getAllTaskList } from '../../task/store/action'

const UserTask = () => {

    const [taskList, setTaskList] = useState([]);
    const [selectedDateRange, setSelectedDateRange] = useState([]);
    const [selectedPriority, setSelectedPriority] = useState(null);


    const dispatch = useDispatch()
    const { isTaskDataLoading } = useSelector((state) => state.task)


    useEffect(() => {
        async function getTaskList() {
            const listResponse = await dispatch(getAllTaskList()).unwrap()
            setTaskList(listResponse)
        }
        getTaskList()
    }, [])

    const priorityOptions = [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
    ];

    const filteredTasks = taskList.filter((task) => {
        const taskDate = moment(task.created_date);
        const taskPriority = task.priority;


        if (selectedPriority) {
            if (taskPriority !== selectedPriority.value) {
                return false;
            }
        }

        if (selectedDateRange.length > 0) {
            const startDate = moment(selectedDateRange[0]);
            const endDate = moment(selectedDateRange[1]);
            if (!taskDate.isBetween(startDate, endDate, null, '[]')) {
                return false;
            }
        }
        return true;
    });

    return (
        <Fragment>
            <h6 className='text-muted my-2'>History</h6>
            <Row>
                <Col md='2' lg='2' xs='12' className='offset-md-8 offset-lg-8'>
                    <Label for='date-range-select'>Date Range</Label>
                    <div className='mb-3'>
                        <Flatpickr
                            className='form-control'
                            options={{
                                mode: 'range',
                                dateFormat: 'Y-m-d',
                            }}
                            value={selectedDateRange}
                            onChange={(selectedDates) => setSelectedDateRange(selectedDates)}
                            placeholder='Select Date Range'
                        />
                    </div>
                </Col>
                <Col md='2' lg='2' xs='12'>
                    <Label for='priority-select'>Priority</Label>
                    <div className='mb-3'>
                        <Select
                            isClearable
                            className='react-select'
                            options={priorityOptions}
                            value={selectedPriority}
                            onChange={(selectedOption) => setSelectedPriority(selectedOption)}
                            placeholder="Select Priority"
                        />
                    </div>
                </Col>
            </Row>
            {
                isTaskDataLoading ? (
                    <div className="text-center" style={{ position: "fixed", top: "50%", left: "50%", transform: 'translate(-50%, -50%)' }}>
                        <Spinner color="primary" />
                    </div>
                ) : (
                    <Row>
                        {filteredTasks.length === 0 ? (
                            <Col md='12' className='text-center'>
                                <p>No data available</p>
                            </Col>
                        ) : (
                            filteredTasks.map((task) => (
                                <Col key={task.task_id} md='6' lg='4' xs='12'>
                                    <Card>
                                        <CardHeader className='d-flex justify-content-between'>
                                            <div>
                                                {moment(task.created_date).format("YYYY-MM-DD")}
                                            </div>

                                            <div>
                                                <Badge color='light-secondary'>Assignee:- {task.firstName} {task.lastName}</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardBody>
                                            <CardTitle className='d-flex justify-content-between'>
                                                <div>
                                                    {task.title}
                                                </div>
                                                <div style={{ fontSize: '12px' }}>
                                                    {task.status === 'pending' ? (
                                                        <Badge color='light-warning' pill>Pending</Badge>
                                                    ) : task.status === 'completed' ? (
                                                        <>
                                                            <Badge color='light-success' pill>Completed</Badge>
                                                        </>
                                                    ) : (
                                                        <Badge color='light-succeess' pill>N/A</Badge>
                                                    )}
                                                    &nbsp;&nbsp;
                                                    {task.priority === 'low' ? (
                                                        <Badge color='light-success' pill>Low</Badge>
                                                    ) : task.priority === 'medium' ? (
                                                        <Badge color='light-primary' pill>Medium</Badge>
                                                    ) : (
                                                        <Badge color='light-warning' pill>High</Badge>
                                                    )}
                                                </div>
                                            </CardTitle>
                                            <CardText>
                                                <div style={{ fontSize: '14px', }}>
                                                    {task.description}
                                                </div>
                                            </CardText>
                                        </CardBody>
                                    </Card>
                                </Col>
                            )))
                        }
                    </Row>
                )
            }

        </Fragment>
    )
}

export default UserTask
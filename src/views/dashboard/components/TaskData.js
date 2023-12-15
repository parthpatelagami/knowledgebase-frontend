// ** Third Party Components
import classnames from 'classnames'
import { TrendingUp, User, Box, DollarSign } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col } from 'reactstrap'

import { kFormatter } from '@utils'

const TaskData = ({ data, cols }) => {

    const { completed, pending, total } = data

    const taskData = [
        {
            title: completed ? kFormatter(completed) : 0,
            subtitle: 'Completed',
            color: 'light-success',
            icon: <TrendingUp size={24} />
        },
        {
            title: pending ? kFormatter(pending) : 0,
            subtitle: 'Pending',
            color: 'light-danger',
            icon: <User size={24} />
        },
        {
            title: total ? kFormatter(total) : 0,
            subtitle: 'Total',
            color: 'light-primary',
            icon: <Box size={24} />
        }
    ]

    const renderData = () => {
        return taskData.map((item, index) => {
            const colMargin = Object.keys(cols)
            const margin = index === 2 ? 'sm' : colMargin[0]
            return (
                <Col
                    key={index}
                    {...cols}
                    className={classnames({
                        [`mb-2 mb-${margin}-0`]: index !== taskData.length - 1
                    })}
                >
                    <div className='d-flex align-items-center'>
                        <Avatar color={item.color} icon={item.icon} className='me-2' />
                        <div className='my-auto'>
                            <h4 className='fw-bolder mb-0'>{item.title}</h4>
                            <CardText className='font-small-3 mb-0'>{item.subtitle}</CardText>
                        </div>
                    </div>
                </Col>
            )
        })
    }

    return (
        <Card className='card-statistics'>
            <CardHeader>
                <CardTitle tag='h4'>Task Data</CardTitle>
            </CardHeader>
            <CardBody className='statistics-body'>
                <Row>
                    {renderData()}
                </Row>
            </CardBody>
        </Card>
    )
}

export default TaskData
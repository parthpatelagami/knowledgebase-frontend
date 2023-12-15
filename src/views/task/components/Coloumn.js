// ** Reactstrap Imports
import { Badge } from 'reactstrap'

import Actions from '../components/Actions'

// ** Third Party Components
import moment from "moment"

export const columns = [
    {
        name: 'Task-ID',
        sortable: true,
        minWidth: '50px',
        selector: row => row.task_id
    },
    {
        name: 'Title',
        minWidth: '150px',
        selector: row => row.title
    },
    {
        name: 'Priority',
        sortable: true,
        minWidth: '100px',
        selector: row => row.priority,
        cell: row => (
            <div>
                {row.priority === 'low' ? (
                    <Badge color='light-success' pill>Low</Badge>
                ) : row.priority === 'medium' ? (
                    <Badge color='light-primary' pill>Medium</Badge>
                ) : (
                    <Badge color='light-warning' pill>High</Badge>
                )}
            </div>
        )
    },
    {
        name: 'Assignee',
        sortable: true,
        minWidth: '200px',
        selector: row => row.firstName + " " + row.lastName
    },
    {
        name: 'Status',
        sortable: true,
        minWidth: '100px',
        selector: row => row.status,
        cell: row => (
            <div>
                {row.status === 'pending' ? (
                    <Badge color='light-warning' pill>Pending</Badge>
                ) : row.status === 'completed' ? (
                    <>
                        <Badge color='light-success' pill>Completed</Badge>
                    </>
                ) : (
                    <Badge color='light-succeess' pill>N/A</Badge>
                )}
            </div>
        )
    },
    {
        name: 'Due_Date',
        minWidth: '250px',
        selector: row => {
            const dueDates = JSON.parse(row.due_date);
            return dueDates.map(date => {
                return moment(date).format("YYYY-MM-DD");
            }).join(" to ");
        }
    },
    {
        name: 'Created_Date',
        sortable: true,
        minWidth: '100px',
        selector: row => moment(row.created_date).format("YYYY-MM-DD") === "Invalid date" ? " " : moment(row.created_date).format("YYYY-MM-DD")
    },
    {
        name: 'Created_By',
        sortable: true,
        minWidth: '200px',
        selector: row => row.created_by
    },
    {
        name: 'Updated_Date',
        sortable: true,
        minWidth: '100px',
        selector: row => moment(row.updated_date).format("YYYY-MM-DD") === "Invalid date" ? " " : moment(row.updated_date).format("YYYY-MM-DD")
    },
    {
        name: 'Updated_By',
        sortable: true,
        minWidth: '200px',
        selector: row => row.updated_by
    },
    {
        name: 'Actions',
        selector: row => row.user_id,
        cell: (row) => <Actions rowInfo={row} />
    }
]
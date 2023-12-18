// ** Reactstrap Imports
import { Badge } from 'reactstrap'

import Actions from '../components/Actions'

// ** Third Party Components
import moment from "moment"

export const columns = [
    {
        name: 'Category',
        sortable: true,
        minWidth: '150px',
        // selector: row => row.
    },
    {
        name: 'SubCategory',
        sortable: true,
        minWidth: '150px',
        selector: row => row.subcategory_name
    },
    {
        name: 'Status',
        sortable: true,
        minWidth: '300px',
        selector: row => row.status,
        cell: row => (
            <div>
                {row.status === 1 ? (
                    <Badge color='light-info' pill>Activate</Badge>
                ) : (
                    <>
                        <Badge color='light-warning' pill>Deactivate</Badge>
                    </>
                )}
            </div>
        )
    },
    {
        name: 'Created_Date',
        sortable: true,
        minWidth: '150px',
        selector: row => moment(row.created_date).format("YYYY-MM-DD") === "Invalid date" ? " " : moment(row.created_date).format("YYYY-MM-DD")
    },
    {
        name: 'Actions',
        selector: row => row.user_id,
        cell: (row) => <Actions rowInfo={row} />
    }
]
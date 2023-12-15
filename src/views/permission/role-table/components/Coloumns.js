// ** Reactstrap Imports
import { Badge } from 'reactstrap'

import Actions from '../components/Actions'

// ** Third Party Components
import moment from "moment"

export const columns = [
    {
        name: 'Role Name',
        sortable: true,
        minWidth: '50px',
        selector: row => row.role_name
    },
    {
        name: 'Permission',
        minWidth: '150px',
        selector: row => {
            const permissions = JSON.parse(row.permission)
            return (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {permissions.map((item, index) => (
                        <li key={index} style={{ marginBottom: '5px', paddingLeft: '10px', marginTop: '5px' }}>
                            <p>{`${(item.page)} -> ${(item.permission)}`}</p>
                        </li>
                    ))}
                </ul>
            );
        }
    },
    {
        name: 'Created_Date',
        sortable: true,
        minWidth: '100px',
        selector: row => moment(row.created_date).format("YYYY-MM-DD")
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
        minWidth: '100px',
        selector: row => row.updated_by
    },
    {
        name: 'Actions',
        selector: row => row.user_id,
        cell: (row) => <Actions rowInfo={row} />
    }
]
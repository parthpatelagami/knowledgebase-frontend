// ** Reactstrap Imports
import { Badge } from 'reactstrap'

import Actions from '../components/Actions'

// ** Third Party Components
import moment from "moment"

export const columns = [
    {
        name: 'Articles Names',
        sortable: true,
        minWidth: '150px',
        selector: row => row.Name
    },
    {
        name: 'Category',
        sortable: true,
        minWidth: '150px',
        selector: row => row.category_name
    },
    {
        name: 'Sub-Category',
        sortable: true,
        minWidth: '300px',
        selector: row => row.SubCategory_id
    },
    {
        name: 'Status',
        sortable: true,
        minWidth: '300px',
        selector: row => row.Status
    },
    {
        name: 'Created_Date',
        sortable: true,
        minWidth: '150px',
        selector: row => moment(row.Created_date).format("YYYY-MM-DD") === "Invalid date" ? " " : moment(row.Created_date).format("YYYY-MM-DD")
    },
    {
        name: 'Created_By',
        sortable: true,
        minWidth: '200px',
        selector: row => row.Created_by
    },
    {
        name: 'Updated_Date',
        sortable: true,
        minWidth: '150px',
        selector: row => moment(row.Updated_date).format("YYYY-MM-DD") === "Invalid date" ? " " : moment(row.Updated_date).format("YYYY-MM-DD")
    },
    {
        name: 'Updated_By',
        sortable: true,
        minWidth: '200px',
        selector: row => row.Updated_by
    },
    {
        name: 'Actions',
        selector: row => row.ID,
        cell: (row) => <Actions rowInfo={row} />
    }
]
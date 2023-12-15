import Actions from '../components/Actions'

// ** Third Party Components
import moment from "moment"

export const columns = [
    {
        name: 'Team Name',
        sortable: true,
        minWidth: '50px',
        selector: row => row.team_name
    },
    {
        name: 'Total Members',
        sortable: true,
        minWidth: '50px',
        selector: row => row.total_members
    },
    {
        name: 'Created_Date',
        minWidth: '100px',
        selector: row => moment(row.created_date).format("YYYY-MM-DD") === "Invalid date" ? " " : moment(row.created_date).format("YYYY-MM-DD")
    },
    {
        name: 'Created_By',
        minWidth: '200px',
        selector: row => row.created_by
    },
    {
        name: 'Updated_Date',
        minWidth: '100px',
        selector: row => moment(row.updated_date).format("YYYY-MM-DD") === "Invalid date" ? " " : moment(row.updated_date).format("YYYY-MM-DD")
    },
    {
        name: 'Updated_By',
        minWidth: '100px',
        selector: row => row.updated_by
    },
    {
        name: 'Actions',
        selector: row => row.user_id,
        cell: (row) => <Actions rowInfo={row} />
    }
]
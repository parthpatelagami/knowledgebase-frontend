// ** Reactstrap Imports
import { Badge } from 'reactstrap'

import Actions from '../components/Actions'

// ** Third Party Components
import moment from "moment"

export const columns = [
    {
        name: 'Firstname',
        sortable: true,
        minWidth: '150px',
        selector: row => row.firstName
    },
    {
        name: 'Lastname',
        sortable: true,
        minWidth: '150px',
        selector: row => row.lastName
    },
    {
        name: 'Email-Id',
        sortable: true,
        minWidth: '300px',
        selector: row => row.email
    },
    {
        name: 'Role',
        sortable: true,
        minWidth: '100px',
        selector: row => row.role_name,
        cell: row => (
            <div>
                {row.role_name === 'Admin' ? (
                    <Badge color='light-info' pill>{row.role_name}</Badge>
                ) : row.role_name === 'Manager' ? (
                    <>
                        <Badge color='light-warning' pill>{row.role_name}</Badge>
                    </>
                ) : (
                    <Badge color='light-primary' pill>{row.role_name}</Badge>
                )}
            </div>
        )
    },
    {
        name: 'Suspended User',
        minWidth: '170px',
        selector: row => (
            <div style={{ marginLeft: "30px" }}>
                {row.isSuspended === 'Y' ? (
                    <Badge color='light-danger' pill>{row.isSuspended}</Badge>
                ) : (
                    <>
                        <Badge color='light-success' pill>{row.isSuspended}</Badge>
                    </>
                )}
            </div>
        )
    },
    {
        name: 'Team Name',
        minWidth: '200px',
        selector: row => {
            if (!row.team_name) {
                return null
            }
            const teamNames = row.team_name.split(',');
            return (
                <div>
                    {teamNames.map((team, index) => (
                        <div key={index}>
                            <ul>
                                <li>{team.trim()}</li>
                            </ul>
                        </div>
                    ))}
                </div>
            );
        }
    },
    {
        name: 'Login_Time',
        sortable: true,
        minWidth: '300px',
        selector: row => {
            if (!row.login_time) {
                return '';
            }
            const loginTimes = row.login_time.split(',').map(time => time.trim());
            if (loginTimes.length >= 2) {
                const secondToLastLogin = moment(loginTimes[1]);
                const lastLogin = moment(loginTimes[0]);

                if (secondToLastLogin.isValid() || lastLogin.isValid() || loginTimes.includes('')) {
                    const secondToLastLoginFormatted = !secondToLastLogin.isValid() ? "N/A" : secondToLastLogin.format('YYYY-MM-DD hh:mm A');
                    const lastLoginFormatted = lastLogin.format('YYYY-MM-DD hh:mm A');
                    return <>
                        <ul className='my-1'>
                            <li>{secondToLastLoginFormatted} (Last Day) </li>
                            <li>{lastLoginFormatted} (Current Day) </li>
                        </ul>
                    </>
                }
            }
            return '';
        }
    },
    {
        name: 'Logout_Time',
        sortable: true,
        minWidth: '300px',
        selector: row => {
            if (!row.logout_time) {
                return '';
            }
            const logoutTimes = row.logout_time.split(',').map(time => time.trim());
            console.log("TIMES ", logoutTimes)
            if (logoutTimes.length >= 2) {
                const secondToLastLogout = moment(logoutTimes[1]);
                const lastLogout = moment(logoutTimes[0]);

                console.log("SECOND ", secondToLastLogout)
                console.log("LAST ", lastLogout)

                if (secondToLastLogout.isValid() || lastLogout.isValid() || logoutTimes.includes('')) {
                    const secondToLastLogoutFormatted = !secondToLastLogout.isValid() ? "N/A" : secondToLastLogout.format('YYYY-MM-DD hh:mm A');
                    const lastLogoutFormatted = !lastLogout.isValid() ? "N/A" : lastLogout.format('YYYY-MM-DD hh:mm A');
                    return <>
                        <ul className='my-1'>
                            <li>{secondToLastLogoutFormatted} (Last Day) </li>
                            <li>{lastLogoutFormatted} (Current Day) </li>
                        </ul>
                    </>
                }
            }
            return '';
        }
    },
    {
        name: 'Created_Date',
        sortable: true,
        minWidth: '150px',
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
        minWidth: '150px',
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
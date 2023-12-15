// ** React Imports
import { Fragment, useState, forwardRef, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// ** Table Columns
import { columns } from '../components/Coloumns'

// ** Custom Components
import AddEditTeam from '../components/AddEditTeam'
import TotalMember from './TotalMember'
import Help from '../components/Help'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, FileText, PlusCircle } from 'react-feather'

// ** Context
import { AbilityContext } from '@src/utility/context/Can'

// ** Reactstrap Imports
import {
    Row,
    Col,
    Card,
    Input,
    Label,
    Button,
    CardTitle,
    CardHeader,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    UncontrolledButtonDropdown,
    UncontrolledTooltip,
    Modal,
    ModalHeader,
    ModalBody,
    Spinner
} from 'reactstrap'

// ** Actions
import { getAllTeam } from '../store/action'

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
    <div className='form-check'>
        <Input type='checkbox' ref={ref} {...props} />
    </div>
))

const TeamTable = () => {

    // ** States & Hooks
    const [currentPage, setCurrentPage] = useState(0)
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [showAddTeamModal, setShowAddTeamModal] = useState(false)
    const dispatch = useDispatch()
    const { teamDataTable, isTeamDataLoading } = useSelector((state) => state.team)
    const [formAction, setFormAction] = useState(null)
    const [showTotalMemberModal, setShowTotalMemberModal] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null)
    const teamData = teamDataTable.filter(item => item !== null)
    const ability = useContext(AbilityContext)

    useEffect(() => {
        dispatch(getAllTeam())
    }, [])

    const toggleAddTeamModal = () => {
        setShowAddTeamModal(!showAddTeamModal)
    }


    const handleRowClick = (row) => {
        setSelectedRow(row)
        setShowTotalMemberModal(true)
    }

    const handleFilter = (e) => {
        const value = e.target.value
        setSearchValue(value)
        let updatedData = []

        if (value.length) {
            updatedData = teamData.filter((item) => {
                const searchFields = [
                    item.team_name
                ]
                const rowText = searchFields.join(' ').toLowerCase()
                return rowText.includes(value.toLowerCase())
            })
        }

        setFilteredData(updatedData)
    }


    // ** Function to handle Pagination
    const handlePagination = page => {
        setCurrentPage(page.selected)
    }

    // ** Custom Pagination
    const CustomPagination = () => (
        <ReactPaginate
            previousLabel=''
            nextLabel=''
            forcePage={currentPage}
            onPageChange={page => handlePagination(page)}
            pageCount={searchValue.length ? Math.ceil(filteredData.length / 10) : Math.ceil(teamData.length / 10) || 1}
            breakLabel='...'
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            activeClassName='active'
            pageClassName='page-item'
            breakClassName='page-item'
            nextLinkClassName='page-link'
            pageLinkClassName='page-link'
            breakLinkClassName='page-link'
            previousLinkClassName='page-link'
            nextClassName='page-item next-item'
            previousClassName='page-item prev-item'
            containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1'
        />
    )

    function convertArrayOfObjectsToCSV(array) {
        let result = ''
        const columnDelimiter = ','
        const lineDelimiter = '\n'

        if (array.length === 0) {
            return ''
        }

        const keys = Object.keys(array[0])
        result += keys.join(columnDelimiter)
        result += lineDelimiter

        array.forEach((item) => {
            let ctr = 0
            keys.forEach((key) => {
                if (ctr > 0) result += columnDelimiter

                // Ensure that the item[key] is converted to a string
                result += item[key]

                ctr++
            })
            result += lineDelimiter
        })

        return result
    }

    // Downloads CSV
    function downloadCSV(array) {
        const link = document.createElement('a')
        let csv = convertArrayOfObjectsToCSV(array)

        if (csv === '') {
            console.error('CSV data is empty.')
            return
        }

        const filename = 'export.csv'

        if (!csv.match(/^data:text\/csv/i)) {
            csv = `data:text/csv;charset=utf-8,${csv}`
        }

        link.setAttribute('href', encodeURI(csv))
        link.setAttribute('download', filename)
        link.click()
    }


    return (
        <Fragment>
            <Card>
                <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
                    <CardTitle tag='h4'>Team List</CardTitle>
                    <div className='d-flex mt-md-0 mt-1'>
                        <Help />
                        <UncontrolledButtonDropdown>
                            <DropdownToggle color='secondary' caret outline>
                                <Share size={15} />
                                <span className='align-middle ms-50'>Export</span>
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem className='w-100' onClick={() => downloadCSV(teamData)}>
                                    <FileText size={15} />
                                    <span className='align-middle ms-50'>CSV</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                        {
                            ability.can("edit", 'Team') ? (
                                <Fragment>
                                    <Button className='ms-1' id="new-btn" color='primary' onClick={toggleAddTeamModal}>
                                        <PlusCircle size={14} />
                                        <span className='align-middle ms-50'>Create New Team</span>
                                    </Button>
                                    <UncontrolledTooltip placement='top' target='new-btn'>
                                        Create New Team
                                    </UncontrolledTooltip>
                                    <Modal scrollable className={'modal-dialog-centered modal-lg'}
                                        isOpen={showAddTeamModal}
                                        toggle={toggleAddTeamModal}
                                        backdrop="static">
                                        <ModalHeader toggle={toggleAddTeamModal}>Create New Team</ModalHeader>
                                        <ModalBody>
                                            <AddEditTeam
                                                type='add-team'
                                                setShowAddTeamModal={setShowAddTeamModal}
                                                setFormAction={setFormAction}
                                                toggleAddTeamModal={toggleAddTeamModal}
                                            />
                                        </ModalBody>
                                    </Modal>
                                </Fragment>
                            ) : null
                        }
                    </div>
                </CardHeader>
                {
                    isTeamDataLoading ? (
                        <div className="text-center" style={{ position: "fixed", top: "50%", left: "50%", transform: 'translate(-50%, -50%)' }}>
                            <Spinner color="primary" />
                        </div>
                    ) : (
                        <>
                            <Row className='justify-content-end mx-0'>
                                <Col className='d-flex align-items-center justify-content-end mt-1' md='3' sm='12'>
                                    <Label className='me-1' for='search-input'>
                                        Search
                                    </Label>
                                    <Input
                                        className='dataTable-filter mb-50'
                                        type='text'
                                        bsSize='sm'
                                        id='search-input'
                                        value={searchValue}
                                        onChange={handleFilter}
                                        placeholder='Search By Team Name'
                                    />
                                </Col>
                            </Row>
                            <div className='react-dataTable react-dataTable-selectable-rows'>
                                <DataTable
                                    noHeader
                                    pagination
                                    selectableRows
                                    columns={columns}
                                    paginationPerPage={10}
                                    className='react-dataTable'
                                    sortIcon={<ChevronDown size={10} />}
                                    paginationComponent={CustomPagination}
                                    paginationDefaultPage={currentPage + 1}
                                    selectableRowsComponent={BootstrapCheckbox}
                                    data={searchValue.length ? filteredData : teamData}
                                    onRowDoubleClicked={handleRowClick}
                                />
                            </div>
                            <TotalMember
                                selectedRow={selectedRow}
                                isOpen={showTotalMemberModal}
                                toggleTotalMemberModal={() => setShowTotalMemberModal(!showTotalMemberModal)}
                            />
                        </>
                    )
                }
            </Card>
        </Fragment>
    )
}

export default TeamTable
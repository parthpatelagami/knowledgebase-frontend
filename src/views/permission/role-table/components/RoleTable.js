// ** React Imports
import { Fragment, useState, forwardRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// ** Table Columns
import { columns } from './Coloumns'

// ** Custom Components
import AddEditRole from '../components/AddEditRole'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, FileText, PlusCircle } from 'react-feather'

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
import { getAllRoles } from '../../../../redux/action'

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
    <div className='form-check'>
        <Input type='checkbox' ref={ref} {...props} />
    </div>
))

const RoleTable = () => {
    // ** States & Hooks
    const [currentPage, setCurrentPage] = useState(0)
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [showAddRoleModal, setShowAddRoleModal] = useState(false)
    const dispatch = useDispatch()
    const { roleDataTable, isRoleDataLoading } = useSelector((state) => state.permissions)
    const [formAction, setFormAction] = useState(null)

    useEffect(() => {
        dispatch(getAllRoles())
    }, [])

    const toggleAddRoleModal = () => {
        setShowAddRoleModal(!showAddRoleModal)
    }

    const handleFilter = (e) => {
        const value = e.target.value
        setSearchValue(value)
        let updatedData = []

        if (value.length) {
            updatedData = roleDataTable.filter((item) => {
                const searchFields = [
                    item.role_name
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
            pageCount={searchValue.length ? Math.ceil(filteredData.length / 10) : Math.ceil(roleDataTable.length / 10) || 1}
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

    return (
        <Fragment>
            <Card>
                <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
                    <CardTitle tag='h4'>Role List</CardTitle>
                    <div className='d-flex mt-md-0 mt-1'>
                        <Fragment>
                            <Button className='ms-1' id="new-btn" color='primary' onClick={toggleAddRoleModal}>
                                <PlusCircle size={14} />
                                <span className='align-middle ms-50'>Create New Role</span>
                            </Button>
                            <UncontrolledTooltip placement='top' target='new-btn'>
                                Create New Role
                            </UncontrolledTooltip>
                            <Modal scrollable className={'modal-dialog-centered modal-lg'}
                                isOpen={showAddRoleModal}
                                toggle={toggleAddRoleModal}
                                backdrop="static">
                                <ModalHeader toggle={toggleAddRoleModal}>Add New Role</ModalHeader>
                                <ModalBody>
                                    <AddEditRole
                                        type='add-role'
                                        setShowAddRoleModal={setShowAddRoleModal}
                                        setFormAction={setFormAction}
                                        toggleAddRoleModal={toggleAddRoleModal}
                                    />
                                </ModalBody>
                            </Modal>
                        </Fragment>
                    </div>
                </CardHeader>
                {
                    isRoleDataLoading ? (
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
                                        placeholder='Search By Role Name'
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
                                    data={searchValue.length ? filteredData : roleDataTable}
                                />
                            </div>
                        </>
                    )
                }
            </Card>
        </Fragment>
    )
}

export default RoleTable
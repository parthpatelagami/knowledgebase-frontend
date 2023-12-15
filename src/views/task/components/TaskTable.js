// ** React Imports
import { Fragment, useState, forwardRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components
import { columns } from '../components/Coloumn'
import AddEditTask from '../components/AddEditTask'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, FileText, PlusCircle } from 'react-feather'

// ** Reactstrap Imports
import {
    Row,
    Col,
    Card,
    CardBody,
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
import Select from 'react-select'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Actions
import { getAllTaskList } from '../store/action'

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
    <div className='form-check'>
        <Input type='checkbox' ref={ref} {...props} />
    </div>
))

const TaskTable = () => {
    // ** States & Hooks
    const [currentPage, setCurrentPage] = useState(0)
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [formAction, setFormAction] = useState(null)

    const dispatch = useDispatch()
    const { taskDataTable, isTaskDataLoading } = useSelector((state) => state.task)

    useEffect(() => {
        dispatch(getAllTaskList())
    }, [])

    const toggleAddUserModal = () => {
        setShowAddUserModal(!showAddUserModal);
    };

    const handleFilter = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        let updatedData = [];

        if (value.length) {
            updatedData = taskDataTable.filter((item) => {
                const searchFields = [
                    item.task_id,
                    item.priority
                ];
                const rowText = searchFields.join(' ').toLowerCase();
                return rowText.includes(value.toLowerCase());
            });
        }

        setFilteredData(updatedData);
    };


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
            pageCount={searchValue.length ? Math.ceil(filteredData.length / 10) : Math.ceil(taskDataTable.length / 10) || 1}
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

    // ** Converts table to CSV
    function convertArrayOfObjectsToCSV(array) {
        let result

        const columnDelimiter = ','
        const lineDelimiter = '\n'
        const keys = Object.keys(taskDataTable[0])

        result = ''
        result += keys.join(columnDelimiter)
        result += lineDelimiter

        array.forEach(item => {
            let ctr = 0
            keys.forEach(key => {
                if (ctr > 0) result += columnDelimiter

                result += item[key]

                ctr++
            })
            result += lineDelimiter
        })
        return result
    }

    // ** Downloads CSV
    function downloadCSV(array) {
        const link = document.createElement('a')
        let csv = convertArrayOfObjectsToCSV(array)
        if (csv === null) return

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
                    <CardTitle tag='h4'>Task List</CardTitle>
                    <div className='d-flex mt-md-0 mt-1'>
                        <UncontrolledButtonDropdown>
                            {/* <DropdownToggle color='secondary' caret outline>
                                <Share size={15} />
                                <span className='align-middle ms-50'>Export</span>
                            </DropdownToggle> */}
                            <DropdownMenu>
                                <DropdownItem className='w-100'
                                    onClick={() => downloadCSV(taskDataTable)}
                                >
                                    <FileText size={15} />
                                    <span className='align-middle ms-50'>CSV</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                        <Fragment>
                            <Button className='ms-1' id="new-btn" color='primary' onClick={toggleAddUserModal}>
                                <PlusCircle size={14} />
                                <span className='align-middle ms-50'>Add New Task</span>
                            </Button>
                            <UncontrolledTooltip placement='top' target='new-btn'>
                                Add New Task
                            </UncontrolledTooltip>
                            <Modal scrollable className={'modal-dialog-centered modal-lg'}
                                isOpen={showAddUserModal}
                                toggleAddUserModal={toggleAddUserModal}
                                backdrop="static">
                                <ModalHeader>New Task</ModalHeader>
                                <ModalBody>
                                    <AddEditTask
                                        type='add-task'
                                        setShowAddUserModal={setShowAddUserModal}
                                        setFormAction={setFormAction}
                                        toggleAddUserModal={toggleAddUserModal}
                                    />
                                </ModalBody>
                            </Modal>
                        </Fragment>
                    </div>
                </CardHeader>
                {
                    isTaskDataLoading ? (
                        <div className="text-center" style={{ position: "fixed", top: "50%", left: "50%", transform: 'translate(-50%, -50%)' }}>
                            <Spinner color="primary" />
                        </div>
                    ) :
                        (
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
                                            placeholder='Search By Task-id or Priority'
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
                                        data={searchValue.length ? filteredData : taskDataTable}
                                    />
                                </div>
                            </>
                        )
                }
            </Card>
        </Fragment>
    )
}

export default TaskTable
// ** React Imports
import { Fragment, useState, forwardRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// ** Table Columns
import { columns } from "./Coloumns";

// ** Custom Components
import AddEditCategory from "./AddEditCategory";
import DeleteForm from "./Actions/components/DeleteForm";

// ** Third Party Components
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import {
  ChevronDown,
  Share,
  FileText,
  PlusCircle,
  Anchor,
} from "react-feather";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import { Trash } from "react-feather";

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
  Spinner,
} from "reactstrap";

// ** Actions
import { getAllCategory } from "../store/action";

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className='form-check'>
    <Input type='checkbox' ref={ref} {...props} />
  </div>
));
const CategoryTable = () => {
  // ** States & Hooks
  const [currentPage, setCurrentPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [formAction, setFormAction] = useState(null);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const dispatch = useDispatch();
  const { categoryDataTable, isCategoryDataLoading } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);
  useEffect(() => {
    setSelectedRows([]);
  }, [categoryDataTable]);

  const toggleAddCategoryModal = () => {
    setShowAddCategoryModal(!showAddCategoryModal);
  };

  const handleFilter = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    let updatedData = [];

    if (value.length) {
      updatedData = categoryDataTable.filter((item) => {
        const searchFields = [item.name, item.created_date, item.status];
        const rowText = searchFields.join(" ").toLowerCase();
        return rowText.includes(value.toLowerCase());
      });
    }

    setFilteredData(updatedData);
  };

  // ** Function to handle Pagination
  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=''
      nextLabel=''
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={
        searchValue.length
          ? Math.ceil(filteredData.length / 5)
          : Math.ceil(categoryDataTable.length / 5) || 1
      }
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
  );

  const toggleCheckedRow = (state) => {
    const selectedIds = state.selectedRows.map((row) => row.category_id);
    setSelectedRows(selectedIds);
  };

  const toggleDeleteModal = () => {
    setShowDeleteForm(!showDeleteForm);
  };
  return (
    <Fragment>
      <Card>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>Category List</CardTitle>
          <div className='d-flex mt-md-0 mt-1'>
            {selectedRows.length > 0 && (
              <Button outline onClick={toggleDeleteModal}>
                <Trash size={14} />
              </Button>
            )}
            <Fragment>
              <Button
                className='ms-1'
                id='new-btn'
                color='primary'
                onClick={toggleAddCategoryModal}
              >
                <PlusCircle size={14} />
                <span className='align-middle ms-50'>Create New Category</span>
              </Button>
              <UncontrolledTooltip placement='top' target='new-btn'>
                Create New Category
              </UncontrolledTooltip>
              <Modal
                scrollable
                className={"modal-dialog-centered modal-lg"}
                isOpen={showAddCategoryModal}
                toggle={toggleAddCategoryModal}
                backdrop='static'
              >
                <ModalHeader toggle={toggleAddCategoryModal}>
                  Add New Category
                </ModalHeader>
                <ModalBody>
                  <AddEditCategory
                    type='add-category'
                    setShowAddCategoryModal={setShowAddCategoryModal}
                    setFormAction={setFormAction}
                    toggleAddCategoryModal={toggleAddCategoryModal}
                  />
                </ModalBody>
              </Modal>
            </Fragment>
          </div>
        </CardHeader>
        {isCategoryDataLoading ? (
          <div
            className='text-center'
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Spinner color='primary' />
          </div>
        ) : (
          <>
            <Row className='justify-content-end mx-0'>
              <Col
                className='d-flex align-items-center justify-content-end mt-1'
                md='3'
                sm='12'
              >
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
                  placeholder='Search ...'
                />
              </Col>
            </Row>
            <div className='react-dataTable react-dataTable-selectable-rows'>
              <DataTable
                noHeader
                pagination
                selectableRows
                columns={columns}
                paginationPerPage={5}
                className='react-dataTable'
                sortIcon={<ChevronDown size={10} />}
                paginationComponent={CustomPagination}
                paginationDefaultPage={currentPage + 1}
                selectableRowsComponent={BootstrapCheckbox}
                data={searchValue.length ? filteredData : categoryDataTable}
                onSelectedRowsChange={toggleCheckedRow}
              />
            </div>
            {showDeleteForm && (
              <DeleteForm
                rowInfo={selectedRows}
                componentIndex={1}
                selectedAction={1}
                setFormAction={setFormAction}
                setShowDeleteForm={setShowDeleteForm}
              />
            )}
          </>
        )}
      </Card>
    </Fragment>
  );
};

export default CategoryTable;

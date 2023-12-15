import React, { useMemo } from 'react'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import Select from 'react-select'
import {
  Row,
  Col,
  CardBody
} from 'reactstrap'

// ** Utils
import { selectThemeColors } from '@utils'

const Footer = ({ table }) => {

  const pageSize = table.getState().pagination.pageSize
  const options = useMemo(() => {
    return [5, 10, 15, 20, 30, 50].map(pageSize => (
      { value: pageSize, label: pageSize }
    ))
  }, [])

  return (
    <CardBody>
      <Row >
        <Col xl='6' className='d-flex align-items-center p-0'>
          <div className='d-flex align-items-center w-100'>
            <label >Show</label>
            <Select
              value={{ value: pageSize, label: pageSize }}
              onChange={event => table.setPageSize(Number(event.value))}
              theme={selectThemeColors}
              className='react-select mx-50'
              classNamePrefix='select'
              options={options}
              menuPortalTarget={document.body}
              styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
            />
            <label >Entries</label>
          </div>
        </Col>
        <Col xl='6'>
          <ReactPaginate
            nextLabel=''
            pageCount={table.getPageCount()}
            forcePage={table.getState().pagination.pageIndex}
            breakLabel='...'
            previousLabel=''
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            onPageChange={event => table.setPageIndex(event.selected)}
            activeClassName='active'
            pageClassName='page-item'
            breakClassName='page-item'
            pageLinkClassName='page-link'
            nextLinkClassName='page-link'
            breakLinkClassName='page-link'
            previousLinkClassName='page-link'
            nextClassName='page-item next-item'
            previousClassName='page-item prev-item'
            containerClassName='pagination react-paginate justify-content-end'
          />
        </Col>
      </Row>
    </CardBody>
  )
}

export default Footer
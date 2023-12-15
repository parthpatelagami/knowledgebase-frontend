// ** React Imports
import React, { useState, useMemo, Fragment } from 'react'
import Proptypes from 'prop-types'

// ** ReactStrap Imports
import {
  Card,
  Table,
  CardHeader,
  CardTitle,
  Button,
  UncontrolledTooltip
} from 'reactstrap'

// ** React Table Imports
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel
} from '@tanstack/react-table'

// ** Custom component Imports
import Spinner from '@components/spinner/Loading-spinner'

// ** Icon Imports
import { Filter as FilerIcon } from 'react-feather'

// ** Import Sub Components
import Filter from './components/Filter'
import Footer from './components/Footer'
import HideShowColumns from './components/HideShowColumns'
import ExportData from './components/ExportData'

const TanstackReactTable = ({
  title,                              // Header Title
  columns: cols,                      // Table columns
  data,                               // Table Data
  loading,                            // Display loader
  dataCount,                          // Total record count for pagination
  responsiveTable,                    // Hide/Show scroll in table
  headerComponent,                    // Extra header component
  exportData,                         // Data exports
  // ** Pagination
  enablePagination,
  manualPagination,
  pagination: { pageIndex, pageSize },
  setPagination,
  // ** Filters
  enableColumnFilters,
  manualFiltering,
  columnFilters,
  setColumnFilters,
  // ** Columns visiblity
  enableColumnsVisiblity,
  columnVisibility,
  setColumnVisibility,
  // ** Row selection
  enableRowSelection,
  enableMultiRowSelection,
  getRowId,
  rowSelectionType,
  rowSelection,
  setRowSelection,
  // ** Row expanding
  enableExpanding,
  renderSubComponent
}) => {

  // ** Memorize Table Columns
  const columns = useMemo(() => [...cols], [])

  // ** Memorize Pagination
  const memoPagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize])

  // ** Memorize Page Count
  const pageCount = useMemo(() => Math.ceil(dataCount / pageSize) || 1, [dataCount, pageSize])

  // ** Hide/show filters
  const [showFilters, setShowFilters] = useState(false)

  // ** Table configurations
  const tableConfig = {
    columns,
    data,
    pageCount,
    state: {},
    getCoreRowModel: getCoreRowModel()
  }

  // ** Pagination configurations
  if (enablePagination) {
    if (manualPagination) {
      tableConfig.manualPagination = true
      tableConfig.state = { ...tableConfig.state, pagination: memoPagination }
      tableConfig.onPaginationChange = updater => setPagination(updater(memoPagination))
    } else {
      tableConfig.initialState = { ...tableConfig.initialState, pagination: memoPagination }
      tableConfig.getPaginationRowModel = getPaginationRowModel()
    }
  }

  // ** Columns filters configuration
  if (enableColumnFilters) {
    tableConfig.enableColumnFilters = showFilters
    if (manualFiltering) {
      tableConfig.manualFiltering = true
      tableConfig.state = { ...tableConfig.state, columnFilters }
      tableConfig.onColumnFiltersChange = updater => setColumnFilters(updater(columnFilters))
    } else {
      tableConfig.getFilteredRowModel = getFilteredRowModel()
    }
  }

  // ** Columns visiblity configurations
  if (enableColumnsVisiblity) {
    tableConfig.enableHiding = true
    tableConfig.state = { ...tableConfig.state, columnVisibility }
    tableConfig.onColumnVisibilityChange = updater => { typeof updater === "function" ? setColumnVisibility(updater(columnVisibility)) : setColumnVisibility('') }
  }

  // ** Row  Selection
  if (enableRowSelection) {
    tableConfig.enableRowSelection = true
    tableConfig.enableMultiRowSelection = enableMultiRowSelection
    tableConfig.state = { ...tableConfig.state, rowSelection }
    tableConfig.onRowSelectionChange = updater => setRowSelection(updater(rowSelection))
  }

  // ** Custom table row id config
  if (getRowId) { tableConfig.getRowId = getRowId }

  // ** Row  expanding
  if (enableExpanding) {
    tableConfig.enableExpanding = true
    tableConfig.getRowCanExpand = () => true
    tableConfig.getExpandedRowModel = getExpandedRowModel()
  }

  const table = useReactTable(tableConfig)
  const tableRowCount = table.getRowModel().rows.length
  const disableTableActivity = loading || tableRowCount === 0

  return (
    <Card>
      <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>

        {/* Title */}
        <CardTitle tag='h4'>{title}</CardTitle>

        <div className='d-flex mt-md-0 mt-1'>

          {/* Custom header component */}
          {headerComponent && headerComponent()}

          {/* Exports Data */}
          {exportData ? <>
            <ExportData
              title={title}
              data={data}
              table={table}
              exportData={exportData}
              disableTableActivity={disableTableActivity}
            />
          </> : null
          }

          {/* Filter */}
          {enableColumnFilters &&
            <>
              <Button.Ripple
                color='secondary'
                id='react-table-hide-show-filter-btn'
                className='btn-icon ms-1'
                outline
                onClick={() => setShowFilters(!showFilters)}
              >
                <FilerIcon size={16} />
              </Button.Ripple>
              <UncontrolledTooltip placement='top' target='react-table-hide-show-filter-btn'>
                Hide/Show Filters
              </UncontrolledTooltip>
            </>
          }

          {/* Columns */}
          {enableColumnsVisiblity && < HideShowColumns table={table} />}

        </div >
      </CardHeader >

      {/* React Table */}
      < Table
        hover={tableRowCount !== 0 && !loading}
        responsive={responsiveTable}
        height="250px"
      >
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} >
                  <span style={{ display: 'block', width: header.column.getSize() }}>
                    {header.isPlaceholder ? null : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getCanFilter() ? (
                      <Filter column={header.column} table={table} />
                    ) : null}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody >
          {loading && <tr><td className='p-0'><Spinner /></td></tr>}
          {!loading && tableRowCount === 0 &&
            <tr><td className='fallback-spinner data-loader'>No Data Available</td></tr>
          }
          {table.getRowModel().rows.map(row => (
            <Fragment key={row.id}>
              <tr
                style={loading ? { backgroundColor: "#D3D3D3" } : {}}
                onClick={rowSelectionType === 'single-click' ? row.getToggleSelectedHandler() : null}
                onDoubleClick={rowSelectionType === 'double-click' ? row.getToggleSelectedHandler() : null}
              >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
              {row.getIsExpanded() && (
                <tr>
                  <td colSpan={row.getVisibleCells().length}>
                    {renderSubComponent({ row })}
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </Table >

      {enablePagination && <Footer table={table} />}

    </Card >
  )
}

TanstackReactTable.defaultProps = {
  responsiveTable: false,
  enablePagination: false,
  manualPagination: false,
  pagination: { pageIndex: 0, pageSize: 5 },
  enableColumnFilters: false,
  manualFiltering: false,
  columnFilters: [],
  enableColumnsVisiblity: false,
  columnVisibility: {},
  enableRowSelection: false,
  enableMultiRowSelection: false,
  rowSelectionType: 'single-click',
  rowSelection: {},
  enableExpanding: false
}

TanstackReactTable.propTypes = {
  title: Proptypes.string.isRequired,
  columns: Proptypes.array.isRequired,
  data: Proptypes.array.isRequired,
  loading: Proptypes.bool.isRequired,
  dataCount: Proptypes.number.isRequired,
  responsiveTable: Proptypes.bool,
  headerComponent: Proptypes.func,
  exportData: Proptypes.object,
  enablePagination: Proptypes.bool,
  manualPagination: Proptypes.bool,
  pagination: Proptypes.object,
  setPagination: Proptypes.func,
  enableColumnFilters: Proptypes.bool,
  manualFiltering: Proptypes.bool,
  columnFilters: Proptypes.array,
  setColumnFilters: Proptypes.func,
  enableColumnsVisiblity: Proptypes.bool,
  columnVisibility: Proptypes.object,
  setColumnVisibility: Proptypes.func,
  enableRowSelection: Proptypes.bool,
  enableMultiRowSelection: Proptypes.bool,
  rowSelectionType: Proptypes.string,
  rowSelection: Proptypes.object,
  setRowSelection: Proptypes.func,
  getRowId: Proptypes.func,
  enableExpanding: Proptypes.bool,
  renderSubComponent: Proptypes.func
}

export default TanstackReactTable
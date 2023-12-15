// ** React Import
import React, { useState, useRef } from 'react'

// ** Third Party Library Imports
import { useDispatch } from 'react-redux'
import { CSVLink } from "react-csv"

// ** Icon Imports
import { Share, Printer, FileText } from 'react-feather'

// ** Reactstrap Imports
import { DropdownMenu, DropdownItem, DropdownToggle, UncontrolledButtonDropdown } from 'reactstrap'

// ** Custom Components
import { showNotifications } from '@components/Notifications'

const ExportData = ({
  title,
  data: tableData,
  exportData,
  table,
  disableTableActivity
}) => {

  // ** Props
  const { exportsType, exportDataAction } = exportData

  // ** States
  const [exportReport, setExportReport] = useState({ data: [], headers: [], filename: '' })

  // ** Ref
  const csvLinkEl = useRef(null)

  // ** Hooks
  const dispatch = useDispatch()

  // Export data as CSV
  const downloadAsCSV = (data) => {
    const headers = table.getAllColumns().map(col => {
      return { label: col.columnDef.header(), key: col.id }
    })
    setExportReport({ ...{ headers, data, filename: `${title}-export.csv` } })
    setTimeout(() => { csvLinkEl.current.link.click() }, 200)
  }

  const handleExport = async exportType => {
    try {
      let exportData = [...tableData]
      if (exportDataAction) {
        const response = await dispatch(exportDataAction()).unwrap()
        exportData = [...response.data]
      }
      switch (exportType) {
        case 'csv':
          downloadAsCSV(exportData)
          break
        default:
      }
    } catch (error) {
      console.log("An error occured in export table data: ", error)
      showNotifications({
        type: 'error',
        title: 'Oops! Something went wrong!',
        message: 'Please contact support team.'
      })
    }
  }

  return (
    <UncontrolledButtonDropdown disabled={disableTableActivity}>
      <DropdownToggle color='secondary' caret outline>
        <Share size={15} />
        <span className='align-middle ms-50'>Export</span>
      </DropdownToggle>
      <DropdownMenu>
        {exportsType.includes('print') &&
          <DropdownItem className='w-100'>
            <Printer size={15} />
            <span className='align-middle ms-50'>Print</span>
          </DropdownItem>
        }
        {exportsType.includes('csv') &&
          <>
            <DropdownItem className='w-100' onClick={() => { handleExport('csv') }}>
              <FileText size={15} />
              <span className='align-middle ms-50'>
                CSV
              </span>
            </DropdownItem>
            <CSVLink {...exportReport} ref={csvLinkEl} target="_blank" />
          </>
        }
      </DropdownMenu>
    </UncontrolledButtonDropdown>
  )
}

export default ExportData
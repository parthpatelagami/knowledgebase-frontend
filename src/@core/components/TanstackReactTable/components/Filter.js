import React, { useMemo, useState, useEffect } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import Select from 'react-select'

// ** Reactstrap Imports
import { Input } from 'reactstrap'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Custom HooksImport
import { useDebounce } from '@hooks/useDebounce'
import { useIsMount } from '@hooks/useIsMount'

// ** Styles
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css'// theme css file
import '@styles/react/libs/flatpickr/flatpickr.scss'

const Filter = ({ column }) => {

  const { columnDef, getFilterValue, setFilterValue } = column
  const filterType = columnDef.filterType || null
  let returnElement = null

  switch (filterType) {
    case 'text':

      // ** States
      const [searchTerm, setSearchTerm] = useState(getFilterValue() || '')

      // ** Hooks
      const isMount = useIsMount()
      const debouncedSearchTerm = useDebounce(searchTerm, 1000)

      useEffect(() => {
        if (!isMount) {
          if (debouncedSearchTerm) {
            setFilterValue(debouncedSearchTerm)
          } else {
            setFilterValue('')
          }
        }
      }, [debouncedSearchTerm])// Only call effect if debounced search term changes

      returnElement = (
        <div className='mt-1'>
          <Input
            type='text'
            placeholder={`Filter by ${columnDef.header()}`}
            value={searchTerm}
            onChange={event => setSearchTerm(event.target.value)}
          />
        </div>
      )
      break
    case 'date':
    case 'month':
      returnElement = (
        <div className='mt-1' style={{ backgroundColor: 'white' }}>
          <Flatpickr
            className='form-control'
            value={getFilterValue()}
            placeholder='Filter by Date'
            onClose={event => {
              setFilterValue(event)
            }}
            options={{
              mode: 'range',
              enableTime: false,
              dateFormat: filterType === 'date' ? "Y-m-d" : "M-Y",
              maxDate: new Date()
            }}
          />
        </div>
      )
      break
    case 'dropdown':
      const options = useMemo(() => {
        let options = []
        if (columnDef.filterDropdownValues) {
          columnDef.filterDropdownValues.forEach(item => {
            options = [...options, { value: item, label: item }]
          })
        }
        return options
      }, [])
      const selectedValue = getFilterValue() || ''
      returnElement = (
        <div className='mt-1' style={{ backgroundColor: 'white' }}>
          <Select
            theme={selectThemeColors}
            className='react-select'
            classNamePrefix='select'
            options={options}
            placeholder='Select'
            isClearable={true}
            value={options.find(c => c.value === selectedValue)}
            onChange={val => {
              const value = val ? val.value : ''
              setFilterValue(value)
            }}
          />
        </div>
      )
      break
    default:
      returnElement = null
  }

  return returnElement

}

export default Filter
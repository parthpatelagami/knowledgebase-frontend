// ** Icons Imports

import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

// ** Reactstrap Imports
import { Card, CardBody, CardText, Form,Col, Label, Input, InputGroup, InputGroupText } from 'reactstrap'
import AsyncSelect from 'react-select/async'

import { searchArticle } from '../../articles/store/action';
import { Link } from 'react-feather';

const KnowledgeBaseFilter = () => {

  const [query, setQuery] = useState('')
  const [selectedDBVal, setSelectedDBVal] = useState(null)
  const dispatch = useDispatch();  

  const handleDBInputChange = newValue => {
    setQuery(newValue)
  }

  const loadOptionsDB = async (query) => {

    const response = await dispatch(searchArticle(query));
   
    let response1 = response.payload; 
    const options = response.payload.map(item => ({
      label: item.Name, 
      value: item.Category_id 
    }));
 
    return options;  
  };
  
  const history = useHistory();
  const handleDBChange = value => {
    console.log("value", value);
    history.push(`/knowledgebase/${value.value}/${value.value}`);
    setSelectedDBVal(value)
  }
  return (
    <div id='knowledge-base-search'>
      <Card
        className='knowledge-base-bg align'
        style={{
          backgroundImage: `url('@src/assets/images/banner/banner.png')`
        }}
      >
        <CardBody >
          
          <h2 className='text-primary text-center'>Hello, how can we help?</h2>
          
          <CardText className='mb-2 text-center'>
            Popular searches: <span className='fw-bolder'>Sales automation, Email marketing</span>
          </CardText>
          <div style={{ position:'relative' }}>
            <div style={{ display:'flex' , alignItems: "center", justifyContent: "center"}} >
              <Col md={6} xs={12} className='mb-1'>
                <AsyncSelect
                 defaultOptions
                //  isClearable={false}
                 value={selectedDBVal}
                 name='db-react-select'
                 className='react-select'
                 classNamePrefix='Search Articles'
                 onChange={handleDBChange}
                 loadOptions={loadOptionsDB}
                 onInputChange={handleDBInputChange}
                />
              </Col>
          </div> 
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default KnowledgeBaseFilter

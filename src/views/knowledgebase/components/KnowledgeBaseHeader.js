// ** Icons Imports
import { Search } from 'react-feather'

// require('dotenv').config();
// ** Reactstrap Imports
import { Card, CardBody, CardText, Form,Col, Label, Input, InputGroup, InputGroupText } from 'reactstrap'
import AsyncSelect from 'react-select/async'
import axios from 'axios'

const KnowledgeBaseFilter = ({ searchTerm, setSearchTerm, handleFilter }) => {
  // const onChange = e => {
  //   if (handleFilter) {
  //     handleFilter(e)
  //   } else {
  //     setSearchTerm(e.target.value)
  //   }
  // }
  const onloadSearchArticle = async (event) => {
    console.log(event);
    try {
      const res = await axios.get(`http://192.168.1.122:8081/api/v1/article/searcharticle/${event}`);
      console.log(res);
      // Handle the response as needed
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = newValue => {
    const val = newValue.replace(/\W/g, '')
    onloadSearchArticle(val);
    console.log("Input: ", val)
    return val
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
          <Form className='kb-search-input' onSubmit={e => e.preventDefault()}>
            <div style={{ alignItems: "center", justifyContent: "center"}} >
              <Col md={6} xs={12} className='mb-1'>
                <AsyncSelect
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='Search Article'
                  name='callback-react-select'
                
                  defaultOptions
                  onInputChange={handleInputChange}
                  // theme={selectThemeColors}
                />
              </Col>
          </div> 
          </Form>
        </CardBody>
      </Card>
    </div>
  )
}

export default KnowledgeBaseFilter

// ** React Imports
import { Link, useParams , useHistory} from 'react-router-dom'
import { Fragment, useState, useEffect } from 'react'

import { useDispatch } from 'react-redux';

// ** Third Party Components
import axios from 'axios'
import * as Icon from 'react-feather'
import classnames from 'classnames'

import { Info, Smartphone } from 'react-feather'
// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Demo Components
import KnowledgeBaseHeader from './components/KnowledgeBaseHeader'

// ** Reactstrap Imports
import { Row, Col, Card, CardBody, ListGroup, ListGroupItem } from 'reactstrap'

// ** Styles
import '@styles/base/pages/page-knowledge-base.scss'
import { red } from '@mui/material/colors'


import { getCategoryWiseArticleData } from '../articles/store/action'

const KnowledgeBase = () => {
 // ** States [data, setData] = useState(null),
  
  const [data, setData] = useState([])
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchCategory() {
      try {
        const response = await dispatch(getCategoryWiseArticleData());
        setData(response.payload);
       
      } catch (error) {
        console.log(error)
       
      }
    }
    fetchCategory();
  },[])

const  params  = useParams()

const Content = ({item} ) => {
  const history = useHistory()
//  const IconTag = Icon[item.icon]
 return (
   <Col className='kb-search-content' md='4' sm='6'>
     <Card>
       <CardBody>
        <Link to={`/knowledgebase/${item.category_id}/${item.category_id}`}>
         <h4 className='kb-title text-center'>
           {/* <IconTag
             size={30}
             className={classnames('me-50', {
               [item.iconColor]: item.iconColor
               {`(${item.questions.length})`}
             })}
           /> */}
           <span>
             {item.name} 
           </span>
         </h4>
         </Link>
         <ListGroup className='list-group-circle mt-2'>
           
          {item.article.length ? ( 
          <>
            {item.article.map(listItem => (
              <ListGroupItem
                tag={Link}
                to={`/knowledgebase/${item.category_id}/${listItem.id}`}
                className='text-body'
                key={listItem.id}
                
              >
                {listItem.name}
              </ListGroupItem>
            ))}
          </>
          ): (
            <div className='text-center p-5'>
              <h5 className='p-1'>              
                No Articles Found !              
              </h5>
            </div>
          )}

         </ListGroup>
       </CardBody>
       
     </Card>
   </Col>
 )
}

const renderContent = () => {
  const dataToMap = data;

  return dataToMap.map(item => <Content key={item.category_id } item={item} />)
}

const handleFilter = e => {
 const value = e.target.value,
   knowledgeBaseSearchQueryLower = e.target.value.toLowerCase()

 setSearchTerm(e.target.value)

 let arr = []

 if (value.length) {
   arr = categorydata.filter(item => {
     return (
       item.name.toLowerCase().includes(knowledgeBaseSearchQueryLower)
      //  item.description.filter(queObj => queObj.question.toLowerCase().includes(knowledgeBaseSearchQueryLower)).length
     )
   })
 }

 setFilteredData([...arr])
}

  return (
    <Fragment>
      <KnowledgeBaseHeader/>
      <div id='knowledge-base-content'>
          <Row className='kb-search-content-info match-height'>{renderContent()}</Row>
      </div>
      
    </Fragment>
  )
}

export default KnowledgeBase

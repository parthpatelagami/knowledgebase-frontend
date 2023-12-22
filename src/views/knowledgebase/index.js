// ** React Imports
import { Link, useParams , useHistory} from 'react-router-dom'
import { Fragment, useState, useEffect } from 'react'

import { useDispatch } from 'react-redux';

// ** Demo Components
import KnowledgeBaseHeader from './components/KnowledgeBaseHeader'

// ** Reactstrap Imports
import { Row, Col, Card, CardBody, ListGroup, ListGroupItem } from 'reactstrap'

// ** Styles
import '@styles/base/pages/page-knowledge-base.scss'

import { getCategoryWiseArticleData } from '../articles/store/action'

const KnowledgeBase = () => {

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

 return (
   <Col className='kb-search-content' md='4' sm='6'>
     <Card>
       <CardBody>
        <Link to={`/knowledgebase/${item.category_id}/${item.category_id}/${item.name}`}>
         <h4 className='kb-title text-center'>
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
                to={`/knowledgebase/activetab/${item.category_id}/${listItem.id}/${item.name}`}
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
                No Articles Found !!!              
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

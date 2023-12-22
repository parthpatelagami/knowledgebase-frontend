
// ** React Imports
import { useState , useEffect} from 'react'
import { useParams } from 'react-router-dom';
import moment from 'moment';

import { Info, Smartphone } from 'react-feather'
// ** Reactstrap Imports
import {
  Nav,
  Row,
  Col,
  NavItem,
  NavLink,
  TabPane,
  TabContent,
  Card, 
  CardBody,
  CardTitle,
  Button
} from 'reactstrap'

 
import { getArticlesData } from '../../articles/store/action'
import { useDispatch } from 'react-redux';
const knowledgebaseSerchArticle = () => {

  const dispatch = useDispatch() 
  const [activeTab, setActiveTab] = useState(1);
  const [data, setData] = useState([]);

  const params = useParams();

  useEffect(()=>{
    let categoryId =  params.searchcategoryid;
    let articleId = params.searcharticlesid;
    async function fetchData(categoryId){
      const response = await dispatch(getArticlesData(categoryId))
      
      setData(response.payload);
      
    }
    setActiveTab(parseInt(articleId));
    fetchData(categoryId);
  },[])
 
  const toggleTab = tab => setActiveTab(tab)

  const renderTabs = () => {
    return data.map(item => {
      return (
      item.articledata.map(item => {
       
        return (        
          <NavItem key={item.article_id} tag='li'>
            <NavLink active={activeTab === item.article_id} onClick={() => toggleTab(item.article_id)}>
              <span className='fw-bold'>{item.name}</span>
            </NavLink>
          </NavItem>            
        )
      }))
      
    })
  }

  const renderTabContent = () => {
    return data.map(item => {
      return item.articledata.map(item =>{
        return (        
          <TabPane key={item.article_id} tabId={item.article_id}>
            <Card>
               <CardBody>
                 <CardTitle className='mb-1'>
                   <Smartphone className='font-medium-5  me-25' /> <span>{item.name}</span>
                 </CardTitle>
                 <p className='mb-2'><b>Updated Date: </b> {moment(item.updated_date).format('MMM Do YY')}</p>
                 <div
                   dangerouslySetInnerHTML={{
                     __html: item.content
                   }}
                 ></div>            
               </CardBody>
             </Card>
          </TabPane>
          
        )
      })
      
    })
  }

  return (
    <div id='faq-tabs'>
      <Row>
        <Col lg='3' md='4' sm='12'>
          <div className='faq-navigation d-flex justify-content-between flex-column mb-2 mb-md-0'>
          <Card>
            <CardBody>
              <h4 className='kb-title'>
                 <Info size={20} className='me-50' />
                 <span>{params.categoryname}</span>
              </h4>
              <Nav tag='ul' className='nav-left mt-2' pills vertical>
                {renderTabs()}
              </Nav>
            </CardBody>
          </Card>    
           
          </div>
        </Col>
        <Col lg='9' md='8' sm='12'>
          <TabContent activeTab={activeTab}>{renderTabContent()}</TabContent>
        </Col>
      </Row>
    </div>
  )
}

export default knowledgebaseSerchArticle

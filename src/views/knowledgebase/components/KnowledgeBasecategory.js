// ** React Imports
import { useState } from 'react'

// ** Icons Imports
import * as Icon from 'react-feather'

import { ArrowLeft } from 'react-feather'
import { useParams , Link} from 'react-router-dom'
// ** Reactstrap Imports
import {
  Nav,
  Row,
  Col,
  NavItem,
  NavLink,
  TabPane,
  TabContent,
  ListGroup, 
  ListGroupItem,
  Button,
  Card,
  CardBody
} from 'reactstrap'

// ** Images

const KnowledgeBaseCategory = () => {
  const dataToRender = []
    const params = useParams()
  const data = [
    {    
    id:'1',        
    title: 'Account',
    lastUpdated: '10 Dec 2018',
    icon:'Mail',
    relatedQuestions: [
        {
            id: 0,
            question: 'How Secure Is My Password?'
        },
        {
            id: 1,
            question: 'Can I Change My Username?'
        },
        {
            id: 2,
            question: 'Where Can I Upload My Avatar?'
        },
        {
            id: 3,
            question: 'How Do I Change My Timezone?'
        },
        {
            id: 4,
            question: 'How Do I Change My Password?'
        }
    ]},
    {
        id:'2',        
        title: 'Authentication',
        lastUpdated: '10 Dec 2018',
        icon:'Mail',
        relatedQuestions: [
            {
                id: 0,
                question: 'How Secure Is My Password?'
            },
            {
                id: 1,
                question: 'Can I Change My Username?'
            },
            {
                id: 2,
                question: 'Where Can I Upload My Avatar?'
            },
            {
                id: 3,
                question: 'How Do I Change My Timezone?'
            },
            {
                id: 4,
                question: 'How Do I Change My Password?'
            }
        ]}
    
    
]
  // ** States
  const [activeTab, setActiveTab] = useState('Account')

  const toggleTab = tab => setActiveTab(tab)


  const renderTabs = () => {
    return data.map(item => {
      const IconTag = Icon[item.icon]
      return (       
            <NavItem key={item.title} tag='li'>
                <NavLink active={activeTab === item.title} onClick={() => toggleTab(item.title)}>
                    <span className='fw-bold'>{item.title}</span>
                </NavLink>
            </NavItem>        
        )
    })
  }

  const renderTabContent = () => {
    return data.map(item => {
      const IconTag = Icon[item.icon]

      return (
        <Card>
            <CardBody>
                <TabPane key={item.title} tabId={item.title}>
                    <div className='d-flex align-items-center'>
                        <div className='avatar avatar-tag bg-light-primary me-1'>
                            <IconTag size={20} />
                        </div>
                    <div>
                    <h4 className='mb-0'>{item.title}</h4>              
                </div>
          </div>
          {item.relatedQuestions.length ? (
            <div className='accordion-margin mt-2' defaultOpen='0'>
              {item.relatedQuestions.map((r, index) => {
                return (
                    <ListGroup className='list-group-circle mt-1' >
                        <ListGroupItem className='text-body' tag={Link} to={`/knowledgebase/${item.title}/${r.question}`} key={r.id} >
                            {r.question}
                        </ListGroupItem>
                    </ListGroup>                  
                )
              })}
            </div>
          ) : (
            <div className='text-center p-5'>
              <h5 className='p-1'>
                <Icon.Info size='19' className='me-25' /> No Results Found
              </h5>
            </div>
          )}
        </TabPane>
        <Button className='ms-0 mt-2' id="new-btn" color='primary'>
            <ArrowLeft size={14} />
            <span className='align-middle ms-50'>Back to Home</span>
        </Button>
        </CardBody>
        </Card>
      )
    })
  }

  return (
    <div id='faq-tabs'>
      <Row>
        <Col lg='3' md='4' sm='12'>
          <div className='faq-navigation d-flex justify-content-between flex-column mb-2 mb-md-0'>
            <h4 className='mb-2'>Getting Started</h4>
            <Nav tag='ul' className='nav-left' pills vertical>
              {renderTabs()}
            </Nav>
          </div>
        </Col>
        <Col lg='9' md='8' sm='12'>
          <TabContent activeTab={activeTab}>{renderTabContent()}</TabContent>          
        </Col>
      </Row>
    </div>
  )
}

export default KnowledgeBaseCategory

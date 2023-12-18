// ** React Imports
import { Link, useParams , useHistory} from 'react-router-dom'
import { Fragment, useState, useEffect } from 'react'

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

const data = [
  {
    id: '1402',
    category: 'Getting Started',
    iconColor: '#28C76F',
    icon: 'ShoppingCart',
    questions:[
      {
        id: '1',
        question: 'Account'
      },
      {
        id: '2',
        question: 'Authentication'
      },
      {
        id: '3',
        question: 'Billing'
      }
    ]
  },
  {
    iconColor: '#7367F0',
    id: '145',
    category: 'Orders',
    icon: 'Truck',
    questions:[
      {
        id: '1',
        question: 'Returns, Refunds and Replacements'
      },
      {
        id: '2',
        question: 'Processing orders'
      },
      {
        id: '3',
        question: 'Payments'
      }
    ]
  },
  {
    iconColor: '#28C76F',
    id: '397',
    category: 'Tickets',
    icon: 'Clipboard',
    questions:[
      {
        id: '1',
        question: 'Open Tickets'
      },
      {
        id: '2',
        question: 'Hold Tickets'
      },
      {
        id: '3',
        question: 'Closed Ticket'
      },
      {
        id: '4',
        question: 'Pending Ticket'
      }
    ]
  },
  {
    id: '545',
    iconColor: '#FF9F43',
    category: 'Safety and security',
    icon: 'Sliders',
    questions:[
      {
        id: '1',
        question: 'Security and hacked accounts'
      },
      {
        id: '2',
        question: 'Privacy'
      },
      {
        id: '3',
        question: 'Spam and fake accounts'
      }
    ]
  },
  {
    id: '363',
    iconColor: '#EA5455',
    category: 'Rules and Policies',
    icon: 'Users',
    questions:[
      {
        id: '1',
        question: 'General'
      },
      {
        id: '2',
        question: 'Intellectual property'
      },
      {
        id: '3',
        question: 'Guidelines for law enforcement'
      }
    ]
  },
  {
    id: '102',
    iconColor: '#4CA1D9',
    category: 'Connections',
    icon: 'Mail',
    questions:[
      {
        id: '1',
        question: 'Jobs',
        
      },
      {
        id: '2',
        question: 'Conversations'
      },
      {
        id: '3',
        question: 'People'
      }
    ]
  }
]

const KnowledgeBase = () => {
 // ** States [data, setData] = useState(null),
 
 const
  [filteredData, setFilteredData] = useState([]),
  [searchTerm, setSearchTerm] = useState('')

 
// useEffect(() => {
//  axios.get('/faq/data/category').then(res => res.data)
// }, [])

const  params  = useParams()
console.log("params",params)

const Content = ({item} ) => {
  const history = useHistory()
 const IconTag = Icon[item.icon]
 return (
   <Col className='kb-search-content' md='4' sm='6'>
     <Card>
       <CardBody>
        <Link to={`/knowledgebase/${item.category}`}>
         <h5 className='kb-title text-center'>
           <IconTag
             size={30}
             className={classnames('me-50', {
               [item.iconColor]: item.iconColor
             })}
           />
           <span>
             {item.category} {`(${item.questions.length})`}
           </span>
         </h5>
         </Link>
         <ListGroup className='list-group-circle mt-2'>
           {item.questions.map(listItem => (
             <ListGroupItem
               tag={Link}
               to={`/knowledgebase/${item.category}`}
               className='text-body'
               key={listItem.id}
             >
               {listItem.question}
             </ListGroupItem>
           ))}
         </ListGroup>
       </CardBody>
       
     </Card>
   </Col>
 )
}

const renderContent = () => {
 const dataToMap = searchTerm.length ? filteredData : data

 return dataToMap.map(item => <Content key={item.id} item={item} />)
}

const handleFilter = e => {
 const value = e.target.value,
   knowledgeBaseSearchQueryLower = e.target.value.toLowerCase()

 setSearchTerm(e.target.value)

 let arr = []

 if (value.length) {
   arr = data.filter(item => {
     return (
       item.category.toLowerCase().includes(knowledgeBaseSearchQueryLower) ||
       item.questions.filter(queObj => queObj.question.toLowerCase().includes(knowledgeBaseSearchQueryLower)).length
     )
   })
 }

 setFilteredData([...arr])
}

  return (
    <Fragment>
      <KnowledgeBaseHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div id='knowledge-base-content'>
          <Row className='kb-search-content-info match-height'>{renderContent()}</Row>
      </div>
      
    </Fragment>
  )
}

export default KnowledgeBase

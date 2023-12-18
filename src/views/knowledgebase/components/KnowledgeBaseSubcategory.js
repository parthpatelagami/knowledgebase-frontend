// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Components
import axios from 'axios'
import { Info, Smartphone, ArrowLeft, Link } from 'react-feather'
import { useParams } from 'react-router-dom' 
// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Reactstrap Imports
import { Row, Col, Card, CardBody, CardTitle, ListGroup, ListGroupItem, Button } from 'reactstrap'

const data = [
    {    
    id:'1',        
    title: 'Why Was My Developer Application Rejected?',
    lastUpdated: '10 Dec 2018',
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
    ],
    // ! Here we have used require for image source but in API it shall be URL of live image, this is just for demo purpose
    content: `<p>It has been said that astronomy is a humbling and character-building experience. There is perhaps no better demonstration of the folly of human conceits than this distant image of our tiny world. To me, it underscores our responsibility to deal more kindly with one another, and to preserve and cherish the pale blue dot, the only home we’ve ever known. The Earth is a very small stage in a vast cosmic arena. Think of the rivers of blood spilled by all those generals and emperors so that, in glory and triumph, they could become the momentary masters of a fraction of a dot. Think of the endless cruelties visited by the inhabitants of one corner of this pixel on the scarcely distinguishable inhabitants of some other corner, how frequent their misunderstandings, how eager they are to kill one another, how fervent their hatreds.</p><img class="img-fluid w-100 my-1 rounded" src="" /><h5 class='my-1'>Houston</h5><p>that may have seemed like a very long final phase. The auto targeting was taking us right into a … crater, with a large number of big boulders and rocks … and it required …flying manually over the rock field to find a reasonably good area.</p><ul class="list-group list-group-circle ms-2 mt-2"><li class="list-group-item"><a class="text-body" href="/" rel="noopener noreferrer" >I am a stranger. I come in peace. Take me to your leader and there will be a massive reward for you in eternity.</a></li><li class="list-group-item"><a class="text-body" href="/" rel="noopener noreferrer" >It’s just mind-blowingly awesome. I apologize, and I wish I was more articulate, but it’s hard to be articulate when your mind’s blown—but in a very good way.</a></li><li class="list-group-item"><a class="text-body" href="/" rel="noopener noreferrer" >A good rule for rocket experimenters to follow is this</a></li></ul>`
    }
    
]

const KnowledgeBaseSubCategory = () => {
  // ** State
//   const [data, setData] = useState(null)

//   useEffect(() => {
//     axios.get('/faq/data/question').then(res => setData(res.data))
//   }, [])
    const params = useParams()
  const renderRelatedQuestions = (data) => {    
   
    return data.map(res => 
        <ListGroupItem className='text-body' tag='a' href='/' key={res.id} onClick={e => e.preventDefault()} >
        {res.question}
      </ListGroupItem>
        
    )
  }

    const renderContent = () => {
        const dataToMap = data
        return dataToMap.map(item => <Content key={item.id} item={item} />)
    }

  const Content =({item})=>{
    return(<>
        <Row>
        <Col lg='3' md={{ size: 5, order: 1 }} sm={{ size: 12 }} xs={{ order: 2 }}>
          <Card>
            <CardBody>
              <h6 className='kb-title'>
                <Info size={20} className='me-50' />
                <span>Related Questions</span>
              </h6>
              <ListGroup className='list-group-circle mt-1'>{renderRelatedQuestions(item.relatedQuestions)}</ListGroup>
            </CardBody>
          </Card>
        </Col>
        <Col lg='9' md={{ size: 7, order: 2 }} sm={{ size: 12 }} xs={{ order: 1 }}>
          <Card>
            <CardBody>
              <CardTitle className='mb-1'>
                <Smartphone className='font-medium-5  me-25' /> <span>{item.title}</span>
              </CardTitle>
              <p className='mb-2'>Last updated on {item.lastUpdated}</p>
              <div
                dangerouslySetInnerHTML={{
                  __html: item.content
                }}
              ></div>
              
                <Button className='ms-0' id="new-btn" color='primary'>
                    <ArrowLeft size={14} />
                    <span className='align-middle ms-50'>Back to Category</span>
                </Button>
            
            </CardBody>
          </Card>
        </Col>
        
      </Row>
       
   </>
    )
  }

  return (
    <Fragment>
      {data !== null ? (
        <div id='knowledge-base-question'>
           {renderContent()}     
        </div>
      ) : null}
    </Fragment>
  )
}

export default KnowledgeBaseSubCategory

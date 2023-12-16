// ** React Imports
import { Fragment } from 'react'
import { Editor } from 'react-draft-wysiwyg'


// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

// ** Demo Components
import ExtensionsHeader from '@components/extensions-header'

// ** Styles
import '@styles/react/libs/editor/editor.scss'

const EditorUncontrolled = () => {
  return (
    <Fragment>
        <Editor />
    </Fragment>
  )
}

export default EditorUncontrolled

// ** Core Layout Import
// !Do not remove the Layout import
import Layout from '@layouts/VerticalLayout'

// ** Menu Items Array
import navigation from '@src/navigation/vertical'

const VerticalLayout = props => {
  return (
    <Layout menuData={navigation} {...props}>
      {props.children}
    </Layout>
  )
}

export default VerticalLayout
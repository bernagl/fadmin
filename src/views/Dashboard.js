import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCollection } from '../actions/firebase'
import { Datatable, Header, Sidebar } from '../components'
import { Layout } from 'antd'
const { Content, Footer } = Layout

class Dashboard extends Component {
  async componentDidMount() {
    const documents = await getCollection('negocio')
    console.log(documents)
  }

  render() {
    console.log(this.props)
    return (
      <Layout>
        <Sidebar />
        <Layout>
          <Header>
            <h1>Hola</h1>
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div className="container">
              <Datatable />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

const mapDispatchToProps = ({ auth }) => ({ auth })

export default connect(mapDispatchToProps)(Dashboard)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCollection, getModels } from '../actions/firebase'
import { Datatable, Header, Sidebar } from '../components'
import { Application } from '../routes'
import { Layout } from 'antd'
const { Content, Footer } = Layout

class Dashboard extends Component {
  async componentDidMount() {
    // const documents = await getCollection('negocio')
    const models = await this.props.getModels()
    console.log(models)
  }

  render() {
    console.log(this.props)
    return (
      <Layout>
        {this.props.model.data && <Sidebar models={this.props.model.data} />}
        <Layout>
          <Header>
            <h1>Hola</h1>
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div className="container">
              {/* <Datatable /> */}
              <Application />
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

const mapDispatchToProps = ({ auth, model }) => ({ auth, model })

export default connect(mapDispatchToProps, { getModels })(Dashboard)

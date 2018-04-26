import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getModels } from '../actions/firebase'
import { Datatable, Header, Sidebar } from '../components'
import { Application } from '../routes'
import { Layout } from 'antd'
const { Content, Footer } = Layout

class Dashboard extends Component {
  state = { collapse: false }
  async componentDidMount() {
    const models = await this.props.getModels()
  }
  collapseSidebar = () => {
    const { collapse } = this.state
    this.setState({ collapse: !collapse })
  }

  render() {
    const { model } = this.props
    return (
      <Layout>
        {model.data && (
          <Sidebar
            models={model.data}
            collapse={this.state.collapse}
            collapseSidebar={this.collapseSidebar}
          />
        )}
        <Layout>
          <Header>
            <h1 className="capitalize">{model.selectedTitle}</h1>
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div className="container">
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

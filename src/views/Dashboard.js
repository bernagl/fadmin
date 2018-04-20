import React, { Component } from 'react'
import { Datatable, Header, Sidebar } from '../components'
import { Layout } from 'antd'
const { Content, Footer, Sider } = Layout

class Dashboard extends Component {
  render() {
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

export default Dashboard

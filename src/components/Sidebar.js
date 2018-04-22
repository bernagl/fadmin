import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Layout, Menu } from 'antd'
const { Sider } = Layout
const SubMenu = Menu.SubMenu

export default ({ models }) => {
  // cosntrenderItems = () => {

  let collapsed = false
  console.log(models)
  return (
    <Sider
      breakpoint="lg"
      collapsible
      collapsed={collapsed}
      onCollapse={() => (collapsed = !collapsed)}
    >
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        style={styles.container}
      >
        {models.map((item, key) => {
          return (
            <Menu.Item key={item.key}>
              <Link to={`model/${item.key}`}>
                <Icon type="user" />
                <span>{item.key}</span>
              </Link>
            </Menu.Item>
          )
        })}
        <Menu.Item key="3113">
          <Link to="/model">
            <Button type="dashed">Add model</Button>
          </Link>
        </Menu.Item>
        <Menu.Item key="31w13">
          <Link to="/create-model">
            <Button type="dashed">View model</Button>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

const styles = {
  container: {
    height: '100vh'
    // position: 'fiz',
    // width: 256
  },
  collapseBtn: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 2
  }
}

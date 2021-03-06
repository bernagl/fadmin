import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Layout, Menu } from 'antd'
const { Sider } = Layout
const SubMenu = Menu.SubMenu

export default ({ collapse, collapseSidebar, models }) => {
  return (
    <Sider
      breakpoint="lg"
      collapsible
      collapsed={collapse}
      onCollapse={collapseSidebar}
    >
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapse}
        style={styles.container}
      >
        {models.map((item, key) => {
          return (
            <Menu.Item key={item.key}>
              <Link to={`/model/${item.key}`}>
                <Icon type="user" />
                <span>{item.name}</span>
              </Link>
            </Menu.Item>
          )
        })}
        <Menu.Item key="31w13">
          <Link to="/create-model">
            {collapse ? (
              <Icon type="plus-circle-o" />
            ) : (
              <Button type="dashed">Create model</Button>
            )}
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

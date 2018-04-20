import React from 'react'
import { Layout } from 'antd'
const { Header } = Layout

export default props => {
  return <Header style={styles.container}>{props.children}</Header>
}

const styles = {
  container: {
    background: '#fff'
  }
}

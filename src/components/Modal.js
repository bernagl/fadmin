import React, { Component } from 'react'
import { Modal as M, Button } from 'antd'

export default class Modal extends Component {
  render() {
    const { children, doc, handleCancel, handleOk, visible } = this.props
    return (
      <div>
        {/* <Button type="primary" onClick={this.showModal}>
          Open
        </Button> */}
        <M
          title={doc && doc.name}
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {children}
        </M>
      </div>
    )
  }
}

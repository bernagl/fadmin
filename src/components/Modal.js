import React, { Component } from 'react'
import { Modal as M, Button } from 'antd'

export default class Modal extends Component {
  render() {
    const {
      children,
      doc,
      handleCancel,
      handleOk,
      loading,
      visible
    } = this.props
    return (
      <M
        title={doc && doc.name}
        visible={visible}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading && loading}
            onClick={handleOk}
          >
            {!loading ? 'Save' : 'Saving'}
          </Button>
        ]}
      >
        {children}
      </M>
    )
  }
}

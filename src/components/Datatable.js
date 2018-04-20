import React, { Component } from 'react'
import Modal from './Modal'
import { Divider, Icon, Table, Popconfirm } from 'antd'

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street'
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street'
  }
]

export default class Datatable extends Component {
  state = { visible: false }
  setActions = () => {
    return {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, doc) => {
        return (
          <div>
            {/* <Modal /> */}
            <Divider type="vertical" />
            {/* <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.deleteDocument(doc.id)}
            > */}
            <Icon type="delete" onClick={() => this.showModal(doc)} />
            {/* </Popconfirm> */}
          </div>
        )
      }
    }
  }

  setColumns = () => {
    return [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age'
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address'
      },
      this.setActions()
    ]
  }

  handleOk = e => {
    this.setState({
      visible: false
    })
  }

  handleCancel = e => {
    this.setState({
      visible: false
    })
  }

  showModal = doc => {
    this.setState({
      visible: true,
      doc
    })
  }
  render() {
    return (
      <React.Fragment>
        <Modal
          {...this.state}
          visible={this.state.visible}
          handleCancel={this.handleCancel}
          handleOk={this.handleOk}
        >
          <div className="row">
            <div className="col-12">
              <h1>Holaaa</h1>
            </div>
          </div>
        </Modal>
        <Table dataSource={dataSource} columns={this.setColumns()} />
      </React.Fragment>
    )
  }
}

import React, { Component } from 'react'
import Modal from './Modal'
import Form from './Form'
import { Divider, Icon, Table, Modal as M, Popconfirm } from 'antd'
const { confirm } = M

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
  constructor(props) {
    super(props)
    this.state = { visible: false }
    this.formRef = React.createRef()
  }
  setActions = () => {
    return {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, doc) => {
        return (
          <div>
            <Icon type="delete" onClick={() => this.showConfirm()} />
            <Divider type="vertical" />
            <Icon type="eye-o" onClick={() => this.showModal(doc)} />
            {/* <Form /> */}
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

  showConfirm = () => {
    confirm({
      title: 'Do you Want to delete the selected item?',
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK')
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }

  handleOk = async e => {
    this.setState({ loading: true })
    const response = await this.formRef.current.submit()
    this.setState({ visible: false, loading: false })
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
          <div className="row px-2">
            <Form
              doc={this.state.doc}
              model={this.setColumns()}
              ref={this.formRef}
            />
          </div>
        </Modal>
        <Table dataSource={dataSource} columns={this.setColumns()} />
      </React.Fragment>
    )
  }
}

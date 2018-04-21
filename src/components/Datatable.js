import React, { Component } from 'react'
import Modal from './Modal'
import Form from './Form'
import { getCollection, getModel } from '../actions/firebase'
import { Divider, Icon, Table, Modal as M, Popconfirm } from 'antd'
const { confirm } = M

// const dataSource = [
//   {
//     key: '1',
//     name: 'Mike',
//     age: 32,
//     address: '10 Downing Street'
//   },
//   {
//     key: '2',
//     name: 'John',
//     age: 42,
//     address: '10 Downing Street'
//   }
// ]

export default class Datatable extends Component {
  constructor(props) {
    super(props)
    this.state = { visible: false, collection: [], model: [] }
    this.formRef = React.createRef()
  }

  componentWillReceiveProps(newProps) {
    this.getData()
  }

  componentDidMount() {
    this.getData()
  }

  getData = async (c, m) => {
    const model = await getModel('user')
    const collection = await getCollection('user')
    this.setState({ collection, model })
  }

  setActions = () => {
    const model = this.state.model
    // model.push({
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
    // })
    // console.log(model)
    // return model
  }

  // setColumns = () => {
  //   return [
  //     {
  //       title: 'Name',
  //       dataIndex: 'name',
  //       key: 'name'
  //     },
  //     {
  //       title: 'Age',
  //       dataIndex: 'age',
  //       key: 'age'
  //     },
  //     {
  //       title: 'Address',
  //       dataIndex: 'address',
  //       key: 'address'
  //     },
  //     this.setActions()
  //   ]
  // }

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
    console.log('...')
    const response = await this.formRef.current.submit()
    console.log(response)
    response && this.setState({ visible: false, loading: false })
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
              model={this.state.model}
              ref={this.formRef}
              name={'user'}
            />
          </div>
        </Modal>
        {this.state.collection.length > 0 && (
          <Table
            dataSource={this.state.collection}
            columns={[...this.state.model, this.setActions()]}
          />
        )}
      </React.Fragment>
    )
  }
}

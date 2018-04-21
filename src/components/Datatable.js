import React, { Component } from 'react'
import Modal from './Modal'
import Form from './Form'
import { connect } from 'react-redux'
import { getCollection, getModel, updateDocument } from '../actions/firebase'
import { Divider, Icon, Table, Modal as M, Popconfirm } from 'antd'
const { confirm } = M

class Datatable extends Component {
  constructor(props) {
    super(props)
    this.state = { visible: false, collection: [], model: [] }
    this.formRef = React.createRef()
  }

  // componentWillReceiveProps(newProps) {
  //   this.getData()
  // }

  componentDidMount() {
    this.getData()
  }

  getData = (c, m) => {
    this.props.getModel('user')
    this.props.getCollection('user')
  }

  setActions = () => {
    const model = this.props.model
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
          </div>
        )
      }
    }
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
              model={this.props.model}
              ref={this.formRef}
              name={'user'}
              updateDocument={this.props.updateDocument}
            />
          </div>
        </Modal>
        {this.props.documents.length > 0 && (
          <Table
            dataSource={this.props.documents}
            columns={[...this.props.model, this.setActions()]}
          />
        )}
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = ({ documents, model }) => ({ documents, model })

export default connect(mapDispatchToProps, {
  getCollection,
  getModel,
  updateDocument
})(Datatable)

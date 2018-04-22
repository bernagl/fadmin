import React, { Component } from 'react'
import Modal from './Modal'
import Form from './Form'
import { connect } from 'react-redux'
import {
  createDocument,
  deleteDocument,
  getCollection,
  getModel,
  updateDocument
} from '../actions/firebase'
import {
  Button,
  Divider,
  Icon,
  Table,
  message,
  Modal as M,
  Popconfirm
} from 'antd'
const { confirm } = M

class Datatable extends Component {
  constructor(props) {
    super(props)
    this.state = { doc: null, visible: false, collection: [], model: [] }
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
            <Icon type="delete" onClick={() => this.showConfirm(doc.key)} />
            <Divider type="vertical" />
            <Icon type="eye-o" onClick={() => this.showModal(doc)} />
          </div>
        )
      }
    }
  }

  showConfirm = key => {
    const deleteDocument = this.props.deleteDocument
    confirm({
      title: 'Do you want to delete the selected item?',
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      async onOk() {
        const response = await deleteDocument('user', key)
        response && message.success('Record deleted')
      },
      onCancel() {}
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
              collection={'user'}
              createDocument={this.props.createDocument}
              updateDocument={this.props.updateDocument}
            />
          </div>
        </Modal>
        <div className="row">
          <div className="col-12">
            <Button
              type="primary"
              onClick={() => this.showModal('')}
              style={{ float: 'right' }}
              className="my-2"
            >
              Add
            </Button>
          </div>
        </div>
        {this.props.documents.length > 0 ? (
          <Table
            dataSource={this.props.documents}
            columns={[...this.props.model, this.setActions()]}
          />
        ) : (
          <div
            style={{
              height: 500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <h5>This model doesnt has any register :(</h5>
          </div>
        )}
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = ({ documents, model }) => ({ documents, model })

export default connect(mapDispatchToProps, {
  createDocument,
  deleteDocument,
  getCollection,
  getModel,
  updateDocument
})(Datatable)

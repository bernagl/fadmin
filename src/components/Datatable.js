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
import { Button, Divider, Icon, Table, message, Modal as M } from 'antd'
const { confirm } = M

class Datatable extends Component {
  constructor(props) {
    super(props)
    this.state = { doc: null, visible: false, collection: [], model: [] }
    this.formRef = React.createRef()
  }

  componentWillReceiveProps(newProps) {
    this.props.match.params.name !== newProps.match.params.name &&
      this.getData(newProps.match.params.name)
  }

  componentDidMount() {
    this.getData(this.props.match.params.name)
  }

  getData = (c, m) => {
    this.props.getModel(c)
    this.props.getCollection(c)
  }

  setActions = () => {
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
    const model = this.props.model.formatedTitle
    confirm({
      title: 'Do you want to delete the selected item?',
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      async onOk() {
        const response = await deleteDocument(model, key)
        response && message.success('Record deleted')
      },
      onCancel() {}
    })
  }

  handleOk = async e => {
    const form = this.formRef.current
    if (form.state.canSubmit) {
      this.setState({ loading: true })
      const response = await form.submit()
      response &&
        (this.setState({ visible: false, loading: false }),
        message.success('Data saved'))
    } else message.error('Please validate your information')
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
    const { documents, createDocument, model, updateDocument } = this.props
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
              model={model.selected}
              ref={this.formRef}
              collection={model.formatedTitle}
              createDocument={createDocument}
              updateDocument={updateDocument}
            />
          </div>
        </Modal>
        {documents.length > 0 && (
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
        )}
        {documents.length > 0 ? (
          <Table
            dataSource={documents}
            columns={[...model.selected, this.setActions()]}
          />
        ) : (
          <div
            style={{
              height: 500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column'
            }}
          >
            <p>
              This model doesnt has any register, add some data here{' '}
              <Icon type="arrow-down" />
            </p>
            <Button type="primary" onClick={() => this.showModal('')}>
              Add
            </Button>
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

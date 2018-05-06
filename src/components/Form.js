import React, { Component } from 'react'
import Formsy from 'formsy-react'
import Input from './InputForm'
import { Form as F, message } from 'antd'
import Uploader from './Uploader'

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      canSubmit: false,
      loading: false,
      button: true,
      model: {}
    }
    this.submit = this.submit.bind(this)
    this.disableButton = this.disableButton.bind(this)
    this.enableButton = this.enableButton.bind(this)
    this.renderFields = this.renderFields.bind(this)
    // this.handleImage = this.handleImage.bind(this)
    this.formRef = React.createRef()
  }

  async submit() {
    const model = this.formRef.current.getModel()
    const { doc, collection } = this.props
    this.setState({
      loading: true,
      canSubmit: false
    })
    const response = (await doc)
      ? this.props.updateDocument(doc.key, model, collection)
      : this.props.createDocument(collection, model)
    return response
  }

  disableButton() {
    this.setState({
      canSubmit: false
    })
  }

  enableButton() {
    this.setState({
      canSubmit: true
    })
  }

  handleImage = (name, value) => {
    console.log(name)
    const { model } = this.state
    this.setState({ model: { ...model, [name]: value } })
  }

  renderFields() {
    const { doc, model } = this.props
    console.log(model)
    return model.map((field, key) => {
      return field.key !== 'actions' && !field.isImage ? (
        <div className="col-12" key={key}>
          <Input
            placeholder={field.title}
            value={doc[field.key]}
            // type={field.type}
            name={field.key}
            validations={field.validations && field.validations}
            validationError="Please enter a valid value"
            required={field.required}
          />
        </div>
      ) : (
        <Uploader
          handleImage={this.handleImage}
          model={model.name}
          name={field.key}
          key={key}
        />
      )
    })
  }

  render() {
    console.log(this.state)
    return (
      <React.Fragment>
        <Formsy
          onSubmit={this.submit}
          onValidSubmit={this.submit}
          onValid={() =>
            this.setState({
              canSubmit: true
            })
          }
          onInvalid={() =>
            this.setState({
              canSubmit: false
            })
          }
          ref={this.formRef}
        >
          <div className="row"> {this.renderFields()} </div>
        </Formsy>
      </React.Fragment>
    )
  }
}

export default Form

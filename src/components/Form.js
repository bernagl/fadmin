import React, { Component } from 'react'
import Formsy from 'formsy-react'
import Input from './InputForm'
import { Button, Form as F, Icon, message } from 'antd'
const { Item } = F

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: false, button: true }
    this.submit = this.submit.bind(this)
    this.disableButton = this.disableButton.bind(this)
    this.enableButton = this.enableButton.bind(this)
    this.renderFields = this.renderFields.bind(this)
    this.formRef = React.createRef()
  }

  async submit() {
    const model = this.formRef.current.getModel()
    const { doc, collection } = this.props
    this.setState({ loading: true })
    const response = (await doc)
      ? this.props.updateDocument(doc.key, model, collection)
      : this.props.createDocument(collection, model)
    return response
  }

  disableButton() {
    this.setState({ canSubmit: false })
  }

  enableButton() {
    this.setState({ canSubmit: true })
  }

  renderFields() {
    const { doc, model } = this.props
    return model.map((field, key) => {
      return (
        field.key !== 'actions' && (
          <div className="col-12" key={key}>
            <Input
              placeholder={field.title}
              value={doc[field.key]}
              type={field.type}
              name={field.key}
              //   validations={field.validations}
              //   validationError={field.error}
              //   required={field.required}
            />
          </div>
        )
      )
    })
  }

  render() {
    console.log(this.props)
    return (
      <Formsy
        onSubmit={this.submit}
        onValidSubmit={this.submit}
        onValid={this.enableButton}
        onInvalid={this.disableButton}
        ref={this.formRef}
      >
        <div className="row">{this.renderFields()}</div>
      </Formsy>
    )
  }
}

export default Form

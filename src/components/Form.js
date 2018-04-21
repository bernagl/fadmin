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
    // const { schema, id } = this.props.match.params
    // let model
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     const model = this.formRef.current.getModel()
    //     console.log('...')
    //     this.setState({ loading: true })
    //     resolve()
    //     return model
    //   }, 1000)
    // })
    // const response = (await id)
    //   ? this.props.updateDocument(id, model, schema)
    //   : this.props.createDocument(model, schema)

    // response
    //   ? (message.success('Datos guardados correctamente'),
    //     this.setState({ loading: false }))
    //   : message.error('Ocurrió un error, por favor vuelve a intentarlo')
    const model = this.formRef.current.getModel()
    const { doc, name } = this.props
    this.setState({ loading: true })
    const response = await this.props.updateDocument(doc.key, model, name)
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
    return (
      <Formsy
        onSubmit={this.submit}
        onValidSubmit={this.submit}
        onValid={this.enableButton}
        onInvalid={this.disableButton}
        ref={this.formRef}
      >
        <div className="row">
          {this.props.doc && this.renderFields()}
          {/* <div className="col-12 mt-2">
            <Button
              type="primary"
              htmlType="submit"
              loading={this.state.loading}
              disabled={!this.state.canSubmit}
              className="fw"
            >
              Guardar
            </Button>
          </div> */}
        </div>
      </Formsy>
    )
  }
}

// export default connect(null, { updateDocument })(Form)
export default Form

// const mapDispatchToProps = ({ data: { document }, schema }) => ({
//   document,
//   schema
// })

// export default connect(mapDispatchToProps, {
//   createDocument,
//   getDocument,
//   getSchema,
//   updateDocument
// })(FormData)

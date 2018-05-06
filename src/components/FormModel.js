import React, { Component } from 'react'
import Formsy from 'formsy-react'
// import Input from './InputForm'
import { createModel } from '../actions/firebase'
import { connect } from 'react-redux'
import Form from './Form'
import {
  Button,
  Checkbox,
  Divider,
  Form as F,
  Icon,
  message,
  Input,
  Select,
  Radio,
  Tag
} from 'antd'
const { FormItem } = F
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

const objField = {
  key: '',
  title: '',
  required: false,
  type: 'text',
  validations: '',
  error: false
}

class FormModel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      canSubmit: false,
      fields: [],
      isValid: true,
      name: { value: '', error: false, formated: '' }
      // nameFormated: ''
    }
    this.submit = this.submit.bind(this)
    this.renderFields = this.renderFields.bind(this)
    this.formRef = React.createRef()
  }
  addField = () => {
    const { fields } = this.state
    fields.push(objField)
    this.setState({ fields })
    this.formRef = React.createRef()
  }
  async submit() {
    const { fields, name } = this.state
    let isValid = true
    fields.map(field => field.error || (!field.title && (isValid = false)))
    name.error || (!name.value && (isValid = false))

    const response = isValid
      ? await this.props.createModel(fields, name)
      : message.error('Invalid form')
    response && isValid && message.success('Model added')
  }

  handleField = (e, i, option) => {
    const { fields } = this.state
    let field = fields[i]
    const value = option === 'title' ? this.validate(e) : e
    const key = option === 'title' ? value : field.key
    field = {
      ...field,
      [option]: value,
      key: key.toLowerCase(),
      error: value ? false : true,
      isImage: e === 'image' ? true : false
    }
    fields[i] = field
    this.setState({ fields })
  }

  handleTitle = e => {
    let formated = this.validate(e)
      .replace(/ /g, '_')
      .toLowerCase()
    const error = this.emptyValidate(e.target.value)
    this.setState({ name: { value: e.target.value, error, formated } })
  }

  validate(e) {
    return e.target.value.replace(/[^a-zA-Z0-9@ ]+/, '').trim()
  }

  emptyValidate(title) {
    return !title || title.trim() === '' ? true : false
  }

  removeField = key => {
    const { fields } = this.state
    delete fields[key]
    this.setState({ fields })
    message.success('Field removed')
  }

  renderFields = () => {
    const { fields, isValid } = this.state
    return (
      fields.length > 0 &&
      fields.map((field, key) => {
        return (
          <div className="row align-items-center field-container" key={key}>
            <Icon
              type="close-circle"
              className="icon-remove-field"
              onClick={() => this.removeField(key)}
            />
            <div
              className={`col-12 col-md-3 form-item ${field.error &&
                'invalid'}`}
            >
              <span>Name</span>
              <Input
                placeholder="Enter the name of the field"
                onChange={e => this.handleField(e, key, 'title')}
                onBlur={e => this.handleField(e, key, 'title')}
                type="text"
              />
            </div>
            <div className="col-6 col-md-2">
              <span>Type</span>
              <Select
                placeholder="Type"
                onChange={e => this.handleField(e, key, 'type')}
                defaultValue="text"
              >
                <Select.Option value="text">Text</Select.Option>
                <Select.Option value="isNumeric">Numeric</Select.Option>
                <Select.Option value="image">Image</Select.Option>
              </Select>
            </div>
            <div className="col-6 col-md-2">
              <Checkbox
                onChange={e =>
                  this.handleField(e.target.checked, key, 'required')
                }
              >
                Required
              </Checkbox>
            </div>
            <div className="col-6 col-md-4">
              <span>Validation</span>
              <Select
                mode="tags"
                // tokenSeparators={{','}}
                placeholder="Select a validation"
                onChange={e => this.handleField(e, key, 'validations')}
              >
                <Select.Option value="isEmail">Is email</Select.Option>
                <Select.Option value="isNumeric">Is numeric</Select.Option>
              </Select>
            </div>
            <Divider />
          </div>
        )
      })
    )
  }

  render() {
    const { name } = this.state
    return (
      <React.Fragment>
        <Formsy>
          <div className="row">
            <div
              className={`col-12 col-md-6 form-item ${name.error && 'invalid'}`}
            >
              <span>Name</span>
              <input
                name="name"
                placeholder="Name"
                type="text"
                pattern="[a-zA-Z]"
                className="ant-input"
                onChange={e => this.handleTitle(e)}
              />
              <Divider />
            </div>
            <div className="col-12">{this.renderFields()}</div>
            <div className="col-12">
              <div className="row">
                <div className="col-6 col-md-3 mt-3">
                  <Button type="dashed" onClick={this.addField} className="fw">
                    Add field
                  </Button>
                </div>
                <div className="col-3 col-md-4 mt-3">
                  <Button onClick={this.submit} type="primary" className="fw">
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Formsy>
      </React.Fragment>
    )
  }
}

const styles = {
  invalid: {
    borderColor: 'red'
  }
}

export default connect(null, { createModel })(FormModel)

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
  validations: ''
}

class FormModel extends Component {
  constructor(props) {
    super(props)
    this.state = { canSubmit: false, fields: [], name: '' }
    this.submit = this.submit.bind(this)
    this.disableButton = this.disableButton.bind(this)
    this.enableButton = this.enableButton.bind(this)
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
    const { name, fields } = this.state
    const response = await this.props.createModel(fields, name)
    response && message.success('Model added')
  }

  disableButton() {
    this.setState({ canSubmit: false })
  }

  enableButton() {
    this.setState({ canSubmit: true })
  }

  handleField = (e, i, option) => {
    const { fields } = this.state
    let field = fields[i]
    const value = option === 'title' ? this.validate(e) : e
    field = { ...field, [option]: value }
    fields[i] = field
    this.setState({ fields })
  }

  handleTitle = e => {
    let name = this.validate(e).replace(/ /g, '_')
    this.setState({ name })
  }

  validate(e) {
    return (e.target.value = e.target.value.replace(/[^a-zA-Z0-9@ ]+/, ''))
  }

  renderFields = () => {
    const { fields } = this.state
    return (
      fields.length > 0 &&
      fields.map((field, key) => {
        return (
          <div className="row align-items-center" key={key}>
            <div className="col-12 col-md-3">
              <span>Name</span>
              <Input
                placeholder="Enter the name of the field"
                onChange={e => this.handleField(e, key, 'title')}
                type={field.type}
              />
            </div>
            <div className="col-6 col-md-2">
              <span>Type</span>
              <Select
                placeholder="Type"
                onChange={e => this.handleField(e, key, 'type')}
              >
                <Select.Option value="text">Text</Select.Option>
                <Select.Option value="numeric">Numeric</Select.Option>
              </Select>
            </div>
            <div className="col-6 col-md-2">
              {/* <div className="row align-items-center h100"> */}
              {/* <span>Required</span> */}
              {/* <div className="col-12"> */}
              {/* <Radio.Group>
                    <Radio value="true">Yes</Radio>
                    <Radio value="false">No</Radio>
                  </Radio.Group> */}
              <Checkbox
                // value={this.state.checkNick}
                onChange={e =>
                  this.handleField(e.target.checked, key, 'required')
                }
                // onChange={this.handleChange}
              >
                Required?
              </Checkbox>
              {/* </div> */}
              {/* </div> */}
            </div>
            <div className="col-6 col-md-4">
              <span>Validation</span>
              <Select
                placeholder="Select a validation"
                onChange={e => this.handleField(e, key, 'validations')}
              >
                <Select.Option value="email">Is email</Select.Option>
                <Select.Option value="numeric">Is numeric</Select.Option>
              </Select>
              {/* <div className="tags-container">
                <Tag>Tag 1</Tag>
                <Tag>
                  <a href="https://github.com/ant-design/ant-design/issues/1862">
                    Link
                  </a>
                </Tag>
                <Tag closable>Tag 2</Tag>
                <Tag closable>Prevent Default</Tag>
              </div> */}
            </div>
            <Divider />
          </div>
        )
      })
    )
  }

  render() {
    console.log(this.state)
    return (
      <Formsy
      // onSubmit={this.submit}
      // onValidSubmit={this.submit}
      // onValid={this.enableButton}
      // onInvalid={this.disableButton}
      // ref={this.formRef}
      >
        <div className="row">
          <div className="col-12 col-md-6">
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
                <Button type="default" onClick={this.addField} className="fw">
                  Add field
                </Button>
              </div>
              <div className="col-12 mt-2">
                <Button onClick={this.submit} type="primary">
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="row">{this.renderFields()}</div> */}
      </Formsy>
    )
  }
}

export default connect(null, { createModel })(FormModel)

import React, { Component } from 'react'
import { withFormsy } from 'formsy-react'
import { Form, Icon, Input as Field } from 'antd'
const { Item } = Form

class Input extends Component {
  constructor(props) {
    super(props)
    this.handleInput = this.handleInput.bind(this)
  }

  handleInput(event) {
    this.props.setValue(event.currentTarget.value)
  }

  render() {
    const isValid = this.props.getErrorMessage()
    const { icon, name, placeholder, type, value } = this.props
    // console.log('props', this.props)
    return (
      <Item
        // label={placeholder}
        validateStatus={isValid ? 'error' : ''}
        help={isValid ? isValid : ''}
        style={type === 'hidden' ? { display: 'none' } : null}
      >
        <span>{placeholder}</span>
        <Field
          placeholder={placeholder}
          type={type || 'text'}
          name={name}
          value={value ? value : this.props.getValue()}
          onChange={this.handleInput}
          prefix={
            icon && <Icon type={icon} style={{ color: 'rgba(0,0,0,.25)' }} />
          }
          style={styles.input}
        />
      </Item>
    )
  }
}

const styles = { input: { width: '100%' } }

export default withFormsy(Input)

import React from 'react'
import { Upload, message, Button, Icon } from 'antd'
import Input from './InputForm'
import { uploadImage } from '../actions/firebase'

// export default ({ handleImage, i }) => {
export default class Uploader extends React.Component {
  //   const props = {
  //     name: 'file',
  //     action: '',
  //     headers: {
  //       // authorization: 'authorization-text'
  //     },
  //     beforeUpoload: file => false,
  //     onChange(info) {
  //         handleImage(i, info.)
  //     }
  //   }
  //   console.log(i)
  state = { image: '', url: '' }

  handleImage = async e => {
    // this.setState({ image: e.target.files[0].name })
    const image = e.target.files[0]
    const response = await uploadImage(this.props.model, image)
    console.log(response)
    response && this.setState({ image: image.name, url: response })
  }
  render() {
    // console.log('image', this.state.image)
    const { image, url } = this.state
    const { handleImage, name, model } = this.props
    return (
      <React.Fragment>
        <input
          placeholder="image"
          type="file"
          name={name}
          accept="image/*"
          id={name}
          //   onChange={e => handleImage(name, e.target.files[0].name)}
          onChange={e => this.handleImage(e)}
          style={{ display: 'none' }}
        />
        {/* <Button type="primary" icon="download" size=""> */}
        <label htmlFor={name} className="ant-btn ant-btn-primary">
          <Icon type="upload" /> Selecciona un archivo
        </label>
        <Input type="hidden" name={name} value={url} />
        {/* </Button> */}
      </React.Fragment>
    )
  }
}

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
    response && this.setState({ image: image.name, url: response })
  }
  render() {
    const { image, url } = this.state
    const { handleImage, name, model, value } = this.props
    return (
      <React.Fragment>
        {(url || value) && (
          <img
            src={url ? url : value}
            alt=""
            style={{ height: 40, width: 40, borderRadius: 50 }}
          />
        )}
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
        <Input type="hidden" name={name} value={url ? url : value} />
        {/* </Button> */}
      </React.Fragment>
    )
  }
}

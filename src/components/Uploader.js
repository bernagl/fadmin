import React from 'react'
import { Upload, message, Button, Icon } from 'antd'

export default class Uploader extends React.Component {
  render() {
    const props = {
      name: 'file',
      action: '',
      headers: {
        // authorization: 'authorization-text'
      },
      beforeUpoload: file => false,
      onChange(info) {
        console.log(info)
        // if (info.file.status !== 'uploading') {
        //   console.log(info.file, info.fileList)
        // }
        // if (info.file.status === 'done') {
        //   message.success(`${info.file.name} file uploaded successfully`)
        // } else if (info.file.status === 'error') {
        //   message.error(`${info.file.name} file upload failed.`)
        // }
      }
    }

    return (
      <React.Fragment>
        <input
          placeholder="image"
          type="file"
          accept="image/*"
          id="file"
          onChange={e => console.log(e.target.files)}
          style={{ display: 'none' }}
        />
        {/* <Button type="primary" icon="download" size=""> */}
        <label htmlFor="file" className="ant-btn ant-btn-primary">
          <Icon type="upload" /> Selecciona un archivo
        </label>
        {/* </Button> */}
      </React.Fragment>
    )
  }
}

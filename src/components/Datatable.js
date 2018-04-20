import React from 'react'
import {  Divider, Table, Popconfirm } from 'antd'

export default props => {
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street'
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street'
    }
  ]

  const actions = {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
    render: (text, record) => {
      return (
        <div>
          <Divider type="vertical" />
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => this.deleteDocument(record.id)}
          >
            <a>Delete</a>
          </Popconfirm>
        </div>
      )
    }
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    }, actions
  ]
  return <Table dataSource={dataSource} columns={columns} />
}

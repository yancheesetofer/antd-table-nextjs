'use client'

import React from 'react'
import { Table, Tag, Space } from 'antd'
import type { ColumnsType, TableProps } from 'antd/es/table'

import { People } from '@/schemas/people'

type Props = {
  data: People[]
  loading: boolean
}

const UserTable: React.FC<Props> = ({ data, loading }) => {
  const columns: ColumnsType<People> = [
    {
      title: 'Name',
      key: 'name',
      render: (_, record) => (
        <Space>
          <span>{record.firstName}</span>
          <span>{record.lastName}</span>
        </Space>
      ),
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: 'Age',
      dataIndex: 'Age',
      key: 'Age',
      sorter: (a, b) => Number(a.Age) - Number(b.Age),
      render: (age) => (
        <Tag color={age < 30 ? 'green' : age < 50 ? 'geekblue' : 'volcano'}>{age}</Tag>
      ),
    },
    {
      title: 'Address',
      dataIndex: 'Address',
      key: 'Address',
      ellipsis: true,
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{ pageSize: 10 }}
      rowKey={(record) => record.firstName + record.lastName}
    />
  )
}

export default UserTable

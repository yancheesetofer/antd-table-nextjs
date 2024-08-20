import React from 'react'
import { Table } from 'antd'
import type { ColumnsType, TableProps } from 'antd/es/table'

import { People } from '@/schemas/people'

type Props = {
  data: People[]
  loading: boolean
}

const UserTable: React.FC<Props> = ({ data, loading }) => {
  const columns: ColumnsType<People> = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
    },
    {
      title: 'Age',
      dataIndex: 'Age',
      key: 'Age',
      sorter: (a, b) => Number(a.Age) - Number(b.Age),
    },
    {
      title: 'Address',
      dataIndex: 'Address',
      key: 'Address',
    },
  ]

  const onChange: TableProps<People>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('Table params:', pagination, filters, sorter, extra)
  }

  return <Table columns={columns} dataSource={data} loading={loading} onChange={onChange} />
}

export default UserTable

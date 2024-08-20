'use client'

import React from 'react'
import { Table, Tag, Space, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'

import { People } from '@/schemas/people'

import styles from './UserTable.module.css'

const { Text } = Typography

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
        <Space direction="vertical" size="small">
          <Text strong>{`${record.firstName} ${record.lastName}`}</Text>
          <Text type="secondary" className={styles.mobileOnly}>
            Age: {String(record.Age)}
          </Text>
          <Text type="secondary" className={styles.mobileOnly}>
            {record.Address}
          </Text>
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
      responsive: ['md'],
    },
    {
      title: 'Address',
      dataIndex: 'Address',
      key: 'Address',
      ellipsis: true,
      responsive: ['lg'],
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{ pageSize: 6 }}
      rowKey={(record) => record.firstName + record.lastName}
      className={styles.responsiveTable}
    />
  )
}

export default UserTable

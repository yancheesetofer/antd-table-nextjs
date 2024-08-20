import React from 'react'
import { Table } from 'antd'

import { People } from '@/schemas/people'

type Props = {}

export const columns = [
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName',
  },
  {
    title: 'Age',
    dataIndex: 'Age',
    key: 'Age',
  },
  {
    title: 'Address',
    dataIndex: 'Address',
    key: 'Address',
  },
]

async function UserTable({}: Props) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/people`, {
    method: 'GET',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch people data')
  }

  //just double check :)
  const people: People[] = await response.json()

  console.log(people)

  return <Table dataSource={people} columns={columns} />
}

export default UserTable

'use client'
import React, { useState, useEffect } from 'react'
import { Typography, Card, Space } from 'antd'

import UserTable from '@/components/ui/table'
import { People } from '@/schemas/people'

const { Title } = Typography

type Props = {}

function ContentPage({}: Props) {
  const [people, setPeople] = useState<People[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/people')
      if (!response.ok) {
        throw new Error('Failed to fetch people data')
      }
      const peopleData: People[] = await response.json()
      setPeople(peopleData)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Space direction="vertical" size="large" style={{ width: '100%', padding: '24px' }}>
      <Title level={2}>User Directory</Title>
      <Card>
        <UserTable data={people} loading={loading} />
      </Card>
    </Space>
  )
}

export default ContentPage

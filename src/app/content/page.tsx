'use client'
import React, { useState, useEffect } from 'react'

import UserTable from '@/components/ui/table'
import { People } from '@/schemas/people'

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

  return <UserTable data={people} loading={loading} />
}

export default ContentPage

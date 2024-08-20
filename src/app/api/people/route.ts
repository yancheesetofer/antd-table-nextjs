import { NextResponse } from 'next/server'

import { People } from '@/schemas/people'
export async function GET() {
  try {
    const response = await fetch('https://dummyjson.com/c/ac2c-d62a-486d-890f')

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: People[] = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching people data:', error)
    return NextResponse.json({ error: 'Failed to fetch people data' }, { status: 500 })
  }
}

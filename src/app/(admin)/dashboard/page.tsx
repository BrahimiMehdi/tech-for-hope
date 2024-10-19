import { CardTitle } from '@/components/ui/card'
import React from 'react'

type Props = {}

const Dashboard = (props: Props) => {
  return (
    <main className='h-full p-24 w-full flex flex-col'>
        <CardTitle className='text-5xl'>
            Welcome to the <span className='text-primary'>Dashboard!</span>
        </CardTitle>
    </main>
  )
}

export default Dashboard
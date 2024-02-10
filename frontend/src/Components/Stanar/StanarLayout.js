import React from 'react'
import { Outlet } from 'react-router-dom'
import StanarHeader from './StanarHeader'

export default function StanarLayout() {
  
  
  return (
    <main className='App'>
        <StanarHeader/>
        <Outlet/>
    </main>
  )
}

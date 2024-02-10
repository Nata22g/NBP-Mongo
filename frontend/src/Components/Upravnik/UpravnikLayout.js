import React, { Children } from 'react'
import NavBarUpravnik from './NavBarUpravnik'
import { Outlet } from 'react-router-dom'

export default function UpravnikLayout() {
  return (
    <div>
      <NavBarUpravnik></NavBarUpravnik>
      <Outlet/>
    </div>
  )
}

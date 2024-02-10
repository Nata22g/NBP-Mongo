import React, { Children } from 'react'
import NavBarDirektor from './NavBarDirektor'
import { Outlet } from 'react-router-dom'

export default function DirektorLayout() {
  return (
    <div>
      <NavBarDirektor></NavBarDirektor>
      <Outlet/>
    </div>
  )
}

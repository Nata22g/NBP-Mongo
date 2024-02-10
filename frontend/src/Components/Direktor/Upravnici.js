import React from 'react'
import useAuth from '../../hooks/useAuth';
import PregledUpravnika from './PregledUpravnika';
export default function Upravnici() {
    const {auth,setAuth}=useAuth();
  return (
    <div>
        <PregledUpravnika></PregledUpravnika>
    </div>
  )
}

import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext
 from './AuthProvider'
function Main() {
  const {logout}=useContext(AuthContext);
  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Main

import { useState, useContext } from 'react'
import './App.css'
import { AuthContext } from "./authContext"
import { fetchUser } from "./api"

function App() {
  const { auth } = useContext(AuthContext)
  
  const submit = () => {
    fetchUser({ auth })
  }

  return (
    <div className="p-5">
      <button onClick={() => submit()}>Fetch Profile</button>
    </div>
  )
}

export default App

import { useState } from 'react'
import { Routes,Route } from 'react-router'

import Homepage from './pages/Homepage'
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDetailPage'

import { Toaster } from "react-hot-toast"
import toast from "react-hot-toast"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Toaster/>
    <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
    <Routes>
      <Route path="/" element={<Homepage/>} />
      <Route path="/create" element={<CreatePage/>}/>
      <Route path="/note/:id" element={<NoteDetailPage/>}/>
    </Routes>
    </>
  )
}

export default App

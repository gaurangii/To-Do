import { useState } from 'react'
import { BrowserRouter, Router ,Route, Routes} from 'react-router-dom'
import Signin from './components/Signin'
import Signup from './components/Signup'
import Home from './components/Home'
// import TaskItem from './components/TaskItem'
import AllTask from './components/AllTask'
// import AllTaskGrid from './components/AllTaskGrid'
import UpdateData from './components/UpdateData'
import Completed from './components/Completed'
import NotCompleted from './components/NotCompleted'

function App() {
  return (
      <>
      
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/" element={<Home/>}/>
     <Route path="/alltasks" element={<AllTask/>}/>
     <Route path="/todo/update/:id" element={<UpdateData/>}/>
     <Route path="/completed" element={<Completed/>}/>
     <Route path="/notCompleted" element={<NotCompleted/>}/>
     
    </Routes>
    </BrowserRouter>
    
      </>
  )
}

export default App
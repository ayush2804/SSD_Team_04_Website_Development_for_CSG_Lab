import Login from "./Login"
import Signup from "./Signup"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Students from './Students'
import Event from './Event'
import Project from "./Project"
import Publications from "./Publication"
import Home from './Home'
import Faculties from "./Faculty"
import LoadImage from "./LoadImage"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/faculties" element={<Faculties />}></Route>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/students" element={<Students />}></Route>
        <Route path="/events" element={<Event />}></Route>
        <Route path="/projects" element={<Project />}></Route>
        <Route path="/papers" element={<Publications />}></Route>
        <Route path="/image" element={<LoadImage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

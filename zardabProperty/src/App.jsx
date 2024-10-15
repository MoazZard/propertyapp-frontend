import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddProperty from './components/property/AddProperty'
import PropertyPaginator from './components/common/PropertyPaginator'
import ExistingProperty from './components/property/ExistingProperty'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {

  return (
    <>
    <main>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          
        </Routes>
      </Router>
    </main>

      <AddProperty/>
      <ExistingProperty/>
    </>
  )
}

export default App

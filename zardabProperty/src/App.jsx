import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddProperty from './components/property/AddProperty'
import PropertyPaginator from './components/common/PropertyPaginator'
import ExistingProperty from './components/property/ExistingProperty'

function App() {

  return (
    <>
      <AddProperty/>
      <ExistingProperty/>
    </>
  )
}

export default App

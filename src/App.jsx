import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Characters from './components/Characters/Characters'
import Locations from './components/Locations/Locations'
import Episodes from './components/Episodes/Episodes'
import About from './components/About/About'
import Home from './components/Home/Home'
import loading from './assets/loaders/oval.svg'
import './App.css'

function App() {
  const links = [
    {
      to: '/',
      title: 'Home'
    },
    {
      to: '/characters',
      title: 'Characters'
    },
    {
      to: '/locations',
      title: 'Locations'
    },
    {
      to: '/episodes',
      title: 'Episodes'
    },
    {
      to: '/about-me',
      title: 'More info'
    }
  ]

  return (
    <BrowserRouter>
      <Navbar links={links}/>
      <Routes>
        <Route exact path='/' element={<Home links={links} />}/>
        <Route exact path='/characters' element={<Characters loading={loading}/>} />
        {/* <Route exact path='/characters/:id' element={<Details />}/> */}
        <Route exact path='/locations' element={<Locations />}/>
        <Route exact path='/episodes' element={<Episodes />}/>
        <Route exact path='/about-me' element={<About />}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App

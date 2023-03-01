import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './components/Home/Home'
import Characters from './components/Characters/Characters'
import Locations from './components/Locations/Locations'
import Episodes from './components/Episodes/Episodes'
import About from './components/About/About'
import NotFound from './components/NotFound/NotFound.jsx'
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
        <Route exact path='/locations' element={<Locations loading={loading}/>}/>
        <Route exact path='/episodes' element={<Episodes loading={loading}/>}/>
        <Route exact path='/about-me' element={<About loading={loading}/>}/>
        <Route exact path='*' element={<NotFound />}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App

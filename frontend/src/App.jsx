
import './App.css'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeatureSection'
import TestimonialsSection from './components/TestimonialsSection'
import DownloadSection from './components/DownloadSection'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import Login from './pages/Login'

function App() {


  return (
   <div>
    <Router>
        <Routes>
           <Route path='/' element = {<HomePage/>}/>
           <Route path='/login' element = {<Login/>}/>
        </Routes>
    </Router>
   </div>
  )
}

export default App


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
import Signup from './pages/Signup'
import CreateAccount from './pages/CreateAccount'
import GetUser from './pages/GetUser'
import Dashboard from './pages/Dashboard'
import GetInfo from './pages/GetInfo'

function App() {


  return (
   <div>
    <Router>
        <Routes>
           <Route path='/' element = {<HomePage/>}/>
           <Route path='/login' element = {<Login/>}/>
           <Route path='/signup' element = {<Signup/>}/>
           <Route path='/create/account' element = {<CreateAccount/>}/>
           <Route path='/get/user' element = {<GetUser/>}/>
           <Route path='/dashboard' element = {<Dashboard/>}/>
           <Route path='/getInfo' element = {<GetInfo/>}/>

        </Routes>
    </Router>
   </div>
  )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Button } from 'antd';
import LeftNav from './components/LeftNav';
import Layout from './components/Layout';
import { BrowserRouter as Router } from 'react-router-dom';
function App() {
  const [isDarkMode, setDarkMode] = useState(false)

  return (
    <div className={` ${isDarkMode ? 'dark-theme': 'light-theme'}`}>
      <div className='wrapper'>
        <div className='header'><Button onClick={()=>setDarkMode(!isDarkMode)}>dark</Button></div>
        
      <div className='content'>
        <Router>
          <LeftNav/>
        <Layout/>
        </Router>

      </div>
      </div>
      
      
    </div>
  )
}

export default App

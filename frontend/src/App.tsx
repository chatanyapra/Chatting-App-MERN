import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Message from './pages/message/Message';
import MessageBox from './components/MessageBox';
import { Toaster } from 'react-hot-toast';
function App() {

  return (
    <>
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">Login</Link></li>
            <li><Link to="/contact">Signup</Link></li>
          </ul>
        </nav> */}

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/message" element={<Message />} />
          <Route path="/messageBox" element={<MessageBox visibility={true}/>} />
        </Routes>
        <Toaster/>
      </div>
    </Router>
    </>
  )
}

export default App

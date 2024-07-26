import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Message from './pages/message/Message';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';
import Home from "./callingcomponents/Home";
import CallingRoom from "./callingcomponents/CallingRoom";
function App() {
  const {authUser} = useAuthContext();
  return (
    <>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={authUser ? <Navigate to={"/message"} /> : <Login/> } />
          <Route path="/login" element={authUser ? <Navigate to={"/message"} /> : <Login/> } />
          <Route path="/signup" element={authUser ? <Navigate to={"/message"} /> : <Signup/> } />
          <Route path="/message" element={authUser ? <Message /> : <Navigate to={"/login"} />} />
          <Route path='/home' element={<Home/>} />
          <Route path='/room/:roomId' element={<CallingRoom/>} />
        </Routes>
        <Toaster/>
      </div>
    </Router>
    </>
  )
}

export default App

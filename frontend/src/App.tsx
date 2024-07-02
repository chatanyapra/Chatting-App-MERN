import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Message from './pages/message/Message';
import MessageBox from './components/MessageBox';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';
import useConversation from './zustandStore/useConversation';
interface Conversation {
  _id: string;
  username: string;
  fullname: string;
  profilePic: string;
}
function App() {
  const {authUser} = useAuthContext();
  const { selectedConversation } = useConversation();
  return (
    <>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={authUser ? <Navigate to={"/message"} /> : <Login/> } />
          <Route path="/login" element={authUser ? <Navigate to={"/message"} /> : <Login/> } />
          <Route path="/signup" element={authUser ? <Navigate to={"/message"} /> : <Signup/> } />
          <Route path="/message" element={authUser ? <Message /> : <Navigate to={"/login"} />} />
          {/* <Route path="/messageBox" element={selectedConversation !== null ? <MessageBox conversation={selectedConversation} visibility={true}/> : ""} /> */}
        </Routes>
        <Toaster/>
      </div>
    </Router>
    </>
  )
}

export default App

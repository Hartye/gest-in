// Components
import { Teacher } from './pages/Teacher'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Manager } from './pages/Manager';
import { LogIn } from './pages/LogIn';
import { useEffect, useState } from 'react';

// Styles
import './styles/App.css'
import { OrientadorEducativo } from './pages/OrientadorEducativo';

export const App = () => {
  const apiUrlBase = "https://gest-in-back-end.vercel.app";
  const navigate = useNavigate();

  const [user, setUser] = useState(-1);
  const [pass, setPass] = useState("");
  const [role, setRole] = useState("");

  const handleSetUser = (userLogIn: number, passLogIn: string, roleLogIn: string) => {
    setUser(userLogIn);
    setPass(passLogIn);
    setRole(roleLogIn);
  }

  useEffect(() => {
    if (user !== -1 && pass !== "" && role !== "") {
      navigate("/" + role);
    }
  }, [user, pass, role, navigate])

  return (
      <Routes>
        <Route path='/' element={<LogIn setUser={handleSetUser} apiBase={apiUrlBase} />} />
        <Route path='/teacher' element={<Teacher setUser={handleSetUser} user={user} pass={pass} apiBase={apiUrlBase} />} />
        <Route path='/oe' element={<OrientadorEducativo setUser={handleSetUser} user={user} pass={pass} apiBase={apiUrlBase} />} />
        <Route path='/manager' element={<Manager setUser={handleSetUser} user={user} pass={pass} apiBase={apiUrlBase} />} />
      </Routes>
  )
}
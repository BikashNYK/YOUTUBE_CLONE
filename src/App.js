import { Container } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import HomeScreen from './screen/homescreen/HomeScreen';
import './_app.scss';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import LoginScreen from './screen/loginScreen/LoginScreen';
import Search from './components/searchResult/Search';
import { useSelector } from 'react-redux/es/exports';
import Playing from './screen/playingScreen/Playing';


function App() {
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();
  const { accessToken, loading } = useSelector((state) => {
    return state.auth;
  });

  useEffect(() => {
    if (!accessToken && !loading) {
      navigate('/login');
    }
  }, [accessToken, loading, navigate]);

  const handleToggleSidebar = () => {
    setSidebar(!sidebar);
  };
  const location = useLocation();

  useEffect(() => {
    const match = location.pathname.match(/\/watch\/(.*)/);
    const id = match?.[1];
    const searchMatch = location.pathname.match(/\/search\/(.*)/);
    const query = searchMatch?.[1]
    const validRoutes = ['/', '/search', '/login'];
    if (id) {
      validRoutes.push(`/watch/${id}`);
    }
    if(searchMatch){
      validRoutes.push(`/search/${query}`);
    }
    if (!validRoutes.includes(location.pathname)) {
      navigate('/');
    }
  }, [navigate, location.pathname]);
  return (
    <div>
      {location.pathname !== '/login' && (<Header handleToggleSidebar={handleToggleSidebar} />)}

      <div className="app_container">
        {location.pathname !== '/login' && (<Sidebar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} />)}
        <Container fluid className='app_main '>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/search/:query' element={<Search />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/watch/:id' element={<Playing />} />
          </Routes>
        </Container>
      </div>

    </div>
  );
}

export default function RouterWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
};

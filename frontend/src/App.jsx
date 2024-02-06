import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Signin from './components/Registration/Signin';
import Signup from './components/Registration/Signup';
import Todo from './components/Todo/Todo';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import { useDispatch } from "react-redux";
import { authActions } from './Store';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if (id) {
      dispatch(authActions.login());
    }
  }, [])

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/todo' element={<Todo />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/logout' element={<Home />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App;

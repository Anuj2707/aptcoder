import React from 'react'
import './Navbar.css'
import { FaBook } from "react-icons/fa6";
import avatar from '../../assets/avatar.png'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { authActions } from '../../Store';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    
    const history = useNavigate();

    const dispatch = useDispatch();
    const isLoggedin = useSelector((state) => state.isLoggedin);
    const logout = () => {
        sessionStorage.clear("id");
        dispatch(authActions.logout()); 
        window.location.reload(false);
        history('/');
    }
    return (
        <div style={{ height: "60px" }} className='bg-light'>
            <nav className="navbar  navbar-expand-lg bg-light position-fixed fixed-top">
                <div className="container">
                    <Link className="navbar-brand text-danger d-flex align-items-center gap-2" to="/"><FaBook /><b>TODO</b></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className='navbar-nav ms-auto mb-2 mb-lg-0 d-flex gap-3 align-items-center'>
                            <li className="nav-item ">
                                <Link className="nav-link active list-items" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active list-items" aria-current="page" to="todo">Todo</Link>
                            </li>

                            {!isLoggedin && <>
                                <li className="nav-item btn btn-success">
                                    <Link className="nav-link active list-items" aria-current="page" to="signup">Signup</Link>
                                </li>
                                <li className="nav-item btn btn-success">
                                    <Link className="nav-link active list-items" aria-current="page" to="signin">Signin</Link>
                                </li>
                            </>}

                            {isLoggedin && <>
                                <li className="nav-item btn btn-success " onClick={logout}>
                                    <Link className="nav-link active list-items" aria-current="page" to="logout" >Logout</Link>
                                </li>
                                <li className="nav-item">
                                    <img className='img-fluid user-png' src={avatar} alt="Avatar" />
                                </li>
                            </>}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;
import React, {useState} from 'react';
import {  signInWithEmailAndPassword, signInWithPopup   } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom'
import './Login.css'

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/home")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
    }

    const signInWithGoogle = () => {
        console.log("Tapped");
        signInWithPopup(auth, googleProvider)
        .then((userCredential) => {
            const user = userCredential.user;
            navigate("/home")
            console.log(user);
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        })
    }



    return(
        <>
            <div className="login-screen">    
                <div className="navbar">
                    <div className="logo-parent">
                        <div className="logo-icon"><img src="/logo.svg" alt="Filter Pixel Logo"/></div>
                        <div className="logo-text"><p>FilterPixel</p></div>
                    </div>
                    <NavLink className="nav-link" to="/signup">
                        <div className="sign-up-button btn">Sign Up</div>
                    </NavLink>
                </div>
                <div className="center-form">
                    <button className="google-login" onClick={signInWithGoogle}>
                        <span className="google-logo-icon">
                            <img src="/google-logo.png" alt="Google Logo"/>
                        </span>
                        <span className="logo-text">Login with Google</span>
                    </button>
                    <div className="OR">
                        <hr className="horizontal-line"/>
                        <p>OR</p>
                        <hr className="horizontal-line"/>
                    </div>
                    <form>                                              
                        <div className="input-fields">
                            <label htmlFor="email-address"></label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"                                    
                                required                                                                     placeholder="Username"
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>


                        <div className="input-fields">
                            <label htmlFor="password"></label>
                            <input
                                id="password"
                                name="password"
                                type="password"                                    
                                required
                                placeholder="Password"
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <button className="login-button btn" onClick={onLogin}>Submit</button>
                        </div>                               
                    </form>
                </div>                                                             
                
            </div>
        </>
    )
}

export default Login
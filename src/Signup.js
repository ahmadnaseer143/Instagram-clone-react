import React,{useState} from 'react'
import {Link, useHistory} from "react-router-dom";
import {auth} from "./firebase";
import "./signup.css";
const Signup = () => {
    const [show, setShow] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history=useHistory();
    const signup=(e)=>{
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email,password).then((authUser)=>{
            //succesfully created user with email and password
            //will return auth object where we can find email and password
            // if(authUser){
            //     history.push("/");
            // }

            //also update username hence
            return authUser.user.updateProfile({
                displayName: username
            })
        })
        .catch(error=>alert(error.message));

    }
    return (
        <div className="login">
            <div className="login-container">
                <h1>Instagram</h1>
                <h3>Sign up to see photos and videos</h3>
                <h3 className="from-your">from your friends</h3>
                <button className="login-facebook-btn">Log in with Facebook</button>
                <h2 className="or"><span>OR</span></h2>
                <form className="form">
                    <input type="text" value={email} placeholder="Mobile Number or Email" onChange={(e)=>{
                        setEmail(e.target.value)
                    }} />
                    <input type="text" placeholder="Full Name" />
                    <input type="text" placeholder="User Name" value={username} onChange={(e)=>{
                        setUsername(e.target.value)
                    }} />
                    <input type="password" placeholder="Password" value={password} onChange={(e)=>{
                        setPassword(e.target.value)
                    }}/>
                    <button onClick={signup}>Sign up</button>
                </form>
                <h6>By signing up, you agree to our Terms , Data</h6>
                <h6 className="policy">Policy and Cookies Policy</h6>
            </div>
            <div className="account-container">
                <h4>Have an account? <Link className="link" to="/">Log in</Link> </h4>
            </div>
            <div className="get-app">
                <h4>Get the app.</h4>
                <a href="https://apps.apple.com/app/instagram/id389801252?vt=lo">
                    <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png" alt="not available" />
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26ig_mid%3D4E4D0EFB-23A9-45C8-BC38-0A6CF9126A23%26utm_content%3Dlo%26utm_medium%3Dbadge">
                    <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png" alt="not available" />
                </a>
            </div>
        </div>
    )
}

export default Signup

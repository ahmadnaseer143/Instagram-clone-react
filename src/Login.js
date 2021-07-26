import React, {useState} from 'react';
import {Link,useHistory} from "react-router-dom";
import {auth} from "./firebase";
import "./login.css"
const Login = ({handleClick}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history=useHistory();
    //what this does is this allows us to programatically change the url

    const handleLogin=(e)=>{
        e.preventDefault();
        auth.signInWithEmailAndPassword(email,password).then((auth)=>{
            // history.push("/posts")
            handleClick(auth.user.displayName);
        })
        .catch(error=>alert(error.message));
    }
    return (
        <div className="login">
            <div className="login-container">
                <h1>Instagram</h1>
                <form className="form" onSubmit={handleLogin}>
                    <input type="text" value={email}placeholder="Phone number, username, or email" onChange={(e)=>{
                        setEmail(e.target.value)
                    }}/>
                    <input type="password" value={password} placeholder="Password" onChange={(e)=>{
                        setPassword(e.target.value)
                    }} />
                    <button onClick={handleLogin}>Log In</button>
                </form>
                <h2 className="or"><span>OR</span></h2>
                <h4>Log in with Facebook</h4>
                <h5>Forgot password?</h5>
            </div>
            <div className="account-container">
                <h4>Don't have an account? <Link className="link" to="/signup">Sign up</Link> </h4>
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

export default Login

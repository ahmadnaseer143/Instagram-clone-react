import React from 'react'
import "./header.css";
import ImageUpload from "./ImageUpload";
import {useHistory} from "react-router-dom";
import {auth} from "./firebase";
import {FiSend} from 'react-icons/fi';
function Header({user, handleReels,showReels, handleMessenger, showMessenger}) {
    const history=useHistory();
    const handleLogOut=()=>{
        auth.signOut();
        // history.push("/");
    }
    return (
        <div className="insta-header">
            <img className="insta-img" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="Logo" />
            <button className="logout" onClick={handleLogOut}>Log Out</button>
            {
                showMessenger?(
                    <button className="upload-btn" onClick={handleMessenger}>
                    {
                    showMessenger?"Back":<FiSend/>
                    }
                    </button>
                ):(
                    <>
                    
                    <ImageUpload user={user} showReels={showReels}/>
                    <button className="reels-btn" onClick={handleReels}>{
                        showReels?"Posts":"Reels"
                    }
                    </button>
                    <button className="messenger-btn" onClick={handleMessenger}>
                        {
                            showMessenger?"Back":<FiSend/>
                        }
                    </button>
                    </>
                )
            }
        </div>
    )
}

export default Header

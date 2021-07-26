import React, {useState} from 'react'
import Avatar from '@material-ui/core/Avatar';
import "./reels.css";
const Reels = ({reels}) => {
    return (
        <div className="parent">
        {
            reels.map((reell)=>{
                const {id,reel}=reell;
                return(
                    <div key={id} className="post">
                        <div className="post-div child">
                            {/* userName and Avatar */}
                            <div className="avatar-header avatar-header-reel">
                                <Avatar className="avatar" alt={reel.userName} src={reel.url}>
                                </Avatar>
                                <h3>{reel.userName}</h3>
                            </div>

                            {/* Post Image */}
                            <video src={reel.url} controls autoplay className="post-image reels-video">Your browser doesnt support video tag</video>


                            {/* Caption */}
                            <div className="post-caption">
                            <h4><strong>{reel.userName}</strong> {reel.caption}</h4>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        </div>
    )
}

export default Reels

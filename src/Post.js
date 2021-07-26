import React, {useState, useEffect} from 'react'
import "./post.css"
import Avatar from '@material-ui/core/Avatar';
import Header from "./Header";
import {db}  from "./firebase";
import firebase from "firebase";
import Reels from './Reels';
import Messages from './Messages';
import OnePost from './OnePost';
function Post({posts, reels, user}) {
    const [showReels, setShowReels] = useState(false);
    const [showMessenger, setShowMessenger] = useState(false);
    
    const handleReels=()=>{
        setShowReels(!showReels);
    }
    const handleMessenger=()=>{
        setShowMessenger(!showMessenger);
    }   
    return (
        <>
        <Header user={user} handleReels={handleReels} showReels={showReels} handleMessenger={handleMessenger} showMessenger={showMessenger}/>
        
        {
            showMessenger?(<Messages user={user}/>):(
                showReels?(<Reels reels={reels} />
                    ):(
                    posts.map(({id,post})=>{
                        return(
                            <OnePost key={id} caption={post.caption} url={post.url} userName={post.userName} postID={id} user={user}/>
                        )
                    })
                )
            )
        }
        </>
    )
}


export default Post

// {
//     posts.map((postts)=>{
//         const {id,post}=postts;
//         <div key={id} className="post">
//         {console.log("Post:", post.caption)}
//         <div className="post-div">
//             {/* userName and Avatar */}
//             <div className="avatar-header">
//                 <Avatar className="avatar" alt={post.userName} src={post.url}>
//                 </Avatar>
//                 <h3>{post.userName}</h3>
//             </div>

//             {/* Post Image */}
//             <img className="post-image" src={post.url} alt={"Post Deleted"} />


//             {/* Caption */}
//             <div className="post-caption">
//             <h4><strong>{post.userName}</strong> {post.caption}</h4>
//             </div>

//             {/* <div>
//                 {comments.map((comment)=>{
//                     <p><strong>{comment.userName}</strong>{comment.text}</p>
//                 })}
//             </div> */}
//         </div>
//         {/* <form>
//             <input type="text" placeholder="Add a Comment" value={comment} onChange={(e)=>setComment(e.target.value)} />
//             <button disabled={!comment} type="submit" onClick={postComment}>Post</button>
//         </form> */}

//     </div>
//     })
// }

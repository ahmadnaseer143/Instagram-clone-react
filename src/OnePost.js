import React, {useState, useEffect} from 'react'
import Avatar from '@material-ui/core/Avatar';
import {db}  from "./firebase";
import firebase from "firebase";
import "./onepost.css";
const OnePost = ({id,caption,url,userName, postID,user}) => {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const postComment=(e)=>{
        e.preventDefault();
        db.collection("posts").doc(postID).collection("comments").add({
            comment:comment,
            userName:user,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment("");
    }
    useEffect(()=>{
        if(postID){
            db.collection("posts").doc(postID).collection("comments").orderBy("timestamp","asc").onSnapshot(snapshot =>{
                //every time a new post will be added this piece of code will be triggered
                
                setComments(snapshot.docs.map(doc=>
                doc.data()
                )); 
            })
        }
    },[postID]);


    return (
        <div className="post">
            <div className="post-div">
                {/* userName and Avatar */}
                <div className="avatar-header">
                    <Avatar className="avatar" alt={userName} src={url}>
                    </Avatar>
                    <h3>{userName}</h3>
                </div>

                {/* Post Image */}
                <img className="post-image" src={url} alt={"Post Deleted"} />


                {/* Caption */}
                <div className="post-caption">
                <h4><strong>{userName}</strong> {caption}</h4>
                </div>

                {/* Comment */}
                <div className="post-comment">
                {comments.map((comment)=>(
                    <p><strong>{comment.userName}</strong>{comment.comment}</p>
                ))}
                </div>
                <div className="post-comment-type">
                    <form>
                        <input type="text" placeholder="Add a Comment" value={comment} onChange={(e)=>setComment(e.target.value)} />
                        <button disabled={!comment} type="submit" onClick={postComment}>Post</button>
                    </form>
                </div>
            </div>



            {/* <div>
            {comments.map((comment)=>{
                <p><strong>{comment.userName}</strong>{comment.text}</p>
            })}
        </div> */}
            {/* <form>
                <input type="text" placeholder="Add a Comment" value={comment} onChange={(e)=>setComment(e.target.value)} />
                <button disabled={!comment} type="submit" onClick={postComment}>Post</button>
            </form> */}
        </div>
    )
}

export default OnePost

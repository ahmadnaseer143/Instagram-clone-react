import React, {useState} from 'react'
import {db, storage} from "./firebase";
import firebase from "firebase";
import "./imageupload.css";
import Modal from 'react-modal';
// AiOutlineClose
import {AiOutlineClose} from "react-icons/ai";
const ImageUpload = ({user, showReels}) => {
    //progress bar, username, url, caption
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: "#c6e4f8",
        },
      };
      const [modalIsOpen, setIsOpen] = React.useState(false);
    
      function openModal() {
        setIsOpen(true);
      }
    
      function closeModal() {
        setIsOpen(false);
      }    
    
      
    const handleChangeImage=(e)=>{
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
    }
    const handleChangeVideo=(e)=>{
      if(e.target.files[0]){
          setVideo(e.target.files[0]);
      }
    }

    const handleUploadImage=()=>{
        //uploading to firebase
        const uploadTask=storage.ref(`images/${image.name}`).put(image);
        //acess storgae in firebase
        //get reference to images
        //image name is image file name we just selected
        //put is for putting into storage in firebase
        uploadTask.on(
            "state_changed", (snapshot)=>{
                //as it changes give me progress as snpashots of progress
                const progress= Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
                setProgress(progress);
                if(progress===100){
                    closeModal(); 
                }
            },
            (error)=>{
                alert(error.message)
            },
            ()=>{
                storage.ref("images").child(image.name).getDownloadURL().then(url=>{
                    db.collection("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        url:url,
                        userName: user
                    });
                    setProgress(0);
                    setCaption("");
                    setImage(null);
                })
            }
        )
    }
    const handleUploadVideo=()=>{
        //uploading to firebase
        const uploadTask=storage.ref(`videos/${video.name}`).put(video);
        //acess storgae in firebase
        //get reference to images
        //image name is image file name we just selected
        //put is for putting into storage in firebase
        uploadTask.on(
            "state_changed", (snapshot)=>{
                //as it changes give me progress as snpashots of progress
                const progress= Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
                setProgress(progress);
                if(progress===100){
                    closeModal(); 
                }
            },
            (error)=>{
                alert(error.message)
            },
            ()=>{
                storage.ref("videos").child(video.name).getDownloadURL().then(url=>{
                    db.collection("reels").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        url:url,
                        userName: user
                    });
                    setProgress(0);
                    setCaption("");
                    setVideo(null);
                })
            }
        )
    }
    return (
    <div>
      <button className="upload-btn" onClick={openModal}>{showReels?"Upload Reel":"Upload Photo"}</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        
        <button className="close-icon-btn" onClick={closeModal}><AiOutlineClose/></button>
        <div className="upload-container">
            <progress value={progress} max="100" />
            <input type="text" placeholder="Enter your Caption" value={caption} onChange={(e)=>setCaption(e.target.value)}/>
            {
              showReels?(
                <>
                <input type="file" onChange={handleChangeVideo} accept="video/*"/>
                <button className="upload-button upload-btn-modal" onClick={handleUploadVideo}>Upload Reel</button>
              </>):(
                <>
                <input type="file" onChange={handleChangeImage} accept="image/*"/>
                <button className="upload-button upload-btn-modal" onClick={handleUploadImage}>Upload Photo</button>
                </>
              )
            }
        </div>
      </Modal>
    </div>
    )
}

export default ImageUpload
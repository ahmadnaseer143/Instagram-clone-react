import React, {useState, useEffect} from "react";
import Login from "./Login";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import data from "./data";
import dataa from "./dataa";
import Signup from "./Signup";
import Wrapper from "./Wrapper";
import Post from "./Post";
import {auth,db}  from "./firebase";
function App() {
  const [users, setUsers] = useState(null);
  const [posts, setPosts] = useState([]);
  const [reels, setReels] = useState([]);
  const [userName, setUserName] = useState("");

  // const handleClick=(authUserr)=>{
  //   console.log(authUserr)
  //   setUsers(authUserr);
  // }
  
  const handleClick=(userNamee)=>{
    setUserName(userNamee);
  }

  useEffect(()=>{
    //will only run when app components loads
    auth.onAuthStateChanged(authUser=>{
      if(authUser){
        //user just logged in/user was logged in
        setUsers(authUser);
      }
      else{
        setUsers(null);
      }
    })
    //what this does is that once we attach this listener, it will always listen
  },[users]);

  useEffect(()=>{
    db.collection("posts").orderBy("timestamp","desc").onSnapshot(snapshot =>{
      //every time a new post will be added this piece of code will be triggered
      setPosts(snapshot.docs.map(doc=>({
        id:doc.id,
        post: doc.data()
      })
      )); 
    })
  },[])

  useEffect(()=>{

    db.collection("reels").orderBy("timestamp","desc").onSnapshot(snapshot =>{
      setReels(snapshot.docs.map(doc=>({
        id:doc.id,
        reel: doc.data()
      })
      )); 
    })
  },[])

  return (
    <div className="app">
      {users?<Post posts={posts} reels={reels} user={users?.displayName} /> : <Wrapper handleClick={handleClick}/>} 
    </div>
  );
}

export default App;

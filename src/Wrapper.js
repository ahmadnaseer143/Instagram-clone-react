import React from 'react'
import Login from "./Login";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Signup from "./Signup";
import Post from './Post';
const Wrapper = ({handleClick}) => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/signup">
                        <Signup/>
                    </Route>
                    <Route path="/">
                        <Login handleClick={handleClick}/>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default Wrapper

import React from "react";
import { Link } from "react-router-dom";
import Search from './Search/Search';

function Homepage(){
    return(
        <>
        <div>
            <h2><center>Homepage</center></h2>
            <Link to="/profile"><button>Profile</button></Link>
        </div>
        <Search />
        </>
    )
}

export default Homepage;
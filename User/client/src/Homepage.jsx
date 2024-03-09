import React from "react";
import { Link } from "react-router-dom";

function Homepage(){
    return(
        <div>
            <h2>Homepage</h2>
            <Link to="/profile"><button>Profile</button></Link>
        </div>
    )
}

export default Homepage;
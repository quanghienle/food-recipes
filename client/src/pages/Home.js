import React from "react";
import { Link, } from "react-router-dom";


export default function Home(){
  
    return (
        <h2>
            Welcome to <Link to="/recipes">Recipes</Link>
        </h2>
    )
}

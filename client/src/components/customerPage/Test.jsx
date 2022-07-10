import {React,useState,useContext, useEffect} from "react";
// import { useState } from "react";
import {useHistory} from "react-router-dom"
import CustomerPagesManager  from "./CustomerPagesManger";
import {UserContext} from "../../contexts/UserContext.jsx"




function Test(props){
    
   
    const history =useHistory();
    const {name,setName} = useContext (UserContext)
   

    useEffect (function (){
        console.log (name)
    },)

    
   

    //const [name,setName] =useState("john");
    //const value={name,setName};

    //console.log (UserContext)
    

    function handleClick(){
        
        console.log("clicked")
        
        setName (name+1)
        history.push ({pathname:"/test1"})
    }
    console.log ("what is productListArray")
    
    return(
    <div>  
     <CustomerPagesManager/>
   
    
     <h1 onClick={handleClick} >CustomerPageMnager</h1>
    </div>  
    )
}

export default Test

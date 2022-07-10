import {React,useContext}  from "react";
import { useHistory } from 'react-router-dom'
import { UserContext } from "../../contexts/UserContext.jsx";

function Test(){
    const history =useHistory();

    const {name} = useContext (UserContext)
    console.log(name)
    
    
    function handleClick(){
        console.log ("clicked")
        return (
            history.push ({
                pathname:"/test",
                state:{deatils:"yehonatan"}
            })          
        )
    
    }
    return (
        <div>
            <h1>test page</h1>
            <button onClick={handleClick}>
                clickMe
            </button>
        </div>
    )
}


export default Test
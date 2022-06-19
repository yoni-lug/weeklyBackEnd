import React from "react";
import {useLocation} from "react-router-dom"
import CustomerPagesManager  from "./CustomerPagesManger";

// import {productsList} from "./productListArray"; 


function Test(props){

    console.log ("what is productListArray")
    // console.log (productListArray)
    // console.log (productListArray[0])
    // const {pathname,state} = useLocation();
    const location =useLocation()
    console.log (location)
    // const Pname=location.state.name
    console.log(location.fun)
    const test=location.fun;
    // test()

    // const test=location.state.test
    // test();


    // console.log (location.state)
    // console.log (pathname)
    return(
    <div>  
     <CustomerPagesManager/>
   
    
     <h1 onClick={test} >Yoni</h1>
    </div>  
    )
}

export default Test

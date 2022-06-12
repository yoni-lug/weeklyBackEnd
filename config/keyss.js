//keys.js - figure out what set of crendentials to return

let keysType = null;
let x=10;

if (process.env.NODE_ENV=='production') {
    //we are in production - retun the prod set of keys
    
    keysType= await import ("./prod.js")
   
} else {
    //we are in development - return the dev keys
    // import ("./try.js").then  (function (module){
    //         export { module.default}
    //     })
    keysType= await import ("./dev.js")
}


export default keysType.default



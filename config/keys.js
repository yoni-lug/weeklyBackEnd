//keys.js - figure out what set of crendentials to return

const keysType = async function () {
    if (process.env.NODE_ENV=='production') {
        //we are in production - retun the prod set of keys
        
        let keysType= await import ("./prod.js")
        return  keysType
    
    } else {
        //we are in development - return the dev keys
        // import ("./try.js").then  (function (module){
        //         export { module.default}
        //     })
        let keysType= await import ("./dev.js")
        return keysType
    }

}

const keys =await keysType()

export default keys.default






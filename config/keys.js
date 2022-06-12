//keys.js - figure out what set of crendentials to return
import dev from "./dev.js"
import prod from "./prod.js"



function keys (dev,prod){
//let keysSource = null
if (process.env.NODE_ENV=='production') {
    //we are in production - retun the prod set of keys
    return (prod)
} else {
    //we are in development - return the dev keys
    return (dev)
}

}

export default keys(dev, prod)

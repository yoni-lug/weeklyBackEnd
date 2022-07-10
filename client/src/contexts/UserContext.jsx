import { createContext } from "react";
import { useState } from "react";


//the actual value you want to access
export const UserContext = createContext ({
    name:null,
    setName:()=>null
});

export const UserProvider =function ({children}){
    const [name,setName] =useState(null)
    const value ={name,setName}
    return <UserContext.Provider value={value} >{children}</UserContext.Provider>
}
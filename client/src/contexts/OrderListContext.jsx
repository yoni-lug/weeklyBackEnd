import { createContext } from "react";
import { useState } from "react";


//the actual value you want to access
export const basketListContext = createContext ({
    basketList:null,
    setBasketList:()=>null
});

export const BasketListProvider=function ({children}){
    const [basketList,setBasketList] =useState([])
    const value ={basketList,setBasketList}
    return <basketListContext.Provider value={value} >{children}</basketListContext.Provider>
}     


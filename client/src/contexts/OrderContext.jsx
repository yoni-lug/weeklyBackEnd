import { createContext } from "react";
import { useState } from "react";


//the actual value you want to access
export const OrderContext = createContext ({
    orders:null,
    setOrders:()=>null
});

export const OrderProvider=function ({children}){
    const [orders,setOrders] =useState([])
    const value ={orders,setOrders}
    return <OrderContext.Provider value={value} >{children}</OrderContext.Provider>
}     

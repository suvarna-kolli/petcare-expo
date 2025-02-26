import { createContext, useState } from "react";
export const cartContext=createContext()

const defaultCartItems=[
    {
        "id": 883,
        "name": "Mouse",
        "slug": "mouse-2",
        "featured_image": "https://cdn.ictcircle.com/media/images/categories/mouse-2/Mouse.png"
      },
      {
        "id": 435,
        "name": "Networking",
        "slug": "networking",
        "featured_image": "https://cdn.ictcircle.com/media/images/categories/networking/Networking_Parts.png"
      },
      {
        "id": 1010,
        "name": "SAN",
        "slug": "san",
        "featured_image": "https://cdn.ictcircle.com/media/images/categories/san/SAN.png"
      },
]
const CartContextProvider=({children})=>{
    const [cart,setCart]=useState(defaultCartItems)
    const addToCart=(item)=>{
        setCart((prev)=>[item,...prev])
    }
const removeFromCart=(item)=>{

const elementToRemove = item;

let found = false; 

const newArray = cart.filter((obj) => {
  if (obj.id === elementToRemove.id && !found) {
    found = true; 
    return false; 
  }
  return true; 
});
setCart(newArray)
    }


const removeEntireItem=(item)=>{
const filteredData=cart.filter((obj)=>item.id!=obj.id)
setCart(filteredData)
}
return(
    <cartContext.Provider value={{addToCart,removeFromCart,removeEntireItem,cart}}>
        {children}
    </cartContext.Provider>
)
}
export default CartContextProvider;

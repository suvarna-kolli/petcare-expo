 import { createContext, useState } from "react";
 export const AddpetContext=createContext();

 const defaultPets=[
    {
        name:"Scoopie Doobie",
        image:{
            uri:"https://cdn.pixabay.com/photo/2016/11/29/11/26/dog-1869167_1280.jpg"
        },
        breedId:"0"
    },
    {
        name:"brian",
        image:{
            uri:"https://media.istockphoto.com/id/1290233518/photo/ginger-cat-portrait.jpg?s=1024x1024&w=is&k=20&c=NnYxt2tf_enXHQF-KPJ-ryAzWm7yfmP13mmriJYNGO0="
        },
        breedId:"1"
    },
    {
        name:"Bugs Bunny",
        image:{
            uri:"https://cdn.pixabay.com/photo/2018/08/30/08/26/cute-3641563_1280.jpg"
        },
        breedId:"2"
    },
    {
        name:"Parrot",
        image:{
            uri:"https://cdn.pixabay.com/photo/2022/10/08/17/19/parrot-7507450_1280.jpg"
        },
        breedId:"3"
    }
 ]

 function MyContextProvider({children}){
    const [submitData,setSubmitData]=useState(defaultPets)
    const addPetToList=(obj)=>{
        setSubmitData(prev=>[obj,...prev])
    }
    
    return (
        <AddpetContext.Provider value={{submitData,addPetToList}}>
            {children}
        </AddpetContext.Provider>
    );
 }
 export default MyContextProvider;
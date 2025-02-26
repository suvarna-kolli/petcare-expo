import { useState ,createContext} from "react";
export const userLocationContext=createContext()
 const LocationProvider=({children})=>{
    const [userLocation,setuserLocation]=useState(null);

    const addLocation=(obj)=>{

        setuserLocation(()=>(obj && {longitude:obj.longitude,latitude:obj.latitude}))
    }
    return(
        <userLocationContext.Provider value={{addLocation,userLocation}}>
            {children}
        </userLocationContext.Provider>
    )
}
export default LocationProvider;
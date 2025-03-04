import {View,Text,StyleSheet,Button,Image,FlatList,ScrollView,PermissionsAndroid,Platform,Linking,BackHandler} from 'react-native'
import * as React from 'react';
import Icon from '@expo/vector-icons/Ionicons';
import { useContext } from "react";
import {AddpetContext} from './contexts/newPetContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import daycare from './assets/images/daycare.png'
import grooming from './assets/images/grooming.png'
import pharma from './assets/images/pharma.png'
import training from './assets/images/training.png'
import daycareNearYouImage from  './assets/images/dayCareNearYou.png'
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { useFocusEffect } from '@react-navigation/native'; 
import { useCallback } from 'react'
import medicineImage from './assets/images/medicinesImage.png'
import adviceImage from './assets/images/adviceImage.png'
import dietImage from './assets/images/dietImage.png'
import articleImage from './assets/images/dayCareNearYou.png'

import rabbit from './assets/images/rabbit.png';
import parrot from './assets/images/parrot.png';
import cat from './assets/images/cat.png';
import dog from './assets/images/dog.png';


    const articleData=[{id:1,image:articleImage},{id:2,image:articleImage},{id:3,image:articleImage},{id:4,image:articleImage},]

const petTypes = [
    { id: "0", name: "dog", PetImage: dog },
    { id: "1", name: "cat", PetImage: cat },
    { id: "2", name: "rabbit", PetImage: rabbit },
    { id: "3", name: "parrot", PetImage: parrot }
];


const services=[{
  name:"Day Care",
  image:daycare,
},
{
  name:"grooming",
  image:grooming,
},
{
name:"Pharma",
image:pharma
},
{
  name:"Training",
  image:training
}]

const daycareNearData = [
  {
    id: "1",
    name: "PawHealth Veterinary Clinic",
    image: daycareNearYouImage,
    location: { latitude: "17.3616", longitude: "78.4747" }
  },
  {
    id: "2",
    name: "PawHealth Veterinary Clinic",
    image: daycareNearYouImage,
    location: { latitude: "17.3833", longitude: "78.4011" }
  },
  {
    id: "3",
    name: "PawHealth Veterinary Clinic",
    image: daycareNearYouImage,
    location: { latitude: "17.4239", longitude: "78.4738" }
  },
  {
    id: "4",
    name: "PawHealth Veterinary Clinic",
    image: daycareNearYouImage,
    location: { latitude: "17.2543", longitude: "78.6829" }
  },
  {
    id: "5",
    name: "PawHealth Veterinary Clinic",
    image: daycareNearYouImage,
    location: { latitude: "17.3713", longitude: "78.4804" }
  },
  {
    id: "6",
    name: "PawHealth Veterinary Clinic",
    image: daycareNearYouImage,
    location: { latitude: "17.4062", longitude: "78.4691" }
  },
  {
    id: "7",
    name: "PawHealth Veterinary Clinic",
    image: daycareNearYouImage,
    location: { latitude: "17.3578", longitude: "78.4712" }
  },
  {
    id: "8",
    name: "PawHealth Veterinary Clinic",
    image: daycareNearYouImage,
    location: { latitude: "17.4290", longitude: "78.4747" }
  },
  {
    id: "9",
    name: "PawHealth Veterinary Clinic",
    image: daycareNearYouImage,
    location: { latitude: "17.4483", longitude: "78.3915" }
  },
  {
    id: "10",
    name: "PawHealth Veterinary Clinic",
    image: daycareNearYouImage,
    location: { latitude: "17.4504", longitude: "78.3808" }
  }
];




export function HomeScreen({ navigation }) {

  useFocusEffect(
    useCallback(() => {
        const onBackPress = () => {
            // Exit the app when the back button is pressed
            BackHandler.exitApp();
            return true; // Prevent default back behavior
        };

        // Add event listener for the back button/gesture
        BackHandler.addEventListener('hardwareBackPress', onBackPress);

        // Clean up the event listener when the screen is unfocused
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        };
    }, []) // Empty dependency array to ensure the callback is only created once
);
  const {submitData,addPetToList}=useContext(AddpetContext)
  const [seeAll,setSeeAll]=useState(false)
  const renderPetDetails=({item})=>{
   
      return (
       
      <View style={{ width: 100, height: 100,borderRadius:14, margin:15,justifyContent:"center",}}>
        <Image source={{uri:(item.image.uri)}} resizeMode='cover' style={{ width: 100, height: 100,borderRadius:14, }}></Image>
        <Text style={{textAlign:"center"}}>{item.name}</Text>
      </View>   
      )
  }

  const openLocation=(latitude,longitude)=>{
    const url=`https://www.google.com/maps?q=${latitude},${longitude}`
    Linking.openURL(url)
  }
    return (
   
      <ScrollView >   
        
      <View style={{margin:10,}}>
        <View style={{flexDirection:"row",justifyContent:"flex-start",marginRight:100}}>
          <View>
          <TouchableOpacity style={{width:100,height:100,alignItems:"center",backgroundColor:"#fff",justifyContent:"center",borderRadius:14,marginTop:3}}
          onPress={()=>{navigation.navigate('addPet')}}>
            <Text style={{fontSize:20}} >+</Text>
            
          </TouchableOpacity>
          <Text style={{textAlign:"center"}}>Add pet</Text></View>
          <View >
         {submitData&&(
           <FlatList
           horizontal
           data={submitData}
           keyExtractor={item=>item.image.uri}
           
           renderItem={({item})=>(renderPetDetails({item}))}></FlatList>)}
          </View> 
      </View>
      </View>
          
      <View style={{backgroundColor:"#fff",width:"100%",height:170,margin:5,borderRadius:14}}>
        <View style={{backgroundColor:"#2C4C4C",height:150,margin:10,borderRadius:14,overflow: 'hidden'}}>
            <View style={styles.yellowContainer}></View>
              <Text style={styles.mainCardText}>Your Dog’s Well-Being,</Text> 
              <Text style={[styles.mainCardText,{marginTop:-15}]}> Our Priority!</Text>   
              <Image source={require('./assets/images/heapOfDogs.png')} style={{position:"absolute",right:0,bottom:20,}}></Image>
              <TouchableOpacity style={styles.bookNowButton} onPress={()=>navigation.navigate('Consult')}>
                <Text style={styles.bookNowText}>Book now</Text>
              </TouchableOpacity>
        </View>
      </View>
      <View style={{backgroundColor:"#fff",width:"100%",height:150,padding:15}}>
          <Text style={{fontWeight:500}}>Our Services</Text>
          <FlatList
          data={services}
          keyExtractor={item=>item.name}
          horizontal
          renderItem={({item})=>{
            return (
              <TouchableOpacity>
                <View style={{borderWidth:1,borderColor:"#2C4C4C",borderRadius:14,margin:4,padding:10}}>
                  <Image source={item.image} style={{padding:20}}></Image>
                </View>
                <Text style={{textAlign:"center"}}>{item.name}</Text>
              </TouchableOpacity>
            )
          }}>
          </FlatList>
      </View>

          <View style={{backgroundColor:"#fff"}}>
            <Text style={{fontWeight:500,padding:10,fontSize:16}}>Day Care Near You</Text>
          
            <Text style={{position:"absolute",right:20,top:10,color:"#64867B"}} onPress={()=>{setSeeAll(!seeAll)}}>see All</Text>
           
         {seeAll?(
         <ScrollView horizontal={false} showsHorizontalScrollIndicator={true}>
         { daycareNearData.map((item)=>(
   
           <TouchableOpacity onPress={()=>openLocation(item.location.latitude,item.location.longitude)}
           key={item.id}  style={styles.locationContainer}
          >   
               <Image source={item.image} style={{width:"100%",borderTopLeftRadius:14,borderTopRightRadius:14}}></Image>
               <Text style={{padding:10,fontWeight:500}}>{item.name}</Text>
               <Text style={{padding:4,marginTop:-10,color:"#939393"}}><Icon name="location-outline" size={12} ></Icon>Latitude:{item.location.latitude} Longitude:{item.location.longitude}</Text>
           </TouchableOpacity>
            
         ))}  
       </ScrollView>
         ):(<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            { daycareNearData.slice(0,6).map((item)=>(
      
              <TouchableOpacity onPress={()=>openLocation(item.location.latitude,item.location.longitude)}
              key={item.id}  style={styles.locationContainer}
             >   
                  <Image source={item.image} style={{width:"100%",borderTopLeftRadius:14,borderTopRightRadius:14}}></Image>
                  <Text style={{padding:10,fontWeight:500}}>{item.name}</Text>
                  <Text style={{padding:4,marginTop:-10,color:"#939393"}}><Icon name="location-outline" size={12} ></Icon>Latitude:{item.location.latitude} Longitude:{item.location.longitude}</Text>
              </TouchableOpacity>
               
            ))}  
          </ScrollView>)}
          <View style={styles.locationContainer}> 
            <Text style={{textAlign:'left',width:"100%",marginLeft:20,fontWeight:500}}>Shop By Pets</Text>
          <FlatList
          keyExtractor={(item)=>item.id}
          data={petTypes}
          horizontal
          renderItem={({item})=>{
            return(
              <View style={{margin:8}}>
                <View style={{borderRadius:10,backgroundColor:"#b1c2bc",}}>
                  <Image source={item.PetImage} style={{width:70,height:70}} ></Image>
                </View>
                <Text style={{textAlign:"center"}}>{item.name}</Text>
              </View>
            )
          }}
          />
          </View>
          <View style={[styles.locationContainer,{flexDirection:"row"}]}>
            <View style={{padding:10}}>
              <Image source={medicineImage} style={{borderRadius:14,width:160,}}></Image>
            </View>
            <View style={{justifyContent:"space-between",padding:0}}>
              <Image source={adviceImage} style={{borderRadius:14,width:150,marginTop:-10}}resizeMode='contain'></Image>
              <Image source={dietImage} style={{borderRadius:14,width:150,height:70}}></Image>
            </View>
          </View>


            <View style={styles.container}>
              <Text style={{fontWeight:500,fontSize:16,margin:10}}>Blogs</Text>
                  <FlatList
                  keyExtractor={(item)=>item.id.toString()}
                  data={articleData}
                  horizontal
                  renderItem={({item})=>{
                      return(
                          <TouchableOpacity onPress={()=>{navigation.navigate('Article info')}} style={{width:300,}}>
                         
                            
                            <Image source={item.image} style={{borderTopRightRadius:14,borderTopLeftRadius:14}}></Image>
                           
                              <Text style={{fontWeight:500,fontSize:16,paddingTop:10,marginLeft:10}}>Your Dog’s Best Life Starts Here</Text>
                              <Text style={{flexWrap:"wrap",color:"grey",fontSize:12,padding:10}}>Welcome to a treasure trove of knowledge tailored for dog lovers!  
                            </Text>
                         
                          </TouchableOpacity>
                      )
                  }}
                  />
                   </View>
          </View>
      </ScrollView>
    )
  }




  
  export function SettingsScreen({ navigation }) {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
  


  
    useEffect(() => {
      requestLocationPermission();
     
      
    }, []);
  
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Location permission denied');
          return;
        }
      }
      getCurrentLocation();
    };
  
    const getCurrentLocation = async () => {
      try {
        const { coords } = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Low,
        });
       
        setLocation(coords);


      } catch (error) {
     
        setErrorMsg(error.message);
      }
    };
   
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View>
          <Text>
            Location: {location ? `latitude: ${location.latitude} longitude: ${location.longitude}` : 'Fetching...'}
          
          </Text>
          {errorMsg ? <Text>Error: {errorMsg}</Text> : null}
          <Button title="Get Location" onPress={getCurrentLocation} />
        </View>
      </View>
    );
  }
  



const styles=StyleSheet.create({
  yellowContainer:{
    backgroundColor:"#E2AC59",position:"absolute",width:220,height:120,borderRadius:14,
    transform:[{rotateZ:"25deg"}],top:-70,
  },
  mainCardText:{
  padding:10,fontSize:23,fontWeight:400,color:"#fff"
  },
  bookNowButton:{marginLeft:30,backgroundColor:"#64867B",width:130,borderRadius:8},
  bookNowText:{color:"#fff",textAlign:"center",paddingVertical:8,fontSize:16,},
  locationContainer:{  
    backgroundColor: '#fff',
    borderRadius: 12,
   
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, 
    alignItems: 'center',
    
   } ,
   container: {
    backgroundColor: "#fff",
   paddingLeft:20,
    borderRadius: 14,
    elevation: 3, // Shadow for Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    margin:10
  },
             

})


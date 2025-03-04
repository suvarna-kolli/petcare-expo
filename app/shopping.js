import {View,Text, TouchableOpacity} from 'react-native'
import { useContext } from 'react';
import { AddpetContext } from './contexts/newPetContext';
import {cartContext} from './contexts/cartContext.js'

import React, { useEffect, useState } from 'react';
import { Image, FlatList, ActivityIndicator, StyleSheet } from 'react-native';


const API_URL = 'https://api.ictcircle.com/api/home/toplists/'; 




const ShoppingScreen=({navigation})=>{

  const { submitData, addPetToList } = useContext(AddpetContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [petName,setPetName]=useState('')
  const {addToCart,removeFromCart,removeEntireItem,cart}=useContext(cartContext)

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((result) => {
        setData(result.top_products[0].brand.categories);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });

  }, []);


  


  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }


    return(
        <View>  
            <FlatList
                        keyExtractor={(item) =>item.name}
                        data={submitData}
                        horizontal
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => {  setPetName(item.name); }}
                            style={[styles.clinicButtons,{borderColor:"grey",paddingVertical:10},petName===item.name &&{backgroundColor:"#64867B"}]}>
                                <Text style={[petName===item.name &&{color:"#fff"}]}>{item.name}</Text>
                               
                            </TouchableOpacity>
                        )}
                    />
    
        <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2} 
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) =>{
        return(
          <TouchableOpacity onPress={()=>navigation.navigate('details',{item})} style={styles.card}>
            <Image source={{uri:item.featured_image}} resizeMode='contain' style={{width:150,height:150}}></Image>
           
              <View style={{width:"100%"}}>  
              <Text style={{fontWeight:500,fontSize:16,marginTop:10}}>{item.name}</Text>
              <Text>{item.slug}</Text>
              <Text style={{fontWeight:500,fontSize:16,marginTop:10}}>₹{item.id}</Text>
              <TouchableOpacity style={{backgroundColor:"#64867B",paddingHorizontal:10,paddingVertical:5,borderRadius:8}}
              onPress={()=>{addToCart(item)}}>
                <Text style={{color:"#fff",textAlign:"center"}}>Add to Cart</Text>
              </TouchableOpacity>
                </View>
          </TouchableOpacity>
        )
      }
      }
     
    />
          
        </View>
    )
}
export default ShoppingScreen;

// Replace with your actual API URL

const styles = StyleSheet.create({
    clinicButtons:{backgroundColor:"#fff",borderWidth:1.5,borderColor:"#000",borderRadius:8,paddingHorizontal:10,paddingVertical:5,margin:10},

  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: 'center',
   width:"45%",
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    justifyContent:"space-evenly"
  },
  image: {
    width: 150,
    height:150,
    borderRadius: 10,
  },
  name: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});



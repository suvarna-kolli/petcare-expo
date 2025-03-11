import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView ,TouchableOpacity} from 'react-native';
import {useContext} from 'react'
import { cartContext } from './contexts/cartContext';

export default function DetailsScreen({navigation, route }) {
  const { item } = route.params;
  const {addToCart,removeFromCart,removeEntireItem,cart}=useContext(cartContext)

  // Generate random description if not available

  return (
    <ScrollView contentContainerStyle={{height:"90%"}}> 
    
     <View style={{width:"100%",height:300,alignItems:"center",justifyContent:"space-evenly"}}>
     <Image source={{uri:item.featured_image}} resizeMode="stretch" style={styles.image}></Image> 
     </View>
<View style={{backgroundColor:"#fff",width:"100%",alignItems:"flex-start",padding:20,borderRadius:8}}>
<Text style={{fontWeight:500,fontSize:16,marginTop:10}}>{item.name}</Text>
<Text style={{fontWeight:400,fontSize:16,marginTop:10}}>{item.slug}</Text>
      <Text style={{fontWeight:500,fontSize:16,marginTop:10}}>₹{item.id}</Text>
      <Text style={{fontWeight:500,color:"grey",fontSize:18,paddingVertical:10}}>Description</Text>
      <Text style={{fontSize:16,}}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </Text>
      <TouchableOpacity style={{backgroundColor:"#64867B",paddingHorizontal:10,paddingVertical:8,borderRadius:8,width:"100%",marginVertical:20}}  onPress={()=>{addToCart(item)}}>
        <Text style={{color:"#fff",textAlign:"center",fontSize:16}}>Add to Cart</Text>
      </TouchableOpacity>
</View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    alignItems: 'center',
   
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    color: '#2ecc71',
    marginVertical: 10,
  },
  details: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#777',
    marginTop: 10,
    paddingHorizontal: 15,
  },
});

import EvilIcon from '@expo/vector-icons/EvilIcons'
import { TouchableOpacity,View,Text,Image,StyleSheet} from 'react-native';
import capImage from './assets/images/cap.png'
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAvoidingView ,Platform} from 'react-native';
import React from 'react';
const AddressConfirmationScreen=({navigation})=>{
    return(
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{ flex: 1 }}
            >
        <View style={{flex:1}}>
        <ScrollView contentContainerStyle={{paddingBottom:100}}>
        <View style={[Styles.container,{alignItems:"flex-start",justifyContent:"space-evenly",marginBottom:20}]}>
            <Text style={{color:"#64867B",fontSize:16}}>Stewie Griffin</Text>
            <Text style={[Styles.text,]}><EvilIcon name="location" size={20} color="grey"></EvilIcon>123 Bark Street, Canine City, PA 10101</Text>
            <Text style={Styles.text}>+91 7022766423</Text>
            <TouchableOpacity style={[Styles.continueButton,{width:"100%",marginLeft:-12}]}><Text style={{color:"#fff",textAlign:"center"}}>Add new Address</Text></TouchableOpacity>
        </View>
        <Text style={{fontSize:18,fontWeight:500,marginLeft:20}}>Order Delivery Estimated Day</Text>
       <View style={[Styles.container,{flexDirection:"row",justifyContent:"space-evenly"}]}>
       <View>
            <Image source={capImage} style={{wwidth:50,height:50}} resizeMode="contain"></Image>
        </View>
        <View style={{flexWrap:"wrap",width:"75%"}}>
            <Text style={[Styles.priceText,{fontSize:16,flexWrap:"wrap",width:"100%"}]}>ALL4PETS PACHMINA HIGH NECK</Text>
            <Text style={Styles.text}>100g</Text>
            <Text>Get Delivery by 27 Jul 2024</Text>
            <Text style={Styles.priceText}>Order ID - 561681</Text>
        </View>
       </View>
       </ScrollView>
       <View style={Styles.continueContainer}>
       <TouchableOpacity style={[Styles.continueButton,{marginTop:20}]} onPress={()=>navigation.navigate('payment')}  >
                   <Text style={{fontSize:18,color:"#fff",textAlign:"center"}}>Continue</Text>
               </TouchableOpacity>
               </View>
        </View>
        </KeyboardAvoidingView>
    )
}

export default AddressConfirmationScreen;
const Styles=StyleSheet.create({
    container: {
        marginTop:20,
         backgroundColor: '#FFFFFF',
         padding: 20,
         borderRadius: 10,
         alignItems: 'center',
         justifyContent: 'space-evenly',
         shadowColor: '#000',
         shadowOpacity: 0.1,
         shadowOffset: { width: 0, height: 2 },
         shadowRadius: 4,
         elevation: 3,
         marginLeft:10,
         marginRight:10,
        
       },
       cartButtons:{borderWidth:1,borderColor:"grey",borderTopLeftRadius:2,borderBottomLeftRadius:2,padding:8},
       PriceDetails:{flexDirection:"row",justifyContent:"space-between",width:"100%",padding:5},
       text:{color:"grey"},
       priceText:{fontWeight:500},
       continueButton:{
        paddingHorizontal:15,
        paddingVertical:6,
        backgroundColor:"#64867B",
        borderRadius:8,
        margin:20

    },

 
    continueContainer: {
        position:"absolute",
        bottom:0,
        width: "100%", 
        backgroundColor: "#fff",
    },
})
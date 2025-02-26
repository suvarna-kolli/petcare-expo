import React ,{useEffect}from 'react';
import { View, Text, StyleSheet,Image ,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import gpayIcon from './assets/images/gpayIcon.png'
import phonePeIcon from './assets/images/phonePeIcon.png'
import paytmIcon from './assets/images/paytmIcon.png'
import creditCard from './assets/images/creditCard.png'
import netBanking from './assets/images/netBanking.png'
const PaymentScreen=({navigation})=>{
    return(
        <View style={{flex:1}}>
            <Text style={{marginLeft:20,fontWeight:500,fontSize:18,marginTop:20}}>Recommended</Text>
        <View style={[styles.container,{height:160,padding:0}]}>
        <View style={styles.queryContainer}>
        <View style={{flexDirection:"row",}}><Image source={gpayIcon}></Image>
        <Text style={{fontSize:16,fontweight:500,marginLeft:5}}>Google Pay UPI</Text>
        </View>
        <Text><Icon name="chevron-right" size={40}></Icon></Text>
        </View>
        <View style={styles.queryContainer}>
        <View style={{flexDirection:"row",}}><Image source={phonePeIcon}></Image>
        <Text style={{fontSize:16,fontweight:500,marginLeft:5}}>PhonePe</Text>
        </View>
        <Text><Icon name="chevron-right" size={40}></Icon></Text>
        </View>
        <View style={[styles.queryContainer ,{borderBottomWidth:0}]}>
        <View style={{flexDirection:"row",}}><Image source={paytmIcon}></Image>
        <Text style={{fontSize:16,fontweight:500,marginLeft:5}}>Pay Using Paytm</Text>
        </View>
        <Text><Icon name="chevron-right" size={40}></Icon></Text>
        </View>

       </View>
       <Text style={{marginLeft:20,fontWeight:500,fontSize:18,marginTop:20}}>Other Payment Options</Text>
       <View style={[styles.container,{height:200,padding:0}]}>
        <View style={styles.queryContainer}>
        <View style={{flexDirection:"row",}}><Image source={creditCard}></Image>
        <Text style={{fontSize:16,fontweight:500,marginLeft:5}}>Debit / Credit card</Text>
        </View>
        <Text><Icon name="chevron-right" size={40}></Icon></Text>
        </View>
        <View style={styles.queryContainer}>
        <View style={{flexDirection:"row",}}><Image source={netBanking}></Image>
        <Text style={{fontSize:16,fontweight:500,marginLeft:5}}>Net Banking</Text>
        </View>
        <Text><Icon name="chevron-right" size={40}></Icon></Text>
        </View>
        <View style={styles.queryContainer}>
        <View style={{flexDirection:"row",}}><Image source={paytmIcon}></Image>
        <Text style={{fontSize:16,fontweight:500,marginLeft:5}}>Paytm and Wallet</Text>
        </View>
        <Text><Icon name="chevron-right" size={40}></Icon></Text>
        </View>
        <View style={[styles.queryContainer ,{borderBottomWidth:0}]}>
        <View style={{flexDirection:"row",alignItems:'center'}}><View style={{backgroundColor:"#000",width:15,height:10}}><Text style={{color:"#fff",fontSize:5,textAlign:"center"}}>cash</Text></View>
        <Text style={{fontSize:16,fontweight:500,marginLeft:5}}>Cash on Delivery</Text>
        </View>
        <Text><Icon name="chevron-right" size={40}></Icon></Text>
        </View>

       </View>
         <View style={styles.continueContainer}>
               <TouchableOpacity style={[styles.continueButton,{marginTop:20}]} onPress={()=>navigation.navigate('orderConfirm')}  >
                           <Text style={{fontSize:18,color:"#fff",textAlign:"center"}}>Pay Now</Text>
                       </TouchableOpacity>
                       </View>
       </View>
    )
}

export default PaymentScreen;
const styles = StyleSheet.create({
    container: {
     marginTop:20,
      backgroundColor: '#FFFFFF',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      width: 330,
      height: 230,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 3,
      marginLeft:20
    },
    iconContainer: {
      width: 50,
      height: 50,
      borderRadius: 50,
      backgroundColor: '#64867B',
      alignItems: 'center',
      justifyContent: 'center',
   
    },
    text: {
      fontSize: 14,
      color: '#5E7D6B',
      fontWeight: '500',
    },
    queryContainer:{flexDirection:"row",borderBottomWidth:1,width:"100%",justifyContent:"space-between",borderColor:"lightgrey",paddingLeft:10},
    continueButton:{
        paddingHorizontal:20,
        paddingVertical:10,
        backgroundColor:"#64867B",
        borderRadius:8,

    },

 
    continueContainer: {
        position: "absolute",  
        bottom:50, 
        width: "100%", 
        padding: 10,
        backgroundColor: "#fff",
    },
  });
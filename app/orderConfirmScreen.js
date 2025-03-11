
import React ,{useEffect}from 'react';
import { View, Text, StyleSheet,Image ,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import stepBar from './assets/images/stepBar.png'
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAvoidingView ,Platform} from 'react-native';

const OrderConfirmationScreen = ({navigation}) => {
 useEffect(()=>{
        setTimeout(()=>{
        //   navigation.navigate('home')
        },3000)
    },[])


    const Step=({color})=>{
        return (
            <View style={{width:17,height:17,borderRadius:50,backgroundColor:"#64867B",alignItems:"center",justifyContent:"center"}}>
            <View style={{width:15,height:15,borderRadius:50,backgroundColor:"#fff",alignItems:"center",justifyContent:"center"}}>
                <View style={[{width:10,height:10,borderRadius:50,backgroundColor:"#fff",alignItems:"center",justifyContent:"center"},color&&{backgroundColor:"#64867B"}]}></View>
            </View>
        </View>
        )
    }
    return (
         <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                  >
        <View style={{flex:1}}>
          <ScrollView contentContainerStyle={{paddingBottom:100}}> 
        <View style={styles.container}>
        <View style={{height:70,width:70,backgroundColor:"#64867B",borderRadius:50,justifyContent:"center",alignItems:"center"}}>
        <View style={{height:60,width:60,backgroundColor:"#fff",borderRadius:50,justifyContent:"center",alignItems:"center"}}>

          <View style={styles.iconContainer}>
            <Icon name="check" size={30} color="#fff" />
          </View>
          </View>
          </View>
          <Text style={styles.text}>OrderPlace successful</Text>
          <Text>
          Thank you for choosing Furry Buddy
          </Text>
          <Text style={{color:"grey"}}>Your Order will be delivered by 27 Jul 2024</Text>

          <View style={{flexDirection:"row"}}>
            <Step color="#64867B"/><Text style={{marginTop:-6}}>__________</Text><Step/><Text style={{marginTop:-6}}>__________</Text><Step/><Text style={{marginTop:-6}}>__________</Text><Step/> 
          </View>
          <View style={{flexDirection:"row",justifyContent:'space-between',width:"100%"}}>
            <Text style={{fontSize:12}}>Order Placed</Text>
            <Text style={{fontSize:12}} >shipped</Text>
            <Text style={{fontSize:12}}>Out for delivery</Text>
            <Text style={{fontSize:12}}>Delivered</Text>
          </View>
        </View>
       <Text style={{fontSize:18,fontWeight:500,marginLeft:20}}>Need help with Your Order</Text>
       <View style={[styles.container,{height:170,padding:0}]}>
        <View style={styles.queryContainer}>
        <Text style={{fontSize:18,fontweight:500}}>Request Order Cancellation</Text>
        <Text><Icon name="chevron-right" size={40}></Icon></Text>
        </View>
        <View style={styles.queryContainer}>
        <Text style={{fontSize:18,fontweight:500}}>Talk to Our Support Team</Text>
        <Text><Icon name="chevron-right" size={40}></Icon></Text>
        </View>
        <View style={[styles.queryContainer,{borderBottomWidth:0}]}>
        <Text style={{fontSize:18,fontweight:500}}>Reach Out to Customer Support</Text>
        <Text><Icon name="chevron-right" size={40}></Icon></Text>
        </View>

       </View>
       </ScrollView>
        
    <View style={styles.continueContainer}>      
    <TouchableOpacity style={styles.continueButton}
    onPress={()=>navigation.navigate('home')}><Text style={{fontSize:20,color:"#fff",textAlign:"center"}}>Continue shopping</Text></TouchableOpacity>
    </View>
      
        </View>
        </KeyboardAvoidingView>
      );
};


const styles = StyleSheet.create({
    container: {
     marginTop:20,
      backgroundColor: '#FFFFFF',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      width: 330,
      height: 270,
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
     
        width: "100%", 
        padding: 20,
        backgroundColor: "#fff",
    },
  });


export default OrderConfirmationScreen;

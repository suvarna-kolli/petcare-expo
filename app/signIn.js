import { TextInput, View,Image, TouchableOpacity,Text, StyleSheet ,Button} from "react-native";

const SignIn=({navigation})=>{

    return (
        <View style={styles.container}>
        <Image source={require('./assets/images/PawfectCare.png')}></Image>
        <Image source={require('./assets/images/pet_commands_summon.png')}
        style={{position:"relative",top:-45,left:48}}></Image>

        <TextInput keyboardType="email-address" placeholder="Email or Phone Number" 
            placeholderTextColor="#93939390"
            style={styles.input}></TextInput>
        <TextInput secureTextEntry={true} placeholder=" Password"
        style={styles.input}  placeholderTextColor="#93939390"></TextInput>
        <Text style={{textAlign:"right",width:"100%",fontWeight:500,marginTop:-10}}>Forgot password?</Text>
        <TouchableOpacity style={styles.signInButton}>
            <Text style={{color:"white", textAlign:"center",fontSize:18}}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.hr}>
            <View style={styles.hrLine}></View>
             <View style={{position:"relative",top:5}}><Text style={{paddingHorizontal:5,}}>OR</Text></View>
            <View style={styles.hrLine}></View>
        </View>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",width:"100%"}}>
            <TouchableOpacity>
                    <Image source={require('./assets/images/google.png')}></Image>
            </TouchableOpacity>
            <TouchableOpacity>
                    <Image source={require('./assets/images/facebook.png')}></Image>
            </TouchableOpacity>
            <TouchableOpacity>
                    <Image source={require('./assets/images/apple.png')}></Image>
            </TouchableOpacity>
        </View>
         <View style={{flexDirection:"row",}}><Text style={{fontWeight:500}}>Don't have an account?</Text>
         <TouchableOpacity
         onPress={()=>{
            navigation.navigate('signUp')
         }}><Text style={{fontWeight:500,color:"rgb(99, 158, 239)",fontSize:16}}>Sign Up</Text></TouchableOpacity></View>

         <Text style={{color:"#64867B",fontSize:18,fontWeight:"500"}} 
         onPress={()=>{navigation.navigate('home')}}>Go to Home</Text>

     
    </View>
    )
  
}
export default SignIn;

const styles=StyleSheet.create({
container:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    gap:20,  
    paddingHorizontal:30,
    backgroundColor:"white"

},    
input:{
    borderWidth:2,
    borderColor:"#93939340",
    borderRadius:14,
    width:"100%",
    textAlign:"center",
    fontSize:16,
    paddingVertical:10,

},
signInButton:{
   paddingHorizontal:20,
   paddingVertical:10,
   backgroundColor:"#64867B",
   width:"100%",
    borderRadius:14
},
hr:{
  flexDirection:"row",
  justifyContent:"space-between"
},
hrLine:{
    width:'50%',
    borderBottomWidth: 2, 
    borderBottomColor: '#93939390'
}
})
import { TextInput, View,Image, TouchableOpacity,Text, StyleSheet } from "react-native";

const SignUp=({navigation})=>{

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
        <TextInput secureTextEntry={true} placeholder="confirm Password"
        style={styles.input}  placeholderTextColor="#93939390"></TextInput>
        <TouchableOpacity style={styles.signInButton}> 
            <Text style={{color:"white", textAlign:"center",fontSize:18}}>Sign Up</Text>

        </TouchableOpacity>
         <View style={{flexDirection:"row"}}><Text style={{fontWeight:500}}>Already have an account?</Text>
         <TouchableOpacity
         onPress={()=>{
            navigation.navigate('signUp')
         }}><Text style={{fontWeight:500,color:"rgb(99, 158, 239)",fontSize:16}}>Sign In</Text></TouchableOpacity></View>

<Text style={{color:"#64867B",fontSize:18,fontWeight:"500"}} 
         onPress={()=>{navigation.navigate('home')}}>Go to Home</Text>
    </View>
    )
  
}
export default SignUp;

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

},
signInButton:{
   paddingHorizontal:20,
   paddingVertical:10,
   backgroundColor:"#64867B",
   width:"100%",
    borderRadius:14
},
})
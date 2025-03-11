import { View ,Text,Image,StyleSheet,TouchableOpacity} from "react-native"
import {useState} from 'react'
import EvilIcon from '@expo/vector-icons/EvilIcons'

import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Platform } from "react-native";

export const CancelAppointmet=({navigation,route})=>{
    const {centerData,item,petName,date,slot}=route.params


    const formatDate = (date) => {
        return date.toLocaleDateString('en-GB', { 
          weekday: 'long', 
          day: '2-digit', 
          month: 'short', 
          year: '2-digit' 
        }) + " - " + date.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit', 
          hour12: true 
        }).replace(" ", ""); 
      };
    return(
     
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
        <View style={[styles.container,{flex:1}]}>
            <Text style={{color:"#ff0000",fontSize:16}}>Appointment Cancelled</Text>
            {/* <Text>{slot&&date?(`${date}-${slot.time}${slot.meridian}`):(`${new Date().toLocaleDateString()}-${new Date().toLocaleTimeString()}`)}</Text> */}
            <Text style={{color:"grey",fontSize:12,marginLeft:6}}>{formatDate(new Date())}</Text>
            <Text ><EvilIcon name="location" size={20}  style={{color:"gray", fontSize:20,}}></EvilIcon><Text  style={{color:"gray", fontSize:12}}>{`location:${centerData.centerLocation.latitude} and ${centerData.centerLocation.longitude}`} </Text></Text>
           
            <Text style={{color:"gray", fontSize:12,marginLeft:6}}>{`Booked for-${petName}`}</Text>


            <TouchableOpacity style={[styles.continueButton,{marginTop:20}]} onPress={()=>navigation.navigate('home')}  >
                    <Text style={{fontSize:18,color:"#fff",textAlign:"center"}}>Book Again</Text>
                </TouchableOpacity>

               


        </View>
        </KeyboardAvoidingView>
    )
}




export const CancelReason=({navigation,route})=>{
    const {centerData,item,petName,date,slot}=route.params
    const [selectedValue, setSelectedValue] = useState(null);


    const options = [
        "Busy with other plans",
        "Forgot the appointment",
        "Changed my mind",
        "Visited another Clinic",
        "Clinic is too far",
        "Other",
      ];

    const RadioButton = ({ label, selected, onPress }) => {
        return (
          <TouchableOpacity onPress={onPress} style={styles.radioContainer}>
            <View style={[styles.radioCircle, selected && styles.selectedCircle]}>
              {selected && <View style={styles.innerCircle} />}
            </View>
            <Text style={styles.label}>{label}</Text>
          </TouchableOpacity>
        );
      };


    return(
        <KeyboardAvoidingView
             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
             style={{ flex: 1 }}
           >
          <ScrollView style={{height:"80%"}}>
          <View style={[styles.container,{flexDirection:"row"}]}>
            <Image source={{uri:item.doctorImage}} style={{width:70,height:70,borderRadius:50,marginRight:20}}></Image>
            <View>
            <Text>Dr. {item.doctorName}</Text>
            <Text>Puppies and Kuddies</Text>
            </View>
          </View>
          <View style={styles.container}>
            <Text style={{color:"#64867B"}}>Time Slot</Text>
            <Text>{slot&&date?(`${date}-${slot.time}${slot.meridian}`):(`${new Date().toLocaleDateString()}-${new Date().toLocaleTimeString()}`)}</Text>

            <Text style={{color:"#64867B"}}>Appointment Id</Text>
            <Text>7632482</Text>

          </View>

        <Text style={{fontWeight:500,fontSize:16,marginLeft:10}}>Why do you no longer need this appointment?</Text>
          <View style={styles.container}>
             {options.map((option, index) => (
        <RadioButton
          key={index}
          label={option}
          selected={selectedValue === option}
          onPress={() => setSelectedValue(option)}
        />
      ))}
    </View>
    </ScrollView>
1   
 <View style={styles.continueContainer}>
                <TouchableOpacity style={[styles.continueButton,{marginBottom:10}]} onPress={()=>{navigation.navigate('Cancel Appointment',{centerData,item,petName,date,slot})}} >
                    <Text style={{fontSize:18,color:"#fff",textAlign:"center"}}>Continue cancellation</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.continueButton}  >
                    <Text style={{fontSize:18,color:"#fff",textAlign:"center"}} onPress={()=>navigation.navigate('confirmed')}> keep Appointment</Text>
                </TouchableOpacity>
            </View>

            </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#fff",
      padding: 15,
      borderRadius: 14,
      elevation: 3, // Shadow for Android
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      margin:10
    },
    radioContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 8,
    },
    radioCircle: {
      height: 20,
      width: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: "#1A4D2E",
      alignItems: "center",
      justifyContent: "center",
      marginRight: 10,
    },
    selectedCircle: {
      borderColor: "#1A4D2E",
    },
    innerCircle: {
      height: 10,
      width: 10,
      borderRadius: 5,
      backgroundColor: "#1A4D2E",
    },
    label: {
      fontSize: 16,
      color: "#000",
    },

    continueButton:{
        paddingHorizontal:20,
        paddingVertical:6,
        backgroundColor:"#64867B",
        borderRadius:8,

    },

 
    continueContainer: {
      
        width: "100%", 
        padding: 20,
        backgroundColor: "#fff",
    },

    calenderContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
  });

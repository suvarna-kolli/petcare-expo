import { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import EvilIcon from '@expo/vector-icons/EvilIcons'
import EntypoIcon from '@expo/vector-icons/Entypo'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'

export const AppointmentConfirmedScreen=({navigation,route})=>{
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
        }).replace(" ", ""); // Remove space before AM/PM
      };
return(
    <View style={{flex:1,height:"auto"}}>
        <View style={{backgroundColor:"#fff",height:140,justifyContent:"space-evenly",padding:10,borderRadius:14,margin:10}}>
            <Text style={{fontSize:16,fontWeight:500}}>{centerData.name}</Text>
            <Text ><EvilIcon name="location" size={20}  style={{color:"gray", fontSize:20,}}></EvilIcon><Text  style={{color:"gray", fontSize:12}}>{`location:${centerData.centerLocation.latitude} and ${centerData.centerLocation.longitude}`} </Text></Text>
            <Text style={{color:"grey"}}>{formatDate(new Date())}</Text>
            <Text style={{color:"gray", fontSize:12}}>{`Booked for-${petName}`}</Text>
            <View style={{flexDirection:"row",justifyContent:"flex-start"}}>
                <TouchableOpacity style={{backgroundColor:"#fff",borderWidth:1,paddingHorizontal:10,paddingVertical:5,borderRadius:8,marginRight:30}}><Text>Contact Clinic</Text></TouchableOpacity>
                <TouchableOpacity style={{backgroundColor:"#64867B",paddingHorizontal:10,paddingVertical:5,borderRadius:8}}><Text style={{color:"#fff"}}>Directions</Text></TouchableOpacity>
            </View>
        </View>
        <View style={styles.cancelContainer}>
      <View style={{flexDirection:"row",justifyContent:"flex-start"}}>  <Text ><EntypoIcon name="cross" size={36} color="grey"></EntypoIcon></Text><Text style={{marginTop:5,fontSize:16,fontWeight:500}} >  Cancel</Text>
      </View>
            <View><Text onPress={()=>{navigation.navigate('Cancel Reason',{centerData,item,petName,date,slot})}}><EvilIcon name="chevron-right" size={40} ></EvilIcon></Text></View>
        </View>

        <View style={styles.RescheduleContainer}>
           <View style={{flexDirection:"row",justifyContent:"flex-start"}}><Text><Icon name="calendar-month-outline" size={30} color="grey"></Icon></Text><Text style={{marginTop:5,fontSize:16,fontWeight:500}}>   Reschedule</Text></View>
            <View><Text
            onPress={()=>{navigation.navigate('Reschedule Appointment',{centerData,item,petName,date,slot})}}><EvilIcon name="chevron-right" size={40}></EvilIcon></Text></View>
        </View>

        <Text style={{fontSize:18,fontWeight:500,marginLeft:10}}>Booking Summary</Text>
        <View style={{backgroundColor:"#fff",borderRadius:14,margin:10,padding:20}}>
            <Text style={{color:"#64867B"}}>Booked for</Text>
            <Text>{petName}</Text>
            <Text style={{color:"#64867B"}}>Booked By</Text>
            <Text>Aarav Sharma</Text>
            <Text style={{color:"#64867B"}}>phone number</Text>
            <Text>7022766423</Text>
            <Text style={{color:"#64867B"}}>Appointment Id</Text>
            <Text>13182002</Text>
        </View>

        <View style={styles.continueContainer}>
  
            <TouchableOpacity style={styles.continueButton}><Text style={{fontSize:20,color:"#fff",textAlign:"center"}} onPress={()=>navigation.navigate('confirmed')}>Done</Text></TouchableOpacity>
        </View>
    </View>
)
}





const AppointmentScreen = ({ navigation, route }) => {
    const [date, setDate] = useState('');
    const [slot, setSlot] = useState(null);
    const {centerData,item,petName}=route.params
    // Generate dates array
    let dates = [];
    for (let i = 1; i <= 4; i++) {
        let nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + i); // Increment the date
        let formattedDate = new Intl.DateTimeFormat('en-US', {
            weekday: 'short',
            month: 'short',
            day: '2-digit',
        }).format(nextDate);
        dates.push({ day: formattedDate });
    }
    const slots=[{time:"11:00",meridian:"AM"},{time:"11:30",meridian:"AM"},{time:"12:00",meridian:"AM"},{time:"12:30",meridian:"PM"},{time:"01:00",meridian:"PM"},{time:"01:30",meridian:"PM"},{time:"06:00",meridian:"PM"},{time:"07:00",meridian:"PM"}]

    return (
        <View style={{marginTop:20,flex:1,height:"auto"}}>
            <Text style={{fontSize:18,fontWeight:500,marginLeft:15}}>Vest Visit Slots</Text>
            <View style={{ flexDirection: "row",marginBottom:20 }}>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={dates}
                    horizontal
                    renderItem={({ item }) => (
                        <View>
                            <TouchableOpacity
                                onPress={() => { setDate(item.day) }}
                                style={[
                                    styles.dateButton,
                                    date === item.day && { backgroundColor: "#64867B" } // Apply selected style
                                ]}
                            >
                                <Text style={[
                                    { fontSize: 12,color:"grey" },
                                    date === item.day && { color: "#fff" } // Apply selected text color
                                ]}>
                                    {item.day}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
            <Text style={{fontSize:18,fontWeight:500,marginLeft:15}}>Available Slots</Text>

            <View style={{flexDirection:"row",flexWrap:"wrap",justifyContent:"space-evenly"}}>
                {slots.map((item)=>(
                    <View >
                       <TouchableOpacity style={[styles.dateButton,{paddingHorizontal:10},slot&&slot.time===item.time && slot.meridian==item.meridian &&{backgroundColor:"#64867B"}]} onPress={()=>{setSlot(item)}}><Text style={[{fontSize:18,color:"#64867B"},slot&&slot.time===item.time && slot.meridian==item.meridian &&{color:"#fff"}]}>{item.time}</Text><Text style={[{color:"#64867B",fontSize:18,textAlign:"center"},slot&&slot.time===item.time && slot.meridian==item.meridian && {color:"#fff"}]}>{item.meridian}</Text>
                       </TouchableOpacity> 
                    </View>
                ))}
            </View>
            <View style={styles.continueContainer}>
                <TouchableOpacity style={styles.continueButton} onPress={()=>(navigation.navigate('Appointment Confirmed',{centerData,item,petName,date,slot}))} >
                    <Text style={{fontSize:20,color:"#fff",textAlign:"center"}}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AppointmentScreen;

const styles = StyleSheet.create({
    dateButton: {
        paddingHorizontal: 7,
        paddingVertical: 10,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 8,
        margin: 6,
    },
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
        padding: 20,
        backgroundColor: "#fff",
    },
    cancelContainer:{flexDirection:"row",justifyContent:"space-between",backgroundColor:"#fff",paddingVertical:10,borderRadius:14,margin:10},
    RescheduleContainer:{flexDirection:"row",justifyContent:"space-between",backgroundColor:"#fff",paddingVertical:10,borderRadius:14,margin:10}
});
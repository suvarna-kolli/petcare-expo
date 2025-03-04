import React, { useState, useEffect, useContext} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, TextInput, Alert, FlatList, Keyboard,Modal } from 'react-native';
import AntDesignIcon from '@expo/vector-icons/AntDesign';
import FontAwesomeIcon from '@expo/vector-icons/FontAwesome';
import MaterialIcon from '@expo/vector-icons/MaterialIcons';
import FeatherIcon from '@expo/vector-icons/Feather';

import clinicsData from './clinics.json';
import { useNavigation } from '@react-navigation/native'; 
import { SafeAreaView } from 'react-native';
import { Linking} from 'react-native';
import * as Sharing from 'expo-sharing';
import * as Location from 'expo-location';

import { useDispatch,useSelector } from 'react-redux';
import { addReport } from './redux/reportSlice.js';





export const PetCentersScreen = () => {
  const navigation = useNavigation(); 
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [globalData, setGlobalData] = useState([]);
  const [modal,setModal]=useState('')
  const [reportText,setReportText]=useState('')
  const [reportModal,setReportModal]=useState(false)
  const [reportError,setReportError]=useState('')

  const reportData=useSelector((state)=>state.reports)


  const dispatch=useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = clinicsData; // Replace with actual fetch call if needed
        setGlobalData(data);
  
       
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    fetchData();
  

  }, []);


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

 // Example output: "Tuesday, 02 Jul 24 - 12:00PM"
  

  





const shareData = async (item) => {
  try {
    // Check if sharing is available on the device
    const isSharingAvailable = await Sharing.isAvailableAsync();
    if (!isSharingAvailable) {
      Alert.alert('Error', 'Sharing is not available on this device');
      return;
    }

    // WhatsApp URL scheme
    const whatsappUrl = `whatsapp://send?text=Check out this awesome data: ${item.location}`;

    // Check if WhatsApp is available
    const isWhatsAppAvailable = await Linking.canOpenURL(whatsappUrl);

    if (isWhatsAppAvailable) {
      // Open WhatsApp if available
      await Linking.openURL(whatsappUrl);
    } else {
      // Fallback: Use expo-sharing for other apps
      await Sharing.shareAsync(item.location, {
        dialogTitle: 'Share via',
        mimeType: 'text/uri-list', // Mime type for text sharing
      });
    }
  } catch (error) {
    Alert.alert('Error', error.message); // Handle errors
  }
};

const toggleModal=()=>{
  setModal('')
  Keyboard.dismiss();
}
const openWhatsapp=(phno)=>{
  const phoneNumber = `+91${phno}`; 
  let url = `whatsapp://send?phone=${phoneNumber}&text=Hello, I'm interested in your pet care services.`;

  Linking.openURL(url).catch(() => {
    Alert.alert("Error", "WhatsApp is not installed on your device.");
  });
}


const openPhoneDialer = (phoneNumber) => {

  const url = `tel:${phoneNumber}`;
  Linking.openURL(url).catch((err) => {
    console.log("Error opening dialer", err);
  });

};    


const openGoogleMaps = async (destinationLat, destinationLng) => {
  try {
    let currentLocation = location; 

    // Fetch location again if it's not available
    if (!currentLocation) {
      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Low,
      });
      setLocation(coords); // Update state
      currentLocation = coords; // Use the new coords immediately
    }

    if (!currentLocation) {
      alert('Could not fetch location. Please try again.');
      return;
    }

    const url = `https://www.google.com/maps/dir/?api=1&origin=${currentLocation.latitude},${currentLocation.longitude}&destination=${destinationLat},${destinationLng}&travelmode=driving`;
    Linking.openURL(url);
    console.log("Fetching directions...");
  } catch (error) {
    console.error("Error fetching location:", error);
    alert("Failed to fetch location.");
  }
};

const reportSubmit = () => {
  if (reportText.trim() === '') {
    setReportError('This field should not be empty');
    return;
  }

  // Dispatch the addReport action with the report text
  dispatch(addReport({ id: Date.now(), content: reportText }));


  // Clear the input and error state
  Keyboard.dismiss()
  setReportText('');
  setReportError('');
  setReportModal(false)

  
};
    



  return (
    <TouchableWithoutFeedback onPress={toggleModal} accessible={false}>
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList 
        data={globalData}
        keyExtractor={(item) => String(item.centerId)}
        removeClippedSubviews={false}
        renderItem={({ item }) => (
          <View key={item.centerId} style={styles.centerContainer}>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
              <Text style={{fontWeight:500,fontSize:18}}>{item.name}</Text>
              <Text onPress={()=>setModal(item.centerId)} style={{fontSize:23,marginTop:-10}}>...</Text>
            </View> 
            <Text style={{color:"grey"}}>{formatDate(new Date())}</Text>
            <View style={{flexDirection:"row",justifyContent:"flex-start",gap:10}}>
              <TouchableOpacity style={styles.viewButton} onPress={()=>{navigation.navigate('clinics',{item})}}>
                <MaterialIcon name="article" size={20} color="#fff" /><Text style={{color:"#fff"}}>View</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => shareData(item)} style={styles.shareButton}>
                  <FeatherIcon name="share-2" size={20} /> <Text>Share</Text>
              </TouchableOpacity>
            </View>
           {item.centerId===modal&&(
            <View style={styles.OptionsmodalContainer}>
              <TouchableOpacity onPress={()=>(openPhoneDialer(item.phno))}><Text>call <FontAwesomeIcon name='phone' size={20}></FontAwesomeIcon></Text></TouchableOpacity>
              <TouchableOpacity onPress={()=>(openWhatsapp(item.phno))}><Text>contact  <FontAwesomeIcon name='whatsapp' size={20}></FontAwesomeIcon></Text></TouchableOpacity>
              <TouchableOpacity onPress={()=>(openGoogleMaps(item.centerLocation.latitude,item.centerLocation.longitude))}><Text>Directions <FontAwesomeIcon name='location-arrow' size={20}></FontAwesomeIcon></Text></TouchableOpacity>
              <TouchableOpacity><Text>favorite <FontAwesomeIcon name='star-o' size={20}></FontAwesomeIcon></Text></TouchableOpacity>
              <TouchableOpacity onPress={()=>setReportModal(item.centerId)}><Text>report<FontAwesomeIcon name='warning' size={20}></FontAwesomeIcon></Text></TouchableOpacity>
            </View>
            )}
    
    {item.centerId===reportModal&& (<View style={styles.modalContainer}>
        <View style={{borderWidth:2,borderRadius:10,padding:10}}>
          <Text style={styles.modalTitle}>Add Report</Text>
          <TextInput
            style={{borderWidth:1,borderColor:"grey",borderRadius:10,padding:5,margin:10}}
            multiline
            placeholder="Enter your report..."
            value={reportText}
            onChangeText={setReportText}
          />
          {reportError ? <Text style={styles.errorText}>{reportError}</Text> : null}
          <View style={{flexDirection:"row",justifyContent:"flex-end"}}>
          <TouchableOpacity onPress={()=>{setReportModal(false);setReportError('')}} style={styles.reportButton}><Text style={{color:"#fff"}}>cancel</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{reportSubmit()}}  style={styles.reportButton}><Text style={{color:"#fff"}}>Submit</Text></TouchableOpacity>
          </View>
        </View>
      </View>)}
   
          </View>
        )}
      />
    </SafeAreaView>     
    </TouchableWithoutFeedback>
  );
};

const ConsultScreen = () => {
  const navigation = useNavigation(); 
  const [showPetCenters, setShowPetCenters] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'space-evenly', flexDirection: 'row' }}>
      <TouchableOpacity style={styles.MedHistoryContainer}>
        <AntDesignIcon name="calculator" size={25} />
        <Text style={{ flexWrap: 'wrap' }}>Check Medical History</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.MedHistoryContainer}
        onPress={()=>(navigation.navigate('centerSelect'))}
      >
        <FontAwesomeIcon name="calendar-plus-o" size={25} />
        <Text style={{ flexWrap: 'wrap' }}>Book an Appointment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  MedHistoryContainer: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 5,
    padding: 20,
    borderRadius: 14,
    width: 150,
    marginTop: 20,
    height: 100,
  },
 centerContainer:{marginHorizontal:20,shadowColor:"#000",shadowOffset:{ width:0, height:2},shadowOpacity:0.2,shadowRadius:15,elevation:10,backgroundColor:"#fff",borderRadius:14,
justifyContent:"center",padding:20,marginVertical:10,gap:5},
viewButton:{flexDirection:"row",backgroundColor:"#64867B",paddingVertical:7,borderRadius:8,paddingHorizontal:20},
shareButton:{flexDirection:"row",paddingVertical:7,borderRadius:8,borderWidth:1,paddingHorizontal:20},
OptionsmodalContainer:{flex:1,position:"absolute",height:150,width:130,backgroundColor:"#fff",shadowColor:"#000",shadowOffset:{width:2,height:2},elevation:5,shadowOpacity:0.2,shadowRadius:10,right:0,borderRadius:10,justifyContent:"space-evenly",paddingLeft:10},
modalContainer:{flex:1,justifyContent:"center",position:"absolute",backgroundColor:"#fff",borderRadius:14,shadowColor:"#000",shadowOffset:{
  width:20,height:20
},shadowOpacity:0.1,elevation:100,width:300,alignSelf:"center",padding:5},
modalTitle:{fontSize:16,fontWeight:500,textAlign:"left"},
reportButton:{backgroundColor:"#64867B",borderRadius:8,padding:5,margin:10,paddingHorizontal:10},
errorText:{color:"red"}
});

export default ConsultScreen;
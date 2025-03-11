import * as React from 'react';
import {Image,StyleSheet,View,Text,Button, TouchableOpacity} from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import LoadScreen1 from './assets/images/LoadScreen1.png'
import LoadScreen2 from './assets/images/LoadScreen2.png'
import LoadScreen3 from './assets/images/LoadScreen3.png'
import PawfectCareImage from './assets/images/PawfectCareHead.png'
import feetImage from './assets/images/petFeetHead.png'
import  loadScreen from './LoadingScreens.js'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ellipse1 from './assets/images/Ellipse1.png'
import ellipse2 from './assets/images/Ellipse2.png'
import ellipse3 from './assets/images/Ellipse3.png'
import SignIn from './signIn.js';
import SignUp from './signUp.js';
import AddPet from './petType.js'
import Icon from '@expo/vector-icons/Ionicons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import addPetForm from './petRegistration.js'
import MyContextProvider from './contexts/newPetContext.js'
import { createDrawerNavigator } from '@react-navigation/drawer';
import ComIcon from '@expo/vector-icons/MaterialCommunityIcons';
import FeatherIcon from '@expo/vector-icons/Feather';
import MaterialIcon from '@expo/vector-icons/MaterialIcons'
import ConsultScreen from './consult.js'
import ServicesScreen from './services';
import ShoppingScreen from './shopping';
import ArticlesScreen from './articles';
import { HomeScreen } from './HomePage.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SettingsScreen } from './HomePage.js';
import FontAwesomeIcon from '@expo/vector-icons/FontAwesome'
import {PetCentersScreen} from './consult.js'
import { Provider } from 'react-redux';
import store from './redux/reportSlice';
import ClinicsList from './clinics'
import AppointmentScreen from './appointment.js'
import {AppointmentConfirmedScreen} from './appointment.js'
import {CancelReason} from './cancelAppointment'
import {CancelAppointmet} from './cancelAppointment'
import {Reschedule} from './RescheduleAppointment.js'
import {RescheduleConfirm} from './RescheduleAppointment.js'
import ConfirmationScreen from './confirm.js'
import {ArticleDetailsScreen} from './articles.js'
import detailsScreen from './detailsScreen.js'
import OrderConfirmationScreen from './orderConfirmScreen'
import CartContextProvider from './contexts/cartContext.js'
import CartScreen from './cartScreen.js'
import AddressConfirmationScreen from './address.js'
import PaymentScreen from './payment.js'
import userIcon from './assets/images/userIcon.png'
import  {ProfileScreen,MyPetsScreen,PastAppointmentsScreen,ManageOrdersScreen,LogoutScreen} from './drawerScreens.js'
import * as LocalAuthentication from 'expo-local-authentication';

const Stack=createNativeStackNavigator()
export const loadData=[
  {
  Itemid:1,
  image:LoadScreen1,
  ellipse:ellipse1,    
  content:" Keep your furry friend’s health history organized and accessible! ",
  additional:{}
  
},
{
  Itemid:2,
  image:LoadScreen2,
  ellipse:ellipse2,    
  content:"Book trusted dog-related services in just a few taps!",
  additional:{
    images:[PawfectCareImage,feetImage]
  }
},
{
  Itemid:3,
  image:LoadScreen3,
  ellipse:ellipse3,    
  content:" Shop for dog food, toys, and more—all in one app!  ",
  additional:{
    content:"Welcome"
  }
},
]






const StackNavigation=()=>{
  const navigation=useNavigation()
  return (
    <Stack.Navigator initialRouteName='start'>
    <Stack.Screen name='start'  component={startScreen} options={{ headerShown: false }}></Stack.Screen>
    <Stack.Screen name='load'   component={loadScreen} options={{ headerShown: false }}></Stack.Screen>
    <Stack.Screen name='signin' component={SignIn} options={{ headerShown: false }}></Stack.Screen>
    <Stack.Screen name='signUp' component={SignUp} options={{ headerShown: false }}></Stack.Screen>
    <Stack.Screen name='home'   component={DrawerNavigator} options={{ headerShown: false }}></Stack.Screen>
    <Stack.Screen name='addPet' component={AddPet} 
 
    ></Stack.Screen>
    <Stack.Screen name='addPetForm' component={addPetForm}
    //  options={{ 
    //   headerTitle:({navigation})=>(
    //     <View style={{ flex: 1, flexDirection: 'row',alignItems:"center",justifyContent:"center",width:"100%",paddingLeft:20}}>
    //      <TouchableOpacity onPress={()=>{
    //      }} >
    //      <Icon name="chevron-back-outline" size={25} style={{position:"relative",left:-140}}></Icon>
    //      </TouchableOpacity>
    //      <Text style={{fontWeight:500,fontSize:18,marginLeft:-40}}>Add pet</Text>
    //     </View>
    //   )
    // }}
    ></Stack.Screen>
    <Stack.Screen name='centerSelect'  component={PetCentersScreen}></Stack.Screen>
    <Stack.Screen name='clinics'  component={ClinicsList}></Stack.Screen>
    <Stack.Screen name='appointment'  component={AppointmentScreen}
    options={({route})=>({
         headerTitle:()=>{
           const {centerData,item}=route.params
          return(
            <View style={{flexDirection:"row",justifyContent:"space-evenly",marginLeft:-8}}>
             
             <Image source={{uri:(item.doctorImage)}} resizeMode='cover' style={{height:50,width:50,borderRadius:50,}}></Image>
              <View style={{flexDirection:"column "}}>
                <Text style={{fontSize:16,fontWeight:500,color:"#64867B"}}>Dr.{item.doctorName}</Text>
                <Text style={{color:"gray",fontSize:12}}>Dadar West - Puppies and Kuddies</Text>
              </View>
            
            </View>
          )
         }
        })}></Stack.Screen>
    <Stack.Screen name='Appointment Confirmed'  component={AppointmentConfirmedScreen}></Stack.Screen>
    <Stack.Screen name='Cancel Reason'  component={CancelReason}></Stack.Screen>
    <Stack.Screen name='Cancel Appointment'  component={CancelAppointmet}></Stack.Screen>
    <Stack.Screen name='Reschedule Appointment'  component={Reschedule}></Stack.Screen>
    <Stack.Screen name='Appointment Rescheduled'  component={RescheduleConfirm}></Stack.Screen>
    <Stack.Screen name='confirmed'  component={ConfirmationScreen}></Stack.Screen>
    <Stack.Screen name='Article info'  component={ArticleDetailsScreen}></Stack.Screen>

    <Stack.Screen name='cart' component={CartScreen}></Stack.Screen>
    <Stack.Screen name='details' component={detailsScreen}
     options={({ navigation }) => ({
      headerTitle: 'Shop',
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('cart')}
          style={{ marginRight: 15 }}
        >
          <Icon name="cart-outline" size={26} color="#000" />
        </TouchableOpacity>
      ),
    })}></Stack.Screen>
    <Stack.Screen name='orderConfirm' component={OrderConfirmationScreen}></Stack.Screen>

    <Stack.Screen name='Address' component={AddressConfirmationScreen}
     options={({ navigation }) => ({
      headerTitle: 'Address',
      headerRight: () => (
        <TouchableOpacity
          // onPress={() => navigation.navigate('cart')}
          style={{ marginRight: 15 }}
        >
          <Icon name="cart-outline" size={26} color="#000" />
        </TouchableOpacity>
      ),
    })}></Stack.Screen>

<Stack.Screen name='payment' component={PaymentScreen}
     options={({ navigation }) => ({
      headerTitle: 'payment',
      headerRight: () => (
        <TouchableOpacity
          // onPress={() => navigation.navigate('cart')}
          style={{ marginRight: 15 }}
        >
          <Icon name="cart-outline" size={26} color="#000" />
        </TouchableOpacity>
      ),
    })}></Stack.Screen>
    </Stack.Navigator>
  )
}





const Tab=createBottomTabNavigator()
const BottomTabNavigator=()=>{
 const navigation=useNavigation()
      return (
          <Tab.Navigator 
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Home') {return (<FeatherIcon name="home" color="#64867B" size={25}></FeatherIcon>)}
              else if (route.name === 'Consult'){return (<ComIcon name="stethoscope" color="#64867B" size={25}></ComIcon>)}
              else if (route.name === 'Shop') {return (<FeatherIcon name="shopping-cart" color="#64867B" size={25}></FeatherIcon>)}
              else if (route.name === 'Services'){return (<ComIcon name="view-list" color="#64867B" size={25}></ComIcon>)}
              else if (route.name === 'Articles') {return (<MaterialIcon name="library-books" color="#64867B" size={25}></MaterialIcon>)}
              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarLabelStyle: { fontSize: 12 }, // Style for text under icon
            tabBarActiveTintColor: '#64867B', // Active tab color
            tabBarInactiveTintColor: '#64867B', // Inactive tab color
           
          })}
        >
         
          <Tab.Screen name="Home" component={HomeScreen} 
          options={{
            headerTitle:()=>(
               <View style={{ flex: 1, flexDirection: 'row',alignItems:"center",justifyContent:"center",width:"100%",paddingLeft:20}}>
                <TouchableOpacity style={{position:"relative",left:-40}}
                onPress={()=>{navigation.toggleDrawer();}}>
                  <FontAwesomeIcon name="bars" size={22}></FontAwesomeIcon>
                </TouchableOpacity>
                 <Image source={require('./assets/images/PawfectCareHead.png')}></Image>
                 <Image style={{position:"relative",right:50}} source={require('./assets/images/petFeetHead.png')}></Image>
               </View>
            )
         }
         }
         />
          <Tab.Screen name="Consult" component={ConsultScreen} />
          <Tab.Screen name="Shop" component={ShoppingScreen} 
                  options={{
                    headerTitle: 'Shop',
                    headerRight: () => {
                       
                      return(
                      <TouchableOpacity onPress={() => navigation.navigate('cart')}
                      style={{marginRight:30}}>
                        <Icon name="cart-outline" size={26} color="grey" />
                      </TouchableOpacity>
      )},
                  }}/>
          <Tab.Screen name="Services" component={ServicesScreen} />
          <Tab.Screen name="Articles" component={ArticlesScreen} />
         
        </Tab.Navigator>
      )
  }

 

const Drawer = createDrawerNavigator();
const DrawerNavigator=({navigation})=>{
    return (
        <>
          <Drawer.Navigator initialRouteName='Home' >
          
            <Drawer.Screen name="Home" component={BottomTabNavigator} 
                     options={{
                      headerShown: false,
                      drawerLabel: () => (
                        <View style={styles.drawerItem}>
                         <View style={{backgroundColor:'#909c98',borderRadius:50, marginRight: 10,}}>
                           <Image
                            source={userIcon} // Replace with your image path
                            style={styles.drawerImage}
                          /></View>
                          <Text style={styles.drawerText}>Stewie Griffin</Text>
                        </View>
                      ),
                    }}
            ></Drawer.Screen>

<Drawer.Screen name="Profile" component={ProfileScreen} 
              options={{
                drawerIcon: ({ color, size }) => (
                  <FeatherIcon name="user" color={color} size={size} />
                ),
              }}/>

<Drawer.Screen name="My Pets" component={MyPetsScreen} 
              options={{
                drawerIcon: ({ color, size }) => (
                  <ComIcon name="cat" color={color} size={size} />
                ),
              }}/>

<Drawer.Screen name="Past Appointments" component={PastAppointmentsScreen} 
              options={{
                drawerIcon: ({ color, size }) => (
                  <ComIcon name="calendar-month-outline" color={color} size={size} />
                ),
              }}/>

<Drawer.Screen name="Manage Orders" component={ManageOrdersScreen} 
              options={{
                drawerIcon: ({ color, size }) => (
                  <ComIcon name="cube-outline" color={color} size={size} />
                ),
              }}/>

            <Drawer.Screen name="Settings" component={SettingsScreen} 
              options={{
                drawerIcon: ({ color, size }) => (
                  <Icon name="settings" color={color} size={size} />
                ),
              }}/>

<Drawer.Screen name="Logout" component={LogoutScreen} 
              options={{
              
                drawerIcon: ({ color, size }) => (
                  <FeatherIcon name="log-out" color={color} size={size} />
                ),
              }}/>
            {/* <Drawer.Screen name="articles" component={ArticlesScreen} 
                      options={{
                        headerTitle:()=>(
                           <View style={{ flex: 1, flexDirection: 'row',alignItems:"center",justifyContent:"center",width:"100%",paddingLeft:20}}>
                         
                             <Image source={require('./assets/images/PawfectCareHead.png')}></Image>
                             <Image style={{position:"relative",right:50}} source={require('./assets/images/petFeetHead.png')}></Image>
                           </View>
                        )
                     }
                     }
                     /> */}

          </Drawer.Navigator>
          </>
      );
}





const startScreen=({navigation})=>{
  useEffect(()=>{

    const authenticateWithFingerprint = async () => {
      const isBiometricSupported = await LocalAuthentication.hasHardwareAsync() && await LocalAuthentication.isEnrolledAsync();
  
      if (!isBiometricSupported) {
        Alert.alert('Biometric authentication is not supported or no biometric data is enrolled.');
        return;
      }
  
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to access the app',
        fallbackLabel: 'Use Passcode', // Only for iOS
      });
  
      if (result.success) {
        Alert.alert('Authentication successful!');
        // Proceed to the next screen or perform an action
      } else {
        Alert.alert('Authentication failed or canceled.');
      }
    };
    authenticateWithFingerprint();

    const id=setTimeout(()=>{
        navigation.navigate('load',loadData[0]) 
    },3000)

},[navigation])
  return (
    
    <SafeAreaProvider>
     <SafeAreaView  style={styles.container}>
       <Image source={require("./assets/images/PawfectCare.png")}/>
       <Image source={require("./assets/images/pet_commands_summon.png")}
       style={styles.mappedImage}
       />
   
     </SafeAreaView>
    </SafeAreaProvider>
     )
}






const App=()=>{
return (
<Provider store={store}>
<CartContextProvider>
  <MyContextProvider>
 <StackNavigation></StackNavigation>
  </MyContextProvider>
</CartContextProvider>
  </Provider>
)
}

const styles=StyleSheet.create({
  container:{
   flex:1,
   justifyContent:"center",
   alignItems:"center",
   
  
  },
  mappedImage:{
    position:"relative",
    top:-25,
    left:47
  },
  AddPetHead:{
   flex:1,
    flexDirection:"row",
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  
  },
  drawerImage: {
    width: 60,
    height: 60,
    borderRadius: 50, // Make it circular
  
  },
  drawerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000', // Customize the text color
  },

})

export default App;
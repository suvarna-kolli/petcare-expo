import React ,{useEffect}from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ConfirmationScreen=({navigation})=>{
    useEffect(()=>{
        setTimeout(()=>{
          navigation.navigate('home')
        },3000)
    },[])
    return (
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <View style={styles.container}>
        <View style={{height:70,width:70,backgroundColor:"#64867B",borderRadius:50,justifyContent:"center",alignItems:"center"}}>
        <View style={{height:60,width:60,backgroundColor:"#fff",borderRadius:50,justifyContent:"center",alignItems:"center"}}>

          <View style={styles.iconContainer}>
            <Icon name="check" size={30} color="#fff" />
          </View>
          </View>
          </View>
          <Text style={styles.text}>Appointment confirmed</Text>
        </View>
        </View>
      );
    }

    const styles = StyleSheet.create({
        container: {
          backgroundColor: '#FFFFFF',
          padding: 20,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          width: 330,
          height: 270,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
          elevation: 3,
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
      });

      export default ConfirmationScreen;
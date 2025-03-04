import { FlatList, TouchableOpacity, View, Text, Image,StyleSheet } from 'react-native';
import { AddpetContext } from './contexts/newPetContext';
import { useContext, useState } from 'react';
import DogClincImage from './assets/images/dayCareNearYou.png';
import CatClincImage from './assets/images/catClinic.webp';
import RabbitClinicImage from './assets/images/rabbitClinic.webp';
import ParrotClinicImage from './assets/images/parrotClinic.webp';
import EvilIcon from  '@expo/vector-icons/EvilIcons'


const images = [DogClincImage, CatClincImage, RabbitClinicImage, ParrotClinicImage];


const ClinicsList = ({ navigation, route }) => {
    const { submitData, addPetToList } = useContext(AddpetContext);
    const [petName, setPetName] = useState('');
    const [petBreed, setPetBreed] = useState(0);
    const { item } = route.params;
    const centerData=item;
    
    const centerName=centerData.name
    const location=centerData.centerLocation
  

    return (
       
        <View Style={{marginBottom:50}}>
            <FlatList
                keyExtractor={(item) =>item.name}
                data={submitData}
                horizontal
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => { setPetBreed(item.breedId); setPetName(item.name); }}
                    style={[styles.clinicButtons,{borderColor:"grey",paddingVertical:10},petName===item.name &&{backgroundColor:"#64867B"}]}>
                        <Text style={[petName===item.name &&{color:"#fff"}]}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
           {petBreed >= 0 &&  <FlatList
                keyExtractor={(item,index) => index.toString()}
                data={centerData.Clinics[petBreed]||[]}   
                renderItem={({ item }) => (
                    <View style={styles.clinicContainer}>
                        {petBreed >= 0 && <Image source={images[petBreed]} resizeMode="cover" style={styles.ClinicImage}/>}
                     <View style={{marginLeft:8,justifyContent:"space-evenly",height:130}}>
                        <Text style={{fontSize:16,fontWeight:500,}}>{centerName}</Text>
                        <Text ><EvilIcon name="location" size={20}  style={{color:"gray", fontSize:15,}}></EvilIcon><Text  style={{color:"gray", fontSize:12}}>{`location:${location.latitude} and ${location.longitude}`} </Text></Text>
                        <Text style={{color:"gray", fontSize:12,marginLeft:15}}>Puppies and kuddies</Text>
                        <View style={{flexDirection:"row"}}>
                        <TouchableOpacity style={styles.clinicButtons}><Text>Contact Clinic</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.clinicButtons,{backgroundColor:"#64867B",borderWidth:0}]}
                        onPress={()=>navigation.navigate('appointment',{centerData,item,petName})}><Text  style={{color:"#fff"}}>Book Appointment</Text></TouchableOpacity>
                        </View>
                     </View>
                    </View>
                )}
                contentContainerStyle={{ paddingBottom: 150 }} />}
        </View>
   
    );
};

export default ClinicsList;


const styles=StyleSheet.create({
    clinicContainer:{ marginHorizontal: 15 ,justifyContent:"center",shadowColor:"#000",shadowOffset:{
        width:0,height:2},shadowOpacity:"0.3",elevation:5,shadowRadius:2,backgroundColor:"#fff",borderRadius:14,marginVertical:10,
    },
    ClinicImage:{width:"100%",height:150,borderTopLeftRadius:14,borderTopRightRadius:14},
    clinicButtons:{backgroundColor:"#fff",borderWidth:1.5,borderColor:"#000",borderRadius:8,paddingHorizontal:10,paddingVertical:5,margin:10},
})
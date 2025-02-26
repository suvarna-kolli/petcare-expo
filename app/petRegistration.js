import React, { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import {
  View, Text, TextInput, StyleSheet, Alert, Image,
  KeyboardAvoidingView, TouchableOpacity, ScrollView, Platform
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useContext } from "react";
import {AddpetContext} from './contexts/newPetContext';


const AddPetForm = ({ navigation,route }) => {

  let {item}=route.params;
  const {submitData,addPetToList}=useContext(AddpetContext)
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [size, setSize] = useState('');
  const [activity, setActivity] = useState('');
  const [environment, setEnvironment] = useState('');
 
  const [vaccineHist, setVaccineHist] = useState('');
  const [allergy, setAllergy] = useState('');
  const [medConditions, setMedConditions] = useState('');
  const [status, setStatus] = useState('');
  
const error={name:"This field is required"}

  
  const breeds = [["Holland Lop", "Netherland Dwarf", "Flemish Giant"],
                  ["Maine Coon", "Siamese", "Bengal"],
                  [ "Labrador Retriever", "German Shepherd", "French Bulldog"],
                  ["African Grey", "Budgerigar", "Macaw"]];



const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
 mediaTypes: ImagePicker.MediaTypeOptions.Images,
allowsEditing: true,
   aspect: [4, 3],
   quality: 1,
  });
if (!result.canceled) {
  setImage(result.assets[0]); // Store the selected image
  }
  };



  const onChangeDate = (event, selectedDate) => {
    setShowPicker(false); // Hide the picker after selection
    if (selectedDate) {
      setDate(selectedDate); // Update the date state
    }
  };

  const showDatePicker = () => setShowPicker(true);

  const handleSubmit=()=>{
    const data={
      name:name,
      image:image,
      breedId:item.id,
    }
    addPetToList(data)

    setName('')
    setImage(null)
    setSelectedBreed('')
    setDate(null)
    setGender('')
    setMedConditions('')
    setAllergy('')
    setActivity('')
    setEnvironment('')
    setSize(0)
    setWeight(0)
    setVaccineHist('')
  }
 
 

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>

        {/* Image Picker */}
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {image ? (
          <Image source={{ uri: image.uri }} resizeMode="cover" style={styles.image} />
        ) : (
          <Text style={styles.addImageText}>+ Add Image</Text>
        )}
      </TouchableOpacity>

        {/* Name Input */}
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} placeholder="Enter pet name" value={name} onChangeText={setName}  required />

      {/* Breed Picker */}
      <Text style={styles.label}>Select Breed</Text>
<View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }}>
  <RNPickerSelect
    onValueChange={(itemValue) => setSelectedBreed(itemValue)}
    items={breeds[item.id].map((breed, index) => ({
      label: breed,
      value: breed,
      key: index,
    }))}
    value={selectedBreed}
   
  />
</View>


      {/* Date Picker */}
      <Text style={styles.label}>Date of Birth</Text>
      <TouchableOpacity onPress={showDatePicker}>
        <TextInput
          style={styles.input}
          value={date ? date.toDateString() : ''}
          editable={false}
        />
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

        {/* Gender Selection */}
        <Text style={styles.label}>Gender</Text>
        <View style={styles.toggleContainer}>
          {["Male", "Female"].map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.button,{width:"40%"}, gender === option && styles.selectedButton]}
              onPress={() => setGender(option)}
            >
              <Text style={[styles.buttonText,((gender===option)&&{color:"white",})]}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Weight & Size */}
        <Text style={styles.label}>Weight (kg)</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={weight} onChangeText={setWeight} />
        <Text style={styles.label}>Size (cm)</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={size} onChangeText={setSize} />

        {/* Activity Level */}
        <Text style={styles.label}>Activity Level</Text>
        <View style={styles.toggleContainer}>
          {["Low", "Moderate", "High"].map((level) => (
            <TouchableOpacity
              key={level}
              style={[styles.button, activity === level && styles.selectedButton]}
              onPress={() => setActivity(level)}
            >
              <Text style={[styles.buttonText,activity===level && {color:"white"}]}>{level}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Environment */}
        <Text style={styles.label}>Environment</Text>
        <View style={styles.toggleContainer}>
          {["Indoor", "Outdoor", "Mixed"].map((env) => (
            <TouchableOpacity
              key={env}
              style={[styles.button, environment === env && styles.selectedButton]}
              onPress={() => setEnvironment(env)}
            >
              <Text style={[styles.buttonText,environment===env&& {color:"white"}]}>{env}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Additional Inputs */}
        <Text style={styles.label}>Vaccination History</Text>
        <TextInput style={styles.input} value={vaccineHist} onChangeText={setVaccineHist} />
        <Text style={styles.label}>Medical Conditions</Text>
        <TextInput style={styles.input} value={medConditions} onChangeText={setMedConditions} />
        <Text style={styles.label}>Food Allergies</Text>
        <TextInput style={styles.input} value={allergy} onChangeText={setAllergy} />
        <Text style={styles.label}>Status</Text>
        <TextInput style={styles.input} value={status} onChangeText={setStatus} />

        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Text style={{color:"white",fontSize:16,fontWeight:500,textAlign:"center"}}>Submit</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddPetForm;

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { padding: 20, flexGrow: 1 },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, marginTop: 5 },
  picker: { height: 80, marginVertical:-20},
  imagePicker: { alignItems: "center", marginVertical: 20 },
  image: { width: 100, height: 100, borderRadius: 50 },
  addImageText: { fontSize: 18, color: "#555" },
  toggleContainer: { flexDirection: "row", justifyContent: "space-evenly", marginTop: 10, },
  button: { padding: 10, borderRadius: 5, borderWidth: 1, borderColor: "#ccc", margin: 5, },
  selectedButton: { backgroundColor: "#64867B" },
  buttonText: { color: "#000",fontSize:16,textAlign:"center" },
  submitButton:{width:"100%",margin:10,backgroundColor:"#64867B",marginBottom:100,paddingHorizontal:10,paddingVertical:10,borderRadius:14,marginTop:30}
});
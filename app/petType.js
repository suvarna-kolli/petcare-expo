import React, { useCallback } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

import rabbit from './assets/images/rabbit.png';
import parrot from './assets/images/parrot.png';
import cat from './assets/images/cat.png';
import dog from './assets/images/dog.png';

const petTypes = [
    { id: "0", name: "dog", PetImage: dog },
    { id: "1", name: "cat", PetImage: cat },
    { id: "2", name: "rabbit", PetImage: rabbit },
    { id: "3", name: "parrot", PetImage: parrot }
];

const AddPet = ({ navigation }) => {
    
    // Memoized function to prevent unnecessary re-renders
    const renderPets = useCallback(({ item }) => {
        return (
            <TouchableOpacity 
                style={styles.AddPetContainer} 
                onPress={() => navigation.navigate('addPetForm', { item })}
                activeOpacity={0.7} 
            >
                <Text style={styles.petText}>Do you have a {item.name}?</Text>
                <Image source={item.PetImage} style={styles.petImage} />
            </TouchableOpacity>
        );
    }, [navigation]);

    return (
        <View style={styles.container}>
            <FlatList
                data={petTypes}
                renderItem={renderPets}
                keyExtractor={(item) => item.id} 
                removeClippedSubviews={false} 
                windowSize={5}
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        width: "100%",
    },
    flatListContent: {
        flexGrow: 1,
        alignItems: "center",
        paddingBottom: 20,
    },
    AddPetContainer: {
        width: "90%",
        minHeight: 80,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#64867b",
        borderRadius: 14,
        paddingLeft: 15,
        marginVertical: 10,
    },
    petText: {
        fontWeight: "500",
        fontSize: 18,
        color: "white",
    },

});

export default AddPet;

import React, { useContext } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { KeyboardAvoidingView,Platform } from 'react-native';
import { cartContext } from './contexts/cartContext';

const CartScreen = ({ navigation }) => {
  const { addToCart, removeFromCart, removeEntireItem, cart } = useContext(cartContext);

  const uniqueData = (cart) => {
    const uniqueArray = cart.reduce((acc, obj) => {
      if (!acc.some((item) => item.id === obj.id)) {
        acc.push(obj);
      }
      return acc;
    }, []);
    return uniqueArray;
  };

  const CountOfItems = (item, cart) => {
    let count = 0;
    cart.forEach((obj) => {
      if (obj.id === item.id) {
        count++;
      }
    });
    return count;
  };

  const totalPrice = (cart) => {
    let price = 0;
    for (let i = 0; i < cart.length; i++) {
      price = price + cart[i].id;
    }
    return price;
  };

  return (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
    <View style={{ flex: 1 }}>
      {/* Scrollable content */}
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={uniqueData(cart)}
          renderItem={({ item }) => (
            <View style={[styles.container, { flexDirection: 'column' }]}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', alignItems: 'center' }}>
                <View style={{ marginRight: 10 }}>
                  <Image
                    source={{ uri: item.featured_image }}
                    resizeMode="contain"
                    style={{ width: 100, height: 100 }}
                  />
                </View>
                <View style={{ flexWrap: 'wrap', width: '75%' }}>
                  <Text style={{ fontWeight: '500', fontSize: 16, flexWrap: 'wrap' }}>{item.name}</Text>
                  <Text>{item.slug}</Text>
                  <Text>₹{item.id}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity style={styles.cartButtons} onPress={() => addToCart(item)}>
                    <Text>+</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ borderWidth: 1, borderColor: 'grey', padding: 8 }}>
                    <Text>{CountOfItems(item, cart)}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ borderWidth: 1, borderColor: 'grey', borderTopRightRadius: 2, borderBottomRightRadius: 2, padding: 8 }}
                    onPress={() => removeFromCart(item)}
                  >
                    <Text>-</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity
                    style={{ backgroundColor: '#ff0000', borderRadius: 8, padding: 14, marginTop: 10, paddingVertical: 5 }}
                    onPress={() => removeEntireItem(item)}
                  >
                    <Text style={{ color: '#fff' }}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          ListFooterComponent={
            <View style={styles.container}>
              <View style={{ borderBottomWidth: 1, borderColor: '#64867B', padding: 10, width: '100%', alignItems: 'center' }}>
                <Text style={{ color: '#64867B', fontSize: 18 }}>
                  Price Details ({cart.length}) Items
                </Text>
              </View>
              <View style={styles.PriceDetails}>
                <Text style={styles.text}>Total MRP</Text>
                <Text style={styles.priceText}>₹{totalPrice(cart)}</Text>
              </View>
              <View style={styles.PriceDetails}>
                <Text style={styles.text}>Discount on MRP</Text>
                <Text style={styles.priceText}>₹246</Text>
              </View>
              <View style={styles.PriceDetails}>
                <Text style={styles.text}>Delivery Fee</Text>
                <Text style={styles.priceText}>Free</Text>
              </View>
            </View>
          }
        />
      </ScrollView>

      {/* Fixed bottom button */}
      <View style={styles.fixedButtonContainer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('Address')}
        >
          <Text style={{ fontSize: 18, color: '#fff', textAlign: 'center' }}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>
    </KeyboardAvoidingView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    marginLeft: 10,
    marginRight: 10,
    flexWrap: 'wrap',
  },
  cartButtons: {
    borderWidth: 1,
    borderColor: 'grey',
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
    padding: 8,
  },
  PriceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 5,
  },
  text: {
    color: 'grey',
  },
  priceText: {
    fontWeight: '500',
  },
  continueButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#64867B',
    borderRadius: 8,
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
  },
});
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import EvilIcon from '@expo/vector-icons/EvilIcons';
import EntypoIcon from '@expo/vector-icons/Entypo';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

export const AppointmentConfirmedScreen = ({ navigation, route }) => {
  const { centerData, item, petName, date, slot } = route.params;

  const formatDate = (date) => {
    return (
      date.toLocaleDateString('en-GB', {
        weekday: 'long',
        day: '2-digit',
        month: 'short',
        year: '2-digit',
      }) +
      ' - ' +
      date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).replace(' ', '')
    ); // Remove space before AM/PM
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1 }}>
        {/* Scrollable content */}
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          <View style={styles.card}>
            <Text style={{ fontSize: 16, fontWeight: '500' }}>{centerData.name}</Text>
            <Text>
              <EvilIcon name="location" size={20} style={{ color: 'gray', fontSize: 20 }} />
              <Text style={{ color: 'gray', fontSize: 12 }}>
                {`Location: ${centerData.centerLocation.latitude} and ${centerData.centerLocation.longitude}`}
              </Text>
            </Text>
            <Text style={{ color: 'grey' }}>{formatDate(new Date())}</Text>
            <Text style={{ color: 'gray', fontSize: 12 }}>{`Booked for - ${petName}`}</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.outlineButton}>
                <Text>Contact Clinic</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filledButton}>
                <Text style={{ color: '#fff' }}>Directions</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.actionContainer}>
            <View style={styles.actionRow}>
              <EntypoIcon name="cross" size={36} color="grey" />
              <Text style={styles.actionText}>Cancel</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Cancel Reason', { centerData, item, petName, date, slot })}
            >
              <EvilIcon name="chevron-right" size={40} />
            </TouchableOpacity>
          </View>

          <View style={styles.actionContainer}>
            <View style={styles.actionRow}>
              <Icon name="calendar-month-outline" size={30} color="grey" />
              <Text style={styles.actionText}>Reschedule</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Reschedule Appointment', { centerData, item, petName, date, slot })}
            >
              <EvilIcon name="chevron-right" size={40} />
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Booking Summary</Text>
          <View style={styles.card}>
            <Text style={styles.label}>Booked for</Text>
            <Text>{petName}</Text>
            <Text style={styles.label}>Booked By</Text>
            <Text>Aarav Sharma</Text>
            <Text style={styles.label}>Phone Number</Text>
            <Text>7022766423</Text>
            <Text style={styles.label}>Appointment Id</Text>
            <Text>13182002</Text>
          </View>
        </ScrollView>

        {/* Fixed bottom button */}
        <View style={styles.fixedButtonContainer}>
          <TouchableOpacity
            style={styles.filledButton}
            onPress={() => navigation.navigate('confirmed')}
          >
            <Text style={{ fontSize: 20, color: '#fff', textAlign: 'center' }}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const AppointmentScreen = ({ navigation, route }) => {
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState(null);
  const { centerData, item, petName } = route.params;

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

  const slots = [
    { time: '11:00', meridian: 'AM' },
    { time: '11:30', meridian: 'AM' },
    { time: '12:00', meridian: 'AM' },
    { time: '12:30', meridian: 'PM' },
    { time: '01:00', meridian: 'PM' },
    { time: '01:30', meridian: 'PM' },
    { time: '06:00', meridian: 'PM' },
    { time: '07:00', meridian: 'PM' },
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1 }}>
        {/* Scrollable content */}
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          <Text style={styles.sectionTitle}>Vest Visit Slots</Text>
          <View style={{ flexDirection: 'row', marginBottom: 20 }}>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={dates}
              horizontal
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => setDate(item.day)}
                  style={[
                    styles.dateButton,
                    date === item.day && { backgroundColor: '#64867B' },
                  ]}
                >
                  <Text
                    style={[
                      { fontSize: 12, color: 'grey' },
                      date === item.day && { color: '#fff' },
                    ]}
                  >
                    {item.day}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>

          <Text style={styles.sectionTitle}>Available Slots</Text>
          <View style={styles.slotContainer}>
            {slots.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.slotButton,
                  slot &&
                    slot.time === item.time &&
                    slot.meridian === item.meridian && { backgroundColor: '#64867B' },
                ]}
                onPress={() => setSlot(item)}
              >
                <Text
                  style={[
                    { fontSize: 18, color: '#64867B' },
                    slot &&
                      slot.time === item.time &&
                      slot.meridian === item.meridian && { color: '#fff' },
                  ]}
                >
                  {item.time}
                </Text>
                <Text
                  style={[
                    { color: '#64867B', fontSize: 18, textAlign: 'center' },
                    slot &&
                      slot.time === item.time &&
                      slot.meridian === item.meridian && { color: '#fff' },
                  ]}
                >
                  {item.meridian}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Fixed bottom button */}
        <View style={styles.fixedButtonContainer}>
          <TouchableOpacity
            style={styles.filledButton}
            onPress={() =>
              navigation.navigate('Appointment Confirmed', { centerData, item, petName, date, slot })
            }
          >
            <Text style={{ fontSize: 20, color: '#fff', textAlign: 'center' }}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AppointmentScreen;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    margin: 10,
    padding: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  outlineButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginRight: 30,
  },
  filledButton: {
    backgroundColor: '#64867B',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRadius: 14,
    margin: 10,
    alignItems: 'center',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 10,
    marginTop: 10,
  },
  label: {
    color: '#64867B',
    marginTop: 10,
  },
  dateButton: {
    paddingHorizontal: 7,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
    margin: 6,
  },
  slotContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  slotButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
    margin: 6,
    alignItems: 'center',
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
  },
});
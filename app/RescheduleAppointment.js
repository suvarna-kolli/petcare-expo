import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import EvilIcon from '@expo/vector-icons/EvilIcons';

export const RescheduleConfirm = ({ navigation, route }) => {
  const { centerData, item, petName, date } = route.params;

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
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1 }}>
        {/* Scrollable content */}
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={{ uri: item.doctorImage }}
                style={{ width: 70, height: 70, borderRadius: 50, marginRight: 20 }}
              />
              <View>
                <Text>Dr. {item.doctorName}</Text>
                <Text>Puppies and Kuddies</Text>
              </View>
            </View>
            <View style={{ backgroundColor: '#fff', padding: 10, borderRadius: 14, marginTop: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: '500' }}>{centerData.name}</Text>
              <Text>
                <EvilIcon name="location" size={20} style={{ color: 'gray', fontSize: 20 }} />
                <Text style={{ color: 'gray', fontSize: 12 }}>
                  {`Location: ${centerData.centerLocation.latitude} and ${centerData.centerLocation.longitude}`}
                </Text>
              </Text>
              <Text style={{ color: 'grey' }}>{formatDate(new Date())}</Text>
              <Text style={{ color: 'gray', fontSize: 12 }}>{`Booked for - ${petName}`}</Text>
            </View>
          </View>
        </ScrollView>

        {/* Fixed bottom button */}
        <View style={styles.fixedButtonContainer}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => navigation.navigate('confirmed')}
          >
            <Text style={{ fontSize: 18, color: '#fff', textAlign: 'center' }}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export const Reschedule = ({ navigation, route }) => {
  const today = new Date().toISOString().split('T')[0];
  const { centerData, item, petName, date } = route.params;
  const [selectedDate, setSelectedDate] = useState(today);
  const [slot, setSlot] = useState(null);

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
        <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
          <View style={[styles.container, { flexDirection: 'row' }]}>
            <Image
              source={{ uri: item.doctorImage }}
              style={{ width: 70, height: 70, borderRadius: 50, marginRight: 20 }}
            />
            <View>
              <Text>Dr. {item.doctorName}</Text>
              <Text>Puppies and Kuddies</Text>
            </View>
          </View>

          <View style={styles.calenderContainer}>
            <Calendar
              current={today}
              onDayPress={(day) => setSelectedDate(day.dateString)}
              monthFormat={'MMMM yyyy'}
              hideExtraDays
              theme={{
                textSectionTitleColor: '#A0A0A0',
                selectedDayBackgroundColor: '#1A4D2E',
                selectedDayTextColor: '#FFFFFF',
                todayTextColor: '#1A4D2E',
                dayTextColor: '#000000',
                arrowColor: '#1A4D2E',
                textDisabledColor: '#D9E1E8',
                monthTextColor: '#000',
                textDayFontSize: 16,
                textMonthFontSize: 18,
                textDayHeaderFontSize: 12,
              }}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  selectedColor: '#1A4D2E',
                },
              }}
            />
          </View>

          <Text style={{ fontSize: 18, fontWeight: '500', marginLeft: 15, marginTop: 10 }}>
            Available Slots
          </Text>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
            {slots.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dateButton,
                  { paddingHorizontal: 17 },
                  slot && slot.time === item.time && slot.meridian === item.meridian && {
                    backgroundColor: '#64867B',
                  },
                ]}
                onPress={() => setSlot(item)}
              >
                <Text
                  style={[
                    { fontSize: 14, color: '#64867B' },
                    slot && slot.time === item.time && slot.meridian === item.meridian && {
                      color: '#fff',
                    },
                  ]}
                >
                  {item.time}
                </Text>
                <Text
                  style={[
                    { color: '#64867B', fontSize: 14, textAlign: 'center' },
                    slot && slot.time === item.time && slot.meridian === item.meridian && {
                      color: '#fff',
                    },
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
            style={styles.continueButton}
            onPress={() =>
              navigation.navigate('Appointment Rescheduled', { centerData, item, petName, date })
            }
          >
            <Text style={{ fontSize: 18, color: '#fff', textAlign: 'center' }}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    margin: 10,
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
  continueButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#64867B',
    borderRadius: 8,
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
  },
  calenderContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    margin: 10,
  },
});
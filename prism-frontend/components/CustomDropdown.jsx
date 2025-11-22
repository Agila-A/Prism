import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

/**
 * Reusable dropdown component using @react-native-picker/picker.
 */
const CustomDropdown = ({ label, selectedValue, onValueChange, items, placeholder }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          mode="dropdown"
          style={styles.picker}
          // The itemStyle is often ignored on Android, but useful for iOS styling
          itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
        >
          {/* Placeholder Item */}
          <Picker.Item label={placeholder} value={null} enabled={false} style={{ color: '#AAAAAA' }} />
          
          {/* Data Items */}
          {items.map((item) => (
            <Picker.Item key={item.value} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: { 
    marginBottom: 15 
  },
  inputLabel: { 
    fontSize: 12, 
    color: '#333333', 
    marginBottom: 5, 
    fontWeight: '500' 
  },
  pickerWrapper: {
    // Mimics the bottom border of a standard TextInput
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    paddingVertical: Platform.OS === 'android' ? 0 : 4, // Adjust padding for Android picker alignment
  },
  picker: {
    height: 40,
    width: '100%',
    color: '#333333',
  },
  pickerItem: { 
    fontSize: 14, 
  }
});

export default CustomDropdown;
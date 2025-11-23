// components/ProfileScreen.jsx

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomDropdown from './CustomDropdown';

const InputField = ({ label, placeholder, value, onChangeText, keyboardType = 'default', editable = true }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#AAAAAA"
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      editable={editable}
    />
  </View>
);

// Function to calculate age from DOB (DD-MM-YYYY)
const calculateAge = (dobString) => {
  if (!dobString || dobString.length !== 10) return '';
  const parts = dobString.split('-');
  if (parts.length !== 3) return '';

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return isNaN(age) || age < 0 ? '' : age.toString();
};

export function ProfileScreen({ onNext, step, updateFormData }) {
  // ⭐ Local state for all fields
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [maritalStatus, setMaritalStatus] = useState(null);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // Update age when DOB changes
  useEffect(() => {
    setAge(calculateAge(dob));
  }, [dob]);

  const maritalStatusOptions = [
    { label: 'Single', value: 'single' },
    { label: 'Married', value: 'married' },
    { label: 'Divorced', value: 'divorced' },
    { label: 'Widowed', value: 'widowed' },
  ];

  // ⭐ When NEXT is pressed
const handleNext = () => {
  updateFormData({
    age: age
  });

  onNext();
};


  return (
    <LinearGradient colors={['#3d10c3ff', '#818cf8']} style={styles.gradientBackground}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerBox}>
          <Text style={styles.headerText}>Loan Application Form</Text>
          <Text style={styles.subheaderText}>Step {step} of 4: Basic Profile Information</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardHeader}>👤 Basic Profile Information</Text>

          <InputField
            label="Full Name"
            placeholder="Deepika Aravindhan"
            value={fullName}
            onChangeText={setFullName}
          />

          <InputField
            label="Date of Birth (DD-MM-YYYY)"
            placeholder="22-02-2001"
            value={dob}
            onChangeText={setDob}
            keyboardType="numbers-and-punctuation"
          />

          <InputField
            label="Age (Auto-calculated)"
            placeholder="Age"
            value={age}
            editable={false}
          />

          <InputField
            label="Gender"
            placeholder="Female"
            value={gender}
            onChangeText={setGender}
          />

          <CustomDropdown
            label="Marital Status"
            placeholder="Select Marital Status"
            selectedValue={maritalStatus}
            onValueChange={setMaritalStatus}
            items={maritalStatusOptions}
          />

          <InputField
            label="Registered Address"
            placeholder="1st street, Sembulakulam Nagar"
            value={address}
            onChangeText={setAddress}
          />

          <InputField
            label="Phone Number"
            placeholder="8688140558"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <InputField
            label="Email ID"
            placeholder="deepikaaravindhan22@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: { flex: 1 },
  scrollContent: { paddingVertical: 40, alignItems: 'center' },
  headerBox: { marginBottom: 20, alignItems: 'center' },
  headerText: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 5 },
  subheaderText: { fontSize: 14, color: '#D1C4E9' },
  card: { backgroundColor: '#FFFFFF', borderRadius: 15, padding: 20, width: '90%', elevation: 8 },
  cardHeader: { fontSize: 18, fontWeight: 'bold', color: '#333333', marginBottom: 20 },
  inputContainer: { marginBottom: 15 },
  inputLabel: { fontSize: 12, color: '#333333', marginBottom: 5, fontWeight: '500' },
  input: { borderBottomWidth: 1, borderBottomColor: '#CCCCCC', paddingVertical: 8, fontSize: 14, color: '#333333' },
  nextButton: { backgroundColor: '#f68e53', borderRadius: 8, padding: 15, alignItems: 'center', marginTop: 20 },
  nextButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});

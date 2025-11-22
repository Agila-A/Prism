// components/FinancialScreen.jsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomDropdown from './CustomDropdown'; // Import the new component

const InputField = ({ label, placeholder, keyboardType = 'default' }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput style={styles.input} placeholder={placeholder} placeholderTextColor="#AAAAAA" keyboardType={keyboardType} />
  </View>
);

export function FinancialScreen({ onNext, onBack, step }) {
    const [defaultHistory, setDefaultHistory] = useState(null);

    const defaultHistoryOptions = [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' },
    ];

  return (
    <LinearGradient colors={['#3d10c3ff', '#818cf8']} style={styles.gradientBackground}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerBox}>
          <Text style={styles.headerText}>Loan Application Form</Text>
          <Text style={styles.subheaderText}>Step {step} of 4: Financial Information</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardHeader}>💰 Financial Information</Text>
          
          <InputField label="Monthly Salary (₹)" placeholder="45000" keyboardType="numeric" />
          <InputField label="Credit Score" placeholder="770" keyboardType="numeric" />
          <InputField label="Employment Duration (Months)" placeholder="12" keyboardType="numeric" />
          <InputField label="Existing EMI (₹/month)" placeholder="-1" keyboardType="numeric" />
          <InputField label="Bank Balance (₹)" placeholder="800" keyboardType="numeric" />
          <InputField label="Missed Payments (Last 12 months)" placeholder="0" keyboardType="numeric" />
          
          <CustomDropdown
            label="Default History"
            placeholder="Select Default History Status"
            selectedValue={defaultHistory}
            onValueChange={setDefaultHistory}
            items={defaultHistoryOptions}
          />

          <TouchableOpacity style={styles.nextButton} onPress={onNext}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>Back</Text>
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
  backButton: { alignItems: 'center', marginTop: 10 },
  backButtonText: { color: '#f68e53', fontSize: 14 },
});
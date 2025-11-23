// components/LoanDetailsScreen.jsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomDropdown from './CustomDropdown';

// Reusable input component
const InputField = ({ label, value, onChangeText, placeholder }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#AAAAAA"
      value={value}
      onChangeText={onChangeText}
    />
  </View>
);

export function LoanDetailsScreen({ onNext, onBack, step, updateFormData }) {
  const [loanType, setLoanType] = useState(null);
  const [loanAmount, setLoanAmount] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");

  const loanTypeOptions = [
    { label: 'Personal Loan', value: 'personal' },
    { label: 'Auto Loan', value: 'auto' },
    { label: 'Home Loan', value: 'home' },
    { label: 'Business Loan', value: 'business' },
  ];

  const handleNext = () => {
    // Only send what the ML model needs
    updateFormData({
      loan_amount: loanAmount,
    });

    onNext();
  };

  return (
    <LinearGradient colors={['#3d10c3ff', '#818cf8']} style={styles.gradientBackground}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.headerBox}>
          <Text style={styles.headerText}>Loan Application Form</Text>
          <Text style={styles.subheaderText}>Step {step} of 4: Loan Details</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardHeader}>💼 Loan Details</Text>

          <CustomDropdown
            label="Loan Type"
            placeholder="Select Loan Type"
            selectedValue={loanType}
            onValueChange={setLoanType}
            items={loanTypeOptions}
          />

          <InputField
            label="Loan Amount Requested (₹)"
            placeholder="70000"
            value={loanAmount}
            onChangeText={setLoanAmount}
          />

          <InputField
            label="Preferred Tenure (Months/Years)"
            placeholder="24 Months (2 Years)"
            value={loanTenure}
            onChangeText={setLoanTenure}
          />

          <InputField
            label="Loan Purpose"
            placeholder="Purchasing Home Items"
            value={loanPurpose}
            onChangeText={setLoanPurpose}
          />

          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next (to Document Upload)</Text>
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
  cardHeader: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 20 },

  inputContainer: { marginBottom: 15 },
  inputLabel: { fontSize: 12, color: '#333', marginBottom: 5, fontWeight: '500' },
  input: { borderBottomWidth: 1, borderBottomColor: '#CCC', paddingVertical: 8, fontSize: 14, color: '#333' },

  nextButton: { backgroundColor: '#f68e53', borderRadius: 8, padding: 15, alignItems: 'center', marginTop: 20 },
  nextButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },

  backButton: { alignItems: 'center', marginTop: 10 },
  backButtonText: { color: '#f68e53', fontSize: 14 },
});

// components/LoanFlowManager.jsx

import React, { useState } from 'react';
import { ProfileScreen } from './ProfileScreen';
import { FinancialScreen } from './FinancialScreen';
import { LoanDetailsScreen } from './LoanDetailsScreen';
import { DocumentScreen } from './DocumentScreen';
import { View, StyleSheet, Text } from 'react-native';

const MAX_STEPS = 4;

export function LoanFlowManager({ onFlowComplete, onBackToHistory }) {
  // 1: Profile, 2: Financial, 3: Loan Details, 4: Document
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, MAX_STEPS));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  const handleSubmit = () => {
      alert('Loan Application Submitted! Thank you.');
      onFlowComplete();
  };

  const renderScreen = () => {
    switch (currentStep) {
      case 1:
        return <ProfileScreen step={1} onNext={handleNext} />;
      case 2:
        return <FinancialScreen step={2} onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <LoanDetailsScreen step={3} onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <DocumentScreen step={4} onSubmit={handleSubmit} onBack={handleBack} />;
      default:
        onBackToHistory(); 
        return <View />;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
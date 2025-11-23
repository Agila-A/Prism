// components/LoanFlowManager.jsx

import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';

import { ProfileScreen } from './ProfileScreen';
import { FinancialScreen } from './FinancialScreen';
import { LoanDetailsScreen } from './LoanDetailsScreen';
import { DocumentScreen } from './DocumentScreen';
import { LoanResultScreen } from './LoanResultScreen';
import { AskPrismChat } from './AskPrismChat';   // ⭐ ADD THIS IMPORT

const MAX_STEPS = 4;

export function LoanFlowManager({ onFlowComplete, onBackToHistory }) {
  const [currentStep, setCurrentStep] = useState(1);

  // ⭐ Only ML Model Inputs
  const [formData, setFormData] = useState({
    age: "",
    salary: "",
    credit_score: "",
    existing_emi: "",
    loan_amount: "",
    default_history: "",
  });

  // ⭐ Final model result
  const [resultData, setResultData] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // ⭐ Ask Prism AI Chat
  const [showChat, setShowChat] = useState(false);
  const [chatPayload, setChatPayload] = useState(null);

  // ⭐ Merge new updates
  const updateFormData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, MAX_STEPS));
  const handleBack = () => {
    if (showChat) {
      setShowChat(false);
      return;
    }
    if (showResult) {
      setShowResult(false);
      return;
    }
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // ⭐ Final Submit
  const handleSubmit = async () => {
    try {
      if (
        !formData.age ||
        !formData.salary ||
        !formData.credit_score ||
        !formData.existing_emi ||
        !formData.loan_amount ||
        !formData.default_history
      ) {
        Alert.alert("Missing Fields", "Please fill out all required fields.");
        return;
      }

      const payload = {
        age: Number(formData.age),
        salary: Number(formData.salary) * 12,
        credit_score: Number(formData.credit_score),
        existing_emi: Number(formData.existing_emi),
        loan_amount: Number(formData.loan_amount),
        default_history: formData.default_history === "yes" ? 1 : 0,
      };

      console.log("📤 Sending payload:", payload);

      const response = await fetch("http://192.168.29.112:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("📥 Response:", result);

      if (!response.ok) {
        Alert.alert("Backend Error", JSON.stringify(result, null, 2));
        return;
      }

      setResultData(result);
      setShowResult(true);

    } catch (error) {
      console.log("❌ ERROR:", error);
      Alert.alert("Network Error", "Cannot reach Python backend.");
    }
  };

  // ⭐ Which screen to show?
  const renderScreen = () => {
    // 🔥 Chat AI Page
    if (showChat) {
      return (
        <AskPrismChat
          payload={chatPayload}
          onBack={() => setShowChat(false)}
        />
      );
    }

    // 🔥 Result Screen
    if (showResult) {
      return (
        <LoanResultScreen
          result={resultData}
          onBack={() => {
            setShowResult(false);
            onFlowComplete();
          }}
          onAskAI={(result) => {
            setChatPayload({
  decision: result.decision,
  probability: result.probability,
  explanation: result.explanation
});

            setShowChat(true);
          }}
        />
      );
    }

    // 🔥 Steps 1 → 4
    switch (currentStep) {
      case 1:
        return (
          <ProfileScreen
            step={1}
            onNext={handleNext}
            updateFormData={updateFormData}
          />
        );
      case 2:
        return (
          <FinancialScreen
            step={2}
            onNext={handleNext}
            onBack={handleBack}
            updateFormData={updateFormData}
          />
        );
      case 3:
        return (
          <LoanDetailsScreen
            step={3}
            onNext={handleNext}
            onBack={handleBack}
            updateFormData={updateFormData}
          />
        );
      case 4:
        return (
          <DocumentScreen
            step={4}
            onSubmit={handleSubmit}
            onBack={handleBack}
          />
        );
      default:
        onBackToHistory();
        return <View />;
    }
  };

  return <View style={styles.container}>{renderScreen()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

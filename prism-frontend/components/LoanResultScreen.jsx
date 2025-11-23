// components/LoanResultScreen.jsx

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CheckCircle, XCircle, HelpCircle, ArrowLeft } from "lucide-react-native";

export function LoanResultScreen({ result, onBack }) {
  const isApproved = result.decision === "Approved";

  return (
    <LinearGradient colors={['#eff6ff', '#dbeafe']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* BACK BUTTON */}
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowLeft size={24} color="#1e3a8a" />
        </TouchableOpacity>

        {/* STATUS ICON */}
        <View style={styles.iconContainer}>
          {isApproved ? (
            <CheckCircle size={80} color="#22c55e" />
          ) : (
            <XCircle size={80} color="#ef4444" />
          )}
        </View>

        {/* TITLE */}
        <Text style={styles.title}>
          Loan {isApproved ? "Approved" : "Rejected"}
        </Text>

        {/* PROBABILITY */}
        <Text style={styles.probability}>
          Probability Score: {Math.round(result.probability * 100)}%
        </Text>

        {/* REASONS */}
        <View style={styles.reasonBox}>
          <Text style={styles.reasonTitle}>Reason(s):</Text>

          {result.explanation.map((item, index) => (
            <Text key={index} style={styles.reasonLine}>• {item}</Text>
          ))}
        </View>

        {/* BUTTONS */}
        <TouchableOpacity style={styles.askButton}>
          <HelpCircle size={20} color="#fff" />
          <Text style={styles.askText}>Ask AI Why?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onBack} style={styles.backHomeButton}>
          <Text style={styles.backHomeText}>Back to Loan History</Text>
        </TouchableOpacity>

        

      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    paddingTop: 80,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    padding: 6,
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1e3a8a",
    marginBottom: 10,
  },
  probability: {
    fontSize: 16,
    fontWeight: "500",
    color: "#475569",
    marginBottom: 20,
  },
  reasonBox: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginTop: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },
  reasonTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 10,
  },
  reasonLine: {
    fontSize: 14,
    color: "#334155",
    marginBottom: 6,
    lineHeight: 20,
  },
  askButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6366f1",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  askText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 10,
  },
  backHomeButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  backHomeText: {
    color: "#1e40af",
    fontSize: 15,
    fontWeight: "600",
  },
});

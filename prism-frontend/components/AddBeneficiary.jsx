import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, User, CreditCard, Building, Mail } from "lucide-react-native";

export function AddBeneficiary({ onNavigate }) {

  const [accountType, setAccountType] = useState("savings");

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={["#eff6ff", "#f0f9ff"]}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity
            onPress={() => onNavigate("transfer")}
            style={styles.backButton}
          >
            <ArrowLeft color="#334155" size={20} />
          </TouchableOpacity>

          <View style={styles.headerTitles}>
            <Text style={styles.headerTitle}>Add Beneficiary</Text>
            <Text style={styles.headerSubtitle}>Add new recipient</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>

        {/* Full Name */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Full Name</Text>
          <View style={styles.inputContainer}>
            <User color="#64748b" size={20} />
            <TextInput
              placeholder="Enter beneficiary name"
              placeholderTextColor="#94a3b8"
              style={styles.input}
            />
          </View>
        </View>

        {/* Account Number */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Account Number</Text>
          <View style={styles.inputContainer}>
            <CreditCard color="#64748b" size={20} />
            <TextInput
              placeholder="Enter account number"
              placeholderTextColor="#94a3b8"
              keyboardType="number-pad"
              style={styles.input}
            />
          </View>
        </View>

        {/* Bank Name */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Bank Name</Text>
          <View style={styles.inputContainer}>
            <Building color="#64748b" size={20} />
            <TextInput
              placeholder="Enter bank name"
              placeholderTextColor="#94a3b8"
              style={styles.input}
            />
          </View>
        </View>

        {/* Email */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email (Optional)</Text>
          <View style={styles.inputContainer}>
            <Mail color="#64748b" size={20} />
            <TextInput
              placeholder="Enter email address"
              placeholderTextColor="#94a3b8"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
          </View>
        </View>

        {/* Account Type */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Account Type</Text>

          <View style={styles.accountTypeRow}>

            {/* Savings */}
            <TouchableOpacity
              onPress={() => setAccountType("savings")}
              style={styles.accountTypeButton}
            >
              {accountType === "savings" ? (
                <LinearGradient
                  colors={["#fb923c", "#f97316"]}
                  style={styles.accountTypeGradient}
                >
                  <Text style={styles.accountTypeTextActive}>Savings</Text>
                </LinearGradient>
              ) : (
                <Text style={styles.accountTypeText}>Savings</Text>
              )}
            </TouchableOpacity>

            {/* Checking */}
            <TouchableOpacity
              onPress={() => setAccountType("checking")}
              style={styles.accountTypeButton}
            >
              {accountType === "checking" ? (
                <LinearGradient
                  colors={["#fb923c", "#f97316"]}
                  style={styles.accountTypeGradient}
                >
                  <Text style={styles.accountTypeTextActive}>Checking</Text>
                </LinearGradient>
              ) : (
                <Text style={styles.accountTypeText}>Checking</Text>
              )}
            </TouchableOpacity>

          </View>
        </View>

        {/* Save Button */}
        <View style={styles.formGroup}>
          <TouchableOpacity style={styles.saveButton}>
            <LinearGradient
              colors={["#fb923c", "#f97316"]}
              style={styles.saveButtonGradient}
            >
              <Text style={styles.saveButtonText}>Add Beneficiary</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  header: { paddingHorizontal: 24, paddingTop: 60, paddingBottom: 24 },
  headerTop: { flexDirection: "row", alignItems: "center", gap: 12 },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.8)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTitles: { flex: 1 },
  headerTitle: { fontSize: 18, fontWeight: "600", color: "#0f172a" },
  headerSubtitle: { fontSize: 14, color: "#64748b", marginTop: 2 },
  scrollView: { flex: 1 },
  scrollContent: { padding: 24 },
  formGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "500", color: "#64748b", marginBottom: 8 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  input: { flex: 1, fontSize: 16, color: "#1e293b" },
  accountTypeRow: { flexDirection: "row", gap: 12 },
  accountTypeButton: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  accountTypeGradient: { paddingVertical: 12, alignItems: "center" },
  accountTypeText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#334155",
    textAlign: "center",
    paddingVertical: 12,
  },
  accountTypeTextActive: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  saveButton: {
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 12,
    elevation: 8,
  },
  saveButtonGradient: { paddingVertical: 16, alignItems: "center" },
  saveButtonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});

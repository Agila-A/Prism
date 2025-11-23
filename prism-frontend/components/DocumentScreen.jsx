// components/DocumentScreen.jsx

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as DocumentPicker from 'expo-document-picker';

const DocumentUploadBox = ({ title }) => {
  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets?.length > 0) {
        Alert.alert("Uploaded", `${title} uploaded successfully`);
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Failed to open document picker.');
    }
  };

  return (
    <View style={styles.uploadBox}>
      <Text style={styles.uploadTitle}>📄 {title}</Text>

      <TouchableOpacity style={styles.chooseFileButton} onPress={handleFilePick}>
        <Text style={styles.chooseFileText}>Choose File</Text>
      </TouchableOpacity>
    </View>
  );
};

export function DocumentScreen({ onSubmit, onBack, step }) {
  return (
    <LinearGradient colors={['#3d10c3ff', '#818cf8']} style={styles.gradientBackground}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.headerBox}>
          <Text style={styles.headerText}>Loan Application Form</Text>
          <Text style={styles.subheaderText}>Step {step} of 4: Document Upload & Submit</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardHeader}>📑 Document Upload (Optional)</Text>

          <DocumentUploadBox title="PAN Card" />
          <DocumentUploadBox title="Aadhaar Card" />
          <DocumentUploadBox title="Salary Slips" />

          <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
            <Text style={styles.submitButtonText}>Submit Application</Text>
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
  uploadBox: { borderWidth: 1, borderColor: '#CCC', borderRadius: 8, padding: 15, marginBottom: 15 },
  uploadTitle: { fontWeight: 'bold', color: '#333', marginBottom: 10 },
  chooseFileButton: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 5, alignSelf: 'flex-start' },
  chooseFileText: { color: '#FFF', fontSize: 14 },
  submitButton: { backgroundColor: '#f68e53', borderRadius: 8, padding: 15, alignItems: 'center', marginTop: 20 },
  submitButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  backButton: { alignItems: 'center', marginTop: 10 },
  backButtonText: { color: '#f68e53', fontSize: 14 },
});

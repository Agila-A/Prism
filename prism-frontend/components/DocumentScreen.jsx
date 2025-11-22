// components/DocumentScreen.jsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// --- NEW IMPORT ---
import * as DocumentPicker from 'expo-document-picker'; 
// --- NEW IMPORT ---

const DocumentUploadBox = ({ title }) => {
    // Stores the name of the file chosen by the user
    const [fileName, setFileName] = useState('No file chosen');
    
    const handleFilePick = async () => {
        try {
            // This opens the native document picker
            const result = await DocumentPicker.getDocumentAsync({
                type: '*/*', // Allows selecting any file type
                copyToCacheDirectory: true,
            });

            // Check if the user successfully selected a file (result.canceled is false)
            if (result.canceled === false && result.assets && result.assets.length > 0) {
                // Update the state with the selected file's name
                setFileName(result.assets[0].name);
                // Optional: You would also save result.assets[0].uri for the actual upload later
            } else {
                // User cancelled the picker
                if (fileName === 'No file chosen') {
                    setFileName('No file chosen');
                }
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
            <Text style={styles.fileName}>{fileName}</Text>
        </View>
    );
};

export function DocumentScreen({ onSubmit, onBack, step }) {
  return (
      // Background gradient as requested: ['#a78bfa', '#818cf8']
      // Note: I noticed your code in the prompt used ['#3d10c3ff', '#818cf8']. 
      // I will keep the previous blue-violet gradient ['#a78bfa', '#818cf8']
      // for consistency with the other three screens, but you can change it back.
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
  cardHeader: { fontSize: 18, fontWeight: 'bold', color: '#333333', marginBottom: 20 },
  uploadBox: { borderWidth: 1, borderColor: '#CCCCCC', borderRadius: 8, padding: 15, marginBottom: 15 },
  uploadTitle: { fontWeight: 'bold', color: '#333333', marginBottom: 10 },
  chooseFileButton: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 5, alignSelf: 'flex-start' },
  chooseFileText: { color: '#FFFFFF', fontSize: 14 },
  fileName: { fontSize: 12, color: '#666', marginTop: 5 },
  submitButton: { backgroundColor: '#f68e53', borderRadius: 8, padding: 15, alignItems: 'center', marginTop: 20 },
  submitButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  backButton: { alignItems: 'center', marginTop: 10 },
  backButtonText: { color: '#f68e53', fontSize: 14 },
});
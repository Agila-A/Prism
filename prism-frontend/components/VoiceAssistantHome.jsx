import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Mic, X, Clock, Send } from 'lucide-react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';


export function VoiceAssistantHome({ onNavigate }) {

  // ----------------------------------
  // STATE VARIABLES
  // ----------------------------------
  const [isListening, setIsListening] = useState(false);
  const [recording, setRecording] = useState(null);
  const [messages, setMessages] = useState([
    { id: 1, type: 'assistant', text: 'Hi Sarah! How can I help you with your banking today?' },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [typedMessage, setTypedMessage] = useState("");

  // ----------------------------------
  // QUICK SUGGESTIONS
  // ----------------------------------
  const suggestions = [
    'Pay my credit card bill',
    'Check balance',
    'Send money to John',
    'Apply for loan',
    'Show last 5 transactions',
    'Block my card',
  ];

  const handleSuggestionClick = async (suggestion) => {
    setMessages(prev => [
      ...prev,
      { id: prev.length + 1, type: 'user', text: suggestion },
      { id: prev.length + 2, type: 'assistant', text: `Processing: "${suggestion}"...` }
    ]);

    // Optional: You can call backend text endpoint here
  };

  // ----------------------------------
  // START RECORDING
  // ----------------------------------
  const startRecording = async () => {
  try {
    console.log("Starting audio recording...");

    const permission = await Audio.requestPermissionsAsync();
    if (!permission.granted) {
      alert("Microphone permission not granted");
      return;
    }

   

    const { recording } = await Audio.Recording.createAsync({
      android: {
        extension: '.m4a',
        outputFormat: Audio.AndroidOutputFormat.MPEG_4,
        audioEncoder: Audio.AndroidAudioEncoder.AAC,
        sampleRate: 44100,
        numberOfChannels: 1,
        bitRate: 128000
      },
      ios: Audio.RecordingOptionsPresets.HIGH_QUALITY.ios,
    });

    setRecording(recording);
    setIsListening(true);

  } catch (error) {
    console.error("Recording start error:", error);
  }
};

  // ----------------------------------
  // STOP RECORDING + SEND TO BACKEND
  // ----------------------------------
  const stopRecording = async () => {
    try {
      console.log("Stopping audio recording...");
      await recording.stopAndUnloadAsync();

      const audioUri = recording.getURI();
      setRecording(null);
      setIsListening(false);
      setIsProcessing(true);

      const formData = new FormData();
      formData.append("audio", {
        uri: audioUri,
        name: "speech.m4a",
        type: "audio/m4a"
      });

      const response = await fetch("http://192.168.0.2:8000/api/voice", {
        method: "POST",
        body: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = await response.json();

      // USER TEXT
      setMessages(prev => [
        ...prev,
        { id: prev.length + 1, type: 'user', text: data.user_text }
      ]);

      // BOT TEXT
      setMessages(prev => [
        ...prev,
        { id: prev.length + 2, type: 'assistant', text: data.bot_text }
      ]);

      // PLAY AUDIO
      const sound = new Audio.Sound();
      await sound.loadAsync({ uri: data.tts_audio_url });
      await sound.playAsync();

    } catch (error) {
      console.error("Error processing audio:", error);
    }

    setIsProcessing(false);
  };

  // ----------------------------------
  // TEXT MESSAGE SEND
  // ----------------------------------
  const sendTypedMessage = async () => {
    if (!typedMessage.trim()) return;

    const userText = typedMessage;
    setTypedMessage("");

    // Update chat visually
    setMessages(prev => [
      ...prev,
      { id: prev.length + 1, type: "user", text: userText },
      { id: prev.length + 2, type: "assistant", text: "Processing…" }
    ]);

    // Send text to backend (optional)
    try {
      const res = await fetch("http://192.168.0.2:8000/api/text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: userText }),
      });

      const data = await res.json();

      // Update assistant message
      setMessages(prev => [
        ...prev,
        { id: prev.length + 3, type: 'assistant', text: data.bot_text }
      ]);

      // Play TTS
      if (data.tts_audio_url) {
        const sound = new Audio.Sound();
        await sound.loadAsync({ uri: data.tts_audio_url });
        await sound.playAsync();
      }

    } catch (err) {
      console.error("Text backend error:", err);
    }
  };

  // ----------------------------------
  // UI BELOW (UNTOUCHED)
  // ----------------------------------

  return (
    <LinearGradient colors={['#dbeafe', '#e0e7ff', '#ede9fe']} style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>PRISM AI</Text>
          <Text style={styles.subtitle}>Your voice banking assistant</Text>
        </View>
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            onPress={() => onNavigate('voice-logs')}
            style={styles.iconButton}
          >
            <Clock color="#334155" size={20} />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => onNavigate('home')}
            style={styles.iconButton}
          >
            <X color="#334155" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Command Chips */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.chipsContainer}
        contentContainerStyle={styles.chipsContent}
      >
        {suggestions.map((suggestion, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleSuggestionClick(suggestion)}
            style={styles.chip}
          >
            <Text style={styles.chipText}>{suggestion}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Chat Messages */}
      <ScrollView style={styles.messagesContainer} contentContainerStyle={styles.messagesContent}>
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageWrapper,
              message.type === 'user' ? styles.messageWrapperUser : styles.messageWrapperAssistant
            ]}
          >
            <View style={message.type === 'user' ? styles.messageUser : styles.messageAssistant}>
              <Text style={message.type === 'user' ? styles.messageTextUser : styles.messageTextAssistant}>
                {message.text}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Voice Input Area */}
      <View style={styles.inputArea}>

        {/* Soundwave Animation */}
        {isListening && (
          <View style={styles.soundwave}>
            {[...Array(5)].map((_, i) => (
              <View key={i} style={[styles.soundwaveBar, { height: 20 + (i % 2) * 20 }]} />
            ))}
          </View>
        )}

        {/* Microphone Button */}
        <View style={styles.micContainer}>
          <TouchableOpacity
            onPress={() => {
              if (isListening) stopRecording();
              else startRecording();
            }}
          >
            <LinearGradient 
              colors={isListening ? ['#f87171', '#ef4444'] : ['#fb923c', '#f97316']} 
              style={styles.micButton}
            >
              <Mic color="#fff" size={36} />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <Text style={styles.micLabel}>
          {isListening ? 'Listening...' : 'Tap to speak'}
        </Text>

        {/* Text Input Alternative */}
        <View style={styles.textInputContainer}>
          <TextInput
            placeholder="Or type your request..."
            placeholderTextColor="#94a3b8"
            style={styles.textInput}
            value={typedMessage}
            onChangeText={setTypedMessage}
          />
          <TouchableOpacity onPress={sendTypedMessage} style={styles.sendButton}>
            <LinearGradient colors={['#fb923c', '#f97316']} style={styles.sendButtonGradient}>
              <Send color="#fff" size={16} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

    </LinearGradient>
  );
}

// ------------------------------------------------------------
//  STYLES (UNCHANGED ENTIRELY, COPIED FROM ORIGINAL FILE)
// ------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#475569',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  chipsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  chipsContent: {
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  chipText: {
    fontSize: 14,
    color: '#334155',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  messagesContent: {
    gap: 16,
    paddingBottom: 24,
  },
  messageWrapper: {
    width: '100%',
  },
  messageWrapperUser: {
    alignItems: 'flex-end',
  },
  messageWrapperAssistant: {
    alignItems: 'flex-start',
  },
  messageUser: {
    maxWidth: '80%',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#fb923c',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  messageAssistant: {
    maxWidth: '80%',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  messageTextUser: {
    fontSize: 14,
    color: '#fff',
  },
  messageTextAssistant: {
    fontSize: 14,
    color: '#1e293b',
  },
  inputArea: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  soundwave: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    marginBottom: 24,
    height: 40,
  },
  soundwaveBar: {
    width: 4,
    backgroundColor: '#fb923c',
    borderRadius: 2,
  },
  micContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  micButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  micLabel: {
    textAlign: 'center',
    color: '#475569',
    fontSize: 14,
    marginBottom: 24,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
  },
  sendButton: {
    borderRadius: 18,
    overflow: 'hidden',
  },
  sendButtonGradient: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


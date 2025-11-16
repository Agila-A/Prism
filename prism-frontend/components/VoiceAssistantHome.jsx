import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Mic, X, Clock, Send } from 'lucide-react-native';

export function VoiceAssistantHome({ onNavigate }) {
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'assistant', text: 'Hi Sarah! How can I help you with your banking today?' },
  ]);

  const suggestions = [
    'Pay my credit card bill',
    'Check balance',
    'Send money to John',
    'Apply for loan',
    'Show last 5 transactions',
    'Block my card',
  ];

  const handleSuggestionClick = (suggestion) => {
    setMessages([...messages, 
      { id: messages.length + 1, type: 'user', text: suggestion },
      { id: messages.length + 2, type: 'assistant', text: `Processing: "${suggestion}"...` }
    ]);
  };

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
          <TouchableOpacity onPress={() => setIsListening(!isListening)}>
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
          />
          <TouchableOpacity style={styles.sendButton}>
            <LinearGradient colors={['#fb923c', '#f97316']} style={styles.sendButtonGradient}>
              <Send color="#fff" size={16} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

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

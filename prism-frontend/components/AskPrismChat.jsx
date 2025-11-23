import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, SendHorizonal } from "lucide-react-native";

export function AskPrismChat({ payload, onBack }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  const BACKEND_URL = "http://192.168.29.112:8000";

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollToEnd({ animated: true });
  }, [messages]);

  // ⭐ Load first AI explanation
  const loadInitialMessage = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/ask-ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          result: {
            decision: payload.decision,
            probability: payload.probability,
            explanation: payload.explanation   // backend maps this to shap_reasons
          },
          user_language: "en"
        })
      });

      const data = await response.json();
      setMessages([{ sender: "ai", text: data.response }]);

    } catch (e) {
      setMessages([
        { sender: "ai", text: "I’m having trouble loading the explanation right now." }
      ]);
    }
  };

  useEffect(() => {
    loadInitialMessage();
  }, []);

  // ⭐ Send follow-up question
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input.trim();
    setInput("");

    // add user message
    setMessages(prev => [...prev, { sender: "user", text: userText }]);

    try {
      const response = await fetch(`${BACKEND_URL}/ask-ai-followup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          payload: {
            decision: payload.decision,
            probability: payload.probability,
            shap_reasons: payload.explanation,   // FIXED KEY NAME
            user_language: "en"
          },
          user_question: userText
        })
      });

      const data = await response.json();

      // add AI message
      setMessages(prev => [...prev, { sender: "ai", text: data.response }]);

    } catch (err) {
      setMessages(prev => [
        ...prev,
        { sender: "ai", text: "Sorry, I couldn’t reach the AI right now." }
      ]);
    }
  };

  return (
    <LinearGradient colors={["#eef2ff", "#dbeafe"]} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <ArrowLeft color="#1e3a8a" size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Ask Prism AI</Text>
      </View>

      <ScrollView ref={scrollRef} contentContainerStyle={styles.chatContainer}>
        {messages.map((msg, i) => (
          <View
            key={i}
            style={[
              styles.messageBubble,
              msg.sender === "user" ? styles.userBubble : styles.aiBubble
            ]}
          >
            <Text
              style={[
                styles.messageText,
                msg.sender === "user" ? styles.userText : styles.aiText
              ]}
            >
              {msg.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View style={styles.inputContainer}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Ask a question..."
            placeholderTextColor="#94a3b8"
            style={styles.input}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <SendHorizonal size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  title: { fontSize: 20, fontWeight: "700", color: "#1e3a8a" },
  chatContainer: { paddingHorizontal: 20, paddingBottom: 20 },
  messageBubble: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    maxWidth: "80%"
  },
  userBubble: { alignSelf: "flex-end", backgroundColor: "#4f46e5" },
  aiBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e2e8f0"
  },
  messageText: { fontSize: 15, lineHeight: 20 },
  userText: { color: "#fff" },
  aiText: { color: "#1e293b" },
  inputContainer: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#f8fafc",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb"
  },
  input: { flex: 1, fontSize: 15, paddingVertical: 10, color: "#0f172a" },
  sendButton: {
    backgroundColor: "#4f46e5",
    padding: 10,
    borderRadius: 999,
    marginLeft: 10
  }
});

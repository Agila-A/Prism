import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, CheckCircle, AlertTriangle, Info, Sparkles } from "lucide-react-native";

export function Notifications({ onNavigate }) {
  const notifications = [
    {
      id: 1,
      icon: CheckCircle,
      color: "#16a34a",
      bg: "#dcfce7",
      border: "#bbf7d0",
      title: "Payment Successful",
      message: "Your credit card payment of $450.00 was processed successfully",
      time: "2 hours ago",
    },
    {
      id: 2,
      icon: Sparkles,
      color: "#7c3aed",
      bg: "#ede9fe",
      border: "#ddd6fe",
      title: "AI Insight Available",
      message: "You can save $230 this month by optimizing your subscriptions",
      time: "5 hours ago",
    },
    {
      id: 3,
      icon: AlertTriangle,
      color: "#ea580c",
      bg: "#fed7aa",
      border: "#fdba74",
      title: "Bill Due Soon",
      message: "Your electricity bill of $85.50 is due in 3 days",
      time: "1 day ago",
    },
    {
      id: 4,
      icon: Info,
      color: "#2563eb",
      bg: "#dbeafe",
      border: "#bfdbfe",
      title: "Account Update",
      message: "Your monthly statement is now available for download",
      time: "2 days ago",
    },
    {
      id: 5,
      icon: CheckCircle,
      color: "#16a34a",
      bg: "#dcfce7",
      border: "#bbf7d0",
      title: "Transfer Complete",
      message: "Transfer of $250.00 to John Smith was successful",
      time: "3 days ago",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={["#effff6", "#f0f9ff"]}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => onNavigate("home")} style={styles.backButton}>
              <ArrowLeft color="#334155" size={20} />
            </TouchableOpacity>

            <View>
              <Text style={styles.headerTitle}>Notifications</Text>
              <Text style={styles.headerSubtitle}>{notifications.length} notifications</Text>
            </View>
          </View>

          <TouchableOpacity>
            <Text style={styles.markAllText}>Mark all read</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Notification List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {notifications.map((n) => {
          const Icon = n.icon;
          return (
            <TouchableOpacity
              key={n.id}
              style={[
                styles.notificationCard,
                { backgroundColor: n.bg, borderColor: n.border },
              ]}
            >
              <View style={styles.notificationLeft}>
                <View
                  style={[
                    styles.notificationIcon,
                    { backgroundColor: n.bg, borderColor: n.border },
                  ]}
                >
                  <Icon color={n.color} size={20} />
                </View>

                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>{n.title}</Text>
                  <Text style={styles.notificationMessage}>{n.message}</Text>
                  <Text style={styles.notificationTime}>{n.time}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Clear all */}
        <TouchableOpacity style={styles.clearAllButton}>
          <Text style={styles.clearAllText}>Clear All Notifications</Text>
        </TouchableOpacity>

        <View style={{ height: 120 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.8)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f172a",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 2,
  },
  markAllText: {
    color: "#f97316",
    fontSize: 14,
    fontWeight: "500",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  notificationCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  notificationLeft: {
    flexDirection: "row",
    gap: 12,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: "#334155",
    marginBottom: 8,
    lineHeight: 20,
  },
  notificationTime: {
    fontSize: 12,
    color: "#64748b",
  },
  clearAllButton: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    alignItems: "center",
    marginTop: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  clearAllText: {
    fontSize: 15,
    color: "#334155",
    fontWeight: "500",
  },
});

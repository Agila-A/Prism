import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowLeft,
  Zap,
  Wifi,
  Droplet,
  Phone,
  TrendingUp,
} from "lucide-react-native";

export function PayBills({ onNavigate }) {
  const billCategories = [
    {
      icon: Zap,
      label: "Electricity",
      colors: ["#fda4af", "#fb7185"],
      amount: "$85.50",
      due: "3 days",
    },
    {
      icon: Wifi,
      label: "Internet",
      colors: ["#60a5fa", "#3b82f6"],
      amount: "$59.99",
      due: "5 days",
    },
    {
      icon: Droplet,
      label: "Water",
      colors: ["#5eead4", "#2dd4bf"],
      amount: "$32.00",
      due: "Paid",
    },
    {
      icon: Phone,
      label: "Mobile",
      colors: ["#86efac", "#4ade80"],
      amount: "$45.00",
      due: "1 day",
    },
  ];

  const recentBills = [
    { id: 1, name: "Netflix Subscription", amount: "$15.99", date: "Nov 14", icon: "🎬" },
    { id: 2, name: "Spotify Premium", amount: "$9.99", date: "Nov 10", icon: "🎵" },
    { id: 3, name: "Amazon Prime", amount: "$14.99", date: "Nov 5", icon: "📦" },
  ];

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <LinearGradient
        colors={["#eff6ff", "#f0f9ff"]}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity
            onPress={() => onNavigate("home")}
            style={styles.backButton}
          >
            <ArrowLeft color="#334155" size={22} />
          </TouchableOpacity>

          <View style={styles.headerTitles}>
            <Text style={styles.headerTitle}>Pay Bills</Text>
            <Text style={styles.headerSubtitle}>
              Manage all your bills
            </Text>
          </View>
        </View>

        {/* SUMMARY CARD */}
        <LinearGradient
          colors={["#fb923c", "#f97316"]}
          style={styles.summaryCard}
        >
          <Text style={styles.summaryLabel}>Total Pending Bills</Text>
          <Text style={styles.summaryAmount}>$222.49</Text>

          <TouchableOpacity style={styles.payAllButton}>
            <Text style={styles.payAllText}>Pay All Now</Text>
          </TouchableOpacity>
        </LinearGradient>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >

        {/* BILL CATEGORIES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Utility Bills</Text>

          <View style={styles.billsGrid}>
            {billCategories.map((item, index) => {
              const Icon = item.icon;
              return (
                <TouchableOpacity key={index} style={styles.billCard}>
                  <LinearGradient colors={item.colors} style={styles.billIcon}>
                    <Icon color="#fff" size={24} />
                  </LinearGradient>

                  <Text style={styles.billLabel}>{item.label}</Text>
                  <Text style={styles.billAmount}>{item.amount}</Text>

                  <View
                    style={
                      item.due === "Paid" ? styles.paidBadge : styles.dueBadge
                    }
                  >
                    <Text
                      style={
                        item.due === "Paid" ? styles.paidText : styles.dueText
                      }
                    >
                      {item.due === "Paid" ? "Paid" : `Due in ${item.due}`}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* RECENT PAYMENTS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Payments</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          {recentBills.map((bill) => (
            <View key={bill.id} style={styles.recentBillCard}>
              <View style={styles.recentBillLeft}>
                <View style={styles.recentBillIcon}>
                  <Text style={styles.recentBillEmoji}>{bill.icon}</Text>
                </View>

                <View>
                  <Text style={styles.recentBillName}>{bill.name}</Text>
                  <Text style={styles.recentBillDate}>{bill.date}</Text>
                </View>
              </View>

              <Text style={styles.recentBillAmount}>{bill.amount}</Text>
            </View>
          ))}
        </View>

        {/* AUTO PAY CARD */}
        <View style={styles.section}>
          <LinearGradient
            colors={["#a78bfa", "#818cf8"]}
            style={styles.autoPayCard}
          >
            <View style={styles.autoPayHeader}>
              <View style={styles.autoPayIcon}>
                <TrendingUp color="#fff" size={20} />
              </View>

              <View style={styles.autoPayContent}>
                <Text style={styles.autoPayTitle}>Set Up Auto-Pay</Text>
                <Text style={styles.autoPaySubtitle}>
                  Never miss a payment again
                </Text>
              </View>
            </View>

            <TouchableOpacity style={styles.autoPayButton}>
              <Text style={styles.autoPayButtonText}>Enable Auto-Pay</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>
    </View>
  );
}

/* ------------------ STYLES ------------------ */

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
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitles: { flex: 1 },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
  },

  headerSubtitle: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 2,
  },

  summaryCard: {
    borderRadius: 24,
    padding: 24,
    marginTop: 10,
  },

  summaryLabel: {
    color: "#fed7aa",
    fontSize: 14,
    marginBottom: 8,
  },

  summaryAmount: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "700",
    marginBottom: 16,
  },

  payAllButton: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: "center",
  },

  payAllText: {
    color: "#f97316",
    fontSize: 16,
    fontWeight: "600",
  },

  scrollContent: { padding: 24 },

  section: { marginBottom: 28 },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f172a",
  },

  seeAllText: {
    color: "#f97316",
    fontSize: 14,
  },

  billsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  billCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  billIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  billLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
  },

  billAmount: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 8,
  },

  paidBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#dcfce7",
    borderColor: "#bbf7d0",
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: "flex-start",
  },

  paidText: {
    color: "#16a34a",
    fontSize: 12,
  },

  dueBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#fed7aa",
    borderColor: "#fdba74",
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: "flex-start",
  },

  dueText: {
    color: "#9a3412",
    fontSize: 12,
  },

  recentBillCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  recentBillLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  recentBillIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  recentBillEmoji: {
    fontSize: 18,
  },

  recentBillName: {
    fontSize: 15,
    fontWeight: "500",
    color: "#0f172a",
  },

  recentBillDate: {
    fontSize: 13,
    color: "#64748b",
  },

  recentBillAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
  },

  autoPayCard: {
    padding: 20,
    borderRadius: 24,
  },

  autoPayHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  autoPayIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },

  autoPayContent: { flex: 1 },

  autoPayTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  autoPaySubtitle: {
    color: "#f1f5f9",
    fontSize: 14,
    marginTop: 2,
  },

  autoPayButton: {
    backgroundColor: "#fff",
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: "center",
  },

  autoPayButtonText: {
    color: "#4f46e5",
    fontSize: 16,
    fontWeight: "600",
  },
});

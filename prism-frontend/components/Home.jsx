import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowUpRight, ArrowDownLeft, Smartphone, CreditCard, Zap, TrendingUp, Bell, Sparkles } from 'lucide-react-native';

export function Home({ onNavigate }) {
  const quickActions = [
    { icon: ArrowUpRight, label: 'Transfer', screen: 'transfer', colors: ['#f97316', '#ea580c'] },
    { icon: Smartphone, label: 'Pay Bills', screen: 'pay-bills', colors: ['#2563eb', '#1d4ed8'] },
    { icon: CreditCard, label: 'Cards', screen: 'loan', colors: ['#4f46e5', '#4338ca'] },
    { icon: Zap, label: 'AI Help', screen: 'ai-help', colors: ['#7c3aed', '#6d28d9'] },
  ];

  const recentTransactions = [
    { id: 1, name: 'Amazon Purchase', amount: -89.99, date: 'Today, 2:30 PM', type: 'debit', icon: '🛍️' },
    { id: 2, name: 'Salary Deposit', amount: 5420.00, date: 'Yesterday, 9:00 AM', type: 'credit', icon: '💰' },
    { id: 3, name: 'Netflix Subscription', amount: -15.99, date: 'Nov 14, 6:45 PM', type: 'debit', icon: '🎬' },
    { id: 4, name: 'John Smith', amount: -250.00, date: 'Nov 13, 11:20 AM', type: 'debit', icon: '👤' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient colors={['#3b82f6', '#6366f1', '#8b5cf6']} style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.userName}>Sarah Johnson</Text>
            </View>
            <View style={styles.headerButtons}>
              <TouchableOpacity 
                onPress={() => onNavigate('notifications')}
                style={styles.iconButton}
              >
                <Bell color="#fff" size={20} />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => onNavigate('voice-assistant')}
                style={styles.voiceButton}
              >
                <LinearGradient colors={['#fb923c', '#f97316']} style={styles.voiceButtonGradient}>
                  <Sparkles color="#fff" size={20} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          {/* Balance Card */}
          <LinearGradient colors={['#fb923c', '#f97316']} style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <Text style={styles.balanceAmount}>$24,583.50</Text>
            <View style={styles.balanceActions}>
              <TouchableOpacity 
                onPress={() => onNavigate('transfer')}
                style={styles.balanceButton}
              >
                <ArrowUpRight color="#fff" size={16} />
                <Text style={styles.balanceButtonText}>Send</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.balanceButtonWhite}>
                <ArrowDownLeft color="#f97316" size={16} />
                <Text style={styles.balanceButtonTextOrange}>Request</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </LinearGradient>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => onNavigate(action.screen)}
                style={styles.quickAction}
              >
                <LinearGradient colors={action.colors} style={styles.quickActionIcon}>
                  <action.icon color="#fff" size={24} />
                </LinearGradient>
                <Text style={styles.quickActionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* AI Insights Banner */}
        <View style={styles.section}>
          <TouchableOpacity onPress={() => onNavigate('ai-dashboard')}>
            <LinearGradient colors={['#a78bfa', '#818cf8']} style={styles.insightCard}>
              <View style={styles.insightHeader}>
                <View style={styles.insightIconContainer}>
                  <Sparkles color="#fff" size={20} />
                </View>
                <TrendingUp color="rgba(255,255,255,0.8)" size={20} />
              </View>
              <Text style={styles.insightTitle}>AI Insights</Text>
              <Text style={styles.insightText}>You saved 12% more this month. Keep it up!</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          {recentTransactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionCard}>
              <View style={styles.transactionLeft}>
                <View style={styles.transactionIcon}>
                  <Text style={styles.transactionEmoji}>{transaction.icon}</Text>
                </View>
                <View>
                  <Text style={styles.transactionName}>{transaction.name}</Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                </View>
              </View>
              <Text style={[
                styles.transactionAmount,
                transaction.type === 'credit' && styles.transactionAmountCredit
              ]}>
                {transaction.type === 'credit' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    backgroundColor: '#f8fafc',
    

  },
  scrollView: {
    flex: 1,
  

  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeText: {
    color: '#bfdbfe',
    fontSize: 14,
    marginBottom: 4,
  },
  userName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  voiceButtonGradient: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceCard: {
    borderRadius: 24,
    padding: 24,
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  balanceLabel: {
    color: '#fed7aa',
    fontSize: 14,
    marginBottom: 8,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 24,
  },
  balanceActions: {
    flexDirection: 'row',
    gap: 12,
  },
  balanceButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    paddingVertical: 12,
  },
  balanceButtonWhite: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 12,
  },
  balanceButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  balanceButtonTextOrange: {
    color: '#f97316',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
  },
  seeAllText: {
    color: '#f97316',
    fontSize: 14,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  quickAction: {
    alignItems: 'center',
    gap: 8,
    width: '22%',
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  quickActionLabel: {
    fontSize: 12,
    color: '#475569',
    textAlign: 'center',
  },
  insightCard: {
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  insightIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  insightTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  insightText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
  },
  transactionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  transactionIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionEmoji: {
    fontSize: 18,
  },
  transactionName: {
    fontSize: 15,
    color: '#0f172a',
    fontWeight: '500',
  },
  transactionDate: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 15,
    color: '#0f172a',
    fontWeight: '600',
  },
  transactionAmountCredit: {
    color: '#16a34a',
  },
});

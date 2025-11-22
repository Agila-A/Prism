import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, XCircle, Filter, Download, AlertTriangle, FileText } from 'lucide-react-native';

export function AdminDashboardScreen({ onNavigate }) {
  const [selectedTab, setSelectedTab] = useState('loans');

  const rejectedLoans = [
    {
      id: 1,
      userName: 'Michael Johnson',
      userId: 'USER-4582',
      loanType: 'Personal Loan',
      amount: '$15,000',
      reason: 'Low credit score (620 vs required 650)',
      date: 'Nov 15, 2025',
      time: '2:30 PM',
    },
    {
      id: 2,
      userName: 'Emily Davis',
      userId: 'USER-7829',
      loanType: 'Auto Loan',
      amount: '$25,000',
      reason: 'High debt-to-income ratio (52%)',
      date: 'Nov 15, 2025',
      time: '11:45 AM',
    },
    {
      id: 3,
      userName: 'Robert Wilson',
      userId: 'USER-3241',
      loanType: 'Business Loan',
      amount: '$50,000',
      reason: 'Insufficient business revenue history',
      date: 'Nov 14, 2025',
      time: '4:20 PM',
    },
    {
      id: 4,
      userName: 'Sarah Martinez',
      userId: 'USER-9156',
      loanType: 'Home Loan',
      amount: '$200,000',
      reason: 'Inconsistent income pattern',
      date: 'Nov 14, 2025',
      time: '10:15 AM',
    },
  ];

  const aiAuditLogs = [
    {
      id: 1,
      action: 'Loan Application Rejected',
      user: 'USER-4582',
      details: 'Personal Loan $15,000 - Low credit score',
      timestamp: 'Nov 15, 2025 - 2:30 PM',
      type: 'rejection',
      aiDecision: 'Automatic',
    },
    {
      id: 2,
      action: 'Voice Command Executed',
      user: 'USER-7891',
      details: 'Bill payment processed - $450.00',
      timestamp: 'Nov 15, 2025 - 2:25 PM',
      type: 'success',
      aiDecision: 'Automatic',
    },
    {
      id: 3,
      action: 'Credit Card Approved',
      user: 'USER-2341',
      details: 'Platinum Card - $10,000 limit',
      timestamp: 'Nov 15, 2025 - 2:12 PM',
      type: 'approval',
      aiDecision: 'Automatic',
    },
    {
      id: 4,
      action: 'Transfer Flagged',
      user: 'USER-9023',
      details: 'Unusual transfer pattern detected',
      timestamp: 'Nov 15, 2025 - 1:48 PM',
      type: 'warning',
      aiDecision: 'Manual Review',
    },
    {
      id: 5,
      action: 'KYC Verification Failed',
      user: 'USER-5612',
      details: 'Document mismatch - ID verification',
      timestamp: 'Nov 15, 2025 - 1:35 PM',
      type: 'rejection',
      aiDecision: 'Automatic',
    },
    {
      id: 6,
      action: 'Explainable AI Query',
      user: 'USER-4582',
      details: 'User requested loan rejection explanation',
      timestamp: 'Nov 15, 2025 - 1:20 PM',
      type: 'info',
      aiDecision: 'N/A',
    },
  ];

  const getLogTypeStyle = (type) => {
    switch (type) {
      case 'rejection':
        return { backgroundColor: '#fee2e2', borderColor: '#fecaca', dotColor: '#ef4444' };
      case 'success':
        return { backgroundColor: '#dcfce7', borderColor: '#bbf7d0', dotColor: '#22c55e' };
      case 'approval':
        return { backgroundColor: '#dbeafe', borderColor: '#bfdbfe', dotColor: '#3b82f6' };
      case 'warning':
        return { backgroundColor: '#fef3c7', borderColor: '#fde68a', dotColor: '#eab308' };
      case 'info':
        return { backgroundColor: '#ede9fe', borderColor: '#ddd6fe', dotColor: '#8b5cf6' };
      default:
        return { backgroundColor: '#f1f5f9', borderColor: '#e2e8f0', dotColor: '#64748b' };
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#f8fafc', '#f0f9ff']} style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => onNavigate('admin-login')} style={styles.backButton}>
              <ArrowLeft color="#334155" size={20} />
            </TouchableOpacity>
            <View>
              <Text style={styles.headerTitle}>Admin Dashboard</Text>
              <Text style={styles.headerSubtitle}>AI Oversight & Management</Text>
            </View>
          </View>
          <View style={styles.headerButtons}>
            <TouchableOpacity style={styles.iconButton}>
              <Filter color="#334155" size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Download color="#334155" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tab Selector */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => setSelectedTab('loans')}
            style={selectedTab === 'loans' ? styles.tabActive : styles.tab}
          >
            {selectedTab === 'loans' ? (
              <LinearGradient colors={['#fb923c', '#f97316']} style={styles.tabGradient}>
                <Text style={styles.tabTextActive}>Rejected Loans</Text>
              </LinearGradient>
            ) : (
              <Text style={styles.tabText}>Rejected Loans</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedTab('logs')}
            style={selectedTab === 'logs' ? styles.tabActive : styles.tab}
          >
            {selectedTab === 'logs' ? (
              <LinearGradient colors={['#818cf8', '#6366f1']} style={styles.tabGradient}>
                <Text style={styles.tabTextActive}>AI Audit Logs</Text>
              </LinearGradient>
            ) : (
              <Text style={styles.tabText}>AI Audit Logs</Text>
            )}
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {selectedTab === 'loans' ? (
          // Rejected Loan Requests
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionHeaderLeft}>
                <XCircle color="#ef4444" size={20} />
                <Text style={styles.sectionTitle}>Rejected Loan Requests</Text>
              </View>
              <Text style={styles.countBadge}>{rejectedLoans.length}</Text>
            </View>
            {rejectedLoans.map((loan) => (
              <TouchableOpacity key={loan.id} style={styles.loanCard}>
                <View style={styles.loanHeader}>
                  <View style={styles.userInfo}>
                    <View style={styles.userAvatar}>
                      <Text style={styles.userAvatarText}>{loan.userName.charAt(0)}</Text>
                    </View>
                    <View style={styles.userDetails}>
                      <Text style={styles.userName}>{loan.userName}</Text>
                      <Text style={styles.userId}>{loan.userId}</Text>
                    </View>
                  </View>
                  <View style={styles.loanMeta}>
                    <Text style={styles.loanDate}>{loan.date}</Text>
                    <Text style={styles.loanTime}>{loan.time}</Text>
                  </View>
                </View>
                
                <View style={styles.loanDetails}>
                  <View style={styles.loanRow}>
                    <Text style={styles.loanLabel}>Loan Type</Text>
                    <Text style={styles.loanValue}>{loan.loanType}</Text>
                  </View>
                  <View style={styles.loanRow}>
                    <Text style={styles.loanLabel}>Amount</Text>
                    <Text style={styles.loanValueAmount}>{loan.amount}</Text>
                  </View>
                </View>

                <View style={styles.reasonCard}>
                  <View style={styles.reasonHeader}>
                    <AlertTriangle color="#dc2626" size={16} />
                    <Text style={styles.reasonLabel}>Rejection Reason</Text>
                  </View>
                  <Text style={styles.reasonText}>{loan.reason}</Text>
                </View>

                <TouchableOpacity style={styles.reviewButton}>
                  <Text style={styles.reviewButtonText}>Review Application</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          // AI Audit Logs
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionHeaderLeft}>
                <FileText color="#6366f1" size={20} />
                <Text style={styles.sectionTitle}>AI Audit Logs</Text>
              </View>
              <Text style={styles.countBadge}>{aiAuditLogs.length}</Text>
            </View>
            {aiAuditLogs.map((log) => {
              const typeStyle = getLogTypeStyle(log.type);
              return (
                <TouchableOpacity key={log.id} style={styles.logCard}>
                  <View style={styles.logHeader}>
                    <View style={[styles.logDot, { backgroundColor: typeStyle.dotColor }]} />
                    <View style={styles.logHeaderContent}>
                      <Text style={styles.logAction}>{log.action}</Text>
                      <Text style={styles.logTimestamp}>{log.timestamp}</Text>
                    </View>
                  </View>

                  <View style={styles.logBody}>
                    <View style={styles.logRow}>
                      <Text style={styles.logLabel}>User ID</Text>
                      <View style={styles.userBadge}>
                        <Text style={styles.userBadgeText}>{log.user}</Text>
                      </View>
                    </View>
                    <View style={styles.logRow}>
                      <Text style={styles.logLabel}>Details</Text>
                      <Text style={styles.logDetails}>{log.details}</Text>
                    </View>
                    <View style={styles.logRow}>
                      <Text style={styles.logLabel}>AI Decision</Text>
                      <View style={[styles.decisionBadge, typeStyle]}>
                        <Text style={[styles.decisionText, { color: typeStyle.dotColor }]}>
                          {log.aiDecision}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  tabContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  tab: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    paddingVertical: 10,
  },
  tabActive: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  tabGradient: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
    textAlign: 'center',
  },
  tabTextActive: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
  },
  countBadge: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  loanCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  loanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  userInfo: {
    flexDirection: 'row',
    gap: 12,
    flex: 1,
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#eff6ff',
    borderWidth: 2,
    borderColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatarText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2563eb',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 2,
  },
  userId: {
    fontSize: 13,
    color: '#64748b',
  },
  loanMeta: {
    alignItems: 'flex-end',
  },
  loanDate: {
    fontSize: 13,
    color: '#64748b',
  },
  loanTime: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 2,
  },
  loanDetails: {
    gap: 8,
    marginBottom: 16,
  },
  loanRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loanLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  loanValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0f172a',
  },
  loanValueAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  reasonCard: {
    backgroundColor: '#fef2f2',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#fee2e2',
    marginBottom: 16,
  },
  reasonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  reasonLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#991b1b',
  },
  reasonText: {
    fontSize: 14,
    color: '#7f1d1d',
    lineHeight: 20,
  },
  reviewButton: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  reviewButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
  },
  logCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  logHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  logDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
  },
  logHeaderContent: {
    flex: 1,
  },
  logAction: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  logTimestamp: {
    fontSize: 12,
    color: '#64748b',
  },
  logBody: {
    gap: 8,
  },
  logRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logLabel: {
    fontSize: 13,
    color: '#64748b',
  },
  logDetails: {
    fontSize: 13,
    color: '#334155',
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
    marginLeft: 8,
  },
  userBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#dbeafe',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  userBadgeText: {
    fontSize: 12,
    color: '#1d4ed8',
    fontWeight: '500',
  },
  decisionBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  decisionText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

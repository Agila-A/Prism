// LoanApplication.jsx

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, HelpCircle, CheckCircle, XCircle, Clock } from 'lucide-react-native';
// Import the flow manager
import { LoanFlowManager } from './LoanFlowManager'; 

export function LoanApplication({ onNavigate }) {
  // State to control which screen is visible: 'history' or 'new_loan_flow'
  const [currentView, setCurrentView] = useState('history'); 

  const loanApplications = [
    { id: 1, type: 'Personal Loan', amount: '$15,000', status: 'rejected', date: 'Nov 15, 2025', reason: 'Low credit score and inconsistent income' },
    { id: 2, type: 'Auto Loan', amount: '$28,000', status: 'pending', date: 'Nov 14, 2025', reason: 'Under review - Decision expected within 48 hours' },
    { id: 3, type: 'Home Loan', amount: '$250,000', status: 'approved', date: 'Oct 28, 2025', reason: 'Congratulations! Your loan has been approved' },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle color="#22c55e" size={24} />;
      case 'rejected': return <XCircle color="#ef4444" size={24} />;
      case 'pending': return <Clock color="#f97316" size={24} />;
      default: return <HelpCircle color="#60a5fa" size={24} />;
    }
  };

  const getStatusColors = (status) => {
    switch (status) {
      case 'approved': return ['#4ade80', '#22c55e'];
      case 'rejected': return ['#f87171', '#ef4444'];
      case 'pending': return ['#fb923c', '#f59e0b'];
      default: return ['#60a5fa', '#3b82f6'];
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'approved': return { backgroundColor: '#dcfce7', borderColor: '#bbf7d0', textColor: '#166534' };
      case 'rejected': return { backgroundColor: '#fee2e2', borderColor: '#fecaca', textColor: '#991b1b' };
      case 'pending': return { backgroundColor: '#fed7aa', borderColor: '#fdba74', textColor: '#9a3412' };
      default: return { backgroundColor: '#dbeafe', borderColor: '#bfdbfe', textColor: '#1e40af' };
    }
  };

  const renderLoanHistory = () => (
    <>
      <LinearGradient colors={['#eff6ff', '#f0f9ff']} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => onNavigate('home')} style={styles.backButton}>
            <ArrowLeft color="#334155" size={20} />
          </TouchableOpacity>
          <View style={styles.headerTitles}>
            <Text style={styles.headerTitle}>Loan Applications</Text>
            <Text style={styles.headerSubtitle}>Manage your loan requests</Text>
          </View>
        </View>

        {/* --- APPLY FOR NEW LOAN BUTTON (MODIFIED) --- */}
        <TouchableOpacity 
          style={styles.applyButton} 
          onPress={() => setCurrentView('new_loan_flow')} // <--- NAVIGATES to the 4-step form
        >
          <LinearGradient colors={['#fb923c', '#f97316']} style={styles.applyButtonGradient}>
            <Text style={styles.applyButtonTitle}>Apply for New Loan</Text>
            <Text style={styles.applyButtonSubtitle}>Get instant pre-approval decision</Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Your Applications</Text>

        {loanApplications.map((loan) => (
          <View key={loan.id} style={styles.loanCard}>
            {/* Status Header */}
            <LinearGradient colors={getStatusColors(loan.status)} style={styles.loanHeader}>
              <View style={styles.loanHeaderContent}>
                {getStatusIcon(loan.status)}
                <View style={{ marginLeft: 12 }}>
                  <Text style={styles.loanType}>{loan.type}</Text>
                  <Text style={styles.loanAmount}>{loan.amount}</Text>
                </View>
              </View>
              <View style={styles.statusBadge}>
                <Text style={styles.statusBadgeText}>{loan.status.toUpperCase()}</Text>
              </View>
            </LinearGradient>

            {/* Details */}
            <View style={styles.loanBody}>
              <View style={styles.dateRow}>
                <Text style={styles.dateLabel}>Application Date</Text>
                <Text style={styles.dateValue}>{loan.date}</Text>
              </View>

              <View style={[styles.reasonCard, { borderColor: getStatusBg(loan.status).borderColor, backgroundColor: getStatusBg(loan.status).backgroundColor }]}>
                <Text style={[styles.reasonText, { color: getStatusBg(loan.status).textColor }]}>
                  {loan.reason}
                </Text>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                {loan.status === 'rejected' && (
                  <TouchableOpacity
                    onPress={() => onNavigate('ai-help')}
                    style={styles.primaryButton}
                  >
                    <LinearGradient colors={['#a78bfa', '#818cf8']} style={styles.primaryButtonGradient}>
                      <HelpCircle color="#fff" size={16} />
                      <Text style={styles.primaryButtonText}>Ask AI Why?</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                )}
                {loan.status === 'approved' && (
                  <TouchableOpacity style={styles.primaryButton}>
                    <LinearGradient colors={['#4ade80', '#22c55e']} style={styles.primaryButtonGradient}>
                      <Text style={styles.primaryButtonText}>View Details</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                )}
                {loan.status === 'pending' && (
                  <TouchableOpacity style={styles.secondaryButton}>
                    <Text style={styles.secondaryButtonText}>Track Status</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.secondaryButton}>
                  <Text style={styles.secondaryButtonText}>Download</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {/* Loan Calculator */}
        <LinearGradient colors={['#818cf8', '#a78bfa']} style={styles.calculatorCard}>
          <Text style={styles.calculatorTitle}>Loan Calculator</Text>
          <Text style={styles.calculatorSubtitle}>Estimate your monthly payments</Text>
          <TouchableOpacity style={styles.calculatorButton}>
            <Text style={styles.calculatorButtonText}>Open Calculator</Text>
          </TouchableOpacity>
        </LinearGradient>

        <View style={{ height: 120 }} />
      </ScrollView>
    </>
  );

  // --- Main Render Logic ---
  return (
    <View style={styles.container}>
      {currentView === 'history' ? (
        renderLoanHistory()
      ) : (
        <LoanFlowManager 
          onFlowComplete={() => setCurrentView('history')}
          onBackToHistory={() => setCurrentView('history')}
        />
      )}
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
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
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
  headerTitles: {
    flex: 1,
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
  applyButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  applyButtonGradient: {
    padding: 20,
  },
  applyButtonTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  applyButtonSubtitle: {
    color: '#fed7aa',
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 16,
  },
  loanCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  loanHeader: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loanHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  loanType: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loanAmount: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  statusBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  loanBody: {
    padding: 20,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dateLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  dateValue: {
    fontSize: 14,
    color: '#0f172a',
    fontWeight: '500',
  },
  reasonCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  reasonText: {
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  primaryButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#334155',
    fontSize: 15,
    fontWeight: '600',
  },
  calculatorCard: {
    borderRadius: 24,
    padding: 24,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  calculatorTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  calculatorSubtitle: {
    color: '#e0e7ff',
    fontSize: 14,
    marginBottom: 16,
  },
  calculatorButton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  calculatorButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
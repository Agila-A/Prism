import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Filter, CheckCircle, XCircle, Clock, ChevronRight } from 'lucide-react-native';

export function VoiceActivityLogs({ onNavigate }) {
  const [filter, setFilter] = useState('all');
  const [selectedLog, setSelectedLog] = useState(null);

  const logs = [
    {
      id: 1,
      command: 'Pay my credit card bill',
      timestamp: 'Today, 2:30 PM',
      status: 'completed',
      action: 'Initiated credit card payment of $450.00',
      outcome: 'Payment processed successfully',
      category: 'Payment'
    },
    {
      id: 2,
      command: 'Check my savings account balance',
      timestamp: 'Today, 11:45 AM',
      status: 'completed',
      action: 'Retrieved savings account information',
      outcome: 'Balance: $12,430.50',
      category: 'Account Info'
    },
    {
      id: 3,
      command: 'Send $200 to John Smith',
      timestamp: 'Yesterday, 4:20 PM',
      status: 'failed',
      action: 'Attempted transfer to John Smith',
      outcome: 'Insufficient funds in checking account',
      category: 'Transfer'
    },
    {
      id: 4,
      command: 'Apply for personal loan',
      timestamp: 'Yesterday, 10:15 AM',
      status: 'pending',
      action: 'Personal loan application submitted',
      outcome: 'Under review - expected response in 24 hours',
      category: 'Loan'
    },
  ];

  const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.status === filter);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle color="#4ade80" size={20} />;
      case 'failed':
        return <XCircle color="#f87171" size={20} />;
      case 'pending':
        return <Clock color="#fb923c" size={20} />;
      default:
        return null;
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'completed':
        return { backgroundColor: 'rgba(74, 222, 128, 0.2)', color: '#4ade80', borderColor: 'rgba(74, 222, 128, 0.3)' };
      case 'failed':
        return { backgroundColor: 'rgba(248, 113, 113, 0.2)', color: '#f87171', borderColor: 'rgba(248, 113, 113, 0.3)' };
      case 'pending':
        return { backgroundColor: 'rgba(251, 146, 60, 0.2)', color: '#fb923c', borderColor: 'rgba(251, 146, 60, 0.3)' };
      default:
        return {};
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#eff6ff', '#f0f9ff']} style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              onPress={() => onNavigate('voice-assistant')}
              style={styles.backButton}
            >
              <ArrowLeft color="#334155" size={20} />
            </TouchableOpacity>
            <View>
              <Text style={styles.headerTitle}>Voice Activity Logs</Text>
              <Text style={styles.headerSubtitle}>{filteredLogs.length} commands</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter color="#334155" size={20} />
          </TouchableOpacity>
        </View>

        {/* Filter Chips */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContent}
        >
          {['all', 'completed', 'failed', 'pending'].map((filterType) => (
            <TouchableOpacity
              key={filterType}
              onPress={() => setFilter(filterType)}
              style={filter === filterType ? styles.filterChipActive : styles.filterChip}
            >
              {filter === filterType ? (
                <LinearGradient colors={['#fb923c', '#f97316']} style={styles.filterChipGradient}>
                  <Text style={styles.filterChipTextActive}>
                    {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                  </Text>
                </LinearGradient>
              ) : (
                <Text style={styles.filterChipText}>
                  {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </LinearGradient>

      {/* Logs List */}
      <ScrollView style={styles.logsList} contentContainerStyle={styles.logsContent}>
        {filteredLogs.map((log) => (
          <TouchableOpacity
            key={log.id}
            onPress={() => setSelectedLog(log)}
            style={styles.logCard}
          >
            <View style={styles.logHeader}>
              <View style={styles.logHeaderLeft}>
                {getStatusIcon(log.status)}
                <View style={styles.logInfo}>
                  <Text style={styles.logCommand}>{log.command}</Text>
                  <Text style={styles.logTimestamp}>{log.timestamp}</Text>
                </View>
              </View>
              <ChevronRight color="#94a3b8" size={20} />
            </View>
            <View style={styles.logBadges}>
              <View style={[styles.statusBadge, { ...getStatusStyle(log.status) }]}>
                <Text style={[styles.statusBadgeText, { color: getStatusStyle(log.status).color }]}>
                  {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                </Text>
              </View>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryBadgeText}>{log.category}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Detail Modal */}
      <Modal
        visible={selectedLog !== null}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedLog(null)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity 
            style={styles.modalBackground} 
            activeOpacity={1}
            onPress={() => setSelectedLog(null)}
          />
          <LinearGradient 
            colors={['#dbeafe', '#e0e7ff']} 
            style={styles.modalContent}
          >
            <View style={styles.modalHandle} />
            
            {selectedLog && (
              <>
                <View style={styles.modalHeader}>
                  {getStatusIcon(selectedLog.status)}
                  <View style={{ marginLeft: 12 }}>
                    <Text style={styles.modalTitle}>Command Details</Text>
                    <Text style={styles.modalSubtitle}>{selectedLog.timestamp}</Text>
                  </View>
                </View>

                <View style={styles.modalDetails}>
                  <View style={styles.detailCard}>
                    <Text style={styles.detailLabel}>Command</Text>
                    <Text style={styles.detailValue}>{selectedLog.command}</Text>
                  </View>

                  <View style={styles.detailCard}>
                    <Text style={styles.detailLabel}>AI Action</Text>
                    <Text style={styles.detailValue}>{selectedLog.action}</Text>
                  </View>

                  <View style={styles.detailCard}>
                    <Text style={styles.detailLabel}>Outcome</Text>
                    <Text style={styles.detailValue}>{selectedLog.outcome}</Text>
                  </View>

                  <View style={styles.detailBadges}>
                    <View style={[styles.detailBadge, { ...getStatusStyle(selectedLog.status) }]}>
                      <Text style={[styles.detailBadgeText, { color: getStatusStyle(selectedLog.status).color }]}>
                        {selectedLog.status.charAt(0).toUpperCase() + selectedLog.status.slice(1)}
                      </Text>
                    </View>
                    <View style={styles.detailBadgeCategory}>
                      <Text style={styles.detailBadgeCategoryText}>{selectedLog.category}</Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => setSelectedLog(null)}
                  style={styles.closeButton}
                >
                  <LinearGradient colors={['#fb923c', '#f97316']} style={styles.closeButtonGradient}>
                    <Text style={styles.closeButtonText}>Close</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </>
            )}
          </LinearGradient>
        </View>
      </Modal>
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
    marginBottom: 24,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
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
  filterButton: {
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
  filtersContent: {
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  filterChipActive: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  filterChipGradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  filterChipText: {
    fontSize: 14,
    color: '#334155',
  },
  filterChipTextActive: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  logsList: {
    flex: 1,
  },
  logsContent: {
    padding: 24,
    gap: 12,
    paddingBottom: 120,
  },
  logCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  logHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    flex: 1,
  },
  logInfo: {
    flex: 1,
  },
  logCommand: {
    fontSize: 15,
    color: '#0f172a',
    fontWeight: '500',
    marginBottom: 4,
  },
  logTimestamp: {
    fontSize: 13,
    color: '#64748b',
  },
  logBadges: {
    flexDirection: 'row',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  statusBadgeText: {
    fontSize: 12,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  categoryBadgeText: {
    fontSize: 12,
    color: '#3b82f6',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.4)',
  },
  modalHandle: {
    width: 48,
    height: 4,
    backgroundColor: '#cbd5e1',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  modalDetails: {
    gap: 16,
    marginBottom: 24,
  },
  detailCard: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  detailLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 15,
    color: '#0f172a',
  },
  detailBadges: {
    flexDirection: 'row',
    gap: 8,
  },
  detailBadge: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  detailBadgeText: {
    fontSize: 14,
  },
  detailBadgeCategory: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    alignItems: 'center',
  },
  detailBadgeCategoryText: {
    fontSize: 14,
    color: '#1d4ed8',
  },
  closeButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  closeButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

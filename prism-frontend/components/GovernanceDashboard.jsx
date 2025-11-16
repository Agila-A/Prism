import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// Note: Assuming you meant 'lucide-react-native', as '-native-native' isn't standard
import { ArrowLeft, AlertTriangle, Users, FileText, Download, Filter } from 'lucide-react-native'; 
// Note: Assuming you meant 'react-native-chart-kit', as the import was corrupted
import { BarChart, PieChart } from 'react-native-chart-kit';

export function GovernanceDashboard({ onNavigate }) {
  // Fixed duplicate declaration
  const screenWidth = Dimensions.get('window').width;

  // Corrected corrupted data structure for BarChart
  const aiDecisionsData = {
    labels: ['Loans', 'Cards', 'Transfers', 'KYC'],
    legend: ['Approved', 'Rejected'],
    datasets: [
      {
        data: [145, 203, 892, 167], // Approved Counts
        color: () => '#22c55e',
        strokeWidth: 2 // optional
      },
      {
        data: [58, 42, 15, 23], // Rejected Counts
        color: () => '#ef4444',
        strokeWidth: 2 // optional
      }
    ]
  };

  // Corrected corrupted data structure for PieChart
  const pieData = [
    { name: 'Loan Rejection', population: 145, color: '#ef4444', legendFontColor: '#64748b' },
    { name: 'Credit Score', population: 98, color: '#f97316', legendFontColor: '#64748b' },
    { name: 'KYC Issues', population: 67, color: '#eab308', legendFontColor: '#64748b' },
    { name: 'Transfer Failed', population: 45, color: '#3b82f6', legendFontColor: '#64748b' },
    { name: 'Card Issues', population: 34, color: '#8b5cf6', legendFontColor: '#64748b' },
  ];

  const recentAIActions = [
    { id: 1, user: 'USER-4582', action: 'Loan Application Rejected', reason: 'Low credit score', risk: 'high', time: '2 min ago' },
    { id: 2, user: 'USER-7891', action: 'Voice Command Executed', reason: 'Bill payment processed', risk: 'low', time: '5 min ago' },
    { id: 3, user: 'USER-2341', action: 'Credit Card Approved', reason: 'Met all criteria', risk: 'low', time: '12 min ago' },
  ];

  const anomalies = [
    { id: 1, type: 'Bias Alert', description: 'Higher rejection rate for age group 18-25 detected', severity: 'high' },
    { id: 2, type: 'Pattern Anomaly', description: 'Unusual spike in loan applications from Region X', severity: 'medium' },
  ];

  // Fixed corrupted syntax in getRiskStyle
  const getRiskStyle = (risk) => {
    switch (risk) {
      case 'high':
        return { backgroundColor: '#fee2e2', color: '#dc2626', borderColor: '#fecaca' };
      case 'medium':
        return { backgroundColor: '#fef3c7', color: '#ca8a04', borderColor: '#fde68a' };
      case 'low':
        return { backgroundColor: '#dcfce7', color: '#16a34a', borderColor: '#bbf7d0' };
      default:
        return { backgroundColor: '#dbeafe', color: '#2563eb', borderColor: '#bfdbfe' };
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#f8fafc', '#f0f9ff']} style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => onNavigate('home')} style={styles.backButton}>
              <ArrowLeft color="#334155" size={20} />
            </TouchableOpacity>
            <View>
              <Text style={styles.headerTitle}>Governance Dashboard</Text>
              <Text style={styles.headerSubtitle}>Admin Panel - AI Oversight</Text>
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
      </LinearGradient>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Key Metrics */}
        <View style={styles.metricsRow}>
          <LinearGradient colors={['#fb923c', '#f97316']} style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <FileText color="#fed7aa" size={20} />
              <Text style={styles.metricLabel}>AI Decisions Today</Text>
            </View>
            <Text style={styles.metricValue}>1,407</Text>
            <Text style={styles.metricChange}>+12% vs yesterday</Text>
          </LinearGradient>
          <LinearGradient colors={['#a78bfa', '#818cf8']} style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Users color="#e0e7ff" size={20} />
              <Text style={styles.metricLabel}>Active Users</Text>
            </View>
            <Text style={styles.metricValue}>8,234</Text>
            <Text style={styles.metricChange}>Real-time</Text>
          </LinearGradient>
        </View>


        {/* Alerts & Anomalies */}
        {anomalies.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <AlertTriangle color="#ca8a04" size={20} />
              <Text style={styles.sectionTitle}>Alerts & Anomalies</Text>
            </View>
            {anomalies.map((anomaly) => (
              <View
                key={anomaly.id}
                style={[
                  styles.anomalyCard,
                  anomaly.severity === 'high' ? { backgroundColor: '#fee2e2', borderColor: '#fecaca' } : { backgroundColor: '#fef3c7', borderColor: '#fde68a' }
                ]}
              >
                <View style={styles.anomalyHeader}>
                  <View style={[
                    styles.anomalyBadge,
                    anomaly.severity === 'high' ? { backgroundColor: '#fecaca', borderColor: '#fca5a5' } : { backgroundColor: '#fde68a', borderColor: '#fcd34d' }
                  ]}>
                    <Text style={[
                      styles.anomalyBadgeText,
                      { color: anomaly.severity === 'high' ? '#991b1b' : '#854d0e' }
                    ]}>
                      {anomaly.type}
                    </Text>
                  </View>
                  <TouchableOpacity>
                    <Text style={styles.investigateText}>Investigate</Text>
                  </TouchableOpacity>
                </View>
                <Text style={[
                  styles.anomalyDescription,
                  { color: anomaly.severity === 'high' ? '#7f1d1d' : '#713f12' }
                ]}>
                  {anomaly.description}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* AI Decisions Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Decisions by Category</Text>
          <View style={styles.chartCard}>
            <BarChart
              data={aiDecisionsData}
              width={screenWidth - 48 - 32} // screenWidth - paddingHorizontal(24*2) - chartCardPadding(16*2)
              height={220}
              chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                decimalPlaces: 0,
                color: (opacity = 1, datasetIndex) => {
                  // Use specific colors defined in datasets for BarChart
                  if (datasetIndex === 0) return `rgba(34, 197, 94, ${opacity})`; // Approved (green)
                  if (datasetIndex === 1) return `rgba(239, 68, 68, ${opacity})`; // Rejected (red)
                  return `rgba(100, 116, 139, ${opacity})`;
                },
                barPercentage: 0.5,
                categoryPercentage: 0.8,
                labelColor: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`,
                style: { borderRadius: 16 },
                propsForLabels: { fontSize: 10 },
              }}
              style={styles.chart}
              // Stacked bar chart properties were missing, adding them here
              fromZero={true}
            />
            <View style={styles.chartLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#22c55e' }]} />
                <Text style={styles.legendText}>Approved</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#ef4444' }]} />
                <Text style={styles.legendText}>Rejected</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Help Topics Distribution */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Most Requested Help Topics</Text>
          <View style={styles.chartCard}>
            <PieChart
              data={pieData}
              width={screenWidth - 48} // screenWidth - paddingHorizontal(24*2)
              height={180}
              chartConfig={{
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute={false} // Show percentage, not absolute value
            />
          </View>
        </View>

        {/* Recent AI Actions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent AI Actions</Text>
            <TouchableOpacity>
              <Text style={styles.exportText}>Export Log</Text>
            </TouchableOpacity>
          </View>
          {recentAIActions.map((action) => (
            <View key={action.id} style={styles.actionCard}>
              <View style={styles.actionHeader}>
                <View style={styles.actionUserBadge}>
                  <Text style={styles.actionUserText}>{action.user}</Text>
                </View>
                <Text style={styles.actionTime}>{action.time}</Text>
                <View style={[styles.riskBadge, getRiskStyle(action.risk)]}>
                  <Text style={[styles.riskText, { color: getRiskStyle(action.risk).color }]}>
                    {action.risk}
                  </Text>
                </View>
              </View>
              <Text style={styles.actionText}>{action.action}</Text>
              <Text style={styles.actionReason}>{action.reason}</Text>
            </View>
          ))}
        </View>

        {/* System Performance */}
        <View style={styles.section}>
          <View style={styles.performanceCard}>
            <Text style={styles.performanceTitle}>System Performance</Text>
            <View style={styles.performanceMetrics}>
              <View style={styles.performanceItem}>
                <View style={styles.performanceHeader}>
                  <Text style={styles.performanceLabel}>AI Response Accuracy</Text>
                  <Text style={styles.performanceValue}>98.2%</Text>
                </View>
                <View style={styles.progressBar}>
                  <LinearGradient colors={['#4ade80', '#22c55e']} style={[styles.progressFill, { width: '98.2%' }]} />
                </View>
              </View>
              <View style={styles.performanceItem}>
                <View style={styles.performanceHeader}>
                  <Text style={styles.performanceLabel}>Fairness Score</Text>
                  <Text style={styles.performanceValue}>91.5%</Text>
                </View>
                <View style={styles.progressBar}>
                  <LinearGradient colors={['#60a5fa', '#3b82f6']} style={[styles.progressFill, { width: '91.5%' }]} />
                </View>
              </View>
              <View style={styles.performanceItem}>
                <View style={styles.performanceHeader}>
                  <Text style={styles.performanceLabel}>User Satisfaction</Text>
                  <Text style={styles.performanceValue}>94.7%</Text>
                </View>
                <View style={styles.progressBar}>
                  <LinearGradient colors={['#a78bfa', '#8b5cf6']} style={[styles.progressFill, { width: '94.7%' }]} />
                </View>
              </View>
            </View>
          </View>
        </View>

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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  metricCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  metricLabel: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 12,
  },
  metricValue: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },
  metricChange: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
  },
  exportText: {
    color: '#f97316',
    fontSize: 14,
    fontWeight: '500',
  },
  anomalyCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  anomalyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  anomalyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  anomalyBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  investigateText: {
    fontSize: 12,
    color: '#334155',
    textDecorationLine: 'underline',
  },
  anomalyDescription: {
    fontSize: 14,
  },
  chartCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  chart: {
    marginLeft: -16,
    borderRadius: 0,
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#64748b',
  },
  actionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  actionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  actionUserBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#dbeafe',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  actionUserText: {
    fontSize: 12,
    color: '#1d4ed8',
  },
  actionTime: {
    fontSize: 12,
    color: '#64748b',
    flex: 1,
  },
  riskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  riskText: {
    fontSize: 12,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0f172a',
    marginBottom: 4,
  },
  actionReason: {
    fontSize: 12,
    color: '#64748b',
  },
  performanceCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  performanceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 16,
  },
  performanceMetrics: {
    gap: 12,
  },
  performanceItem: {
    gap: 4,
  },
  performanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  performanceLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  performanceValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
});
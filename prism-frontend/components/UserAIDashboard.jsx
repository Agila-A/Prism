import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Sparkles, Shield, Activity, Settings, Eye } from 'lucide-react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';

export function UserAIDashboard({ onNavigate }) {
  const screenWidth = Dimensions.get('window').width;

  const voiceCommandsData = {
    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
    datasets: [{ data: [12, 18, 25, 31, 42] }]
  };

  const aiActionsData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{ data: [3, 5, 4, 7, 6, 2, 4] }]
  };

  const chartConfig = {
    backgroundColor: '#fff',
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(251, 146, 60, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`,
    style: { borderRadius: 16 },
    propsForLabels: { fontSize: 12 },
  };

  const recentActions = [
    { id: 1, action: 'Explained loan rejection', time: '2 hours ago', icon: '🔍', color: '#ede9fe' },
    { id: 2, action: 'Voice command: Pay bills', time: '5 hours ago', icon: '🎤', color: '#fed7aa' },
    { id: 3, action: 'Detected unusual spending', time: '1 day ago', icon: '⚠️', color: '#fef3c7' },
    { id: 4, action: 'Provided savings insight', time: '2 days ago', icon: '💡', color: '#dcfce7' },
  ];

  const recommendations = [
    { id: 1, title: 'Optimize Your Savings', description: 'You can save $230 more by adjusting your monthly subscriptions', priority: 'high', icon: '💰' },
    { id: 2, title: 'Credit Score Improvement', description: 'Pay down your credit card to boost score by 15 points', priority: 'medium', icon: '📈' },
    { id: 3, title: 'Investment Opportunity', description: 'Consider moving $500 to high-yield savings account', priority: 'low', icon: '🎯' },
  ];

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'high':
        return { backgroundColor: '#fee2e2', color: '#dc2626' };
      case 'medium':
        return { backgroundColor: '#fef3c7', color: '#ca8a04' };
      case 'low':
        return { backgroundColor: '#dbeafe', color: '#2563eb' };
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
            <TouchableOpacity onPress={() => onNavigate('home')} style={styles.backButton}>
              <ArrowLeft color="#334155" size={20} />
            </TouchableOpacity>
            <View>
              <Text style={styles.headerTitle}>AI Dashboard</Text>
              <Text style={styles.headerSubtitle}>Your AI activity & insights</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => onNavigate('profile')} style={styles.settingsButton}>
            <Settings color="#334155" size={20} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* AI Trust Score */}
        <View style={styles.section}>
          <LinearGradient colors={['#a78bfa', '#818cf8']} style={styles.trustCard}>
            <View style={styles.trustHeader}>
              <View style={styles.trustLeft}>
                <View style={styles.trustIcon}>
                  <Shield color="#fff" size={24} />
                </View>
                <View>
                  <Text style={styles.trustTitle}>AI Trust Score</Text>
                  <Text style={styles.trustSubtitle}>Transparency & Privacy</Text>
                </View>
              </View>
              <View style={styles.trustScore}>
                <Text style={styles.trustScoreValue}>94</Text>
                <Text style={styles.trustScoreLabel}>Excellent</Text>
              </View>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '94%' }]} />
            </View>
            <View style={styles.trustMetrics}>
              <View style={styles.trustMetric}>
                <Text style={styles.trustMetricLabel}>Accuracy</Text>
                <Text style={styles.trustMetricValue}>98%</Text>
              </View>
              <View style={styles.trustMetric}>
                <Text style={styles.trustMetricLabel}>Privacy</Text>
                <Text style={styles.trustMetricValue}>95%</Text>
              </View>
              <View style={styles.trustMetric}>
                <Text style={styles.trustMetricLabel}>Fairness</Text>
                <Text style={styles.trustMetricValue}>90%</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Usage Analytics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Usage Analytics</Text>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <View style={styles.statIcon}>
                  <Sparkles color="#ea580c" size={16} />
                </View>
                <Text style={styles.statLabel}>Voice Commands</Text>
              </View>
              <Text style={styles.statValue}>42</Text>
              <Text style={styles.statChange}>+35% this month</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <View style={styles.statIconPurple}>
                  <Activity color="#7c3aed" size={16} />
                </View>
                <Text style={styles.statLabel}>AI Actions</Text>
              </View>
              <Text style={styles.statValue}>31</Text>
              <Text style={styles.statChange}>This week</Text>
            </View>
          </View>

          {/* Voice Commands Chart */}
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Voice Commands Trend</Text>
            <BarChart
              data={voiceCommandsData}
              width={screenWidth - 96}
              height={140}
              chartConfig={chartConfig}
              style={styles.chart}
              showValuesOnTopOfBars
            />
          </View>

          {/* Weekly Activity Chart */}
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Weekly AI Activity</Text>
            <LineChart
              data={aiActionsData}
              width={screenWidth - 96}
              height={120}
              chartConfig={{...chartConfig, color: (opacity = 1) => `rgba(139, 92, 246, ${opacity})`}}
              style={styles.chart}
              bezier
            />
          </View>
        </View>

        {/* Recent AI Actions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent AI Actions</Text>
            <TouchableOpacity onPress={() => onNavigate('voice-logs')}>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>
          {recentActions.map((action) => (
            <View key={action.id} style={styles.actionCard}>
              <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                <Text style={styles.actionEmoji}>{action.icon}</Text>
              </View>
              <View style={styles.actionContent}>
                <Text style={styles.actionText}>{action.action}</Text>
                <Text style={styles.actionTime}>{action.time}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Personalized Recommendations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personalized Recommendations</Text>
          {recommendations.map((rec) => (
            <View key={rec.id} style={styles.recommendationCard}>
              <LinearGradient colors={['#fb923c', '#f97316']} style={styles.recommendationIcon}>
                <Text style={styles.recommendationEmoji}>{rec.icon}</Text>
              </LinearGradient>
              <View style={styles.recommendationContent}>
                <View style={styles.recommendationHeader}>
                  <Text style={styles.recommendationTitle}>{rec.title}</Text>
                  <View style={[styles.priorityBadge, getPriorityStyle(rec.priority)]}>
                    <Text style={[styles.priorityText, { color: getPriorityStyle(rec.priority).color }]}>
                      {rec.priority}
                    </Text>
                  </View>
                </View>
                <Text style={styles.recommendationDescription}>{rec.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Privacy & Logs Management */}
        <View style={styles.section}>
          <View style={styles.privacyCard}>
            <View style={styles.privacyHeader}>
              <Eye color="#64748b" size={20} />
              <Text style={styles.privacyTitle}>Privacy & Data Controls</Text>
            </View>
            <TouchableOpacity style={styles.privacyButton}>
              <Text style={styles.privacyButtonText}>Manage AI Permissions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.privacyButton} onPress={() => onNavigate('voice-logs')}>
              <Text style={styles.privacyButtonText}>View All Activity Logs</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.privacyButton}>
              <Text style={styles.privacyButtonText}>Download My Data</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 120 }} />
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
  settingsButton: {
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
    paddingHorizontal: 24,
  },
  section: {
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
    marginBottom: 16,
  },
  viewAllText: {
    color: '#f97316',
    fontSize: 14,
  },
  trustCard: {
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  trustHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  trustLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  trustIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trustTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  trustSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginTop: 2,
  },
  trustScore: {
    alignItems: 'flex-end',
  },
  trustScoreValue: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
  },
  trustScoreLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#86efac',
    borderRadius: 4,
  },
  trustMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  trustMetric: {
    alignItems: 'center',
  },
  trustMetricLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginBottom: 4,
  },
  trustMetricValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
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
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: '#fed7aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statIconPurple: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: '#ede9fe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 13,
    color: '#64748b',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
  },
  statChange: {
    fontSize: 12,
    color: '#16a34a',
    marginTop: 4,
  },
  chartCard: {
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
  chartTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 12,
  },
  chart: {
    marginLeft: -16,
    borderRadius: 0,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  actionEmoji: {
    fontSize: 18,
  },
  actionContent: {
    marginLeft: 12,
    flex: 1,
  },
  actionText: {
    fontSize: 15,
    color: '#0f172a',
    fontWeight: '500',
  },
  actionTime: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },
  recommendationCard: {
    flexDirection: 'row',
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
  recommendationIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendationEmoji: {
    fontSize: 18,
  },
  recommendationContent: {
    marginLeft: 12,
    flex: 1,
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  recommendationTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#0f172a',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  priorityText: {
    fontSize: 11,
  },
  recommendationDescription: {
    fontSize: 14,
    color: '#64748b',
  },
  privacyCard: {
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
  privacyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  privacyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  privacyButton: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 12,
  },
  privacyButtonText: {
    fontSize: 15,
    color: '#1e293b',
  },
});
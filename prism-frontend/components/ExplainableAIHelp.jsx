import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Search, AlertCircle, CheckCircle, AlertTriangle, ChevronDown, ChevronUp, Lightbulb, XCircle } from 'lucide-react-native';

export function ExplainableAIHelp({ onNavigate }) {
  const [expandedCard, setExpandedCard] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const issues = [
    {
      id: 1,
      type: 'Loan Application',
      title: 'Personal Loan - Rejected',
      date: 'Nov 15, 2025',
      amount: '$15,000',
      reasons: [
        { text: 'Credit score below minimum threshold (620 vs required 650)', severity: 'high' },
        { text: 'Inconsistent income pattern over last 3 months', severity: 'high' },
        { text: 'High debt-to-income ratio (45% vs recommended 36%)', severity: 'medium' },
      ],
      explanation: 'Your loan application was automatically declined by our AI system due to multiple risk factors that exceeded our lending criteria. The primary concerns are your current credit score and income stability.',
      riskFactors: [
        'Recent missed payment on credit card (30 days late)',
        'Three credit inquiries in the past 2 months',
        'Utilization rate above 80% on two credit cards',
      ],
      recommendations: [
        { text: 'Maintain consistent income for at least 3 months', priority: 'high' },
        { text: 'Reduce credit card utilization below 30%', priority: 'high' },
        { text: 'Make all payments on time for the next 6 months', priority: 'high' },
        { text: 'Consider applying for a smaller loan amount ($8,000-$10,000)', priority: 'medium' },
        { text: 'Add a co-signer with good credit history', priority: 'medium' },
      ],
    },
    {
      id: 2,
      type: 'Credit Card Application',
      title: 'Platinum Credit Card - Under Review',
      date: 'Nov 14, 2025',
      amount: '$10,000 limit',
      reasons: [
        { text: 'Application pending income verification', severity: 'low' },
        { text: 'Address verification in progress', severity: 'low' },
      ],
      explanation: 'Your credit card application is currently being reviewed. Our system requires additional documentation to verify your income and residential address.',
      riskFactors: [],
      recommendations: [
        { text: 'Upload recent pay stubs or tax returns', priority: 'high' },
        { text: 'Provide utility bill for address verification', priority: 'high' },
      ],
    },
  ];

  const recentQueries = [
    'Why was my loan rejected?',
    'What went wrong with my credit card application?',
    'How to improve credit score?',
    'Explain KYC failure',
  ];

  const getSeverityStyle = (severity) => {
    switch (severity) {
      case 'high':
        // Corrected syntax for object return
        return { backgroundColor: '#fee2e2', color: '#dc2626', borderColor: '#fecaca' };
      case 'medium':
        // Corrected syntax for object return
        return { backgroundColor: '#fed7aa', color: '#ea580c', borderColor: '#fdba74' };
      case 'low':
        // Corrected syntax for object return
        return { backgroundColor: '#fef3c7', color: '#ca8a04', borderColor: '#fde68a' };
      default:
        // Corrected syntax for object return
        return { backgroundColor: '#dbeafe', color: '#2563eb', borderColor: '#bfdbfe' };
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#eff6ff', '#f0f9ff']} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            onPress={() => onNavigate('home')}
            style={styles.backButton}
          >
            <ArrowLeft color="#334155" size={20} />
          </TouchableOpacity>
          <View style={styles.headerTitles}>
            <Text style={styles.headerTitle}>AI Help Centre</Text>
            <Text style={styles.headerSubtitle}>Get explanations & guidance</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search color="#64748b" size={20} />
          <TextInput
            placeholder="Ask the AI anything..."
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </View>

        {/* Recent Queries */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.queriesContent}
        >
          {recentQueries.map((query, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSearchQuery(query)}
              style={styles.queryChip}
            >
              <Text style={styles.queryChipText}>{query}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </LinearGradient>

      {/* Issues List */}
      <ScrollView style={styles.issuesList} contentContainerStyle={styles.issuesContent}>
        {issues.map((issue) => (
          <View key={issue.id} style={styles.issueCard}>
            {/* Issue Header */}
            <TouchableOpacity
              onPress={() => setExpandedCard(expandedCard === issue.id ? null : issue.id)}
              style={styles.issueHeader}
            >
              <View style={styles.issueHeaderContent}>
                <View style={styles.issueHeaderBadges}>
                  <View style={styles.typeBadge}>
                    <Text style={styles.typeBadgeText}>{issue.type}</Text>
                  </View>
                  <Text style={styles.issueDate}>{issue.date}</Text>
                </View>
                <Text style={styles.issueTitle}>{issue.title}</Text>
                <Text style={styles.issueAmount}>{issue.amount}</Text>
              </View>
              <View>
                {expandedCard === issue.id ? (
                  <ChevronUp color="#64748b" size={20} />
                ) : (
                  <ChevronDown color="#64748b" size={20} />
                )}
              </View>
            </TouchableOpacity>

            {/* Reasons Preview */}
            <View style={styles.reasonsPreview}>
              {issue.reasons.slice(0, 2).map((reason, idx) => (
                <View key={idx} style={[styles.reasonChip, getSeverityStyle(reason.severity)]}>
                  <Text style={[styles.reasonChipText, { color: getSeverityStyle(reason.severity).color }]} numberOfLines={1}>
                    {reason.text.length > 40 ? reason.text.substring(0, 40) + '...' : reason.text}
                  </Text>
                </View>
              ))}
              {issue.reasons.length > 2 && (
                <View style={styles.moreChip}>
                  <Text style={styles.moreChipText}>+{issue.reasons.length - 2} more</Text>
                </View>
              )}
            </View>

            {/* Expanded Details */}
            {expandedCard === issue.id && (
              <View style={styles.expandedContent}>
                {/* AI Explanation */}
                <View style={styles.explanationCard}>
                  <View style={styles.explanationHeader}>
                    <View style={styles.explanationIcon}>
                      <AlertCircle color="#4338ca" size={16} />
                    </View>
                    <Text style={styles.explanationTitle}>AI Explanation</Text>
                  </View>
                  <Text style={styles.explanationText}>{issue.explanation}</Text>
                </View>

                {/* All Reasons */}
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <XCircle color="#ef4444" size={16} />
                    <Text style={styles.sectionTitle}>Rejection Reasons</Text>
                  </View>
                  {issue.reasons.map((reason, idx) => (
                    <View key={idx} style={[styles.reasonCard, getSeverityStyle(reason.severity)]}>
                      <Text style={[styles.reasonText, { color: getSeverityStyle(reason.severity).color }]}>
                        {reason.text}
                      </Text>
                    </View>
                  ))}
                </View>

                {/* Risk Factors */}
                {issue.riskFactors.length > 0 && (
                  <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                      <AlertTriangle color="#ca8a04" size={16} />
                      <Text style={styles.sectionTitle}>Risk Factors Detected</Text>
                    </View>
                    {issue.riskFactors.map((factor, idx) => (
                      <View key={idx} style={styles.riskCard}>
                        <Text style={styles.riskText}>• {factor}</Text>
                      </View>
                    ))}
                  </View>
                )}

                {/* Recommendations */}
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Lightbulb color="#16a34a" size={16} />
                    <Text style={styles.sectionTitle}>Personalized Recommendations</Text>
                  </View>
                  {issue.recommendations.map((rec, idx) => (
                    <View key={idx} style={styles.recommendationCard}>
                      <CheckCircle 
                        color={rec.priority === 'high' ? '#16a34a' : '#ca8a04'} 
                        size={16} 
                        style={{ marginTop: 2 }}
                      />
                      <Text style={styles.recommendationText}>{rec.text}</Text>
                    </View>
                  ))}
                </View>

                {/* Action Button */}
                <TouchableOpacity style={styles.actionButton}>
                  <LinearGradient colors={['#fb923c', '#f97316']} style={styles.actionButtonGradient}>
                    <Text style={styles.actionButtonText}>Schedule Call with Advisor</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
    marginLeft: 12,
  },
  queriesContent: {
    gap: 8,
  },
  queryChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  queryChipText: {
    fontSize: 12,
    color: '#334155',
  },
  issuesList: {
    flex: 1,
  },
  issuesContent: {
    padding: 24,
    gap: 16,
  },
  issueCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  issueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
  },
  issueHeaderContent: {
    flex: 1,
  },
  issueHeaderBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#ede9fe',
    borderWidth: 1,
    borderColor: '#ddd6fe',
  },
  typeBadgeText: {
    fontSize: 12,
    color: '#7c3aed',
  },
  issueDate: {
    fontSize: 12,
    color: '#64748b',
  },
  issueTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0f172a',
    marginBottom: 4,
  },
  issueAmount: {
    fontSize: 14,
    color: '#64748b',
  },
  reasonsPreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  reasonChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    maxWidth: '100%',
  },
  reasonChipText: {
    fontSize: 12,
  },
  moreChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#dbeafe',
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  moreChipText: {
    fontSize: 12,
    color: '#1d4ed8',
  },
  expandedContent: {
    padding: 20,
    paddingTop: 0,
    backgroundColor: '#f8fafc',
    gap: 16,
  },
  explanationCard: {
    backgroundColor: '#e0e7ff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#c7d2fe',
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  explanationIcon: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: '#c7d2fe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#312e81',
  },
  explanationText: {
    fontSize: 14,
    color: '#3730a3',
    lineHeight: 20,
  },
  section: {
    gap: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  reasonCard: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  reasonText: {
    fontSize: 14,
  },
  riskCard: {
    backgroundColor: '#fef3c7',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fde68a',
  },
  riskText: {
    fontSize: 14,
    color: '#854d0e',
  },
  recommendationCard: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#dcfce7',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  recommendationText: {
    flex: 1,
    fontSize: 14,
    color: '#166534',
  },
  actionButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 8,
  },
  actionButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
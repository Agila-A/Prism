import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, User, DollarSign, MessageSquare } from 'lucide-react-native';

export function TransferMoney({ onNavigate }) {
  const [amount, setAmount] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);

  const recentContacts = [
    { id: 1, name: 'John Smith', avatar: '👨', lastAmount: '$250' },
    { id: 2, name: 'Emma Wilson', avatar: '👩', lastAmount: '$100' },
    { id: 3, name: 'Michael Brown', avatar: '👨', lastAmount: '$450' },
    { id: 4, name: 'Sarah Davis', avatar: '👩', lastAmount: '$75' },
  ];

  const quickAmounts = ['$50', '$100', '$250', '$500'];

  // Helper to safely find the selected contact
  const getSelectedContactDetails = () => {
    return recentContacts.find(c => c.id === selectedContact);
  };

  const handleAmountChange = (text) => {
    // Allows only numbers and a single decimal point
    const cleanedText = text.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    setAmount(cleanedText);
  };

  const handleQuickAmountPress = (amt) => {
    // Remove the '$' and set the amount
    setAmount(amt.substring(1));
  };

  const formattedAmount = amount && parseFloat(amount) > 0 ? parseFloat(amount).toFixed(2) : '0.00';
  const isButtonDisabled = !amount || parseFloat(amount) <= 0 || !selectedContact;

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#eff6ff', '#f0f9ff']} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => onNavigate('home')} style={styles.backButton}>
            <ArrowLeft color="#334155" size={20} />
          </TouchableOpacity>
          <View style={styles.headerTitles}>
            <Text style={styles.headerTitle}>Transfer Money</Text>
            <Text style={styles.headerSubtitle}>Send money instantly</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Amount Input */}
        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>Enter Amount</Text>
          <View style={styles.amountInput}>
            <DollarSign color="#f97316" size={32} />
            <TextInput
              value={amount}
              onChangeText={handleAmountChange}
              placeholder="0.00"
              placeholderTextColor="#cbd5e1"
              keyboardType="decimal-pad"
              style={styles.amountText}
            />
          </View>
          <View style={styles.quickAmounts}>
            {quickAmounts.map((amt) => (
              <TouchableOpacity
                key={amt}
                onPress={() => handleQuickAmountPress(amt)}
                style={styles.quickAmountButton}
              >
                <Text style={styles.quickAmountText}>{amt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>


        {/* Recent Contacts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Contacts</Text>
          <View style={styles.contactsGrid}>
            {recentContacts.map((contact) => (
              <TouchableOpacity
                key={contact.id}
                onPress={() => setSelectedContact(contact.id)}
                style={selectedContact === contact.id ? styles.contactSelected : styles.contact}
              >
                {selectedContact === contact.id ? (
                  <LinearGradient colors={['#fb923c', '#f97316']} style={styles.contactGradient}>
                    <View style={styles.contactAvatarSelected}>
                      <Text style={styles.contactEmoji}>{contact.avatar}</Text>
                    </View>
                    <Text style={styles.contactNameSelected}>{contact.name.split(' ')[0]}</Text>
                  </LinearGradient>
                ) : (
                  <>
                    <View style={styles.contactAvatar}>
                      <Text style={styles.contactEmoji}>{contact.avatar}</Text>
                    </View>
                    <Text style={styles.contactName}>{contact.name.split(' ')[0]}</Text>
                  </>
                )}
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            onPress={() => onNavigate('add-beneficiary')}
            style={styles.addContactButton}
          >
            <User color="#334155" size={16} />
            <Text style={styles.addContactText}>Add New Beneficiary</Text>
          </TouchableOpacity>
        </View>

        {/* Selected Contact Details */}
        {selectedContact && (
          <View style={styles.section}>
            <LinearGradient colors={['#a78bfa', '#818cf8']} style={styles.selectedContactCard}>
              <View style={styles.selectedContactContent}>
                <View style={styles.selectedContactAvatar}>
                  <Text style={styles.selectedContactEmoji}>
                    {getSelectedContactDetails()?.avatar}
                  </Text>
                </View>
                <View>
                  <Text style={styles.selectedContactName}>
                    {getSelectedContactDetails()?.name}
                  </Text>
                  <Text style={styles.selectedContactInfo}>
                    Last sent: {getSelectedContactDetails()?.lastAmount}
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        )}

        {/* Add Message */}
        <View style={styles.section}>
          <View style={styles.messageInput}>
            <MessageSquare color="#64748b" size={20} />
            <TextInput
              placeholder="Add a message (optional)"
              placeholderTextColor="#94a3b8"
              style={styles.messageText}
            />
          </View>
        </View>

        {/* Transfer Button */}
        <View style={styles.section}>
          <TouchableOpacity
            disabled={isButtonDisabled}
            style={styles.transferButton}
          >
            {isButtonDisabled ? (
              <View style={styles.transferButtonDisabled}>
                <Text style={styles.transferButtonTextDisabled}>Transfer ${formattedAmount}</Text>
              </View>
            ) : (
              <LinearGradient colors={['#fb923c', '#f97316']} style={styles.transferButtonGradient}>
                <Text style={styles.transferButtonText}>Transfer ${formattedAmount}</Text>
              </LinearGradient>
            )}
          </TouchableOpacity>
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
    alignItems: 'center',
    gap: 12,
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  amountCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  amountLabel: {
    textAlign: 'center',
    fontSize: 14,
    color: '#64748b',
    marginBottom: 12,
  },
  amountInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  amountText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#0f172a',
    width: 160,
    textAlign: 'center',
    // Remove the default text input border/padding
    padding: 0,
  },
  quickAmounts: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  quickAmountButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  quickAmountText: {
    fontSize: 14,
    color: '#334155',
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 16,
  },
  contactsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  contact: {
    width: '23%',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  contactSelected: {
    width: '23%',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  contactGradient: {
    alignItems: 'center',
    gap: 8,
    padding: 12,
  },
  contactAvatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactAvatarSelected: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactEmoji: {
    fontSize: 24,
  },
  contactName: {
    fontSize: 12,
    color: '#334155',
    textAlign: 'center',
  },
  contactNameSelected: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
  addContactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  addContactText: {
    fontSize: 14,
    color: '#334155',
    fontWeight: '500',
  },
  selectedContactCard: {
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  selectedContactContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  selectedContactAvatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedContactEmoji: {
    fontSize: 24,
  },
  selectedContactName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  selectedContactInfo: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginTop: 2,
  },
  messageInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
  messageText: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
    padding: 0,
  },
  transferButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  transferButtonDisabled: {
    backgroundColor: '#e2e8f0',
    paddingVertical: 16,
    alignItems: 'center',
  },
  transferButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  transferButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  transferButtonTextDisabled: {
    color: '#94a3b8',
    fontSize: 18,
    fontWeight: '600',
  },
});
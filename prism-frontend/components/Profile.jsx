import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  User,
  Bell,
  Lock,
  HelpCircle,
  FileText,
  LogOut,
  Sparkles,
  Shield,
  ChevronRight
} from 'lucide-react-native';

export function Profile({ onNavigate }) {
  const menuItems = [
    { icon: User, label: 'Personal Information', screen: null },
    { icon: Bell, label: 'Notifications', screen: 'notifications' },
    { icon: Lock, label: 'Security & Privacy', screen: null },
    { icon: Sparkles, label: 'AI Settings', screen: 'ai-dashboard' },
    { icon: Shield, label: 'Biometric Authentication', screen: null },
    { icon: HelpCircle, label: 'Help & Support', screen: null },
    { icon: FileText, label: 'Terms & Conditions', screen: null },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#eff6ff', '#f0f9ff']} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => onNavigate('home')} style={styles.backButton}>
            <ArrowLeft color="#334155" size={20} />
          </TouchableOpacity>

          <View style={styles.headerTitles}>
            <Text style={styles.headerTitle}>Profile & Settings</Text>
            <Text style={styles.headerSubtitle}>Manage your account</Text>
          </View>
        </View>

        {/* Profile Card */}
        <LinearGradient colors={['#fb923c', '#f97316']} style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarEmoji}>👩</Text>
            </View>

            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Sarah Johnson</Text>
              <Text style={styles.profileEmail}>sarah.johnson@email.com</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </LinearGradient>
      </LinearGradient>

      {/* Scroll Section */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>

        {menuItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <TouchableOpacity
              key={index}
              onPress={() => item.screen && onNavigate(item.screen)}
              style={styles.menuItem}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.menuItemIcon}>
                  <Icon color="#64748b" size={20} />
                </View>

                <Text style={styles.menuItemLabel}>{item.label}</Text>
              </View>

              <ChevronRight color="#94a3b8" size={20} />
            </TouchableOpacity>
          );
        })}

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={() => onNavigate('user-login')}>
          <LogOut color="#dc2626" size={20} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* Version */}
        <Text style={styles.appVersion}>PRISM Banking v2.5.0</Text>

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
  },

  headerTitles: { flex: 1 },

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

  profileCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
  },

  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarEmoji: {
    fontSize: 32,
  },

  profileInfo: { flex: 1 },

  profileName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },

  profileEmail: {
    color: '#fed7aa',
    fontSize: 14,
  },

  editButton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },

  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  scrollView: { flex: 1 },

  scrollContent: {
    padding: 24,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 8,
  },

  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },

  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  menuItemLabel: {
    fontSize: 15,
    color: '#0f172a',
    fontWeight: '500',
  },

  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: '#fee2e2',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#fecaca',
    marginTop: 16,
  },

  logoutText: {
    color: '#dc2626',
    fontSize: 16,
    fontWeight: '600',
  },

  appVersion: {
    textAlign: 'center',
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 24,
  },
});

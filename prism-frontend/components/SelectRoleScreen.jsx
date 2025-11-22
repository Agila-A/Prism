import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Shield, ChevronRight } from 'lucide-react-native';

export function SelectRoleScreen({ onNavigate }) {
  const roles = [
    {
      id: 'user',
      title: 'User Login',
      subtitle: 'Access your personal banking',
      icon: User,
      colors: ['#fb923c', '#f97316'],
      screen: 'user-login',
      emoji: '👤',
    },
    {
      id: 'admin',
      title: 'Admin Login',
      subtitle: 'Access administrative controls',
      icon: Shield,
      colors: ['#818cf8', '#6366f1'],
      screen: 'admin-login',
      emoji: '🛡️',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <LinearGradient colors={['#eff6ff', '#f0f9ff']} style={styles.header}>
          <View style={styles.logoContainer}>
            <LinearGradient colors={['#fb923c', '#f97316']} style={styles.logo}>
              <Text style={styles.logoText}>P</Text>
            </LinearGradient>
          </View>
          <Text style={styles.appName}>PRISM</Text>
          <Text style={styles.tagline}>Smart Banking with AI</Text>
        </LinearGradient>

        {/* Welcome Text */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeTitle}>Welcome to PRISM</Text>
          <Text style={styles.welcomeSubtitle}>Choose how you'd like to continue</Text>
        </View>

        {/* Role Selection Cards */}
        <View style={styles.rolesContainer}>
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <TouchableOpacity
                key={role.id}
                onPress={() => onNavigate(role.screen)}
                style={styles.roleCard}
              >
                <LinearGradient colors={role.colors} style={styles.roleCardGradient}>
                  {/* Icon */}
                  <View style={styles.roleIconContainer}>
                    <View style={styles.roleIcon}>
                      <Text style={styles.roleEmoji}>{role.emoji}</Text>
                    </View>
                  </View>

                  {/* Content */}
                  <View style={styles.roleContent}>
                    <Text style={styles.roleTitle}>{role.title}</Text>
                    <Text style={styles.roleSubtitle}>{role.subtitle}</Text>
                  </View>

                  {/* Arrow */}
                  <View style={styles.roleArrow}>
                    <ChevronRight color="#fff" size={24} />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Features List */}
        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>What you get with PRISM</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Text style={styles.featureEmoji}>🎤</Text>
              <Text style={styles.featureText}>Voice-powered banking assistant</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureEmoji}>🤖</Text>
              <Text style={styles.featureText}>AI-driven insights & recommendations</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureEmoji}>🔒</Text>
              <Text style={styles.featureText}>Bank-grade security & privacy</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureEmoji}>⚡</Text>
              <Text style={styles.featureText}>Instant transfers & payments</Text>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 16,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '700',
  },
  appName: {
    fontSize: 32,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  tagline: {
    fontSize: 16,
    color: '#64748b',
  },
  welcomeContainer: {
    paddingHorizontal: 24,
    marginTop: 32,
    marginBottom: 32,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  rolesContainer: {
    paddingHorizontal: 24,
    gap: 16,
  },
  roleCard: {
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  roleCardGradient: {
    padding: 24,
    minHeight: 140,
  },
  roleIconContainer: {
    marginBottom: 16,
  },
  roleIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roleEmoji: {
    fontSize: 28,
  },
  roleContent: {
    marginBottom: 12,
  },
  roleTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  roleSubtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
  },
  roleArrow: {
    position: 'absolute',
    right: 24,
    top: 24,
  },
  featuresContainer: {
    paddingHorizontal: 24,
    marginTop: 40,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 20,
    textAlign: 'center',
  },
  featuresList: {
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
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
  featureEmoji: {
    fontSize: 24,
  },
  featureText: {
    flex: 1,
    fontSize: 15,
    color: '#334155',
    fontWeight: '500',
  },
});

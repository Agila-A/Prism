import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Home, CreditCard, Sparkles, User } from 'lucide-react-native';

export function BottomNav({ currentScreen, onNavigate }) {
  const navItems = [
    { icon: Home, label: 'Home', screen: 'home' },
    { icon: CreditCard, label: 'Cards', screen: 'loan' },
    { icon: Sparkles, label: 'AI', screen: 'ai-dashboard' },
    { icon: User, label: 'Profile', screen: 'profile' },
  ];

  return (
    <View style={styles.container}>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentScreen === item.screen;
        
        return (
          <TouchableOpacity
            key={item.screen}
            onPress={() => onNavigate(item.screen)}
            style={styles.navItem}
          >
            <Icon 
              color={isActive ? '#f97316' : '#94a3b8'} 
              size={24}
            />
            <Text style={[
              styles.navLabel,
              isActive && styles.navLabelActive
            ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingHorizontal: 24,
    paddingVertical: 12,
    paddingBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  navLabel: {
    fontSize: 12,
    color: '#94a3b8',
  },
  navLabelActive: {
    color: '#f97316',
    fontWeight: '600',
  },
});

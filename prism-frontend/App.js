import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { Home } from './components/Home';
import { VoiceAssistantHome } from './components/VoiceAssistantHome';
import { VoiceActivityLogs } from './components/VoiceActivityLogs';
import { ExplainableAIHelp } from './components/ExplainableAIHelp';
import { UserAIDashboard } from './components/UserAIDashboard';
import { GovernanceDashboard } from './components/GovernanceDashboard';
import { LoanApplication } from './components/LoanApplication';
import { TransferMoney } from './components/TransferMoney';
import  { PayBills }  from './components/PayBills';
import { AddBeneficiary}  from './components/AddBeneficiary';
import { Profile } from './components/Profile';
import  {Notifications}  from './components/Notifications';
import { BottomNav } from './components/BottomNav';
import {View} from 'react-native';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <Home onNavigate={setCurrentScreen} />;
      case 'voice-assistant':
        return <VoiceAssistantHome onNavigate={setCurrentScreen} />;
      case 'voice-logs':
        return <VoiceActivityLogs onNavigate={setCurrentScreen} />;
      case 'ai-help':
        return <ExplainableAIHelp onNavigate={setCurrentScreen} />;
      case 'ai-dashboard':
        return <UserAIDashboard onNavigate={setCurrentScreen} />;
      case 'governance':
        return <GovernanceDashboard onNavigate={setCurrentScreen} />;
      case 'loan':
        return <LoanApplication onNavigate={setCurrentScreen} />;
      case 'transfer':
        return <TransferMoney onNavigate={setCurrentScreen} />;
      case 'pay-bills':
        return <PayBills onNavigate={setCurrentScreen} />;
      case 'add-beneficiary':
        return <AddBeneficiary onNavigate={setCurrentScreen} />;
      case 'profile':
        return <Profile onNavigate={setCurrentScreen} />;
      case 'notifications':
        return <Notifications onNavigate={setCurrentScreen} />;
      default:
        return <Home onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#3730a3" />
      {renderScreen()}
      {currentScreen !== 'voice-assistant' && currentScreen !== 'governance' && (
        <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      )}
    </>
  );
}

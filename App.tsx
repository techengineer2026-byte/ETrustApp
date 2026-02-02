// App.tsx

import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { ChatProvider } from './src/context/ChatContext';
export default function App() {
  return (
      <ChatProvider>
        <AppNavigator />
      </ChatProvider>
  );
}

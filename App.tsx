// App.tsx

import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { ChatProvider } from './src/context/ChatContext';
import { EmployerAuthProvider } from "./src/context/EmployerAuthContext";

export default function App() {
  return (
    <ChatProvider>
      <EmployerAuthProvider>
        <AppNavigator />
      </EmployerAuthProvider>
    </ChatProvider>
  );
}


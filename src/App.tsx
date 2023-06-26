import React from 'react';
import { View } from 'react-native'
import { AuthProvider } from './Context';

import Navigation from '@Navigation';
import Toast from 'react-native-toast-message';
import { Colors } from '@Config';

const App = () => {
  return (
    <AuthProvider>
      <View style={{ flex: 1, backgroundColor: Colors.background }}>
        <Navigation />
        <Toast />
      </View>
    </AuthProvider>
  );
};


export default App;

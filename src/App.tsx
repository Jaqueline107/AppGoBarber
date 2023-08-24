import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AppProvider from './hooks';

import Routes from "./routes";

const App = () => (
    <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#1c1a22" />
        <AppProvider>
        <View style={{ flex: 1, backgroundColor: '#312e38' }} >
            <Routes />
        </View>
        </AppProvider>
    </NavigationContainer>
);

export default App;

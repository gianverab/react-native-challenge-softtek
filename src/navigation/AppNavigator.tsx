import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import Home from '../screens/Home';
import { Layout } from '../components/layout/Layout';

// Create the navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Layout>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: 'Home' }}
          />
        </Stack.Navigator>
      </Layout>
    </NavigationContainer>
  );
};

export default AppNavigator;

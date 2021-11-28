import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SCREENS } from '../constants/screens';
import { Login } from '../screens';

const Stack = createStackNavigator();
const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name={SCREENS.LOGIN} component={Login} />
        </Stack.Navigator>
    );
};

export default AuthStack;

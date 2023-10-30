import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuNavigation from './MenuNavigation';
import Login from '../screen/Auth/Login';


const Stack = createNativeStackNavigator();

const RootNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="MenuNavigation" component={MenuNavigation}
                options={{ headerShown: false }} />
            <Stack.Screen name='Login' component={Login} />
        </Stack.Navigator>
    )
}

export default RootNavigation;
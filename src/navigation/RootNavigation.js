import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuNavigation from './MenuNavigation';
import Login from '../screen/Auth/Login';
import OrderDetail from '../screen/Order/OrderDetail';
const Stack = createNativeStackNavigator();

const RootNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="MenuNavigation" component={MenuNavigation} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='OrderDetail' component={OrderDetail} />
        </Stack.Navigator>
    )
}

export default RootNavigation;
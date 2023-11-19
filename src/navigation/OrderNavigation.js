import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// import OrderAll from '../screen/Order/OrderAll';
import OrderComplete from '../screen/Order/OrderComplete';
import OrderProcessing from '../screen/Order/OrderProcessing';
import OrderReceived from '../screen/Order/OrderReceived';
import Ordered from '../screen/Order/Ordered';
import { colors } from '../constant/color';
const Tab = createMaterialTopTabNavigator();


const OrderNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: 'black',
                tabBarLabelStyle: { fontSize: 13, textTransform: 'none' },
                tabBarStyle: { backgroundColor: colors.white },
                tabBarIndicatorStyle: {
                    backgroundColor: colors.primary,
                    height: 2,
                    borderRadius: 25,
                },
            }}>
            {/* <Tab.Screen name="OrderAll" component={OrderAll}
                options={{
                    tabBarLabel: "Tất cả"
                }} /> */}
            <Tab.Screen name="Ordered" component={Ordered}
                options={{
                    tabBarLabel: "Đơn mới"
                }} />
            <Tab.Screen name="OrderProcessing" component={OrderProcessing}
                options={{
                    tabBarLabel: "Đang xử lý"
                }} />
            <Tab.Screen name="OrderComplete" component={OrderComplete}
                options={{
                    tabBarLabel: "Hoàn thành"
                }} />
            <Tab.Screen name="OrderReceived" component={OrderReceived}
                options={{
                    tabBarLabel: "Đã nhận"
                }} />
        </Tab.Navigator>
    )
};

export default OrderNavigation;
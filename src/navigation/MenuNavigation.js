import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screen/Home/Home';
import Setting from '../screen/Setting/Setting';
import OrderNavigation from './OrderNavigation';

const Drawer = createDrawerNavigator();

const MenuNavigation = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                // headerShown: false
            }}>
            <Drawer.Screen name="Home" component={Home}
                options={{
                    title: "Trang chủ"
                }} />
            <Drawer.Screen name='OrderList' component={OrderNavigation}
                options={{
                    title: "Quản lý đơn hàng"
                }} />
            <Drawer.Screen name="Setting" component={Setting}
                options={{
                    title: "Cài đặt"
                }} />
        </Drawer.Navigator>
    )
};
export default MenuNavigation;
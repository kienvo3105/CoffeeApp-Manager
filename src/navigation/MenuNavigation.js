import React, { useContext } from 'react'
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import Home from '../screen/Home/Home';
// import Setting from '../screen/Setting/Setting';
import OrderNavigation from './OrderNavigation';
import { View, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
const Drawer = createDrawerNavigator();





const CustomDrawerContent = (props) => {
    const { authContext } = useContext(AuthContext);
    const { signOut } = authContext;
    return (
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <DrawerItem label="Đăng xuất"
                onPress={() => Alert.alert("Đăng xuất", "Bạn có chắc chắn đăng xuất?", [{
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: signOut },])}
                style={{ backgroundColor: 'red', marginBottom: 20 }} labelStyle={{ fontSize: 20, color: 'white', paddingLeft: 80 }} />
        </View>
    );
}


const MenuNavigation = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                // headerShown: false
            }}
            // useLegacyImplementation
            drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={Home}
                options={{
                    title: "Trang chủ"
                }} />
            <Drawer.Screen name='OrderList' component={OrderNavigation}
                options={{
                    title: "Quản lý đơn hàng"
                }} />
            {/* <Drawer.Screen name="Setting" component={Setting}
                options={{
                    title: "Cài đặt"
                }} /> */}
        </Drawer.Navigator>
    )
};
export default MenuNavigation;
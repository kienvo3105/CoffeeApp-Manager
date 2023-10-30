import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screen/Home/Home';
import Setting from '../screen/Setting/Setting';


const Drawer = createDrawerNavigator();

const MenuNavigation = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Setting" component={Setting} />
        </Drawer.Navigator>
    )
};
export default MenuNavigation;
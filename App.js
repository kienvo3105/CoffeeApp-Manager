import React from 'react'
import { StatusBar, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './src/navigation/RootNavigation';
import { colors } from './src/constant/color';
const App = () => {
    return (
        <NavigationContainer>
            <StatusBar backgroundColor={colors.primary} />
            <RootNavigation />
        </NavigationContainer>
    )
}

export default App;
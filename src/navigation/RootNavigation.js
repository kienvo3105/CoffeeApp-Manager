import { StyleSheet, StatusBar, Alert, View, ActivityIndicator } from 'react-native'
import React, { useReducer, useMemo, useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuNavigation from './MenuNavigation';
import Login from '../screen/Auth/Login';
import OrderDetail from '../screen/Order/OrderDetail';

import { colors } from '../constant/color';
import { usePost, useGet } from '../api';
import { AuthContext } from '../context/AuthContext';
import * as Keychain from 'react-native-keychain';
const Stack = createNativeStackNavigator();

const RootNavigation = () => {
    const { fetchPost, result, isError } = usePost();
    const { fetchGet, result: manager, isError: managerError } = useGet();
    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'INIT':
                    return {
                        ...prevState,
                        isLoading: true
                    };
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignOut: false,
                        userToken: action.token,
                        manager: action.manager,
                        isLoading: false,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignOut: true,
                        userToken: null,
                        manager: {}
                    };
                case 'UPDATE_MANAGER':
                    return {
                        ...prevState,
                        manager: action.manager,
                    };
                case 'ERROR':
                    return {
                        ...prevState,
                        isLoading: false
                    };
            }
        },
        {
            isLoading: true,
            isSignOut: false,
            userToken: null,
            manager: {}
        }
    );

    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken = null;
            try {
                const credentials = await Keychain.getGenericPassword();
                if (credentials) {
                    userToken = credentials.password;
                    await fetchGet("manager/get-one-manager");
                }
            } catch (e) {
                // Restoring token failed
                console.log("error login by token", e);
            }

            // After restoring token, we may need to validate it in production apps

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.

            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };
        bootstrapAsync();
    }, []);


    const authContext = useMemo(
        () => ({
            signIn: async (email, password) => {
                try {
                    dispatch({ type: 'INIT' });
                    await fetchPost("auth/managerLogin", { email, password });
                } catch (e) {
                    // saving error
                    console.log("error login handle!", e);
                }
            },
            signOut: async () => {
                await Keychain.resetGenericPassword();
                dispatch({ type: 'SIGN_OUT' });
            },
        }),
        []
    );

    useEffect(() => {
        if (manager && !managerError) {
            console.log('Manager root:', manager);
            dispatch({ type: 'UPDATE_MANAGER', manager: manager.manager })
        }
    }, [manager])

    useEffect(() => {
        if (result) {
            const login = async () => {
                let userToken = null;
                let manager = {}
                if (result?.errorCode && result?.errorCode !== 0)
                    Alert.alert("Lỗi đăng nhập!!", "Tài khoản hoặc mật khẩu không đúng!")
                if (result?.errorCode === 0) {
                    console.log(result.manager)
                    manager = result.manager
                    userToken = result.token;
                    await Keychain.setGenericPassword('myToken', userToken);
                }
                dispatch({ type: 'SIGN_IN', token: userToken, manager });
            }
            login();
        }
    }, [result])

    useEffect(() => {
        if (isError) {
            Alert.alert("Lỗi đăng nhập! Vui lòng thử lại");
            dispatch({ type: "ERROR" })
        }
    }, [isError])

    if (state.isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#3465a4" />
            </View>
        )
    }
    return (
        <AuthContext.Provider value={{ authContext, state }}>
            <StatusBar backgroundColor={state.userToken === null ? "black" : colors.primary} />
            {/* <NavigationContainer> */}
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
            >
                {Object.entries(state.manager).length === 0 ? (
                    <>
                        <Stack.Screen name='Login' component={Login} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="MenuNavigation" component={MenuNavigation} />
                        <Stack.Screen name='OrderDetail' component={OrderDetail} />
                    </>
                )}

            </Stack.Navigator>
            {/* </NavigationContainer> */}
        </AuthContext.Provider>
    )
}
export default RootNavigation;
import { StyleSheet, Text, TouchableOpacity, View, Image, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { Input, Button } from '@rneui/themed';

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from '../../constant/color';
import { AuthContext } from '../../context/AuthContext';

const Login = ({ navigation }) => {
    const { authContext } = useContext(AuthContext);
    const { signIn } = authContext;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <Image source={require("../../assets/image/logoApp.png")} />
            </View>
            <View style={styles.formInput}>
                <Input
                    inputStyle={{ color: colors.textPrimary, fontSize: 16 }}
                    labelStyle={styles.label}
                    label="Email"
                    leftIcon={<Icon name="account" size={20} />}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Nhập Email"
                />
                <Input
                    inputStyle={{ color: colors.textPrimary, fontSize: 16 }}
                    label="Mật khẩu"
                    labelStyle={styles.label}
                    leftIcon={<Icon name="lock" size={18} />}
                    rightIcon={<Icon name={showPassword ? "eye" : "eye-off"} size={22} onPress={() => setShowPassword(!showPassword)} />}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Nhập mật khẩu"
                    secureTextEntry={!showPassword}

                />
                <TouchableOpacity style={{ alignItems: 'flex-end', marginBottom: 15 }}><Text style={styles.textPress}>Quên mật khẩu?</Text></TouchableOpacity>
            </View>
            <Button
                title="Đăng nhập"
                buttonStyle={{
                    backgroundColor: colors.primary,
                    // borderWidth: 2,
                    // borderColor: 'white',
                    borderRadius: 30,
                }}
                containerStyle={{
                    // width: 200,
                    marginHorizontal: 20,
                    marginVertical: 10,
                }}
                titleStyle={{ fontWeight: 'bold' }}
                disabled={email !== "" && password !== "" ? false : true}
                onPress={() => signIn(email, password)}
            />
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1e3b2',
    },
    formInput: {
        marginTop: "5%",
        marginHorizontal: 20
    },
    label: { color: colors.textPrimary, fontSize: 18, fontWeight: 'bold' },
    textPress: {
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: 14
    },
})
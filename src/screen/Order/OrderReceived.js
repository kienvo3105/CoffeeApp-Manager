import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { colors } from '../../constant/color'
import OrderItem from '../../component/Order/OrderItem'
import { useGet } from '../../api'
import { useFocusEffect } from '@react-navigation/native'

const OrderReceived = () => {
    const { state } = useContext(AuthContext);
    const { manager } = state;
    const { fetchGet, result, isError, isLoading } = useGet();
    const [order, setOrder] = useState([]);

    const nextStep = async () => {
        getOrder();
    }


    const getOrder = async () => {
        await fetchGet(`order/branch/${manager.Branch.id}?status=t4`);
    }

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;
            getOrder();

            return () => {
                isActive = false;
            };
        }, [])
    );

    useEffect(() => {
        if (result && !isError) {
            setOrder(result.orders);
        }
    }, [result])


    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} color={colors.primary} />
            </View>
        )
    }

    if (order.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Không có đơn hàng nào</Text>
            </View>
        )
    }

    return (
        <FlatList
            data={order}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => <OrderItem item={item} index={index} nextStep={nextStep} />}
        />
    )
}

export default OrderReceived

const styles = StyleSheet.create({})
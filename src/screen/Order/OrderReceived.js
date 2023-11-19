import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'

import OrderItem from '../../component/Order/OrderItem'
import { useGet } from '../../api'
import { useFocusEffect } from '@react-navigation/native'

const OrderReceived = () => {
    const { fetchGet, result, isError } = useGet();
    const [order, setOrder] = useState([]);

    const nextStep = async () => {
        getOrder();
    }


    const getOrder = async () => {
        await fetchGet("order/branch/c371548a-cf0b-422f-add6-85956f296ecc?status=t4");
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
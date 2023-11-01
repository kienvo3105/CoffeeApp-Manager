import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'

import { data } from '../../assets/data'
import OrderItem from '../../component/Order/OrderItem'

const OrderAll = () => {
    return (
        <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => <OrderItem item={item} index={index} />}
        />
    )
}

export default OrderAll

const styles = StyleSheet.create({})
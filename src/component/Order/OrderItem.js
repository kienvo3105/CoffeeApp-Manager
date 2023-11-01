import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { formatCurrency, formatTime, renderTitleButtonProcessOrder } from '../../utils/utils'
import { colors, colorStatus } from '../../constant/color'
import { useNavigation } from '@react-navigation/native'
const OrderItem = ({ item, index }) => {
    const navigation = useNavigation();
    const handlePressDetailOrder = () => {
        navigation.navigate("OrderDetail", { item })
    }
    return (
        <View style={styles.container}>
            <View style={styles.index}>
                <Text style={{ fontSize: 20, color: colors.white, fontWeight: 'bold' }}>{index < 9 ? '0' + (index + 1) : index + 1}</Text>
            </View>
            <View style={styles.order}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.textPrimary }}>{item.User.firstName} {item.User.lastName}</Text>
                        <Text style={{ fontSize: 15, color: colors.textExtra }}>{`${item.quantity} Item(s) | ${formatCurrency(item.finalPrice)}`}</Text>
                        <Text style={{ fontSize: 15, color: colors.textExtra }}>{item.deliveryMethod === "mv" ? "Mang Về" : "Tại Chỗ"}{item.deliveryMethod !== "vc" && ` | Nhận lúc xxx`}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={{ color: colors.textExtra, fontSize: 14 }}>{formatTime(item.orderDate)}</Text>
                        <Text style={{ color: colorStatus[item.OrderStatus.id], fontSize: 15, fontWeight: 'bold' }}>{item.OrderStatus.name}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
                    <TouchableOpacity
                        onPress={handlePressDetailOrder}
                        style={{ borderWidth: 1, width: 80, marginRight: 15, alignItems: 'center', borderColor: colors.darkGray }}>
                        <Text style={{ fontSize: 15, color: colors.textExtra }}>Xem thêm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ borderWidth: 1, width: 80, alignItems: 'center', borderColor: colors.primary }}>
                        <Text style={{ fontSize: 15, color: colors.primary }}>{renderTitleButtonProcessOrder(item.OrderStatus.id)}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default OrderItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: colors.white,
        padding: 10,
        marginVertical: 10
    },
    index: {
        backgroundColor: colors.primary,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    order: {
        marginLeft: 10,
        flex: 1
    }
})
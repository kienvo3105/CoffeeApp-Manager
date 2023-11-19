import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import BackBar from '../../component/Common/BackBar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../constant/color';
import ProductOrderItem from '../../component/Order/ProductOrderItem';
import { formatCurrency, formatTime, renderTitleButtonProcessOrder } from '../../utils/utils';
import { usePatch } from '../../api';
const OrderDetail = ({ route, navigation }) => {
    const { fetchPatch, result, isError } = usePatch();
    const { item } = route.params;

    const handleUpdateStatusOrder = async () => {
        fetchPatch(`order/${item.id}`, { statusId: `t${parseInt(item.OrderStatus.id[1]) + 1}` });
    }

    const handleCancelOrder = () => {
        fetchPatch(`order/${item.id}`, { statusId: `t5` });
    }

    useEffect(() => {
        if (result && !isError) {
            navigation.goBack();
        }
    }, [result])


    return (
        <View style={styles.container}>
            <BackBar title={item.OrderStatus.name} />
            <ScrollView>
                <View style={styles.frame}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.textPrimary }}>{item.User.firstName} {item.User.lastName}</Text>
                    <Text style={styles.title}>Số điện thoại: {item.User.phoneNumber}</Text>
                    <Text style={styles.title}>{item.deliveryMethod === "mv" ? "Mang Về" : "Tại Chỗ"}{item.deliveryMethod !== "vc" && ` | Nhận lúc xxx`}</Text>
                </View>
                {item.noted !== "" &&
                    <View style={[styles.frame, { flexDirection: 'row' }]}>
                        <MaterialIcons name='edit-note' size={25} color={colors.primary} />
                        <Text style={{ fontSize: 15, color: colors.textPrimary, marginLeft: 5 }}>{item.noted}</Text>
                    </View>
                }
                <View style={styles.frame}>
                    {
                        item.orderDetails.map(product => {
                            return (
                                <ProductOrderItem product={product} key={product.Size.id + product.quantity + product.noted + product.Product.id} />
                            )
                        })
                    }
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.title}>Tổng tiền món (giá gốc)</Text>
                        <Text style={styles.title}>{formatCurrency(item.price)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                        <Text style={{ fontSize: 15, color: colors.textExtra }}>Giảm giá</Text>
                        <Text style={{ fontSize: 15, color: colors.textExtra }}>{formatCurrency(item.discount)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={[styles.title, { fontWeight: 'bold' }]}>Tổng tiền</Text>
                        <Text style={[styles.title, { fontWeight: 'bold', color: colors.primary }]}>{formatCurrency(item.finalPrice)}</Text>
                    </View>
                </View>

                <View style={styles.frame}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 15, color: colors.textExtra }}>Mã đơn hàng</Text>
                        <Text style={{ fontSize: 12, color: colors.textExtra }}>{item.id}</Text>
                    </View>
                    <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 15, color: colors.textExtra }}>Thời gian đặt hàng</Text>
                        <Text style={{ fontSize: 15, color: colors.black }}>{formatTime(item.orderDate)}</Text>
                    </View>
                </View>

                {
                    item.OrderStatus.id !== 't4' &&
                    <View style={[styles.frame, { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }]}>
                        <TouchableOpacity
                            onPress={handleCancelOrder}
                            style={{ borderWidth: 1, marginRight: 15, alignItems: 'center', borderColor: colors.darkGray, flex: 1, paddingVertical: 5 }}>
                            <Text style={{ fontSize: 15, color: colors.textExtra }}>Hủy đơn</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleUpdateStatusOrder}
                            style={{ borderWidth: 1, alignItems: 'center', borderColor: colors.primary, flex: 1, paddingVertical: 5 }}>
                            <Text style={{ fontSize: 15, color: colors.primary }}>{renderTitleButtonProcessOrder(item.OrderStatus.id)}</Text>
                        </TouchableOpacity>
                    </View>
                }
            </ScrollView>
        </View>
    )
}

export default OrderDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    frame: {
        backgroundColor: colors.white,
        marginTop: 10,
        padding: 15
    },
    title: {
        fontSize: 18,
        color: colors.textPrimary
    }

})
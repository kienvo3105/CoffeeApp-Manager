import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../constant/color'
import { formatCurrency } from '../../utils/utils'
const ProductOrderItem = ({ product }) => {
    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14 }}>{`${product.quantity}(${product.Size.name})`}</Text>
            </View>
            <View style={{ marginLeft: 10, flex: 7 }}>
                <Text style={{ fontSize: 15, color: colors.textPrimary }}>{product.Product.name}</Text>
                {product.noted &&
                    <Text style={{ fontSize: 13, color: colors.textExtra }}>Mô tả: {product.noted}</Text>
                }
            </View>
            <View style={{ flex: 2 }}>
                <Text style={{ fontSize: 15, color: colors.textPrimary }}>{formatCurrency(product.price)}</Text>
            </View>
        </View>
    )
}

export default ProductOrderItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 20
    }
})
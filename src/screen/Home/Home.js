import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { formatCurrency } from '../../utils/utils';
import { useGet } from '../../api';
import { colors } from '../../constant/color';

import {
    BarChart,
    PieChart
} from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width - 20;

const chartConfig = {
    backgroundGradientFrom: colors.primary,
    // backgroundGradientFromOpacity: 0,
    backgroundGradientTo: colors.primary,
    // backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
};

const color = [
    {
        color: "rgba(224, 31, 31, 1)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        color: "rgba(171, 0, 0, 1)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        color: "rgba(217, 119, 119, 1)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        color: "rgba(92, 64, 64, 1)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
]

const Home = () => {
    const { state } = useContext(AuthContext);
    const { manager } = state;
    const { result, fetchGet, isError } = useGet();
    const { result: resultProduct, fetchGet: fetchGetProduct, isError: isErrorProduct } = useGet();
    const [revenue, setRevenue] = useState({ revenue: [], total: 0 });
    const [quantity, setQuantity] = useState({ product: [], totalQuantity: 0 });
    useEffect(() => {
        const getData = async () => {
            fetchGet(`revenue/revenue-month/branch/${manager.Branch.id}`);
            fetchGetProduct(`product/best-seller/branch/${manager.Branch.id}`);
        }
        getData();
    }, [])

    useEffect(() => {
        if (result && !isError) {
            setRevenue({ revenue: result.revenue, total: result.totalRevenue });
        }
    }, [result])

    useEffect(() => {
        if (resultProduct && !isErrorProduct) {
            const products = resultProduct.products.map((item, index) => {
                return {
                    name: item.Product.name,
                    quantity: parseInt(item.totalSold),
                    ...color[index]
                }
            })
            products.push({
                name: "Khác",
                quantity: resultProduct.quantityOthers,
                ...color[3]
            })
            setQuantity({ product: products, totalQuantity: resultProduct.totalQuantity })
        }
    }, [resultProduct])

    return (
        <View style={{ flex: 1 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                <Text style={{ fontSize: 22, color: colors.primary, fontWeight: 'bold' }}>BIỂU ĐỒ DOANH THU</Text>
                <BarChart
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                    data={{
                        labels: revenue?.revenue?.map(item => {
                            var parts = item.date.split(/[-\/]/);
                            return parts[2] + '-' + parts[1];
                        }),
                        datasets: [
                            { data: revenue?.revenue?.map(item => item.revenue / 1000) }
                        ]
                    }}
                    width={screenWidth}
                    height={220}
                    // yAxisLabel="VND"
                    yAxisSuffix="K"
                    yAxisInterval={1}
                    chartConfig={chartConfig}
                />
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 18, color: colors.textExtra }}>Tổng doanh thu trong tháng: </Text>
                    <Text style={{ fontSize: 20, color: colors.textPrimary, fontWeight: 'bold' }}>{formatCurrency(revenue.total)}</Text>
                </View>
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                <Text style={{ fontSize: 22, color: colors.primary, fontWeight: 'bold' }}>BIỂU ĐỒ SẢN PHẨM BÁN CHẠY</Text>
                <PieChart
                    data={quantity.product}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                    accessor={"quantity"}
                    backgroundColor={"transparent"}
                // paddingLeft={"15"}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, color: colors.textExtra }}>Tổng sản phẩm bán được trong tháng: </Text>
                    <Text style={{ fontSize: 20, color: colors.textPrimary, fontWeight: 'bold' }}>{quantity.totalQuantity}</Text>
                </View>
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})
import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { selectOrderInfo, setOrderTable, selectTables } from '../store/balanceSlice'
import ListItem from '../../components/ListItem'
import { ArrowLeftCircleIcon, EllipsisHorizontalCircleIcon } from 'react-native-heroicons/outline';
import Header from '../../components/HeaderItem'
import VerticalNav from '../../components/VerticalNav'
import invoiceService from '../services/invoiceService'

export default function DetialInvoiceScreen({ navigation, route }: any) {
    const [listOrder, setListOrder] = useState<any>([])
    const [table, setTable] = useState<any>({})
    const [area, setArea] = useState<any>({})
    const [invoicePaid, setInvoicePaid] = useState<any>([])
    const [invoiceUnpaid, setInvoiceUnpaid] = useState<any>([])
    const [totals, setTotals] = useState<any>({ paid: 0, unpaid: 0 })
    const { invoiceID } = route.params
    const screenWidth = Dimensions.get('window').width
    const screenHeight = Dimensions.get('window').height
    useEffect(() => {
        invoiceID != null ?
            invoiceService.getDetailInvoice(invoiceID)
                .then((res: any) => {
                    if (res.data.error == 0) {
                        setListOrder(res.data.list_order)
                        setTable(res.data.table)
                        setArea(res.data.area)
                        setInvoicePaid(res.data.info_paid)
                        setInvoiceUnpaid(res.data.info_unpaid)
                        setTotals({ paid: res.data.total_paid, unpaid: res.data.total_unpaid })
                    }
                })
            : ""
    }, [invoiceID])
    const styles = StyleSheet.create({
        title: {
            color: '#C09440',
            width: (screenWidth - 20) / 2,
        },
        title2: {
            color: '#C09440',
            textAlign: 'center',
            // borderBottomWidth: 1,
            borderColor: '#C09440',
        },
        content: {
            color: 'white',
            textAlign: 'right',
            width: (screenWidth - 20) / 2,
        },
        content2: {

            paddingLeft: 5,
            color: 'white',
            borderTopWidth: 1,
            borderColor: '#C09440',
        },
        item: {
            width: (screenWidth - 20),
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        item2: {
            borderWidth: 1,
            borderLeftWidth: 0,
            borderColor: '#C09440',
        },

    })
    return (
        <>
            <Header title={'Chi tiết hóa đơn: ' + invoiceID} />
            <VerticalNav />
            <ScrollView
                contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
                style={{ width: screenWidth, height: screenHeight, backgroundColor: '#1C344F' }}
            >
                <View style={{ marginVertical: 5, marginTop: 10, }}>
                    <View style={[styles.item]}>
                        <Text style={[styles.title]}>Bàn: </Text>
                        <Text style={[styles.content]}>{table.name}</Text>
                    </View>
                    <View style={[styles.item]}>
                        <Text style={[styles.title]}>Khu: </Text>
                        <Text style={[styles.content]}>{area.name}</Text>
                    </View>
                    <View style={[styles.item]}>
                        <Text style={[styles.title]}>Thời gian:</Text>
                        <Text style={[styles.content]}>
                            {
                                invoicePaid.length > 0 ?
                                    invoicePaid[invoicePaid.length - 1].created_at
                                    :
                                    ""
                            }
                        </Text>
                    </View>
                    <View style={[styles.item]}>
                        <Text style={[styles.title]}>Nhân viên:</Text>
                        <Text style={[styles.content]}>
                            {
                                invoicePaid.length > 0 ?
                                    invoicePaid[invoicePaid.length - 1].username
                                    :
                                    ""
                            }
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginVertical: 5, width: screenWidth, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={[styles.item2, { width: (screenHeight - 20) / 6, borderLeftWidth: 1, borderLeftColor: '#C09440' }]}>
                        <Text style={[styles.title2]}>DS món</Text>
                        <View>
                            {
                                invoicePaid.length > 0 ?
                                    invoicePaid.map((item: any, index: any) => {
                                        return (
                                            <Text numberOfLines={1} key={index} style={[styles.content2]}>{item.foodName}</Text>
                                        )
                                    }) : ""}
                            {
                                invoiceUnpaid.length > 0 ? invoiceUnpaid.map((item: any, index: any) => {
                                    return (
                                        <Text numberOfLines={1} key={index} style={[styles.content2, { color: 'red' }]}>{item.foodName}</Text>
                                    )
                                }) : ""
                            }
                        </View>
                    </View>
                    <View style={[styles.item2]}>
                        <Text style={[styles.title2, { width: (screenHeight - 20) / 10 }]}>Đơn giá</Text>
                        <View>
                            {invoicePaid.length > 0 ?
                                invoicePaid.map((item: any, index: any) => {
                                    return (
                                        <Text key={index} style={[styles.content2]}>{parseInt(item.price).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                                    )
                                })
                                : ""}
                            {invoiceUnpaid.length > 0 ?
                                invoiceUnpaid.map((item: any, index: any) => {
                                    return (
                                        <Text key={index} style={[styles.content2, { color: 'red' }]}>{parseInt(item.price).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                                    )
                                }) : ""}
                        </View>
                    </View>
                    <View style={[styles.item2]}>
                        <Text style={[styles.title2, { width: (screenHeight - 20) / 10 }]}>Số lượng</Text>
                        <View>
                            {invoicePaid.length > 0 ?
                                invoicePaid.map((item: any, index: any) => {
                                    return (
                                        <Text key={index} style={[styles.content2]}>{item.quantity}</Text>
                                    )
                                }) : ""}
                            {invoiceUnpaid.length > 0 ?
                                invoiceUnpaid.map((item: any, index: any) => {
                                    return (
                                        <Text key={index} style={[styles.content2, { color: 'red' }]}>{item.quantity}</Text>
                                    )
                                })
                                : ""}
                        </View>
                    </View>
                    <View style={[styles.item2]}>
                        <Text style={[styles.title2, { width: (screenHeight - 20) / 8 }]}>Thành tiền</Text>
                        <View>
                            {
                                invoicePaid.length > 0 ?
                                    invoicePaid.map((item: any, index: any) => {
                                        return (
                                            <Text key={index} style={[styles.content2]}>{parseInt(item.total).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                                        )
                                    }) : ""}
                            {invoiceUnpaid.length > 0 ?
                                invoiceUnpaid.map((item: any, index: any) => {
                                    return (
                                        <Text key={index} style={[styles.content2, { color: 'red' }]}>{parseInt(item.total).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                                    )
                                }) : ""
                            }
                        </View>
                    </View>
                </View>
                <View style={{ marginVertical: 5, marginTop: 10, }}>
                    {
                        invoiceUnpaid.length > 0 ?
                            <View style={[styles.item]}>
                                <Text style={[styles.title, { color: 'red' }]}>Chưa thanh toán: </Text>
                                <Text style={[styles.content, { color: 'red' }]}>{parseInt(totals.unpaid).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " VND"} ({invoiceUnpaid.length})</Text>
                            </View>
                            : ""
                    }
                    <View style={[styles.item]}>
                        {
                            invoicePaid.length > 0 ?
                                <View style={[styles.item]}>
                                    <Text style={[styles.title, { color: 'white' }]}>Đã thanh toán: </Text>
                                    <Text style={[styles.content, { color: 'white' }]}>{parseInt(totals.paid).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " VND"} ({invoicePaid.length})</Text>
                                </View>
                                : ""
                        }
                    </View>
                </View>
            </ScrollView >
        </>

    )
}
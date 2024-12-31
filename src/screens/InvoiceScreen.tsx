import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { selectOrderInfo, setOrderTable, selectTables } from '../store/balanceSlice'
import ListItem from '../../components/ListItem'
import { ArrowLeftCircleIcon } from 'react-native-heroicons/outline';
import Header from '../../components/HeaderItem'
import VerticalNav from '../../components/VerticalNav'
import invoiceService from '../services/invoiceService'

export default function PaymentScreen({ navigation }: any) {
    const [listInvoice, setListInvoice] = useState<any>([])
    const tables = useSelector(selectTables);
    let tableOrder = useSelector(selectOrderInfo).table
    const screenWidth = Dimensions.get('window').width
    const dispatch = useDispatch();
    useEffect(() => {
        tableOrder.name != null ?
            invoiceService.getListInvoiceByTable(tableOrder.name)
                .then((res: any) => {
                    if (res.data.error == 0) {
                        setListInvoice(res.data.bills);
                    } else {
                        setListInvoice([])
                    }
                })
            : ""
    }, [tableOrder, tables])
    const styles = StyleSheet.create({
        invoiceItem: {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
        },
        content: {
            // borderWidth: 1,
            // borderBottomWidth: 0,
            width: screenWidth - 18,
        },
        item: {
            color: 'white',
            textAlign: 'center',
            borderWidth: 1,
            borderRightWidth: .5,
            borderBottomWidth: .5,
            borderColor: '#C09440',
        }
    })
    return (
        <>
            <Header title={'Hóa đơn'} />
            <VerticalNav />
            <View style={{ flex: 1, justifyContent: 'space-between', backgroundColor: '#1C344F' }}>
                {
                    tableOrder.name == null ?
                        <View style={{ flex: 1 }}>
                            <ListItem.ListTable />
                        </View>
                        :
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    dispatch(setOrderTable({ table: { name: null, status: null } }))
                                }}
                            >
                                <View style={{
                                    margin: 5,
                                    width: 65,
                                    padding: 5,
                                    borderWidth: 1,
                                    borderRadius: 8,
                                    marginBottom: 0,
                                    alignItems: 'center',
                                    borderColor: '#C09440',
                                    justifyContent: 'center',
                                }}>
                                    <ArrowLeftCircleIcon color="#C09440" size={25} />
                                </View>
                            </TouchableOpacity>
                            <View
                                style={{
                                    width: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: '#C09440',
                                    }}
                                >
                                    Hóa đơn bàn: {tableOrder.name}
                                </Text>
                            </View>
                            <ScrollView
                                contentContainerStyle={{
                                    alignItems: 'center'
                                }}
                            >
                                <View style={{ width: (screenWidth - 18) }} >
                                    <View style={[styles.content, { marginBottom: 5 }]}>
                                        <View style={[styles.invoiceItem]}>
                                            <Text style={[styles.item, { width: (screenWidth - 18) / 8, borderBottomWidth: 1 }]} numberOfLines={1}>
                                                ID
                                            </Text>
                                            <Text style={[styles.item, { width: (screenWidth - 18) / 3, borderBottomWidth: 1 }]} numberOfLines={1}>
                                                Tổng
                                            </Text>
                                            <Text style={[styles.item, { width: (screenWidth - 18) / 5, borderBottomWidth: 1 }]} numberOfLines={1}>
                                                Số lượng
                                            </Text>
                                            <Text style={[styles.item, { width: (screenWidth - 18) / 4, borderBottomWidth: 1 }]} numberOfLines={1}>
                                                Ngày tạo
                                            </Text>
                                            <Text style={[styles.item, { width: (screenWidth - 18) / 8, borderBottomWidth: 1, borderRightWidth: 1 }]} numberOfLines={1}></Text>
                                        </View>
                                    </View>
                                    {
                                        listInvoice.length > 0 ?
                                            listInvoice.map((item: any, index: any) => {
                                                return (
                                                    <View style={[styles.content]} key={index}>
                                                        <View style={[styles.invoiceItem]}>
                                                            <Text style={[styles.item, { width: (screenWidth - 18) / 8, borderBottomWidth: index == listInvoice.length - 1 ? 1 : .5 }]} numberOfLines={1}>
                                                                {item.id}
                                                            </Text>
                                                            <Text style={[styles.item, { width: (screenWidth - 18) / 3, borderBottomWidth: index == listInvoice.length - 1 ? 1 : .5 }]} numberOfLines={1}>
                                                                {parseInt(item.total).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " VND"}
                                                            </Text>
                                                            <Text style={[styles.item, { width: (screenWidth - 18) / 5, borderBottomWidth: index == listInvoice.length - 1 ? 1 : .5 }]} numberOfLines={1}>
                                                                {item.quantity}
                                                            </Text>
                                                            <Text style={[styles.item, { width: (screenWidth - 18) / 4, borderBottomWidth: index == listInvoice.length - 1 ? 1 : .5 }]} numberOfLines={1}>
                                                                {item.created_at}
                                                            </Text>
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    navigation.navigate('DetailInvoice', { invoiceID: item.id })
                                                                }}
                                                            >
                                                                <Text style={[styles.item, { width: (screenWidth - 18) / 8, borderRightWidth: 1, borderBottomWidth: index == listInvoice.length - 1 ? 1 : .5, }]} > Xem </Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                )
                                            })
                                            : <Text style={{ color: 'orange', textAlign: 'center' }}>Chưa có hóa đơn!</Text>
                                    }
                                </View>
                            </ScrollView>
                        </View >
                }
            </View >
        </>

    )
}
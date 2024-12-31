import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
} from 'react-native'
import Items from './Item'
import foodService from "../src/services/foodService";
import tableService from "../src/services/tableService";
import { useDispatch, useSelector } from "react-redux";
import categoryService from "../src/services/categoryService";
import { setOrderFood, setOrderTable, setOrderTotal, selectTables, setTables } from "../src/store/balanceSlice";


function ListCategory({ categoryClick = undefined }: any) {
    const [categories, setCategory] = useState<any>([])
    useEffect(() => {
        categoryService.getListCategory()
            .then((res: any) => {
                if (res.data.error == 0) {
                    setCategory(res.data.data)
                }
            })
    }, [])
    return (
        <View
            style={{
                height: 120,
                display: "flex",
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <View
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 5,
                    width: '100%',
                    marginBottom: 5,
                    backgroundColor: '#1C334F'
                }}
            >
                <Text
                    style={{
                        fontSize: 14,
                        color: '#c09440',
                        fontWeight: '600',
                    }}
                >
                    Loại
                </Text>
            </View>
            {
                categories.length > 0 ?
                    < FlatList
                        nestedScrollEnabled={true}
                        data={[{ name: 'Tất cả' }, ...categories]}
                        horizontal={true}
                        keyExtractor={(item, index) => `${index}`}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity
                                onPress={() => categoryClick(item)} >
                                <Items.CategoryItem item={item} />
                            </TouchableOpacity>}
                        showsHorizontalScrollIndicator={false}
                    />
                    : ""
            }
        </View >
    )
}

function ListTable({ navigation }: any) {
    const dispatch = useDispatch();

    let tables = useSelector(selectTables);
    useEffect(() => {
        if (tables.length == 0) {
            tableService.getListTable()
                .then((res: any) => {
                    if (res.data.error == 0) {
                        dispatch(setTables({ tables: res.data.data.list_table }))
                    }
                })
        }
    }, [tables])
    return (
        <View
            style={{
                display: "flex",
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {
                tables.length > 0 ?
                    <FlatList
                        data={tables}
                        numColumns={3}
                        nestedScrollEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => `${index}`}
                        renderItem={({ item }: any) =>
                            <TouchableOpacity
                                onPress={() => {
                                    dispatch(setOrderTable({ table: { name: item.name, status: item.status } }))
                                    navigation != undefined ?
                                        navigation.navigate('Order', {
                                            table: item
                                        })
                                        : ""
                                }}
                            >
                                <Items.TableItem item={item} />
                            </TouchableOpacity>
                        }
                    />
                    : ""
            }
        </View >
    )
}

function ListFood({ category }: any) {
    const [foods, setFood] = useState([]);
    useEffect(() => {
        foodService.getListFood(category)
            .then((res: any) => {
                if (res.data.error == 0) {
                    setFood(res.data.data)
                }
            })
    }, [category])
    const dispatch = useDispatch()
    return (
        <View
            style={{
                height: '65%',
                display: "flex",
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <View
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 5,
                    width: '100%',
                    marginBottom: 5,
                    backgroundColor: '#1C334F'
                }}
            >
                <Text
                    style={{
                        fontSize: 14,
                        color: '#c09440',
                        fontWeight: '600',
                    }}
                >
                    Món
                </Text>
            </View>
            {
                foods.length > 0 ?
                    <FlatList
                        data={foods}
                        numColumns={3}
                        nestedScrollEnabled={true}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => `${index}`}
                        renderItem={
                            ({ item }: any) =>
                                <TouchableOpacity
                                    onPress={() => {
                                        dispatch(setOrderFood({ foods: [{ food_name: item.name, price: parseInt(item.price), quantity: 1 }] }))
                                        dispatch(setOrderTotal({ add: true, total: parseInt(item.price) }))
                                    }}
                                >
                                    <Items.FoodItem item={item} />
                                </TouchableOpacity>
                        }
                    />
                    : ""
            }
        </View>
    )
}

export default {
    ListCategory,
    ListFood,
    ListTable
}
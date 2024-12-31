import React from "react";
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet,
} from 'react-native'
import {APP_BASE_API_URL, ipv4} from "../constants/IPv4";
import { empty } from '../assets/images/index'
import { useSelector } from "react-redux";
import { selectOrderInfo } from "../src/store/balanceSlice";


function CategoryItem(item: any) {
    let ScreenWidth = Dimensions.get("window").width / 3;
    return (
        <View
            style={{
                margin: 5,
                height: 75,
                padding: 10,
                display: 'flex',
                borderRadius: 15,
                alignItems: 'center',
                width: ScreenWidth - 10,
                justifyContent: 'center',
                backgroundColor: '#FFFFFF'
            }}
        >
            <Text
                numberOfLines={1}
                style={{
                    fontSize: 18,
                    color: 'black',
                }}
            >
                {item.item.name}
            </Text>
        </View>
    )
}

function TableItem(item: any) {
    let tableOrder = useSelector(selectOrderInfo).table
    let ScreenWidth = Dimensions.get("window").width / 3;

    return (
        <View
            style={{
                margin: 5,
                height: 100,
                display: 'flex',
                paddingLeft: 10,
                paddingRight: 10,
                borderRadius: 15,
                alignItems: 'center',
                width: ScreenWidth - 10,
                justifyContent: 'center',
                backgroundColor: tableOrder.name == item.item.name ? '#C09440' : '#FFFFFF',
            }}
        >
            <Text
                numberOfLines={1}
                style={{
                    padding: 5,
                    fontSize: 18,
                    color: 'black',
                }}
            >
                {item.item.name}
            </Text>
            <Text
                style={{ color: 'lightgray' }}
            >
                {item.item.areaID == 1 ? 'Phòng lạnh' : 'Phòng thường'}
            </Text>
            <Text
                style={{ color: 'red' }}
            >
                ({item.item.status == 0 ? "Trống" : "Đang dùng"})
            </Text>
        </View>
    )
}

function FoodItem(item: any, selected: boolean) {
    let ScreenWidth = Dimensions.get("window").width / 3;
    const foodSelected = useSelector(selectOrderInfo)
    let quantity = 0
    foodSelected.foods.find((itemSelected: any) => itemSelected.name == item.item.name ? quantity = itemSelected.quantity : "")
    return (
        <View
            style={[
                styles.container,
                {
                    width: ScreenWidth - 10,
                    backgroundColor: selected === true ? 'red' : '#FFFFFF'
                }
            ]}
        >
            <View style={styles.cover}>
                {item.item.imageName != null ?
                    <Image
                        style={styles.image}
                        source={{ uri: 'http://' + ipv4() + `/${APP_BASE_API_URL}/public/static/imgs/uploadfiles/` + item.item.imageName }}
                    />
                    :
                    <Image style={styles.image} source={empty} />}
            </View>
            <View style={styles.content} >
                <Text numberOfLines={1} style={styles.text} >
                    {item.item.name}
                </Text>

                <Text style={{ color: 'gray', fontSize: 10 }}>
                    {parseInt(item.item.price).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " VND"}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
        height: 190,
        padding: 10,
        display: 'flex',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cover: {
        width: '100%',
        height: '70%',
    },
    image: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        width: '100%',
        height: '100%'
    },
    content: {
        height: '30%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 15,
        color: 'black',
    },
})

export default {
    CategoryItem,
    FoodItem,
    TableItem
}
import React, { useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import ListItem from '../../components/ListItem'
import Header from '../../components/HeaderItem'
import VerticalNav from '../../components/VerticalNav'

export default function OrderScreen({ navigation }: any) {
    const [selectCategory, setSelectCategory] = useState(null);
    const categoryClick = (item: any) => {
        setSelectCategory(item.id)
    }
    return (
        <>
            <Header title={'Chọn món'} />
            <VerticalNav />
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#1C344F',
                }}
            >
                <ListItem.ListCategory categoryClick={categoryClick} />
                <ListItem.ListFood category={selectCategory} />
                <View
                    style={{
                        marginHorizontal: 15,
                        marginTop: 15,
                    }}
                >
                    <TouchableOpacity
                        style={{
                            paddingVertical: 15,
                            width: '100%',
                            borderRadius: 8,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#C09440',
                        }}
                        onPress={() => {
                            navigation.navigate('Cart')
                        }}
                    >
                        <Text style={{ color: '#1C344F', fontWeight: '500' }} >
                            Thêm
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}
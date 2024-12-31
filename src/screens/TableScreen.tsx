import React from 'react'
import {
    View,
} from 'react-native'

import ListItem from '../../components/ListItem'

import Header from '../../components/HeaderItem';
import VerticalNav from '../../components/VerticalNav';

export default function TableScreen({ navigation }: any) {

    return (
        <View
            style={{
                display: 'flex',
                flex: 1,
                backgroundColor: '#1C344F',
            }}
        >
            <Header title={'Chọn bàn'} />
            <VerticalNav />
            <ListItem.ListTable navigation={navigation} />
        </View>
    )
}
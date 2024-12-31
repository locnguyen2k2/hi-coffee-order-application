import {
    View, Text, TouchableOpacity, Alert
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Squares2X2Icon } from 'react-native-heroicons/outline'
import { selectVerticalNav, setVerticalNav } from '../src/store/balanceSlice';

export default function Header({ title }: any) {
    const dispatch = useDispatch();
    return (
        <View
            style={{
                display: 'flex',
                padding: 10,
                flexDirection: 'row',
                backgroundColor: '#c09440',
                justifyContent: 'space-between',
            }}
        >
            <Text
                style={{
                    fontSize: 18,
                    color: '#1C334F',
                    fontWeight: '600',
                }}
            >
                {title}
            </Text>
            <TouchableOpacity
                onPress={() => {
                    dispatch(setVerticalNav())
                }}
            >
                <Text>
                    <Squares2X2Icon color="#1C334F" size={25} />
                </Text>
            </TouchableOpacity>
        </View>
    )
}
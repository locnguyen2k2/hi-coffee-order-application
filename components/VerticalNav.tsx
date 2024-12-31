import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
    Alert,
    TouchableHighlight
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ArrowLeftOnRectangleIcon, ArrowLeftCircleIcon, IdentificationIcon, NewspaperIcon, ChartBarIcon } from 'react-native-heroicons/outline'

import { navigate } from './RootNavigation'
import { FadeInView } from '../constants/FadeView'
import accountService from '../src/services/accountService'
import * as RootNavigation from './../components/RootNavigation'
import { selectVerticalNav, setSignout, setVerticalNav } from '../src/store/balanceSlice'

export default function VerticalNav() {

    const screenWidth = Dimensions.get('window').width
    const screenHeight = Dimensions.get('window').height
    const verticalNav = useSelector(selectVerticalNav)
    const dispatch = useDispatch();
    const styles = StyleSheet.create({
        modelForm: {
            top: 0,
            left: 0,
            zIndex: 900,
            width: screenWidth,
            position: 'absolute',
            height: screenHeight,
            alignItems: 'flex-end',
            backgroundColor: 'rgba(125,125,125,.7)'
        },
        nav: {
            position: 'relative',
            right: -150,
            paddingVertical: 5,
            height: screenHeight,
            width: screenWidth / 2,
            justifyContent: 'center',
            backgroundColor: '#1C334F',
        },
        navItem: {
            height: 60,
            zIndex: 999,
            width: '100%',
            display: 'flex',
            marginVertical: 5,
            paddingVertical: 5,
            borderBottomWidth: 2,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomColor: '#FFFFFF',
        },
        content: {
            color: '#FFFFFF'
        },
        icon: {
            marginRight: 5,
        },
    })
    const dispath = useDispatch()
    const handleLoggout = () => {
        accountService.logout()
            .then((res: any) => {
                Alert.alert(res.data.message)
                if (res.data.error == 0) {
                    dispath(setSignout())
                    return (
                        navigate('Login')
                    )
                }
            })
    }

    return (
        <>
            {
                verticalNav ?
                    <TouchableOpacity
                        style={[styles.modelForm]}
                        onPress={() => {
                            dispatch(setVerticalNav())
                        }}
                    >
                        <TouchableHighlight>
                            <FadeInView
                                style={styles.nav}
                            >
                                <TouchableOpacity
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        zIndex: 999,
                                        marginTop: 10,
                                        marginLeft: 5,
                                        marginHorizontal: 5,
                                    }}
                                    onPress={() => {
                                        dispatch(setVerticalNav())
                                    }}
                                >
                                    <View style={[styles.icon, { padding: 3, paddingHorizontal: 15, backgroundColor: '#C09440', borderRadius: 8 }]}><ArrowLeftCircleIcon color="#1C334F" size={25} /></View>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <View
                                        style={[styles.navItem]}
                                    >
                                        <View style={[styles.icon]}><IdentificationIcon color="#C09440" size={25} /></View>
                                        <Text style={[styles.content]}>
                                            Tài khoản
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        dispatch(setVerticalNav())
                                        navigate('Invoice')
                                    }}
                                >
                                    <View
                                        style={[styles.navItem]}
                                    >
                                        <View style={[styles.icon]}><NewspaperIcon color="#C09440" size={25} /></View>
                                        <Text style={[styles.content]}>
                                            Hóa đơn
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigate('Statistic')
                                    }}
                                >
                                    <View
                                        style={[styles.navItem,]}
                                    >
                                        <View style={[styles.icon]}><ChartBarIcon color="#C09440" size={25} /></View>
                                        <Text style={[styles.content]}>
                                            Thống kê
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleLoggout}
                                >
                                    <View
                                        style={[styles.navItem]}
                                    >
                                        <View style={[styles.icon]}><ArrowLeftOnRectangleIcon color="#C09440" size={25} /></View>
                                        <Text style={[styles.content]}>
                                            Đăng xuất
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </FadeInView>
                        </TouchableHighlight>
                    </TouchableOpacity> :
                    <View>

                    </View>
            }
        </>
    )
}
import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    Alert,
    TouchableOpacity
} from 'react-native'
import { useDispatch } from 'react-redux'
import { setSignin } from '../store/balanceSlice'
import Header from '../../components/HeaderItem'
import { coffeeBgLogin } from '../../assets/images'
import accountService from '../services/accountService'
import * as RootNavigation from '../../components/RootNavigation'
export default function LoginScreen() {
    const dispatch = useDispatch()
    type userProps = {
        username: string,
        password: string
    }
    const [userInfo, setUserInfo] = useState<userProps>({ username: '', password: '' })
    const styles = StyleSheet.create({
        content: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1C344F',
        },
        loginItem: {
            width: '100%',
            display: 'flex',
            paddingVertical: 5,
            alignItems: 'center',
            position: 'relative',
            paddingHorizontal: 10,
            justifyContent: 'center',
        },
        inpItem: {
            borderWidth: 2,
            borderRadius: 5,
            borderTopWidth: 0,
            borderColor: '#c09440',
            paddingLeft: 15,
            paddingBottom: 15,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
        },
        title: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        pseudoHorizontal: {
            position: 'absolute',
            top: 17,
            borderWidth: 2,
            borderBottomWidth: 0,
            borderRadius: 5,
            borderColor: '#c09440',
            borderBottomEndRadius: 0,
            borderBottomStartRadius: 0,
            zIndex: 9,
            width: '70%',
        }
    })
    const handleLogin = (e: any) => {
        if (userInfo.username != '' && userInfo.password != '') {
            accountService.login(userInfo.username, userInfo.password)
                .then((res: any) => {
                    if (res.data.error == 0) {
                        const user = {
                            username: res.data.data.username,
                            roles: res.data.data.roles,
                            isAuth: true
                        }
                        dispatch(setSignin(user))
                        Alert.alert('Login is successed')
                        RootNavigation.navigate('Profile')
                    } else {
                        Alert.alert(res.data.message)
                    }
                })
                .catch(err => { console.log(err) })
        } else {
            Alert.alert('Vui lòng nhập đủ thông tin!')
        }
    }
    return (
        <>
            <Header title={'Đăng nhập'} />
            <View style={[styles.content]} >
                <Image
                    style={{
                        position: 'absolute',
                        left: 0,
                        bottom: -120,
                        height: '100%',
                        width: '100%',
                        alignContent: 'center',
                        justifyContent: 'center',
                    }}
                    source={coffeeBgLogin}
                />
                <View style={[styles.loginItem]}>
                    <View style={[styles.title, { zIndex: 900, backgroundColor: '#1C344F', right: 75, paddingHorizontal: 5, }]} >
                        <Text style={{ color: '#FFFFFF' }}>Tài khoản</Text>
                    </View>
                    <View style={[styles.title, styles.pseudoHorizontal]} >
                        <Text> </Text>
                    </View>
                    <View style={{ width: '70%' }} >
                        <TextInput style={[styles.inpItem]}
                            onChangeText={(e: any) => { (setUserInfo({ ...userInfo, username: e })) }}
                            placeholder='abc1230'
                        />
                    </View>
                </View>
                <View style={[styles.loginItem]} >
                    <View style={[styles.title, { zIndex: 900, backgroundColor: '#1C344F', right: 75, paddingHorizontal: 5, }]} >
                        <Text style={{ color: '#FFFFFF' }}>Mật khẩu</Text>
                    </View>
                    <View style={[styles.title, styles.pseudoHorizontal]} >
                        <Text> </Text>
                    </View>
                    <View style={{ width: '70%' }} >
                        <TextInput
                            style={[styles.inpItem]}
                            onChangeText={(e: any) => { (setUserInfo({ ...userInfo, password: e })) }}
                            secureTextEntry={true}
                            placeholder='abc@1230'
                        />
                    </View>
                </View>
                <TouchableOpacity
                    style={{
                        padding: 10,
                        marginTop: 10,
                        borderRadius: 8,
                        paddingHorizontal: 15,
                        backgroundColor: '#c09440'
                    }}
                    onPress={handleLogin}
                >
                    <Text>
                        Đăng nhập
                    </Text>
                </TouchableOpacity>
            </View >
        </>
    )
}

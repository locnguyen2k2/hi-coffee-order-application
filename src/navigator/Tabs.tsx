import React from 'react'
import screens from '../screens'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { TableCellsIcon, BellIcon, ShoppingCartIcon, ClipboardDocumentListIcon } from "react-native-heroicons/outline";
import { useSelector } from 'react-redux';
import { selectorOrderQuantity } from '../store/balanceSlice';
import { navigationRef } from '../../components/RootNavigation';
import { View, Text } from 'react-native'
const Tab = createBottomTabNavigator()

export default function Tabs() {
    let orderQuantity = useSelector(selectorOrderQuantity)
    return (
        <>
            <NavigationContainer ref={navigationRef}>
                <Tab.Navigator
                    screenOptions={{
                        headerShown: false,
                        tabBarStyle: {
                            height: 65,
                            position: 'relative',
                        },
                    }}
                >

                    <Tab.Screen
                        name="Table"
                        component={screens.Table}
                        options={{
                            tabBarIcon: () => (<TableCellsIcon color="black" size={32} />),
                        }}
                    />
                    <Tab.Screen
                        name="Order"
                        component={screens.Order}
                        options={{
                            tabBarIcon: () => (<BellIcon color="black" size={32} />)
                        }}
                    />
                    <Tab.Screen
                        name="Cart"
                        component={screens.Cart}
                        options={{
                            tabBarIcon: () => (
                                <View
                                    style={{
                                        position: 'relative',
                                    }}
                                >
                                    <View
                                        style={{
                                            top: -7,
                                            width: 21,
                                            zIndex: 2,
                                            right: -8,
                                            height: 25,
                                            display: 'flex',
                                            borderRadius: 35,
                                            alignItems: 'center',
                                            position: 'absolute',
                                            justifyContent: 'center',
                                            backgroundColor: '#1C334F',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: '#c09440',
                                                fontSize: 18,
                                            }}
                                        >{orderQuantity}</Text>
                                    </View>
                                    <View
                                        style={{
                                            zIndex: 1,
                                        }}
                                    >
                                        <ShoppingCartIcon color="black" size={32} />
                                    </View>
                                </View>
                            )
                        }}
                    />
                    <Tab.Screen
                        name="Payment"
                        component={screens.Payment}
                        options={{ tabBarIcon: () => (<ClipboardDocumentListIcon color="black" size={32} />) }}
                    />
                    <Tab.Screen
                        name="Invoice"
                        component={screens.Invoice}
                        options={{
                            tabBarButton: () => null
                        }}
                    />
                    <Tab.Screen
                        name="DetailInvoice"
                        component={screens.DetailInvoice}
                        options={{
                            tabBarButton: () => null
                        }}
                    />
                    <Tab.Screen
                        name="Statistic"
                        component={screens.Statistic}
                        options={{
                            tabBarButton: () => null 
                        }}
                    />
                    <Tab.Screen
                        name="Login"
                        component={screens.Login}
                        options={{
                            tabBarButton: () => null
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer >
        </>
    )
}
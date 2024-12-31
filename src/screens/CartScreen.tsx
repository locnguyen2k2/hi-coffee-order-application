import React from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  MinusCircleIcon,
  PlusCircleIcon,
  TruckIcon,
} from 'react-native-heroicons/outline';
import {
  addOrder,
  selectOrderInfo,
  selectOrderTotal,
  setFoodQuantity,
  setOrderTotal,
} from '../store/balanceSlice';

import orderService from '../services/orderService';
import Header from '../../components/HeaderItem';
import VerticalNav from '../../components/VerticalNav';

export default function CartScreen({navigation}: any) {
  const dispatch = useDispatch();
  const total = useSelector(selectOrderTotal);
  const orderInfo = useSelector(selectOrderInfo);

  const styles = StyleSheet.create({
    item: {
      color: 'white',
      fontSize: 12,
    },
  });

  return (
    <View
      style={{
        flex: 1,
        position: 'relative',
        backgroundColor: '#1C344F',
      }}>
      <Header title={'Đặt món'} />
      <VerticalNav />
      <View
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: '#C09440'}}>{orderInfo.table.name}</Text>
      </View>
      {orderInfo.foods.length >= 1 && orderInfo.foods[0].food_name != null ? (
        <View
          style={{
            marginHorizontal: 5,
            paddingHorizontal: 5,
          }}>
          <FlatList
            data={orderInfo.foods}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({item, index}: any) => (
              <View
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottomWidth: 1,
                  borderBottomColor: '#c96e2b',
                }}>
                <View
                  className="w-1/2"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                  }}>
                  <Text style={[styles.item]}>{item.food_name}</Text>
                  <Text style={[styles.item, {color: 'gray'}]}>
                    {parseInt(item.price)
                      .toFixed(0)
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND'}
                  </Text>
                </View>
                <View
                  className="w-1/2"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    paddingVertical: 5,
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(
                          setFoodQuantity({
                            foods: [
                              {
                                food_name: item.food_name,
                                price: item.price,
                                quantity: item.quantity - 1,
                              },
                            ],
                          }),
                        );
                        dispatch(setOrderTotal({sub: true, total: item.price}));
                      }}>
                      <MinusCircleIcon color="white" size={25} />
                    </TouchableOpacity>
                    <Text style={[styles.item, {padding: 5}]}>
                      {item.quantity}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(
                          setFoodQuantity({
                            foods: [
                              {
                                food_name: item.food_name,
                                price: item.price,
                                quantity: item.quantity + 1,
                              },
                            ],
                          }),
                        );
                        dispatch(setOrderTotal({add: true, total: item.price}));
                      }}>
                      <PlusCircleIcon color="white" size={25} />
                    </TouchableOpacity>
                  </View>
                  <Text style={[styles.item, {color: '#c96e2b'}]}>
                    {(item.price * item.quantity)
                      .toFixed(0)
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND'}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      ) : (
        ''
      )}
      <View style={{alignItems: 'flex-end', padding: 10, marginVertical: 5}}>
        <Text style={{color: 'white'}}>
          Tổng tiền:{' '}
          {parseInt(total)
            .toFixed(0)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND'}
        </Text>
      </View>
      {orderInfo.foods[0].food_name != null ? (
        <TouchableOpacity
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            marginVertical: 5,
            paddingHorizontal: 5,
          }}
          onPress={() => {
            orderService.addOrder(orderInfo).then((res: any) => {
              Alert.alert(res.data.message);
              if (res.data.error == 0) {
                dispatch(addOrder());
              }
            });
          }}>
          <View
            style={{
              padding: 5,
              width: '100%',
              display: 'flex',
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fd8629',
            }}>
            <TruckIcon color={'black'} size={25} />
          </View>
        </TouchableOpacity>
      ) : (
        ''
      )}
    </View>
  );
}

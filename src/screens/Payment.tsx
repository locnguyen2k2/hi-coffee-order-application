import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectOrderInfo,
  selectTables,
  setOrderTable,
  setTables,
} from '../store/balanceSlice';
import orderService from '../services/orderService';
import ListItem from '../../components/ListItem';
import {Dropdown} from 'react-native-element-dropdown';
import Carousel from 'react-native-reanimated-carousel';
import foodService from '../services/foodService';
import tableService from '../services/tableService';
import {
  MinusCircleIcon,
  PlusCircleIcon,
  XCircleIcon,
} from 'react-native-heroicons/outline';
import Header from '../../components/HeaderItem';
import VerticalNav from '../../components/VerticalNav';

export default function PaymentScreen({navigation}: any) {
  const [listOrder, setListOrder] = useState<any>([]);
  const [order, setOrder] = useState<any>();
  const [foods, setFood] = useState<any>();
  const tables = useSelector(selectTables);
  const [updateForm, setUpdateForm] = useState<any>(false);
  const [foodSelected, setFoodSelected] = useState<any>(null);
  const [tableSelected, setTableSelected] = useState<any>(null);
  let tableOrder = useSelector(selectOrderInfo).table;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const dispatch = useDispatch();
  useEffect(() => {
    foodService.getListFood(null).then((res: any) => {
      if (res.data.error == 0) {
        setFood(res.data.data);
      }
    });
    if (tables.length == 0) {
      tableService.getListTable().then((res: any) => {
        if (res.data.error == 0) {
          setTables({tables: res.data.data.list_table});
        }
      });
    }
    tableOrder.name != null
      ? orderService.addOrder(tableOrder).then((res: any) => {
          if (res.data.error == 0) {
            setListOrder(res.data.list_order);
          } else {
            setListOrder([]);
          }
        })
      : setListOrder([]);
  }, [tableOrder, tables]);
  const styles = StyleSheet.create({
    orderItem: {
      display: 'flex',
      borderRadius: 15,
      paddingHorizontal: 10,
      justifyContent: 'center',
    },
    item: {
      padding: 5,
      display: 'flex',
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      flexDirection: 'row',
      borderColor: '#c09440',
      backgroundColor: '#1C334F',
      justifyContent: 'space-between',
    },
    txt: {
      fontSize: 18,
      color: '#FFFFFF',
      marginHorizontal: 15,
    },
  });
  const handlePayment = ({orderID, foodID}: any) => {
    if (orderID != undefined && foodID != undefined) {
      orderService.orderPayment({orderID, foodID}).then((res: any) => {
        Alert.alert(res.data.message);
        if (res.data.error == 0) {
          dispatch(setOrderTable({table: {name: null, status: null}}));
          setOrder({});
          setListOrder({});
          navigation.navigate('Order');
        }
      });
    } else {
      Alert.alert('Vui lòng nhập đủ thông tin');
    }
  };
  const handleDelete = ({orderID, foodID}: any) => {
    if (orderID != undefined && foodID != undefined) {
      orderService.deleteOrder({orderID, foodID}).then((res: any) => {
        Alert.alert(res.data.message);
        if (res.data.error == 0) {
          setListOrder({});
          dispatch(setOrderTable({table: {name: null, status: null}}));
        }
      });
    } else {
      Alert.alert('Vui lòng nhập đủ thông tin');
    }
  };
  const formUpdate = ({
    orderID,
    foodID,
    foodName,
    tableName,
    quantity,
  }: any) => {
    setTableSelected(null);
    setOrder({
      orderID: orderID,
      foodID: foodID,
      foodName: foodName,
      tableName: tableName,
      quantity: quantity,
    });
    setUpdateForm(true);
  };
  return (
    <>
      <Header title={'Thanh toán'} />
      <VerticalNav />
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          backgroundColor: '#1C344F',
        }}>
        <View style={{flex: 0.52}}>
          <ListItem.ListTable />
        </View>
        {updateForm == true ? (
          <View
            style={{
              top: 0,
              left: 0,
              zIndex: 999,
              width: screenWidth,
              alignItems: 'center',
              position: 'absolute',
              height: screenHeight,
              backgroundColor: 'rgba(125,125,125,.7)',
            }}>
            <TouchableOpacity
              style={{
                top: 100,
                padding: 5,
                width: '100%',
                marginHorizontal: 15,
                alignItems: 'flex-end',
              }}
              onPress={() => {
                setUpdateForm(false);
              }}>
              <View
                style={{
                  padding: 5,
                  borderRadius: 5,
                  backgroundColor: '#800000',
                }}>
                <XCircleIcon color="white" size={25} />
              </View>
            </TouchableOpacity>
            <View
              style={{
                top: 100,
                padding: 10,
                borderRadius: 15,
                width: screenWidth - 5,
                marginHorizontal: 15,
                backgroundColor: '#1C334F',
              }}>
              <View style={{alignItems: 'center', paddingVertical: 5}}>
                <Text style={[styles.txt]}>
                  Cập nhật đơn đặt ({order.orderID})
                </Text>
              </View>
              <View>
                <View
                  style={{
                    marginVertical: 5,
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 5,
                  }}>
                  <Text style={[styles.txt]}>Chọn món: </Text>
                  <Dropdown
                    search
                    data={foods}
                    maxHeight={300}
                    labelField="name"
                    valueField="name"
                    itemTextStyle={{color: '#c09440'}}
                    containerStyle={{
                      backgroundColor: '#1C334F',
                    }}
                    style={{
                      width: screenWidth / 2,
                      borderRadius: 15,
                      paddingHorizontal: 5,
                      backgroundColor: 'gray',
                    }}
                    value={foodSelected != null ? foodSelected : order.foodName}
                    searchPlaceholder="Search..."
                    onChange={item => {
                      setFoodSelected(item.name);
                      setOrder({...order, foodName: item.name});
                    }}
                  />
                </View>
                <View
                  style={{
                    marginVertical: 5,
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 5,
                  }}>
                  <Text style={[styles.txt]}>Chọn bàn: </Text>
                  <Dropdown
                    search
                    data={tables}
                    maxHeight={300}
                    labelField="name"
                    valueField="name"
                    itemTextStyle={{color: '#c09440'}}
                    containerStyle={{
                      backgroundColor: '#1C334F',
                    }}
                    style={{
                      width: screenWidth / 2,
                      borderRadius: 15,
                      paddingHorizontal: 5,
                      backgroundColor: 'gray',
                    }}
                    value={
                      tableSelected != null ? tableSelected : order.tableName
                    }
                    searchPlaceholder="Search..."
                    onChange={item => {
                      setTableSelected(item.name);
                      setOrder({...order, tableName: item.name});
                    }}
                  />
                </View>
                <View
                  style={{
                    marginVertical: 5,
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 5,
                  }}>
                  <Text style={[styles.txt]}>Số lượng: </Text>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: screenWidth / 2,
                      justifyContent: 'flex-end',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        order.quantity - 1 > 0
                          ? setOrder({
                              ...order,
                              quantity: order.quantity - 1,
                            })
                          : '';
                      }}>
                      <MinusCircleIcon color="#c09440" size={25} />
                    </TouchableOpacity>
                    <TextInput
                      aria-valuemin={1}
                      defaultValue={`${order.quantity}`}
                      style={{
                        width: '70%',
                        borderRadius: 15,
                        padding: 5,
                        marginHorizontal: 5,
                        textAlign: 'center',
                        backgroundColor: 'gray',
                      }}
                      onChangeText={newText => {
                        setOrder({...order, quantity: parseInt(newText)});
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setOrder({...order, quantity: order.quantity + 1});
                      }}>
                      <PlusCircleIcon color="#c09440" size={25} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View>
                <Button
                  title="Cập nhật"
                  onPress={() => {
                    orderService
                      .updateOrder({
                        orderID: order.orderID,
                        foodID: order.foodID,
                        foodName: order.foodName,
                        tableName: order.tableName,
                        quantity: order.quantity,
                      })
                      .then((res: any) => {
                        Alert.alert(res.data.message);
                        if (res?.data.error == 0) {
                          dispatch(
                            setOrderTable({table: {name: null, status: null}}),
                          );
                          setOrder({});
                          setListOrder({});
                          setUpdateForm(false);
                        }
                      });
                  }}
                />
              </View>
              </View>
          </View>
        ) : (
          ''
        )}
        {listOrder.length > 0 ? (
          <View
            style={{
              position: 'relative',
              flex: 0.7,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                let invoiceID = listOrder[0].id;
                orderService.orderPaymentAll({invoiceID}).then((res: any) => {
                  if (res.data.error == 0) {
                    dispatch(
                      setOrderTable({table: {name: null, status: null}}),
                    );
                    setOrder({});
                    setListOrder({});
                  }
                  Alert.alert(res.data.message);
                });
              }}>
              <Text
                style={{
                  padding: 8,
                  marginVertical: 5,
                  backgroundColor: '#c09440',
                  borderRadius: 8,
                }}>
                Thanh toán tất cả
              </Text>
            </TouchableOpacity>
            <Carousel
              loop
              data={listOrder}
              width={screenWidth}
              height={screenHeight * 0.72 * 0.55}
              scrollAnimationDuration={1000}
              renderItem={({item, index}: any) => (
                <View style={[styles.orderItem]}>
                  <View
                    style={[
                      styles.item,
                      {
                        borderTopWidth: 1,
                        borderTopStartRadius: 12,
                        borderTopEndRadius: 12,
                      },
                    ]}>
                    <View>
                      <Text style={[styles.txt]}>STT: </Text>
                    </View>
                    <View>
                      <Text style={[styles.txt]}>{index + 1}</Text>
                    </View>
                  </View>
                  <View style={styles.item}>
                    <View>
                      <Text style={[styles.txt]}>Hoá đơn: </Text>
                    </View>
                    <View>
                      <Text style={[styles.txt]}>{item.id}</Text>
                    </View>
                  </View>
                  <View style={styles.item}>
                    <View>
                      <Text style={[styles.txt]}>Mã đơn đặc: </Text>
                    </View>
                    <View>
                      <Text style={[styles.txt]}>{item.orderID}</Text>
                    </View>
                  </View>
                  <View style={styles.item}>
                    <View>
                      <Text style={[styles.txt]}>Món: </Text>
                    </View>
                    <View>
                      <Text style={[styles.txt]}>{item.food_name}</Text>
                    </View>
                  </View>
                  <View style={styles.item}>
                    <View>
                      <Text style={[styles.txt]}>Đơn giá: </Text>
                    </View>
                    <View>
                      <Text style={[styles.txt]}>
                        {parseInt(item?.price)
                          .toFixed(0)
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND'}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.item}>
                    <View>
                      <Text style={[styles.txt]}>Số lượng: </Text>
                    </View>
                    <View>
                      <Text style={[styles.txt]}>{item.quantity}</Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.item,
                      {
                        borderBottomStartRadius: 12,
                        borderBottomEndRadius: 12,
                      },
                    ]}>
                    <View>
                      <Text style={[styles.txt]}>Thành tiền: </Text>
                    </View>
                    <View>
                      <Text style={[styles.txt]}>
                        {(item.price * item.quantity)
                          .toFixed(0)
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND'}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{marginHorizontal: 2, width: 120, marginTop: 5}}>
                      <Button
                        onPress={() =>
                          handlePayment({
                            orderID: item.orderID,
                            foodID: item.foodID,
                          })
                        }
                        title={'Thanh toán'}
                      />
                    </View>
                    <View
                      style={{marginHorizontal: 2, width: 120, marginTop: 5}}>
                      <Button
                        onPress={() =>
                          formUpdate({
                            orderID: item.orderID,
                            foodID: item.foodID,
                            foodName: item.food_name,
                            tableName:
                              tables.find(
                                (item01: any) => item01.id == item.tableID,
                              ) != undefined
                                ? tables.find(
                                    (item01: any) => item01.id == item.tableID,
                                  ).name
                                : '',
                            quantity: item.quantity,
                          })
                        }
                        title={'Cập nhật'}
                      />
                    </View>
                    <View
                      style={{marginHorizontal: 2, width: 120, marginTop: 5}}>
                      <Button
                        onPress={() =>
                          handleDelete({
                            orderID: item.orderID,
                            foodID: item.foodID,
                          })
                        }
                        title={'Xóa'}
                      />
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        ) : (
          ''
        )}
      </View>
    </>
  );
}

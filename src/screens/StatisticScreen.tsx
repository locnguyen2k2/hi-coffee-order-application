import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native'
import Header from '../../components/HeaderItem'
import VerticalNav from '../../components/VerticalNav'
import { BarChart } from 'react-native-gifted-charts'
import DatePicker from 'react-native-date-picker'
import statisticService from '../services/statisticService'

export default function StatisticScreen({ navigation }: any) {
    const [data, setData] = useState<any>([]);
    const [fromDate, setFromDate] = useState(new Date())
    const [toDate, setToDate] = useState(new Date())
    const [openTo, setToOpen] = useState(false)
    const [openFrom, setFromOpen] = useState(false)
    const [type, setType] = useState<any>(null)
    const [maxValue, setMaxValue] = useState<any>(0)
    const screenWidth = Dimensions.get('window').width
    const screenHeight = Dimensions.get('window').height
    const styles = StyleSheet.create({
        item: {
            margin: 5,
            height: 50,
            borderWidth: 1,
            borderRadius: 8,
            alignItems: 'center',
            borderColor: '#C09440',
            justifyContent: 'center',
            width: (screenWidth - 50) / 4,
        },
        text: {
            color: 'white',
        },

    })
    useEffect(() => {
        if (fromDate.getDate() == toDate.getDate() &&
            fromDate.getMonth() + 1 == toDate.getMonth() + 1 &&
            fromDate.getFullYear() == toDate.getFullYear()) {
            let day = fromDate.getDate()
            let month = fromDate.getMonth()
            let year = fromDate.getFullYear()
            statisticService.getInDay(type, 'day', `${year}-${month + 1}-${day}`, null)
                .then((res: any) => {
                    if (res.data.result.length > 0) {
                        setData(res.data.result)
                        setMaxValue(res.data.result[0].maxValue)
                    } else {
                        setData(null)
                    }
                })
        } else {
            let dayF = fromDate.getDate()
            let monthF = fromDate.getMonth()
            let yearF = fromDate.getFullYear()
            let dayT = toDate.getDate()
            let monthT = toDate.getMonth()
            let yearT = toDate.getFullYear()
            statisticService.getInDay(type, 'range', `${yearF}-${monthF + 1}-${dayF}`, `${yearT}-${monthT + 1}-${dayT}`)
                .then((res: any) => {
                    console.log(res)

                    if (res.data.error == 0) {
                        setData(res.data.result)
                        setMaxValue(res.data.result[0].maxValue)
                    } else {
                        setData(null)
                    }
                })
        }
    }, [fromDate, toDate, type])
    return (
        <>
            <Header title={'Thống kê '} />
            <VerticalNav />
            <View
                style={{
                    width: screenWidth,
                    alignItems: 'center',
                    height: screenHeight,
                    backgroundColor: '#1C344F',
                }}
            >
                <View style={{ height: 100 }} >
                    <ScrollView
                        horizontal={true}
                        contentContainerStyle={{ flexDirection: 'row', }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                setType('ban')
                            }}
                            style={[styles.item, { backgroundColor: type == 'ban' ? '#C09440' : '#1C344F' }]}><Text style={[styles.text]}>Bàn</Text></TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setType('mon')
                            }}
                            style={[styles.item, { backgroundColor: type == 'mon' ? '#C09440' : '#1C344F' }]}><Text style={[styles.text]}>Món</Text></TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setType('loai')
                            }}
                            style={[styles.item, { backgroundColor: type == 'loai' ? '#C09440' : '#1C344F' }]}><Text style={[styles.text]}>Loại</Text></TouchableOpacity>
                    </ScrollView>
                </View>
                <View style={{
                    flexDirection: 'row',
                    backgroundColor: '#C09440',
                    padding: 5,
                    borderRadius: 8,
                }}>
                    <View>
                        <TouchableOpacity
                            onPress={() => setFromOpen(true)}
                        >
                            <Text> From: {fromDate.getDate()}/{fromDate.getMonth() + 1}/{fromDate.getFullYear()} </Text>
                        </TouchableOpacity>
                        <DatePicker
                            modal
                            open={openFrom}
                            date={fromDate}
                            onConfirm={(date) => {
                                setFromOpen(false)
                                setFromDate(date)
                            }}
                            onCancel={() => {
                                setFromOpen(false)
                            }}
                            mode="date"
                        />
                    </View>
                    <View><Text> - </Text></View>
                    <View>
                        <TouchableOpacity
                            onPress={() => setToOpen(true)}
                        >
                            <Text> To: {toDate.getDate()}/{toDate.getMonth() + 1}/{toDate.getFullYear()} </Text>
                        </TouchableOpacity>
                        <DatePicker
                            modal
                            open={openTo}
                            date={toDate}
                            onConfirm={(date) => {
                                setToOpen(false)
                                setToDate(date)
                            }}
                            onCancel={() => {
                                setToOpen(false)
                            }}
                            mode="date"
                        />
                    </View>
                </View>
                <View style={{
                    position: 'relative',
                    marginTop: 25,
                    borderWidth: 1,
                    borderRadius: 8,
                    paddingVertical: 5,
                    flexDirection: 'row',
                    borderColor: '#C09440',
                    width: screenWidth - 20,
                    backgroundColor: '#C09440',
                }}>
                    {
                        data?.length && maxValue != 0 > 0 ?
                            <View>
                                <BarChart
                                    showLine={true}
                                    hideRules={true}
                                    isAnimated={true}
                                    data={data}
                                    spacing={75}
                                    height={250}
                                    barWidth={40}
                                    noOfSections={4}
                                    xAxisThickness={0}
                                    yAxisThickness={0}
                                    initialSpacing={30}
                                    barBorderRadius={4}
                                    barMarginBottom={5}
                                    yAxisLabelWidth={50}
                                    showValuesAsTopLabel
                                    frontColor={'#a8a29e'}
                                    width={screenWidth - 70}
                                    maxValue={maxValue + 200}
                                    backgroundColor={'#1C344F'}
                                    lineConfig={{ color: '#F29C6E' }}
                                    topLabelContainerStyle={{ textAlign: 'center' }}
                                    topLabelTextStyle={{ color: '#b91c1c', fontWeight: 500 }}
                                />

                            </View>
                            : ""
                    }
                </View>
                {
                    data?.length > 0 ?
                        <View style={{ marginTop: 5, }}>
                            <Text style={{ color: '#C09440', fontSize: 18, textAlign: 'center' }}>
                                Thống kê doanh thu theo:
                                {type == 'ban' ? ' Bàn' : type == 'loai' ? ' Loại' : ' Món'}
                                <View>
                                    <Text>
                                        (Từ {fromDate.getDate()}/{fromDate.getMonth() + 1}/{fromDate.getFullYear()} đến {toDate.getDate()}/{toDate.getMonth() + 1}/{toDate.getFullYear()})
                                    </Text>
                                </View>
                            </Text>
                        </View>
                        : ""
                }
            </View>
        </>

    )
}
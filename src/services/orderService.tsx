import axios from 'axios'
import {APP_BASE_API_URL, ipv4} from '../../constants/IPv4'
const addOrder = async (data: any) => {
    let formData = new FormData()
    if (data.foods != undefined) {
        formData.append('btn-add-order', true);
        formData.append('list_food', JSON.stringify(data.foods));
        formData.append('table_name', data.table.name);
    } else {
        formData.append('table_name', data.name);
    }
    try {
        return await axios({
            data: formData,
            method: 'post',
            headers: { "Content-Type": "multipart/form-data" },
            url: 'http://' + ipv4() + `/${APP_BASE_API_URL}/api/them-don-dat`,
        })
    } catch (error) { console.log('loi') }
}
const orderPayment = async ({ orderID, foodID }: any) => {
    const formData = new FormData()
    if (orderID != undefined && foodID != undefined) {
        formData.append('id', JSON.stringify(orderID + '.' + foodID));
        try {
            return await axios({
                data: formData,
                method: 'post',
                headers: { "Content-Type": "multipart/form-data" },
                url: 'http://' + ipv4() + `/${APP_BASE_API_URL}/api/ordercontroller/processorderpayment`,
            })
        } catch (error) { console.log(error) }
    }
}
const orderPaymentAll = async ({ invoiceID }: any) => {
    const formData = new FormData()
    if (invoiceID != undefined) {
        formData.append('bill_id', JSON.stringify(invoiceID));
        formData.append('btn-pay-all-order', true);
        try {
            return await axios({
                data: formData,
                method: 'post',
                headers: { "Content-Type": "multipart/form-data" },
                url: 'http://' + ipv4() + `/${APP_BASE_API_URL}/api/ordercontroller/processallorderpayment`,
            })
        } catch (error) { console.log(error) }
    }
}
const deleteOrder = async ({ orderID, foodID }: any) => {
    const formData = new FormData()
    if (orderID != undefined && foodID != undefined) {
        formData.append('id', JSON.stringify(orderID + '.' + foodID));
        try {
            return await axios({
                data: formData,
                method: 'post',
                headers: { "Content-Type": "multipart/form-data" },
                url: 'http://' + ipv4() + `/${APP_BASE_API_URL}/api/ordercontroller/deleteorder`,
            })
        } catch (error) { console.log(error) }
    }
}
const updateOrder = async ({ orderID, foodID, foodName, tableName, quantity }: any) => {
    const formData = new FormData();
    if (
        orderID != undefined && foodID != undefined && foodName != undefined && tableName != undefined && quantity != undefined) {
            formData.append('id', orderID + '.' + foodID)
            formData.append('table_name', tableName)
            formData.append('food_name', foodName)
            formData.append('quantity', quantity)
            formData.append('btn-update', true)
        try {
            return await axios({
                data: formData,
                method: 'post',
                headers: { "Content-Type": "multipart/form-data" },
                url: 'http://' + ipv4() + `/${APP_BASE_API_URL}/api/ordercontroller/updateorder`,
            })
        } catch (error) { console.log(error) }
    }

}

export default {
    addOrder,
    orderPayment,
    deleteOrder,
    updateOrder,
    orderPaymentAll
}

import axios from 'axios'
import {APP_BASE_API_URL, ipv4} from '../../constants/IPv4'
const getDetailInvoice = async (data: any) => {
    let formData = new FormData()
    formData.append('invoiceID', data);
    try {
        return await axios({
            data: formData,
            method: 'post',
            headers: { "Content-Type": "multipart/form-data" },
            url: 'http://' + ipv4() + `/${APP_BASE_API_URL}/api/chi-tiet-hoa-don`,
        })
    } catch (error) {
        console.log(error)
    }
}

const getListInvoiceByTable = async (table: any) => {
    let formData = new FormData()
    formData.append('tableName', table);
    try {
        // console.log(await axios({
        //     data: formData,
        //     method: 'post',
        //     headers: { "Content-Type": "multipart/form-data" },
        //     url: 'http://' + ipv4() + `/${APP_BASE_API_URL}/api/danh-sach-hoa-don-theo-ban`,
        // }))
        return await axios({
            data: formData,
            method: 'post',
            headers: { "Content-Type": "multipart/form-data" },
            url: 'http://' + ipv4() + `/${APP_BASE_API_URL}/api/InvoiceController/getListInvoiceByTable/`,
        })
    } catch (error) {
        console.log(error)
    }
}


export default {
    getDetailInvoice,
    getListInvoiceByTable
}
